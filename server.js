var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var expressValidator = require("express-validator");
//Authentication packages
var session = require("express-session");
var cookieParser = require('cookie-parser');
var passport = require("passport")
var Sequelize = require('sequelize')
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var sequelize = new Sequelize(
"recipes_db",
"root",
"DUb00tc4mp", {
    "dialect": "mysql",
});
var flash = require('connect-flash');
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(expressValidator());
app.use(cookieParser())
// Static directory
app.use(express.static("public"));
//authentication initiallized
app.use(session({
  secret: 'fdsafds53faasfffdse32',
  resave: false,
  store: new SequelizeStore({
    db: sequelize
  }),
  saveUninitialized: false,
  // cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//Function globally checks if the user is logged in and updates
//handlebars dynamically

app.use(function(req, res, next){
	res.locals.successMsg = req.flash("successMsg");
	res.locals.isAuthenticated = req.isAuthenticated();
	next()
})

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
var handlebars = require('handlebars');
var exphbs = require("express-handlebars");

// Create `ExpressHandlebars` instance with a default layout.
var hbs = exphbs.create({
	defaultLayout: 'main',
    helpers: {
        format: function (text) { 
        	// text = handlebars.escapeExpression(text);
        	text = text.split(";").join("</li><li>");
    		text = text.replace(/['"]+/g, '');
			console.log("__________________________________")
    		console.log(text)
   		 return new handlebars.SafeString("<li>" + text + "</li>");
        	
        },
        defaultImg: function(image) {
          if (image === "") {
            image = "/assets/images/foodprep.jpg";
          return image;
          }
        }
    }
});



app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Routes
// =============================================================
//NOT SURE WHICH ONE IS NEEDED - THE FIRST ROUTE IS FROM SEQUELIZE EXAMPLE, THE SECOND IS FROM A HANDLEBARS EXERCISE
require("./routes/api-routes.js")(app);
// var routes = require("./controllers/foodController.js");
// app.use("/", routes);
// Syncing our sequelize models and then starting our Express app
// =============================================================
// IF YOU HAVE AN EXISTING DB USE THIS LINE INSTEAD...    db.sequelize.sync({force: true}).then(function() {

	db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log("App listening on PORT " + PORT);
	});
});

