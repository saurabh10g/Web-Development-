
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){

  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){

  const query = req.body.cityName
  const appKey = "e5e0064fa2c00b5f74913f38b5c48629";
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appKey+"&units="+unit;
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const wethData = JSON.parse(data);
      // console.log(wethData);
      //
      // const object = {
      //   name: "saurabh",
      //   age: 21,
      //   year:"Third"
      // }
      // console.log(JSON.stringify(object));

      const temp =wethData.main.temp;
      const desc =wethData.weather[0].description;
      const icon =wethData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";

      console.log(temp);
      console.log(desc);

      res.write("<h1>The temperature in "+query+" is: " + temp + " Kelvin.</h1>");
      res.write("The weather is "+desc);
      res.write("<img src = "+imgURL+">")
      res.send();
  })
  });
});

// PREVIOUSLY THIS SECTION WAS INSIDE APP.GET AND THE CONTENT THAT IS CURRENTLY PRESENT INSIDE THE GET WAS NOT THERE.





app.listen(3000,function(){
  console.log("Server is running at port 3000.");
});
