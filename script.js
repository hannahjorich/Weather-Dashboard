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
            }

                //create a card per day

                $("#day-0").empty();
                $("#day-1").empty();
                $("#day-2").empty();
                $("#day-3").empty();
                $("#day-4").empty();

                // ======DAY 1======
                let weather1 = $("<div class=day1>")
                let date1 = $("<p>").text(day1);
                var weatherIcon1 = $("<img>");
                weatherIcon1.attr( "src","https://openweathermap.org/img/w/" + forecastRes.daily[0].weather[0].icon + ".png");
                let temperature = Math.round(forecastRes.daily[0].temp.day);
                let temp1 = $("<p>").text("Temp: " + temperature + String.fromCharCode(176) + "F");
                let humid1 = $("<p>").text("Humidity: " + forecastRes.daily[0].humidity);
                
                weather1.append(date1, weatherIcon1, temp1, humid1);

                $("#day1").prepend(weather1);

                // ======DAY 2======
                let weather2 = $("<div class=day2>")
                let date2 = $("<p>").text(day2);
                var weatherIcon2 = $("<img>");
                weatherIcon2.attr( "src","https://openweathermap.org/img/w/" + forecastRes.daily[1].weather[0].icon + ".png");
                let temperature2 = Math.round(forecastRes.daily[1].temp.day);
                let temp2 = $("<p>").text("Temp: " + temperature2 + String.fromCharCode(176) + "F");
                let humid2 = $("<p>").text("Humidity: " + forecastRes.daily[1].humidity);
                
                
                weather2.append(date2, weatherIcon2, temp2, humid2);

                $("#day2").prepend(weather2);

                // ======DAY 3======
                let weather3 = $("<div class=day3>")
                let date3 = $("<p>").text(day3);
                var weatherIcon3 = $("<img>");
                weatherIcon3.attr( "src","https://openweathermap.org/img/w/" + forecastRes.daily[2].weather[0].icon + ".png");
                let temperature3 = Math.round(forecastRes.daily[2].temp.day);
                let temp3 = $("<p>").text("Temp: " + temperature3 + String.fromCharCode(176) + "F");
                let humid3 = $("<p>").text("Humidity: " + forecastRes.daily[2].humidity);
                
                
                weather3.append(date3, weatherIcon3, temp3, humid3);

                $("#day3").prepend(weather3);

                 // ======DAY 4======
                let weather4 = $("<div class=day4>")
                let date4 = $("<p>").text(day4);
                var weatherIcon4 = $("<img>");
                weatherIcon4.attr( "src","https://openweathermap.org/img/w/" + forecastRes.daily[3].weather[0].icon + ".png");
                let temperature4 = Math.round(forecastRes.daily[3].temp.day);
                let temp4 = $("<p>").text("Temp: " + temperature4 + String.fromCharCode(176) + "F");
                let humid4 = $("<p>").text("Humidity: " + forecastRes.daily[3].humidity);
                
                weather4.append(date4, weatherIcon4, temp4, humid4);

                $("#day4").prepend(weather4);

                 // ======DAY 5======
                 let weather5 = $("<div class=day5>")
                 let date5 = $("<p>").text(day5);
                 var weatherIcon5 = $("<img>");
                 weatherIcon5.attr( "src","https://openweathermap.org/img/w/" + forecastRes.daily[4].weather[0].icon + ".png");
                 let temperature5 = Math.round(forecastRes.daily[4].temp.day);
                 let temp5 = $("<p>").text("Temp: " + temperature5 + String.fromCharCode(176) + "F");
                 let humid5 = $("<p>").text("Humidity: " + forecastRes.daily[4].humidity);
                 
                 weather5.append(date5, weatherIcon5, temp5, humid5);
 
                 $("#day5").prepend(weather5);

        }
    })
    };

    $(document).on("click", ".city-btn", function () {
        JSON.parse(localStorage.getItem("cities"));
        let citySearch = $(this).text();
        triggerSearch(citySearch);

        renderSearchlist();
    });
    function renderSearchList() {
        let searchList = JSON.parse(localStorage.getItem("cities"));
        $("#search-list").empty();
        if (searchList) {
            for (i = 0; i < searchList.length; i++) {
                let listBtn = $("<button>").addClass("btn btn-secondary city-btn").attr('id', 'cityname_' + (i + 1)).text(searchList[i]);
                let listElem = $("<li>").attr('class', 'list-group-item');
                listElem.append(listBtn);
                $("#search-list").append(listElem);
            }

        }
    }

});