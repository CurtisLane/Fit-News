const axios = require("axios");
const cheerio = require("cheerio");
const db = require('../models')

module.exports = function(app){

  // get all articles
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
  
  // Get one article by id
  app.get('/api/articles/:id', function(req,res){
      db.Article.findOne({_id: req.params.id})
      .populate("comments")
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  })

  // Post a comment and put the _id into the Article comment array
  app.post('/api/articles/:id', function(req, res){
      db.Comment.create(req.body)
      .then(function(dbComment){
        return db.Article.findOneAndUpdate({_id: req.params.id}, {$push: {comments: dbComment._id}}, {new: true});
      })
      .then(function(dbArticle) {
          res.json(dbArticle);
        })
      .catch(function(err) {
      res.json(err);
      });
  })

  // Article scraper
  app.get("/api/scrape", function(req, res) {

    axios.get("https://www.bodybuilding.com/category/workouts").then(function(response) {
      
      var $ = cheerio.load(response.data);

      $("span.cms-article-list--article").each(function(i, element) {        
       
        var result = {};

        // Extract text from scraped page
        result.headline = $(element)
          .children('figure')
          .children('figcaption')
          .children('h3.title')
          .children('a')
          .text();
        result.summary = $(element)
          .children('figure')
          .children('figcaption')
          .children('span.description')
          .text();
        result.URL = $(element)
          .children('figure')
          .children('figcaption')
          .children('h3.title')
          .children('a')
          .attr('href');
        result.image = $(element)
          .children('figure')
          .children('a')
          .children('div.thumb')
          .children('img')
          .attr('data-srcset').split(" ")[0];

        db.Article.create(result)
          .then(function(dbArticle) {
            console.log(dbArticle);
          })
          .catch(function(err) {
            console.log(err);
          }); 
      });
      res.send("Scrape Complete");
    });
  });

  // Get all articles
  app.get("/api/articles", function(req, res) {
    db.Article.find({})
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  app.get('/api/clearDatabase', function(req, res){
    db.Article.deleteMany({}, function(error, result){
      console.log('deleted all articles')
    })
    db.Comment.deleteMany({}, function(error, result){
      console.log('deleted all comments')
    })
    res.send('Database has been cleared. <a href="/">Click Here</a> to go back.')
  })

  app.get('/api/comment/:id', function(req, res){
    db.Comment.deleteOne({_id: req.params.id}, function(err, result){
      console.log('deleted comment')
    })
    res.end()
  })

}