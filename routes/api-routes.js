// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

//validates user input on forms
var expressValidator = require("express-validator");
var passport = require("passport")
//hashes user passwords
var bcrypt = require("bcrypt-nodejs")
var LocalStrategy = require('passport-local').Strategy;


// Routes
// =============================================================
module.exports = function(app) {

 // GET route for getting all of the favrecipes
app.get("/", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.FavRecipe.findAll({}).then(function(recipe_data){
        // console.log(recipe_data);
        return res.render('favs', {recipe_data})
    });

    // GET route for getting all of the favrecipes
    app.get("/api/favrecipes", function(req, res) {
        // findAll returns all entries for a table when used with no options
        db.FavRecipe.findAll({}).then(function(dbFavRecipe) {
            // We have access to the favrecipes as an argument inside of the callback function
            res.json(dbFavRecipe);
        });
    });

    // POST route for saving a new todo
    app.post("/api/favrecipes", function(req, res) {
        // create takes an argument of an object describing the item we want to
        // insert into our table. In this case we just we pass in an object with a text
        // and complete property (req.body)
        db.FavRecipe.create({
                text: req.body.text,
                complete: req.body.complete
            }).then(function(dbFavRecipe) {
                // We have access to the new todo as an argument inside of the callback function
                res.json(dbFavRecipe);
            })
            .catch(function(err) {
                // Whenever a validation or flag fails, an error is thrown
                // We can "catch" the error to prevent it from being "thrown", which could crash our node app
                res.json(err);
            });
    });

    // DELETE route for deleting favrecipes. We can get the id of the todo to be deleted from
    // req.params.id
    app.delete("/api/favrecipes/:id", function(req, res) {
        // We just have to specify which todo we want to destroy with "where"
        db.FavRecipe.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbFavRecipe) {
            res.json(dbFavRecipe);
        });

    });

    // PUT route for updating favrecipes. We can get the updated todo data from req.body
    app.put("/api/favrecipes", function(req, res) {

        // Update takes in an object describing the properties we want to update, and
        // we use where to describe which objects we want to update
        db.FavRecipe.update({
                text: req.body.text,
                complete: req.body.complete
            }, {
                where: {
                    id: req.body.id
                }
            }).then(function(dbFavRecipe) {
                res.json(dbFavRecipe);
            })
            .catch(function(err) {
                // Whenever a validation or flag fails, an error is thrown
                // We can "catch" the error to prevent it from being "thrown", which could crash our node app
                res.json(err);
            });
    });

    //Passport routes for registration

    app.get("/home", function(req, res) {

        console.log(req.isAuthenticated())
        res.render("home", { user: req.user })
    })

    app.get("/profile", authenticationMiddleware(), function(req, res) {

        res.render("profile", { user: req.session.passport.user })
>>>>>>> master
  });

 
  // app.get("/api/favrecipes", function(req, res) {
  //   // findAll returns all entries for a table when used with no options
  //   db.FavRecipe.findAll({}).then(function(dbFavRecipe) {
  //     // We have access to the favrecipes as an argument inside of the callback function
  //     res.json(dbFavRecipe);
  //   });
  // });


  // POST route for saving a new recipe
  app.post("/", function(req, res) {
    db.FavRecipe.create({
      title: req.body.title,
      ingredients: req.body.ingredients,
      directions: req.body.directions
    }).then(function(dbFavRecipe) {
      // We have access to the new favrecipe as an argument inside of the callback function
      res.json(dbFavRecipe);
    })
    .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });
  });

  // DELETE route for deleting favrecipes. We can get the id of the todo to be deleted from
  // req.params.id
  app.delete("/:id", function(req, res) {
    // We just have to specify which todo we want to destroy with "where"
    db.FavRecipe.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbFavRecipe) {
      res.json(dbFavRecipe);
    });

  });

  // PUT route for updating favrecipes. We can get the updated recipe data from req.body
  app.put("/", function(req, res) {

    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.FavRecipe.update({
      title: req.body.title,
      image: req.body.image,
      source: req.body.source,
      url: req.body.url,
      yield: req.body.yield,
      ingredients: req.body.ingredients,
      dietLabels: req.body.dietLabels,
<<<<<<< HEAD
      healthLabels: req.body. healthLabels,
=======
      healthLabels: req.body.healthLabels,
>>>>>>> master
      notes: req.body.notes,
      directions: req.body.directions
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbFavRecipe) {
      res.json(dbFavRecipe);

    })
  })

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
              console.log(user)
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