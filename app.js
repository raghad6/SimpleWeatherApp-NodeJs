
const express = require('express');
const app = express();

const path = require('path');
const request = require('postman-request')
const hbs = require('hbs');

const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, './src/views');
const partialsPath = path.join(__dirname, './src/partial');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=31.5326&lon=35.0998&appid=b79529712f1c0691e6afae708aff98b8';
let weatherData;
request(url, function(error, response) {
    console.log('error:', error); 
    weatherData = JSON.parse(response.body);
});


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


app.get('/' , (req, res) => {
    res.render('home')
});

app.get('/about' , (req, res) => {
    res.render('about')
});

app.get('/weather' , (req, res) => {
    res.render('weather', {
        temp: Math.round(weatherData.main.temp - 273.15),
        desc: weatherData.weather[0].description,
    });
});

app.listen(port, ()=>{
console.log('server is up on port' + port);
});