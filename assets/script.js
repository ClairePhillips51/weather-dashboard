let $currentWeather = $("#current-weather");
let $fiveDayForecast = $("#five-day-forecast");
let $searchHistory = $("#history");

let searchHistory = JSON.parse(localStorage.getItem("weather-searchHistory"));
if (searchHistory === null) {
    searchHistory = [];
}
console.log(searchHistory);

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
            if (!searchHistory.includes(cityName)) {
                $searchHistory.children().remove();
                searchHistory.push(cityName);
                localStorage.setItem("weather-searchHistory", JSON.stringify(searchHistory));
                updateSearchHistory();
            }
            //date
            let date = moment().format("M/D/YYYY");
            //icon wx conditions
            let wxIcon = data["weather"][0]["icon"];
            wxIcon = "<img src=\"http://openweathermap.org/img/wn/"+wxIcon+"@2x.png\" alt=\"weather icon\">";
            //temp
            let temperature = data["main"]["temp"];
            //humidity
            let humidity = data["main"]["humidity"];
            //wind speed
            let windSpeed = data["wind"]["speed"];
            //uv index
            let lattitude= data["coord"]["lat"];
            let longitude= data["coord"]["lon"];
            fetch('http://api.openweathermap.org/data/2.5/uvi?lat='+lattitude+'&lon='+longitude+'&appid=06fdaa97c2a606c5e09a175a60f21d34')
            .then(function (response) {
                return response.json();
            })
            .then(function (data){
                console.log(data);
                let uvIndex= data["value"];
                if (uvIndex < 2) {
                    color = "#00a400";
                }else if (uvIndex < 5) {
                    color = "#eeef00";
                }else if (uvIndex < 7){
                    color = "#ff8600";
                }else if (uvIndex < 10) {
                    color = "#d10000";
                }else {
                    color = "#b700a5";
                }

                $currentWeather.append('<div>UV Index: <div style="background-color:'+color+'; display:inline-block;">' + uvIndex + '</div></div>');
            });


            $currentWeather.append('<h2>' + cityName + " " + date + wxIcon + '</h2>');
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
            let chosenTime = [3, 11, 19, 27, 35];
            for(let i=0; i<chosenTime.length; i++) {
                // Date
                let date = data["list"][i]["dt_txt"];
                date = moment(date, "YYYY-MM-DD HH:mm:ss").format("M/D/YYYY");
                //icon wx conditions
                let wxIcon = data["list"][i]["weather"][0]["icon"];
                wxIcon = "<img src=\"http://openweathermap.org/img/wn/"+wxIcon+".png\" alt=\"weather icon\">";
                //temp
                let temperature = data["list"][i]["main"]["temp"];
                //humidity
                let humidity = data["list"][i]["main"]["humidity"];
                $column = $('<div class="col"></div>');
                $column.append('<h5>'+date+'</h5>');
                $column.append('<p>'+wxIcon+'</p>');
                $column.append('<p>Temp: '+temperature+' &#8457</p>');
                $column.append('<p>Humidity: '+humidity+' %</p>');

                $fiveDayForecast.append($column);
            }
        });

    return;
}

function updateSearchHistory() {
    for (let i= 0; i< searchHistory.length; i++) {
        cityName = searchHistory[i];
        $searchHistory.append('<button onClick="historyBtn(\''+cityName+'\')">'+ cityName +'</button>');
    }

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

function historyBtn(cityName) {
    currentWeather(cityName);
    fiveForecast(cityName);

    return;
}

updateSearchHistory();

let $searchBtn = $("#search-btn");
$searchBtn.on("click", search);