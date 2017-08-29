var db = require("../models");


// Routes
// =============================================================
module.exports = function(app) {


app.get("/favs", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.FavRecipe.findAll({}).then(function(recipe_data){
        // console.log(recipe_data);
        return res.render('favs', {recipe_data})
    });
});

// app.get("/", function(req, res) {
    
//         var searchResults = req.body;
       
//         return res.render('results', {searchResults})
   
// });

app.get('/', function (req, res) {
    res.render('index');
});


app.get("/:id", function(req, res) {
  db.FavRecipe.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(recipe_data) {
    // console.log(recipe_data)
  return res.render('fav_edit', {recipe_data});
});

});

app.put("/:id", function(req, res) {
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


};
