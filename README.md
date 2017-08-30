**Hangry Helper**
=========

A recipe finding application with Node.js/Express/MySQL/Handlebars/Mocha/Chai/Nightmare.js

**Description**  
This application demonstrates a full stack application with a front end implemented with HTML/CSS and a backend implemented with Node.js and Express. HTML templating is done with the help of Handlebars.

The user may search any recipe through the use of the navbar and filter the searches with the help of the dropdowns. The user may then add any specific recipe to the database by clicking on it.

**Demo**  
A demo of the hangry helper application can be found **[here](https://github.com/andylushman/hangry-helper)**.

**MySQL Database Setup**     
In order to run this application, you should have the MySQL database already set up on your machine. If you don't, visit the MySQL installation page to install the version you need for your operating system. Once you have MySQL installed, you will be able to create the Hangry Helper database and the products table with the SQL code found in schema.sql and seeds.sql files. Run this code inside your MySQL client like MySQL Workbench to populate the database, then you will be ready to proceed with running the Hangry Helper installation.

**Installation**  
To run the application locally, first clone this repository with the following command:

> git clone https://github.com/andylushman/burger.git

Next, install the application dependencies:
> cd hangry-helper   
> npm install

Finally, run the node server locally:

> node server.js

Now, open the local application on port 8080 at the URL: http://localhost:8080/.
