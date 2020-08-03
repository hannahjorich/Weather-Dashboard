// this program with give users a current day and next 5-day weather report from a any city they enter 


//Dates
var startDate = moment().format('M/DD/YYYY'); 
var day1 = moment().add(1, 'days').format('M/DD/YYYY');
var day2 = moment().add(2, 'days').format('M/DD/YYYY');
var day3 = moment().add(3, 'days').format('M/DD/YYYY');
var day4 = moment().add(4, 'days').format('M/DD/YYYY');
var day5 = moment().add(5, 'days').format('M/DD/YYYY');

var apiKey = "f23221b0ff123cd64590007e8f8ef3f3";
var allCities = []; 


$(document).ready(function () {
    $(".btn").on("click", function () {
        let citySearch = $("#city-input").val(); 
        // console.log(citySearch)
        event.preventDefault();
    
        searchWeather(citySearch)
    });

    function searchWeather(searchTerm) {
        
        $.ajax({
            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}&units=imperial`,
            dataType: "json",
            success: function (res) {
                console.log(res)                
                //create html with Jquery
                let temperature = Math.round(res.main.temp);
                let windSpeed = res.wind.speed;
                let humidity = res.main.humidity;
                let cityDiv = $("<div class='city'>");
                var weatherIcon = $("<img>");
                weatherIcon.attr( "src","https://openweathermap.org/img/w/" + res.weather[0].icon + ".png");
                let header = $("<h4>").text(res.name + " " + startDate);
                let pOne = $("<p>").text("Temperature: " + temperature + String.fromCharCode(176) + "F");
                let pTwo = $("<p>").text(`Wind Speed: ${windSpeed}MPH`);
                let pThree = $("<p>").text("Humidity: " + humidity + "%")
                let pFour = $("<p>").text("UV Index: ");
                pFour.attr("class", "uv-container");


                $("#weather-view").empty();
                $("#weather-view").prepend(cityDiv);

                cityDiv.append(header, weatherIcon, pOne, pTwo, pThree, pFour);
                getForecast(res.coord.lat, res.coord.lon);
                // getUVIndex();
            }
        })

    }
    
    function getForecast(lat, lon) {

    $.ajax({
        type: "GET",
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&apiKey=${apiKey}&units=imperial`,
        dataType: "json",
        success: function (forecastRes) {
            console.log(forecastRes)
            let uv = $(".uv-container").text(`UV Index: ${forecastRes.daily[0].uvi}`);

            let uvIndex = forecastRes.daily[0].uvi;
            if (uvIndex <= 2) {
                uv.addClass("green");
               } else if (uvIndex <= 5) {
                 uv.addClass("yellow");
               } else if (uvIndex <= 7) {
                   uv.addClass("orange");
               } else if (uvIndex <= 10) {
                   uv.addClass("red");
               } else if (uvIndex <= 40) {
                   uv.addClass("purple");
               };

            for(var i = 1; i < 6; i ++ ) {
                console.log(forecastRes.daily[i])

                //create a card per day

                $("#day-0").empty();
                $("#day-1").empty();
                $("#day-2").empty();
                $("#day-3").empty();
                $("#day-4").empty();
                
                let weather1 = $("<div class=day1>")
                let date1 = $("<p>").text(day1);
                let temp1 = $("<p>").text("Temperature: " + forecastRes.daily[0].temp.day + String.fromCharCode(176) + "F");
                
                weather1.append(date1, temp1);

                $("#day1").prepend(weather1);


            }
        }
    })
    };



//for loop for presisting the data onto index page 
// for (var i = 0; i < localStorage.length; i++){
//     var city = localStorage.getItem(i);

});

// need AJAX call for current, and 5-day/Uv index 