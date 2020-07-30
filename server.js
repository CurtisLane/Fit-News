// Dependencies
const express = require("express");
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

// Initialize Express
const app = express();

// Set up a static folder (public) for our web app
app.use(express.static("app/public"));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

/*
// Database config
const databaseUrl;
const collections;

// MongoJs config
var db = mongojs(databaseUrl, collections);

// Error check
db.on("error", function(error) {
    console.log("Database Error:", error);
});
*/

// Set the app to listen on port 8080
app.listen(8080, function() {
    console.log("App listening on port 8080!");
});