// $("#results").hide();
console.log("test");

$("#search-btn").on("click", function(){
	$(".results").empty();
	var search = $(".search").val().trim()

	var diet = "diet="+ $("#dietLabel").val().trim() + "&";
	var queryURL;
	if ( diet === "diet=&"){
		queryURL = "https://api.edamam.com/search?q=" + search + "&app_id=ef316e31&app_key=461d0411e8ce0762dbb22002d91b424d&from=0&to=8" ;

	} else {
	// var health = "&health=" + $("#healthLabel").val().trim();
	// console.log(search);
	// console.log(diet);
	// console.log(health);
	queryURL = "https://api.edamam.com/search?" + diet + "q="+ search + "&app_id=ef316e31&app_key=461d0411e8ce0762dbb22002d91b424d&from=0&to=8" ;
	}
	console.log(queryURL)
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		console.log(response);
		for (var i = 0; i < 8; i++){
			var results = response.hits[i];
			console.log(results.recipe)
		var ing = results.recipe.ingredientLines;


			// console.log(ing)
			var newCard = $( "<div class='col-sm-3'>" );
			
			newCard.html("<div class='card text-center'> <img class= 'img-fluid' id='image' src='" + results.recipe.image + "' alt = 'card image cap'> <div class='card-body text-center'>" + "<h4 class = 'card-title' id='rtitle'><strong>" + results.recipe.label + "</strong></h4> <h6 class= 'text-danger text-muted'><u>Ingredient List</u></h6> <p class='card-text text-primary text-center' id = 'ingredients'> " + ing + " </p> <p><small class='text-muted' id='source'> Courtesy of: " + results.recipe.source + "</p></small> <a class='btn btn-primary' id='url' href='" +  results.recipe.url + " target='_blank'>Recipe!</a><a class='btn btn-success' href=" +  results.recipe.shareAs + "' target='_blank'>Nutrients!</a><br><br><a href='/favs' id='save-btn' class='btn btn-info'>Save Recipe!</a></div> </div></div>");
            $(".results").append(newCard);
            console.log(response.hits[i]);
        };
    })
});
  $(document).on("click", "#save-btn", function(event) {
    event.preventDefault();
    var parent = $(this).parent().parent();
    // This function inserts a new todo into our database and then updates the view
    var newRecipe = {
      title: parent.find("#rtitle").text(),
      image: parent.find('img').attr('src'),
      source: parent.find("#source").text(),
      url: parent.find('#url').attr('src'),
      ingredients: parent.find("#ingredients").text()
    }
   $.post("/favs/new", newRecipe)
    // On success, run the following code
    .done(function(data) {
      // Log the data we found
      res.redirect('/favs');
    });
});
