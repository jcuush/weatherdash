
var apiKey = "8c2e95818c2adf53f3a3c8bd87b93476";
   
function getWeather(city) {

    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid=" + apiKey;
    
    $.ajax({
    url:weatherURL,
    method:"GET"
    }).then(function(response) {
        var temperature = ((response.main.temp - 273.15) * 1.80 + 32).toFixed(2)
        console.log(response);
        $("#city-name").text("City: "+response.name);
        $("#temperature").text("Temperature: " +temperature + " degrees Fahrenheit");
        $("#humidity").text("Humidity: " + response.main.humidity)
        $("#wind-speed").text("Wind Speed: " + response.wind.speed + " mph")
        // $("#UV-index").text(response.)

        var lat = response.coord.lat;
        var lon = response.coord.lon;

        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" +apiKey;

        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function(uvResponse) {
            var uv = uvResponse.value;
            console.log(uv);
            $("#UV-index").html(
                "<b>UV Index: </b>" + "<span class = 'badge badge-pill badge-light' id='uv-badge'>" + uv + "</span>"
            );
            if (uv < 3) {
                $('#uv-badge').css('background-color', 'green');
              } else if (uv < 6) {
                $('#uv-badge').css('background-color', 'yellow');
              } else if (uv < 8) {
                $('#uv-badge').css('background-color', 'orange');
              } else if (uv < 11) {
                $('#uv-badge').css('background-color', 'red');
              } else {
                $('#uv-badge').css('background-color', 'purple');
              }
             
        });

        var countryCode = response.sys.country;
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" +city + "," + countryCode + "&appid=" +apiKey;

        $.ajax()

    })


}




    

$("#search-button").on("click", function() {
    var city = $("#city-input").val();
    console.log(city);
    $(".input-group-append").text(city);
    getWeather(city);
    })



