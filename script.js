// this program with give users a current day and next 5-day weather report from a any city they enter 


//Dates
var startDate = moment().format('M/DD/YYYY');  // Current Date
var day1 = moment().add(1, 'days').format('M/DD/YYYY');
var day2 = moment().add(2, 'days').format('M/DD/YYYY');
var day3 = moment().add(3, 'days').format('M/DD/YYYY');
var day4 = moment().add(4, 'days').format('M/DD/YYYY');
var day5 = moment().add(5, 'days').format('M/DD/YYYY');

var apiKey = "f23221b0ff123cd64590007e8f8ef3f3";

$(document).ready(function () {
    $(".btn").on("click", function () {
        var citySearch = $("#city-input").val(); 
        // console.log(citySearch)
        event.preventDefault();
        var allCities = []; // Array to hold all searched cities
      
        allCities = JSON.parse(localStorage.getItem("allCities")) || []; // Get cities
        allCities.push(citySearch); // pushes new cities entered to array 
        localStorage.setItem("allCities", JSON.stringify(allCities)); //saves city input to local storage 
      

        searchWeather(citySearch)
    });

    function searchWeather(searchTerm) {
        $("#dailyWeather").empty();
        $("#fiveDay").empty();
        $("#day1").empty();
        $("#day2").empty();
        $("#day3").empty();
        $("#day4").empty();
        $("#day5").empty();
        
        $.ajax({
            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}&units=imperial`,
            dataType: "json",
            success: function (res) {
                console.log(res)
                //create html with Jquery
                var card = $("<div>").addClass("card");
                var cardBody = $("<div>").addClass("card-body");
                var cardTitle = $("<h3>").addClass("card-title").text(res.name);
                var temp = Math.round(res.main.temp);
                var tempDisplay = $("<p>").addClass("card-text").text("tempture: " + temp + String.fromCharCode(176))
                var tempDisplay = $("<p>").addClass("card-text").text("tempture: " + temp + String.fromCharCode(176))

                $("#dailyWeather").append(card.append(cardBody.append(cardTitle, tempDisplay)))

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

            for(var i = 1; i < 6; i ++ ) {
                console.log(forecastRes.daily[i])

                //create a card per day
            }
        }
    })
    }


});

//for loop for presisting the data onto index page 
// for (var i = 0; i < localStorage.length; i++){
//     var city = localStorage.getItem(i);



// need AJAX call for current, and 5-day/Uv index 