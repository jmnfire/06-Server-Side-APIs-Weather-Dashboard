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
        var temp = document.createElement('span');
            temp.textContent = "Temperature: " + data.main.temp + " F";
            temp.classList = "list-group-item"
        var cityNameEL = document.createElement('h3');
            cityNameEL.textContent = data.name;
        var humidity = document.createElement('span');
            humidity.textContent = "Humidity: " + data.main.humidity + " %";
            humidity.classList = "list-group-item"
        var windSpeed = document.createElement('span');
            windSpeed.textContent = "Wind Speed: " + data.wind.speed + " MPH";
            windSpeed.classList = "list-group-item"
        
            weatherContainer.append(cityNameEL, temp, humidity, windSpeed);
            clearInterval(cityNameEL.name);
            localStorage.setItem('cityHistory', data.name);
        
    });

}


searchButton.addEventListener('click', getApi);

