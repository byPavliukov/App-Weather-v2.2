const response = {
    'site': 'https://api.openweathermap.org/data/2.5/',
    'appid': '47edbcf8f0327c86b7883a2a8ca3d21f',
}

// Function for get weather data on openweathermap.org
function getWeather() {
    let cityId = document.querySelector('.city');
    fetch(`${response.site}weather?lang=ru&id=${cityId.value}&appid=${response.appid}`)
        .then(weather => {
            return weather.json()
        }).then(showWeather);
}


function showWeather(data) {
    let description = data.weather[0].description.slice(0, 1).toUpperCase() + data.weather[0].description.slice(1).toLowerCase();

    //Date on main page and time of a sunrise and a sunshine
    document.querySelector('.date').innerHTML = new Date(Date.now()).toLocaleString();
    let sunrise = data.sys.sunrise * 1000;
    let sunset = data.sys.sunset * 1000;

    // If the temperature is greater than zero, then plus is concatenated
    let currTemp = Math.round(data.main.temp - 273);
    if (currTemp > 0) currTemp = `+${currTemp}`;
    let minTemp = Math.round(data.main.temp_min - 273);
    if (minTemp > 0) minTemp = `+${minTemp}`;
    let maxTemp = Math.round(data.main.temp_max - 273);
    if (maxTemp > 0) maxTemp = `+${maxTemp}`;
    let feelsLike = Math.round(data.main.feels_like - 273);
    if (feelsLike > 0) feelsLike = `+${feelsLike}`;

    // right block - main information
    document.querySelector('.curr-temp').innerHTML = `<p class="temp">${currTemp}&deg</p>`
    document.querySelector('.name-of-city').innerHTML = `${data.name}, ${data.sys.country}`;
    document.querySelector('.sunrise').innerHTML = `<img src="../img/sunrise.png" height="55px"><br>${new Date(sunrise).toLocaleTimeString()}`;
    document.querySelector('.sunset').innerHTML = `<img src="../img/sunset.png" height="55px"><br>${new Date(sunset).toLocaleTimeString()}`;
    document.querySelector('.feels-like').innerHTML = `<img src="../img/feelslike.png" height="55px">Чувствуется<br>${feelsLike}&deg`;
    document.querySelector('.min-temp').innerHTML = `<img src="../img/tempmin.png" height="55px">Ночью<br>${minTemp}&deg`;
    document.querySelector('.max-temp').innerHTML = `<img src="../img/tempmax.png" height="55px">Днём<br>${maxTemp}&deg`;

    // Left block - other useful information
    document.querySelector('.description').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"> <span>${description}</span>`;
    document.querySelector('.pressure').innerHTML = `<img src="../img/pressure.png" width="64px">&nbsp&nbsp<span>${data.main.pressure} mPa</span>`;
    document.querySelector('.humidity').innerHTML = `<img src="../img/humidity.png" width="64px">&nbsp<span>${data.main.humidity}%</span>`;
    document.querySelector('.speed').innerHTML = `<img src="../img/windsp.png">&nbsp&nbsp&nbsp<span>${data.wind.speed} м/с</span>`;
    document.querySelector('.degree').innerHTML = `<img style="transform: rotate(${data.wind.deg}deg)" src="../img/winddg.png"><span>${data.wind.deg}&deg</span>`;
}
getWeather();
document.querySelector('.city').addEventListener('change', getWeather);


// For change background image on main page
let time = new Date(Date.now()).getHours();
document.body.onload = (function backGroundImageChange() {
    if (time >= 23 && time <= 4) {
        document.body.style.backgroundImage = `url(bg-img/night-bg.png)`;
        document.body.style.color = 'black';
    } else if (time >= 5 && time <= 8) {
        document.body.style.backgroundImage = `url(bg-img/sunrise-bg.png)`;
    } else if (time >= 9 && time <= 11) {
        document.body.style.backgroundImage = `url(bg-img/morning-bg.png)`;
    } else if (time >= 12 && time <= 19) {
        document.body.style.backgroundImage = `url(bg-img/day-bg.png)`;
    } else if (time >= 20 && time <= 22) {
        document.body.style.backgroundImage = `url(bg-img/sunshine-bg.png)`;
    }
})