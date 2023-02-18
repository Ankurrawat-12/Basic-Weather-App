const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")
require("dotenv").config()


const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req,res) => {
    const querry = req.body.cityName;
    const apiKey = process.env.API_KEY;
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ querry+ "&appid="+ apiKey +"&units=" + unit;
    
    https.get(url, (response) => {

        console.log(response.statusCode);

        response.on("data", (data) =>{

            const weatherData = JSON.parse(data);

            const description = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const id = weatherData.weather[0].icon;
            const imgSrc =  "http://openweathermap.org/img/wn/" + id +"@2x.png"

            res.write("<h1>The Temperatur in "+ querry +" is " + temp + " degrees Celsius</h1>");
            res.write("<h2>The Weather is Currently " + description + "</h2>");
            res.write("<img src=" + imgSrc +">");

            res.send()

        });

    });
})

app.listen("3000", () =>{
    console.log("Server is running on Port 3000");
});