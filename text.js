var startDate = moment().format('M/DD/YYYY'); 
var day1 = moment().add(1, 'days').format('M/DD/YYYY');
var day2 = moment().add(2, 'days').format('M/DD/YYYY');
var day3 = moment().add(3, 'days').format('M/DD/YYYY');
var day4 = moment().add(4, 'days').format('M/DD/YYYY');
var day5 = moment().add(5, 'days').format('M/DD/YYYY');

let cities = [];
let apiKey = "f23221b0ff123cd64590007e8f8ef3f3";
let lat = "latitude";
let lon = "longitude";
let uvIndex = (lat + lon)

$(document).ready(function () {
    $(".btn").on("click", function () {
        var citySearch = $("#city-input").val(); 
        // console.log(citySearch)
        event.preventDefault();
})

function displayWeatherInfo(city) {
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=imperial`;

    $.get(queryURL).then(function (response) {
        let lon = response.coord.lon;
        let lat = response.coord.lat;
        let queryUV = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        $.get(queryUV)
            .then(function (uvResponse) {
                console.log(uvResponse)
                //===== Data Calculations =======
                let temperature = Math.round(response.main.temp);
                let windSpeed = response.wind.speed;
                let humidity = response.main.humidity;
                // ====== Building HTML Element =====
                let cityDiv = $("<div class='city'>");
                let header = $("<h4>").text(response.name + " " + startDate);
                let pOne = $("<p>").text("Temperature: " + temperature + String.fromCharCode(176) + "F");
                let pTwo = $("<p>").text(`Wind Speed: ${windSpeed}MPH`);
                let pThree = $("<p>").text("Humidity: " + humidity + "%");

                let color = "green";
                let UVindex = uvResponse.value;
                if(UVindex > 10){
                    color = "red";
                }
                else if(UVindex > 4){
                    color = "orange";
                };


                let uvSpan = $("<span>").text(uvResponse.value).css("color", color)
                let pFour = $("<p>").text("UV Index: ").append(uvSpan);
                cityDiv.append(header, pOne, pTwo, pThree, pFour);
        
                // =======Push Element to Page =====
        
                $("#weather-view").empty();
                $("#weather-view").prepend(cityDiv);

                
            })


    })

}

function renderButtons(city) {
    let btn = $("<button>");
    btn.addClass("city-btn btn btn-default").css("display", "block");
    btn.attr("data-name", city);
    btn.text(city);
    $(".cities-array").append(btn);
}

$("#searchBtn").on("click", function (event) {
    event.preventDefault();

    // ====== Declare Variables ======
    let $weather = $("#city-input").val();

    // ===== Update Search History =====
    cities.push($weather);
    localStorage.setItem("weather", JSON.stringify(cities))

    // == Function calls ==
    renderButtons($weather);
    displayWeatherInfo($weather)
});

$(document).on("click", ".city-btn", function () {
    let city = $(this).attr("data-name");
    displayWeatherInfo(city);
});

});