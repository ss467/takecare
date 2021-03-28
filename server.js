//jshint esversion:6//

const express=require('express');
const bodyParser = require("body-parser");

const ejs = require("ejs");
const _=require("lodash");





const app=express();

app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/", function(req, res){
    res.sendFile(__dirname+"/home.html");
  });

app.get("/aboutus.html",(req,res)=>{
    res.sendFile(__dirname+"/aboutus.html");
});

app.get("/veggies.html",function(req,res){
    res.sendFile(__dirname+"/veggies.html");
});


app.get("/bmi.html",function(req,res){
    res.sendFile(__dirname+"/bmi.html");
});

app.get("/ac19.html",function(req,res){
  res.sendFile(__dirname+"/ac19.html");
});
app.get("/exercise.html",function(req,res){
  res.sendFile(__dirname+"/exercise.html");
});
app.get("/eat.html",function(req,res){
  res.sendFile(__dirname+"/eat.html");
});



app.post("/bmi",function(req,res){
    var weight=parseFloat(req.body.weight);
    var height=parseFloat(req.body.height);

    var bmi = weight/(height*height);
    res.send("Your BMI is "+ bmi);
});


//Blog



const homeStartingContent = "The word health refers to a state of complete emotional and physical well-being. Healthcare exists to help people maintain this optimal state of health.";
const aboutContent = "Providing daily Health related tips for people with diseases like for Diabetes,Corona infected,Tuberculosis,Pneumonia,Dengue.This blog also gives information regarding Healthy lifestyle";
const contactContent = "You can contact us by any of the social media.";





let posts = [];

app.get("/blog", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/aboutblog", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contactblog", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/composeblog", function(req, res){
  res.render("compose");
});

app.post("/composeblog", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/blog");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});











app.listen("8080",function(req,res){
    console.log("Server is up and running,It is actively listening on port 8080");
})