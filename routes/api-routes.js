// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
  

app.get("/", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.FavRecipe.findAll({})
.then(function(recipe_data){
        console.log(recipe_data);
        return res.render('index', {recipe_data})
    })

//     .then(function(dbFavRecipe) {
//       // We have access to the favrecipes as an argument inside of the callback function
// var hbsObject = {
//       favrecipes: JSON.stringify(dbFavRecipe)
//     };
//       res.render("index", dbFavRecipe.title);

//     });
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

  app.get("/register", function(req, res){
    res.render("register", {title: 'Registration'})
  })

  app.post("/register", function(req, res){
    res.render("register", {title: 'Registration Complete'})
  })
};
