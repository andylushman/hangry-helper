#Will add starter data to work with
#THIS COMES FROM EDAMAN JSON RESPONSE
INSERT INTO favrecipes (title, image, source, url, yield, ingredients, dietLabels, healthLabels, createdAt, updatedAt, UserID) VALUES ("Chicken Piccata", "https://www.edamam.com/web-img/eb5/eb5985a8a19a9fc72b0cf627282199ed.jpg", "No Recipes", "http://norecipes.com/recipe/chicken-piccata-recipe", 2, '"2 large chicken breasts","1/2 cup flour",
"3 tbsps vegetable oil", "2 scallions white part only, minced", "3 tbsps lemon juice", "1 cup chicken stock", "1 tsp honey" ,"2 tbsps unsalted butter cut into small pieces", "2 tbsps parsley minced", "2 tbsps capers", "1 tsp lemon zest finely zested"', "Low-Carb", '"Peanut-Free", "Tree-Nut-Free", "Alcohol-Free"', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO users (name, createdAt, updatedAt) VALUES ("Heather", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);