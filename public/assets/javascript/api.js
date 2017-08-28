// $("#results").hide();
console.log("test");

$("#search-btn").on("click", function(){
	var search = $(".search").val().trim() 
	var diet = "diet="+ $("#dietLabel").val().trim() + "&";
	// var health = "&health=" + $("#healthLabel").val().trim();
	console.log(search);
	console.log(diet);
	// console.log(health);
	var queryURL = "https://api.edamam.com/search?" + diet + "q="+ search + "&app_id=ef316e31&app_key=461d0411e8ce0762dbb22002d91b424d&from=0&to=8" ;
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
		
			
			console.log(ing)
			
			var newCard = $( "<div class='col-sm-3'>" )
			newCard.html("<div class='card'> <img class= 'img-fluid' src=" + results.recipe.image + " alt = 'card image cap'> <div class='card-body text-center> <h4 class = 'card-title'>" + results.recipe.label + "</h4> <p class='card-text'> " + ing + " </p> <a class='btn btn-primary' href=" +  results.recipe.url + " target='_blank'>Recipe!</a></div> </div></div>");

			$(".results").append(newCard)

			console.log(response.hits[i]);
		
		};

	})
})


// $("#search-text").keypress(function(e) {
//     if(e.which == 13) {
//     		var search = $("#search-bar").val().trim();
  
//     	console.log(search)
        
//     }
// });
// $("#search-bar").on("click", function(){
// 	$("#first-page").empty();
// 	$("#recipes").show();
// 	var search = $("#search-input").val().trim();
// 	console.log(search)
//   var queryURL = "https://api.edamam.com/search?q="+ search + "&app_id=ef316e31&app_key=461d0411e8ce0762dbb22002d91b424d&from=0&to=8";
// 	$.ajax({
// 		url: queryURL,
// 		method: "GET"
// 	}).done(function(response){
		
// 		for (var i = 0; i < 8; i++){
// 			var results = response.hits[i];
// 			console.log(results.recipe)
// 			var ing = results.recipe.ingredientLines;
		
// 			ingList = "<li>" + ing + "</li>";
// 			console.log(ingList)
			
// 			var newCol = $( "<div class='col s3'>" )
// 			newCol.html("<h3>" + results.recipe.label + " </h3> <a href=" +  results.recipe.url + " target='_blank'> <img src=" + results.recipe.image + "></a> <br> " + ingList + "  </div> <br>");

// 			$("#recipeSpace").append(newCol)

// 			console.log(response.hits[i]);
		
// 		};

// 	})
// });