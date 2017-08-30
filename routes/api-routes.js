var db = require("../models");


// Routes
// =============================================================
module.exports = function(app) {

// app.get("/search", function(req, res) {

//     var searchResults = req.body;
   
//     return res.render('results', {searchResults})
// });

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
  console.log(req.body.id);
   db.FavRecipe.update({
      notes: req.body.notes,
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbTodo) {
      res.redirect('/favs');
    });
  });

//To save a recipe to favorites -- NOT WORKING YET

app.post("/favs/posts", function(req, res) {
    console.log(req.body);

    db.FavRecipe.create({
      title: req.body.title,
      image: req.body.images,
      source: req.body.source,
      url: req.body.url,
      yield: req.body.yield,
      ingredients: req.body.ingredients,
      dietLabels: req.body.dietLabels
    })
<<<<<<< HEAD
  });

    app.get("/login", function(req, res) {
        res.render("login", { title: "Login"})
    })

    app.post("/login", passport.authenticate("local", {
        successRedirect: "/profile",
        failureRedirect: "/login",
        failureFlash: true
    }));

    app.get("/logout", function(req, res) {
        req.logout();
        req.session.destroy();
        res.redirect("/home")
    })

    app.get("/register", function(req, res) {
        res.render("register", { title: 'Registration' })
    })



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
                        req.flash("successMsg", "You are registered and can now login")
                        res.redirect("/login")

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
=======
    .then(function(dbFavs) {
      res.json(dbFavs);
      res.redirect('/favs');
    });
  });
>>>>>>> 7dc265de67e7cf70d3dd6d228a569bc0a6584fe1

// app.post("/favs", function(req, res) {
//   console.log(req.body);
//   db.FavRecipe.create(req.body).then(function(dbPost) {
//       res.json(dbPost);
//       res.redirect("/");
//   });
// });


};
