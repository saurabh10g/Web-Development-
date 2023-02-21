
const express = require("express");

const app = express();

app.get("/",function(request,response) {
  // console.log(request);
  response.send("<h1>Hello, World!</h1>");
});

app.get("/contact",function(req,res) {
  res.send("Contact me at 90964*****");
});

app.get("/about",function(req,res){
  res.send("<ul><li>coffee</li><li>tea</li><li>juice</li></ul>");
});

app.listen(3000, function(){
  console.log("Server started at port 3000");
});
