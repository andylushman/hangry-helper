// $("#results").hide();
console.log("test");

$("#search-bar").keypress(function(e) {
    if(e.which == 13) {
    		var search = $("#search-bar").val().trim();
  
    	console.log(search)
        
    }
});
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