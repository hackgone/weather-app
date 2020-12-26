const express= require("express");
const app=express();
const bodyParser=require("body-parser");
const https=require("https");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function (req,res) {
  res.sendFile(__dirname+"/index.html");

});
app.post("/",function (req,res) {
  const query=req.body.cityName;
  const id="7cbcadc3bbc3f1f80fda232eb5e36284#";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid="+id;
  https.get(url,function (response){
    response.on("data",function(data){
      const weatherData=JSON.parse(data);
      const name =weatherData.name;
      const temp=weatherData.main.temp;
      const icon= weatherData.weather[0].icon;
      const imageURL="http://openweathermap.org/img/wn/"+ icon +"@2x.png";
      res.write("<p>here is today's weather</p>");
      res.write("<h1>the temp in "+ query + " is "+ temp+"</h1>");
      res.write("<img src="+ imageURL +">");
      res.send();
    })
  });

})



app.listen(3000,function (req,res) {
    console.log("running");

});
