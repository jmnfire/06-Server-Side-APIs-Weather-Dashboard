var weatherContainer = document.getElementById('weather');
var historyContainer = document.getElementById('history')
var searchButton = document.getElementById('search-button');
var APIkey = '5da23cce4a85954e3d9fd6f2552f4e93';


function getApi() {
    var searchValue = document.getElementById('search-value').value;
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${APIkey}&units=imperial`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var currentDate = document.createElement("span")
            currentDate.textContent=" (" + moment(weather.dt).format("MMM D, YYYY") + ") ";
            weatherContainer.appendChild(currentDate);

            var temp = document.createElement('span');
            temp.textContent = "Temperature: " + data.main.temp + " F";
            temp.classList = "list-group"
            var cityNameEL = document.createElement('h3');
            cityNameEL.textContent = data.name;
            var humidity = document.createElement('span');
            humidity.textContent = "Humidity: " + data.main.humidity + " %";
            humidity.classList = "list-group"
            var windSpeed = document.createElement('span');
            windSpeed.textContent = "Wind Speed: " + data.wind.speed + " MPH";
            windSpeed.classList = "list-group"

            var lon = data.coord.lon;
            var lat = data.coord.lat;
            getUVIndex(lat, lon)

            weatherContainer.append(cityNameEL, temp, humidity, windSpeed);
            clearInterval(cityNameEL.name);
            localStorage.setItem('cityHistory', data.name);

            var searchNameEl = document.createElement('h2');
            searchNameEl.textContent = data.name;
            historyContainer.append(searchNameEl);
            localStorage.setItem('cityHistory', data.name);
    
            var weatherIcon = document.createElement("img")
            weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            cityNameEL.appendChild(weatherIcon);

        });

}

function getUVIndex(lat, lon) {
    var queryURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${APIkey}&lat=${lat}&lon=${lon}`
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var UVIndex = document.createElement('span');
            UVIndex.textContent = "UV Index: " + data.value;
            console.log(data.value)
            UVIndex.classList = "list-group"

            weatherContainer.appendChild(UVIndex);

        })
}

searchButton.addEventListener('click', getApi);