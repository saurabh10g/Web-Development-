const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");

const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
  .get(function(req, res) {
    Article.find(function(err, foundArticles) {
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(err);
      }
    });
  })

  .post(function(req, res) {
    console.log();
    console.log();

    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });

    newArticle.save(function(err) {
      if (!err) {
        console.log("Successfully added new article.");
      } else {
        console.log(err);
      }
    });
  })

  .delete(function(req, res) {
    Article.deleteMany(function(err) {
      if (!err) {
        res.send("successfully deleted all articles.");
      } else {
        res.send(err);
      }
    });
  });

//////// request targeting to specific route////////

app.route("/articles/:articleTitle")
  .get(function(req,res){
    Article.findOne(
      {title:req.params.articleTitle},
      function(err,foundArticles){
      if(foundArticles){
        res.send(foundArticles);
      }else{
        res.send("No match found for title");
      }
    });
  })

  .put(function(req,res){
    Article.update(
      {title:req.params.articleTitle},
      {title:req.body.title,content:req.body.content},
      {overwrite:true},
      function(err){
        if(!err){
          res.send("Successfully updated the document.");
        }
      }
    )
  })

  .patch(function(req,res){
    Article.update(
      {title:req.params.articleTitle},
      {title:req.body},
      function(err){
        if(!err){
          res.send("Successfully updated the document.");
        }
      }
    )
  })

  .delete(function(req,res){
    Article.deleteOne(
      {title:req.params.articleTitle},
      function(err){
        if(err){
          res.send("Successfully deleted.");
        }else{
          res.send(err);
        }
      }
    )
  });


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
