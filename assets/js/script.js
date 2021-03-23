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
            // console.log(data);
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



        });

}

function getUVIndex(lat, lon) {
    var lon = document.getElementById('uv-value').value;
    var lat = document.getElementById('uv-value').value;
    var queryURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${APIKey}&lat=${lat}&lon=${lon}`
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var UVIndex = document.createElement('span');
            UVIndex.textContent = "UV Index: " + data.coord.UVIndex;
            UVIdex.classList = "list-group"

            weatherContainer.appendChild(UVIndex);

        })
}

searchButton.addEventListener('click', getApi);