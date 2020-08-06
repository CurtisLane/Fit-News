// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const favicon = require('serve-favicon')
const path = require('path')


const PORT = process.env.PORT || 8080;

// Initialize Express
const app = express();

// middle-ware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Set up a static folder (public) for our web app
app.use(express.static(path.join(__dirname+ "/app/public")));
app.use(favicon(path.join(__dirname, 'app', 'public', 'images', 'favicon.ico')));


// require our routes
require("./app/routes/apiRoutes.js")(app);
require("./app/routes/htmlRoutes.js")(app);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/fit-news";

// Connect to mongoDB with mongoose
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

// app listening on specified PORT
app.listen(PORT, function() {
    console.log("App listening on port 8080!");
});