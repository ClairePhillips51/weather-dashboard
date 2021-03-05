let $currentWeather = $("#current-weather");
let $fiveDayForecast = $("#five-day-forecast");
let $searchHistory = $("#history");

function currentWeather(cityName){
    $currentWeather.children().remove();

    fetch("http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&APPID=06fdaa97c2a606c5e09a175a60f21d34&units=imperial")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            //city name
            let cityName = data["name"];
            //date
            let date = moment().format("M/D/YYYY");
            //icon wx conditions
            let wxIcon = data["weather"][0]["icon"];
            //temp
            let temperature = data["main"]["temp"];
            //humidity
            let humidity = data["main"]["humidity"];
            //wind speed
            let windSpeed = data["wind"]["speed"];
            //uv index

            $currentWeather.append('<h4>' + cityName + " " + date + " " + wxIcon + '</h4>');
            $currentWeather.append('<p>Temperature: ' + temperature + ' &#8457</p>');
            $currentWeather.append('<p>Humidity: ' + humidity + ' %</p>');
            $currentWeather.append('<p>Wind Speed: ' + windSpeed + ' MPH</p>');
        });

    return;
}

function fiveForecast(cityName){
    $fiveDayForecast.children().remove();
    fetch("http://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&APPID=06fdaa97c2a606c5e09a175a60f21d34&units=imperial")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            $("#five-day-header").show();
            let chosenTime = [5, 13, 21, 29, 37];
            for(let i=0; i<chosenTime.length; i++) {
                // Date

                //icon wx conditions
                let wxIcon = data["list"][i]["weather"][0]["icon"];
                //temp
                let temperature = data["list"][i]["main"]["temp"];
                //humidity
                let humidity = data["list"][i]["main"]["humidity"];
                $column = $('<div class="col"></div>');
                $column.append('<h1>'+''+'</h1>');
                $column.append('<p>'+wxIcon+'</p>');
                $column.append('<p>Temp: '+temperature+' &#8457</p>');
                $column.append('<p>Humidity: '+humidity+' %</p>');

                $fiveDayForecast.append($column);
            }
        });

    return;
}

// Clicking this function, will begin a search for the text inside the search bar
function search(){
    console.log("started search");
    // Grab the search bar html object (JQuery?)
    let $searchBar = $("#search-input");
    console.log($searchBar);
    // Grab the inner text from that object (JQuery -> val()) and put it in a variable
    let cityName = $searchBar.val();
    console.log(cityName);
    // pass this variable to two functions, one that fetches current weather and one that fetches 5 day forecast
    currentWeather(cityName);
    fiveForecast(cityName);

    return;
}

let $searchBtn = $("#search-btn");
$searchBtn.on("click", search);