const axios = require("axios");
const cheerio = require("cheerio");
const db = require('../models')

module.exports = function(app){

    app.get('/api/articles', function(req,res){
        db.Article.find({})
        .populate("Comment")
        .then(function(dbArticle) {
          res.json(dbArticle);
        })
        .catch(function(err) {
          res.json(err);
        });
    })

    app.post('/api/articles', function(req, res){
        db.Article.create(req.body)
        .then(function(dbArticle) {
            res.json(dbArticle);
          })
        .catch(function(err) {
        res.json(err);
        });
    })






}