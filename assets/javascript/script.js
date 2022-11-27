/* -- JAVASCRIPT DOCUMENT */

// Defining global variables
var key = 'd1cfc2e23e44e986be5ce47a4beba282'
var searchBtn = document.getElementById('searchBtn')
var clearEl = document.getElementById('clearBtn')
var searchHistoryEl = document.getElementById('searchHistory')
var weatherEl = document.getElementById('current')
var forecastEl = document.getElementById('forecastItems')
var searchAreaEl = document.getElementById('search-area')

// Prints search history
// Currently NOT saved to local storage -- work in progress
function showHistory () {
    var search = document.createElement('button')
    search.setAttribute('class', 'button is-small is-info')
    search.textContent = searchAreaEl.value
    searchHistoryEl.appendChild(search)
}

// defines function for printing Forecasts
function getForecast() {
    
    // establishes date
    var currentDate = new Date
    // logs city name for third party API
    var cityName = searchAreaEl.value

    // sets page to blank so there will be no overlap or compiling text
    weatherEl.innerHTML = []
    // search queries asks for city name (defined) and key (defined)
    var requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=imperial`
    
    fetch(requestURL)
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        // text for primary forecast
        weatherEl.innerHTML = `<h3>${data.name}</h3>

        <p class="divider">· · ──────────────────────── · ·</p>

        <p class="divination"><img class="topweather" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/> Let's see . . . on <strong>${currentDate.toDateString()}</strong>, the temperature in <strong>${data.name}</strong> will be a low of <strong>${data.main.temp_min}°F</strong> with a high of <strong>${data.main.temp_max}°F</strong>. There is a humidity factory of about <strong>${data.main.humidity}%</strong> and wind speeds of about <strong>${data.wind.speed} miles per hour</strong>. It seems the weather can be described as "<strong>${data.weather[0].description}</strong>". All of this considered, the temperature will be approximately <strong>${data.main.feels_like}°F</strong>. This concludes my divination for the current weather.</p>

        <p class="divider">· · ──────────────────────── · ·</p>

        <p class="divination linebreaker">Here is my forecast for the upcoming week:</p>
        `

    })

    // resets forecast page so not to continually compule
    forecastEl.innerHTML = []
    // search queries asks for city name (defined) and key (defined)
    var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}&units=imperial`
    
    fetch(forecastURL)
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        // text for secondary forecast for five days
        for(i = 8; i < data.list.length; i+=8 ) {
            var forecastCard = document.createElement('div')
            forecastCard.innerHTML = `
            <div class="forecastbox divination">
            <img class="bottomweather" src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png"/>
            <p>On <strong>${data.list[i].dt_txt}</strong>, there will be a temperature of <strong>${data.list[i].main.temp}°F</strong> with a humidity of <strong>${data.list[i].main.humidity}%</strong> and wind speeds of <strong>${data.list[i].wind.speed} miles per hour</strong>. The weather can be described as "<strong>${data.list[i].weather[0].description}</strong>."</p>
            </div>
            `
            forecastEl.append(forecastCard)
        }
    })
}

searchBtn.addEventListener('click', getForecast)
searchBtn.addEventListener('click', showHistory)