const container = document.querySelector('.container');
const msg = document.querySelector('.msg');
const weatherinf = document.querySelector('.weather-info');
const temp = document.querySelector('.weather-temp');
const coord = document.querySelector('.location');
const time = document.querySelector('.time');
const title = document.querySelector('.title');
const img = document.querySelector('img')
const api_key = key.Key;
console.log('Hello There!, Are You A Developer?')

setInterval(() => {
    let Time = new Date;
    let Hours = Time.getHours();
    let Minutes = Time.getMinutes();
    let Seconds = Time.getSeconds();
    let MilliSec = Time.getMilliseconds();
    time.innerHTML = Hours + ':' + Minutes + ':' + Seconds + ':' + MilliSec;
    if(Hours >= 12) {
        container.style.backgroundColor = 'grey';
    }
    if(Hours <= 11) {
        container.style.backgroundColor = 'transparent';
    }
    if(Hours >= 18) {
        container.style.backgroundColor = 'black';
        weatherinf.style.color = 'white';
        temp.style.color = 'white';
        coord.style.color = 'white';
        time.style.color = 'white';
        title.style.color = 'white';
    }
}, 1)

const weather = {};

weather.temperature = {
    unit: "celsius"
}

const KELVIN = 273;

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    msg.style.display = "block";
    msg.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

function showError(error){
    msg.style.display = "block";
    msg.innerHTML = `<p> ${error.message} </p>`;
}

function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

function displayWeather(){
    temp.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    weatherinf.innerHTML = weather.description;
    coord.innerHTML = `${weather.city}, ${weather.country}`;
}

function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

temp.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        temp.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        temp.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});

title.addEventListener("click", function(evt) {
    evt.preventDefault();

    if(title.innerHTML == "<h1>Weather App</h1>") {
        title.style.fontSize = '15px';
        title.innerHTML = '<h1>Created by: Errforx</h1>';
    } else {
        title.style.fontSize = '3.2vh';
        title.innerHTML = '<h1>Weather App</h1>';
    }
});

setInterval(() => {
    container.style.width = window.innerWidth / 3.5 + 'px';
    container.style.height = window.innerHeight / 2 + 'px';
    container.style.left = window.innerWidth / 2.7 + 'px';
    container.style.fontSize = window.innerWidth / 55 + 'px';
    img.style.width = window.innerWidth / 2 + 'px';
    img.style.height = window.innerHeight / 3 + 'px';
    img.style.top = window.innerHeight / 1.4 + 'px';
    img.style.left = window.innerWidth / 4 + 'px';
}, 1)