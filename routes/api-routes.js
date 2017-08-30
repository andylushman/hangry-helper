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
  console.log(req.params.id);
   db.FavRecipe.update({
      notes: req.body.notes,
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(dbTodo) {
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
      
    });
  });


};
