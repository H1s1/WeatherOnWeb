const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
  //console.log(req.body.cityName);
  var query = req.body.cityName;
  var units = "metric";
  var apiKey = " YOUR API KEY ";
  var url = "https://api.openweathermap.org/data/2.5/weather?q="+query  +"&appid="+ apiKey +"&units=" + units;

  https.get(url,function(response){
  
    response.on("data",function(data){  

      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherLocation = weatherData.name;
      const weatherIcon = weatherData.weather[0].icon;
      var imageUrl = " http://openweathermap.org/img/wn/" + weatherIcon +"@2x.png";
      res.write("<p>Temperature in " + weatherLocation + " is as follows:- </p>" );
      res.write("<h1> The temperature is" + temp + "degree Celciuss</h1>");
      res.write("<img src = "+imageUrl+">");
      res.send();
    })
  });   
});

 app.listen(3000,()=>{
   console.log("Server is running on port 3000. ");
 });