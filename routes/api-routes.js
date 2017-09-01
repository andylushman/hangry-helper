var db = require("../models");

var expressValidator = require("express-validator");
var passport = require("passport")
//hashes user passwords
var bcrypt = require("bcrypt-nodejs")
var LocalStrategy = require('passport-local').Strategy;
// Routes
// =============================================================
module.exports = function(app) {

// app.get("/search", function(req, res) {

//     var searchResults = req.body;

//     return res.render('results', {searchResults})
// });
app.get("/login", function(req, res) {
        res.render("login", { title: "Login"})
    })

    app.post("/login", passport.authenticate("local", {
        successRedirect: "/profile",
        failureRedirect: "/login",
        failureFlash: true
    }));
    app.get("/profile", authenticationMiddleware(), function(req, res){
      res.render("profile", {user: req.session.passport.user})
    })

    app.get("/logout", function(req, res) {
        req.logout();
        req.session.destroy();
        res.redirect("/index")
    })

    app.get("/register", function(req, res) {
        res.render("register", { title: 'Registration' })
    })


app.get("/myfavorites", authenticationMiddleware(), function(req, res){

  db.FavRecipe.findAll({
    where: {
      userId: req.session.passport.user
    }
  }).then(function(dbFavRecipe) {
      // for(let i = 0; i < dbFavRecipe.length; i++){
      //   if (dbFavRecipe[i].title === !null){
      //     return res.render("myfavorites",{title:dbFavRecipe[i].title})
      //   }
        console.log(dbFavRecipe[0].title)
        res.render("myfavorites", {dbFavRecipe: dbFavRecipe, username: dbFavRecipe[0].UserId})

      //res.render("myfavorites", { user: req.session.passport.user })
      // We have access to the new favrecipe as an argument inside of the callback function
      //res.json(dbFavRecipe);
    })
    .catch(function(err) {
            // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
 })
  });

app.get("/createRecipe", authenticationMiddleware(), function(req, res){
  res.render("createRecipe")
 })

app.post("/createRecipe", authenticationMiddleware(), function(req, res) {

    db.FavRecipe.create({
      title: req.body.title,
      ingredients: req.body.ingredients,
      directions: req.body.directions,
      url: req.body.url,
      dietLabels: req.body.dietLabels,
      UserId: req.session.passport.user
    }).then(function(dbFavRecipe) {
      // We have access to the new favrecipe as an argument inside of the callback function
      res.json(dbFavRecipe);
    })
    .catch(function(err) {
            // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });

        res.render("fav_edit", { title: "Recipe has been created"})
  });

app.get('/', function (req, res) {
    res.render('index');
});


app.get("/favs", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.FavRecipe.findAll({}).then(function(recipe_data){
        // console.log(recipe_data);
        return res.render('favs', {recipe_data})
    });
});

app.get("/:id", function(req, res) {
  db.FavRecipe.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(recipe_data) {
    // console.log("get recipe:" , recipe_data)
  return res.render('fav_edit', {recipe_data});
});

});

app.put("/:id", function(req, res) {
  console.log(req.params.id);
   db.FavRecipe.update({
      notes: req.body.notes,
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(dbFavs) {
      res.redirect('/favs');
    });
  });

//To save a recipe to favorites

app.post("/favs/new", function(req, res) {
    console.log("posting recipe", req.body);

    db.FavRecipe.create({
      title: req.body.title,
      image: req.body.image,
      source: req.body.source,
      url: req.body.url,
      yield: req.body.yield,
      ingredients: req.body.ingredients,
      dietLabels: req.body.dietLabels
    })
    .then(function(dbFavs) {
      res.json(dbFavs);
      // res.render('/favs');
    });
  });


app.post("/register", function(req, res) {

        //validating user input
        req.checkBody('username', 'Username cannot be empty').notEmpty();
        req.checkBody('passwordMatch', 'Passwords do not match').equals(req.body.password);
        req.checkBody('email', 'Must be a valid email').isEmail();

        const errors = req.validationErrors();

        if (errors) {
            res.render("register", {
                title: 'Registration Error',
                errors: errors
            });
        }
        //if validated user is created
        else {

            let prehash = req.body.password;
            var hash = bcrypt.hashSync(prehash);

            // Store hash in your password DB.

            db.User.create({
                    email: req.body.email.trim(),
                    username: req.body.username.trim(),
                    password: hash
                }).then(function(user) {

                    var loggedUser = user.dataValues.username;
                    req.login(loggedUser, function(err) {
                      res.redirect("/login")
                        req.flash("successMsg", "You are registered and can now login")


                    })



                    //res.json(user);
                })
                .catch(function(err) {
                    console.log(err.errors[0].message)
                    let errormsg = err.errors[0].message
                    res.render("register", {
                        title: 'Registration Error',
                        errors: errormsg
                    });

                    // Whenever a validation or flag fails, an error is thrown
                    // We can "catch" the error to prevent it from being "thrown", which could crash our node app
                    //res.json(err);
                });

        }


    });
    //authenticates information from user using local DB
    passport.use(new LocalStrategy(
        function(username, password, done) {

            db.User.findOne({
                where: {
                    username: username
                }

            }).then(function(user, error) {

                if (error) { done(error) } else if (user == null) {


                    done(null, false, {message: "Username does not exsist"})

                } else {
                    console.log(user)
                    var hash = user.dataValues.password;
                    console.log(password, hash)
                    let result = bcrypt.compareSync(password, hash)
                    if (result === true) {

                        return done(null, username);
                    } else {
                        done(null, false)
                    }
                }

            })

        }
    ));
    passport.serializeUser(function(loggedUser, done) {
        console.log(loggedUser)
        done(null, loggedUser);
    });

    passport.deserializeUser(function(loggedUser, done) {
        done(null, loggedUser)
    });

    function authenticationMiddleware() {
        return (req, res, next) => {
            console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

            if (req.isAuthenticated()) return next();
            res.redirect('/login')
        }
    }



};
