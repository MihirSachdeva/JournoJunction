const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-mihir:Teromisa123@cluster1-wdgto.mongodb.net/blogDB", {useUnifiedTopology: true, useNewUrlParser: true});

const homeStartingContent = "A sanctuary for your mind and soul, JournoJunction will help increase your positive energy, be more grateful and a calmer mind by building healthy thinkings through journaling. Let this be your own motivational coach and happiness trainer. Let's embark on a fabulous journey of self-improvement today.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

const postSchema = new mongoose.Schema(
{
  title: String,
  content: String
});

const Post = mongoose.model("Post", postSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res)
{
  Post.find({}, function(err, posts)
  {
    res.render("home", {homeStarting: homeStartingContent, postList: posts});
  });

});

app.get("/compose", function(req, res)
{
  res.render("compose");
});

app.post("/compose", function(req, res)
{
  let post = new Post(
  {
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save();
  res.redirect("/");
});

app.get("/posts/:postId", function(req, res)
{
  var requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId}, function(err, post)
  {
    if(!post)
    {
      res.render("post", {heading: "Post does not exist yet.", content: "To create a post with this title, contact the developer."});
    }
    else
    {
      res.render("post", {heading: post.title, content: post.content});
    }
  });
});

app.listen(process.env.PORT, function()
{
  console.log("Server started...");
});

// app.listen(3200, function() {
//   console.log("Server started on port 3200");
// });
