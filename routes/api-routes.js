// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");


// Routes
// =============================================================
module.exports = function(app) {


app.get("/", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.FavRecipe.findAll({}).then(function(recipe_data){
        // console.log(recipe_data);
        return res.render('faves', {recipe_data})
    });
});

app.get("/", function(req, res) {
    
        var searchResults = req.body;
       
        return res.render('results', {searchResults})
   
});

app.get("/", function(req, res) {
    
 return res.render("home");
   
});
  

};