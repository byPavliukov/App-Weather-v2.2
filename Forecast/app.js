const param = {
    site: 'https://api.openweathermap.org/data/2.5/',
    appid: 'appid=73d8ec7c9516e366072f0518946547d0'
}

function getForecast() {
    let cityID = document.getElementById('city');
    fetch(`${param.site}forecast?lang=ru&id=${cityID.value}&${param.appid}`)
        .then(forecast => {
            return forecast.json()
        }).then(showForecast);
}

function showForecast(data) {
    let description = `<img src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png">${data.list[0].weather[0].description.slice(0, 1).toUpperCase()}${data.list[0].weather[0].description.slice(1).toLowerCase()}`;
    let currTemp,feelsLike;

    //Date on main page and time of a sunrise and a sunshine
    let sunrise = data.city.sunrise * 1000;
    let sunset = data.city.sunset * 1000;

    for (let i = 0; i < 5; i++) {
        currTemp = Math.floor(data.list[i*8].main.temp - 273.15);
        if (currTemp > 0) 
            currTemp = `+${currTemp}`;
        feelsLike = Math.floor(data.list[i*8].main.feels_like - 283.15);
        if (feelsLike > 0) 
            feelsLike = `+${feelsLike}`;
        let UTCForecastDate = data.list[i*8].dt * 1000;
        let forecastDate = new Date(UTCForecastDate).toLocaleDateString();

        // Get data in block with time forecast
        document.querySelector('.temp-'+(i+1)).innerHTML = `${currTemp}&deg;`;
        document.querySelector('.time-date-'+(i+1)).innerHTML = forecastDate;
        document.querySelector('.icon-weather-'+(i+1)).innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[i*8].weather[0].icon}@2x.png">`;
        document.querySelector('.description-'+(i+1)).innerHTML = `<br>${data.list[i*8].weather[0].description.slice(0, 1).toUpperCase()}${data.list[i*8].weather[0].description.slice(1).toLowerCase()}`;
    }

    // Main block information
    document.querySelector('.name-of-city').innerHTML = `${data.city.name}, ${data.city.country}`;
    document.querySelector('.sunrise').innerHTML = `<img src="../img/sunrise.png" height="55px">${new Date(sunrise).toLocaleTimeString().slice(0, 5)}`;
    document.querySelector('.curr-temp').innerHTML = document.querySelector('.temp-1').textContent;
    document.querySelector('.sunset').innerHTML = `<img src="../img/sunset.png" height="55px">${new Date(sunset).toLocaleTimeString().slice(0, 5)}`;
    document.querySelector('.feels-like').innerHTML = `<img src="../img/feelslike.png" height="55px"> Чувствуется <br>${feelsLike}`;
    document.querySelector('.pressure').innerHTML = `<img src="../img/pressure.png" height="55px">Давление <br> ${data.list[0].main.pressure} mPa`;
    document.querySelector('.humidity').innerHTML = `<img src="../img/humidity.png" height="55px">Вероятность осадков<br> ${data.list[0].main.humidity}%`;
    document.querySelector('.description').innerHTML = description;
    document.querySelector('.wind-speed').innerHTML = `<img src="../img/windsp.png">&nbsp&nbsp${data.list[0].wind.speed} м/с`;
    document.querySelector('.wind-degree').innerHTML = `<img style="transform: rotate(${data.list[0].wind.deg}deg)" src="../img/winddg.png">&nbsp&nbsp${data.list[0].wind.deg}&deg;`;

    // Get data by click on block with time forecast, and add this in main block of information
    let blocks = document.querySelectorAll('.block');
    for (let i = 1; i < 6; i++) {
        blocks[i-1].addEventListener('click', function () {
            description = `<img src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png">${data.list[0].weather[0].description.slice(0, 1).toUpperCase()}${data.list[0].weather[0].description.slice(1).toLowerCase()}`;
            document.querySelector('.curr-temp').innerHTML = document.querySelector('.temp-'+i).textContent;
            document.querySelector('.sunrise').innerHTML = `<img src="../img/sunrise.png" height="55px">${new Date(sunrise).toLocaleTimeString().slice(0, 5)}`;
            document.querySelector('.sunset').innerHTML = `<img src="../img/sunset.png" height="55px">${new Date(sunset).toLocaleTimeString().slice(0, 5)}`;
            if (i == 1) {
                description = `<img src="http://openweathermap.org/img/wn/${data.list[i-1].weather[0].icon}@2x.png">${data.list[i-1].weather[0].description.slice(0, 1).toUpperCase()}${data.list[i-1].weather[0].description.slice(1).toLowerCase()}`;
                document.querySelector('.pressure').innerHTML = `<img src="../img/pressure.png" height="55px">Давление <br> ${data.list[i-1].main.pressure} mPa`;
                document.querySelector('.humidity').innerHTML = `<img src="../img/humidity.png" height="55px">Вероятность осадков<br> ${data.list[i-1].main.humidity}%`;
                document.querySelector('.description').innerHTML = description;
                document.querySelector('.wind-speed').innerHTML = `<img src="../img/windsp.png">&nbsp&nbsp${data.list[i-1].wind.speed} м/с`;
                document.querySelector('.wind-degree').innerHTML = `<img style="transform: rotate(${data.list[i-1].wind.deg}deg)" src="../img/winddg.png">&nbsp&nbsp${data.list[i-1].wind.deg}&deg;`;
                // If the temperature is greater than zero, then plus is concatenated
                if (Math.floor(data.list[i-1].main.feels_like - 273.15) > 0) {
                    document.querySelector('.feels-like').innerHTML = `<img src="../img/feelslike.png" height="55px"> Чувствуется <br>+${Math.floor(data.list[i-1].main.feels_like - 273.15)}`;
                } else {
                    document.querySelector('.feels-like').innerHTML = `<img src="../img/feelslike.png" height="55px"> Чувствуется <br>${Math.floor(data.list[i-1].main.feels_like - 273.15)}`;
                }
            } else if (i == 2) {
                description = `<img src="http://openweathermap.org/img/wn/${data.list[i+6].weather[0].icon}@2x.png">${data.list[i+6].weather[0].description.slice(0, 1).toUpperCase()}${data.list[i+6].weather[0].description.slice(1).toLowerCase()}`;
                document.querySelector('.pressure').innerHTML = `<img src="../img/pressure.png" height="55px">Давление <br> ${data.list[i+6].main.pressure} mPa`;
                document.querySelector('.humidity').innerHTML = `<img src="../img/humidity.png" height="55px">Вероятность осадков<br> ${data.list[i+6].main.humidity}%`;
                document.querySelector('.description').innerHTML = description;
                document.querySelector('.wind-speed').innerHTML = `<img src="../img/windsp.png">&nbsp&nbsp${data.list[i+6].wind.speed} м/с`;
                document.querySelector('.wind-degree').innerHTML = `<img style="transform: rotate(${data.list[i+6].wind.deg}deg)" src="../img/winddg.png">&nbsp&nbsp${data.list[i+6].wind.deg}&deg;`;
                // If the temperature is greater than zero, then plus is concatenated
                if (Math.floor(data.list[i+6].main.feels_like - 273.15) > 0) {
                    document.querySelector('.feels-like').innerHTML = `<img src="../img/feelslike.png" height="55px"> Чувствуется <br>+${Math.floor(data.list[i+6].main.feels_like - 273.15)}`;
                } else {
                    document.querySelector('.feels-like').innerHTML = `<img src="../img/feelslike.png" height="55px"> Чувствуется <br>${Math.floor(data.list[i+6].main.feels_like - 273.15)}`;
                }
            } else if (i == 3) {
                description = `<img src="http://openweathermap.org/img/wn/${data.list[i+13].weather[0].icon}@2x.png">${data.list[i+13].weather[0].description.slice(0, 1).toUpperCase()}${data.list[i+13].weather[0].description.slice(1).toLowerCase()}`;
                document.querySelector('.pressure').innerHTML = `<img src="../img/pressure.png" height="55px">Давление <br> ${data.list[i+13].main.pressure} mPa`;
                document.querySelector('.humidity').innerHTML = `<img src="../img/humidity.png" height="55px">Вероятность осадков<br> ${data.list[i+13].main.humidity}%`;
                document.querySelector('.description').innerHTML = description;
                document.querySelector('.wind-speed').innerHTML = `<img src="../img/windsp.png">&nbsp&nbsp${data.list[i+13].wind.speed} м/с`;
                document.querySelector('.wind-degree').innerHTML = `<img style="transform: rotate(${data.list[i+13].wind.deg}deg)" src="../img/winddg.png">&nbsp&nbsp${data.list[i+13].wind.deg}&deg;`;
                // If the temperature is greater than zero, then plus is concatenated
                if (Math.floor(data.list[i+13].main.feels_like - 273.15) > 0) {
                    document.querySelector('.feels-like').innerHTML = `<img src="../img/feelslike.png" height="55px"> Чувствуется <br>+${Math.floor(data.list[i+13].main.feels_like - 273.15)}`;
                } else {
                    document.querySelector('.feels-like').innerHTML = `<img src="../img/feelslike.png" height="55px"> Чувствуется <br>${Math.floor(data.list[i+13].main.feels_like - 273.15)}`;
                }
            } else if (i == 4) {
                description = `<img src="http://openweathermap.org/img/wn/${data.list[i+20].weather[0].icon}@2x.png">${data.list[i+20].weather[0].description.slice(0, 1).toUpperCase()}${data.list[i+20].weather[0].description.slice(1).toLowerCase()}`;
                document.querySelector('.pressure').innerHTML = `<img src="../img/pressure.png" height="55px">Давление <br> ${data.list[i+20].main.pressure} mPa`;
                document.querySelector('.humidity').innerHTML = `<img src="../img/humidity.png" height="55px">Вероятность осадков<br> ${data.list[i+20].main.humidity}%`;
                document.querySelector('.description').innerHTML = description;
                document.querySelector('.wind-speed').innerHTML = `<img src="../img/windsp.png">&nbsp&nbsp${data.list[i+20].wind.speed} м/с`;
                document.querySelector('.wind-degree').innerHTML = `<img style="transform: rotate(${data.list[i+20].wind.deg}deg)" src="../img/winddg.png">&nbsp&nbsp${data.list[i+20].wind.deg}&deg;`;
                // If the temperature is greater than zero, then plus is concatenated
                if (Math.floor(data.list[i+20].main.feels_like - 273.15) > 0) {
                    document.querySelector('.feels-like').innerHTML = `<img src="../img/feelslike.png" height="55px"> Чувствуется <br>+${Math.floor(data.list[i+20].main.feels_like - 273.15)}`;
                } else {
                    document.querySelector('.feels-like').innerHTML = `<img src="../img/feelslike.png" height="55px"> Чувствуется <br>${Math.floor(data.list[i+20].main.feels_like - 273.15)}`;
                }
            } else if (i == 5) {
                description = `<img src="http://openweathermap.org/img/wn/${data.list[i+27].weather[0].icon}@2x.png">${data.list[i+27].weather[0].description.slice(0, 1).toUpperCase()}${data.list[i+27].weather[0].description.slice(1).toLowerCase()}`;
                document.querySelector('.pressure').innerHTML = `<img src="../img/pressure.png" height="55px">Давление <br> ${data.list[i+27].main.pressure} mPa`;
                document.querySelector('.humidity').innerHTML = `<img src="../img/humidity.png" height="55px">Вероятность осадков<br> ${data.list[i+27].main.humidity}%`;
                document.querySelector('.description').innerHTML = description;
                document.querySelector('.wind-speed').innerHTML = `<img src="../img/windsp.png">&nbsp&nbsp${data.list[i+27].wind.speed} м/с`;
                document.querySelector('.wind-degree').innerHTML = `<img style="transform: rotate(${data.list[i+27].wind.deg}deg)" src="../img/winddg.png">&nbsp&nbsp${data.list[i+27].wind.deg}&deg;`;
                // If the temperature is greater than zero, then plus is concatenated
                if (Math.floor(data.list[i+27].main.feels_like - 273.15) > 0) {
                    document.querySelector('.feels-like').innerHTML = `<img src="../img/feelslike.png" height="55px"> Чувствуется <br>+${Math.floor(data.list[i+27].main.feels_like - 273.15)}`;
                } else {
                    document.querySelector('.feels-like').innerHTML = `<img src="../img/feelslike.png" height="55px"> Чувствуется <br>${Math.floor(data.list[i+27].main.feels_like - 273.15)}`;
                }
            }
        })
    }
}
getForecast();
document.querySelector('.city').addEventListener('change', getForecast);

let time = new Date(Date.now()).getHours();
console.log(time);
document.body.onload = (function backGroundImageChange() {
    if (time >= 23 && time <= 4) {
        document.body.style.backgroundImage = `url(../Current/bg-img/night-bg.png)`;
        document.body.style.color = 'black';
    } else if (time >= 5 && time <= 8) {
        document.body.style.backgroundImage = `url(../Current/bg-img/sunrise-bg.png)`;
    } else if (time >= 9 && time <= 11) {
        document.body.style.backgroundImage = `url(../Current/bg-img/morning-bg.png)`;
    } else if (time >= 12 && time <= 19) {
        document.body.style.backgroundImage = `url(../Current/bg-img/day-bg.png)`;
    } else if (time >= 20 && time <= 22) {
        document.body.style.backgroundImage = `url(../Current/bg-img/sunshine-bg.png)`;
    }
})
