var temperatureUnit = 'C';
var currentTempInCelsius;

$(document).ready(function() {

  navigator.geolocation.getCurrentPosition(getWeatherInfo);

  function getWeatherInfo(position) {

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var endpoint = 'https://fcc-weather-api.glitch.me/api/current?lat='
    // Endpoint example - https://fcc-weather-api.glitch.me/api/current?lat=42.35&lon=-71.07
      // paste this in your browser, see the results you get back

    $.ajax({
      url: /* we need to include our endpoint here, as well as our lat / long coordinates */,
      success: function(weather) {
        // 'weather' contains all of the data returned from the API call
          // use this to access all the data needed to show the data on our webpage
        console.log(weather); // check your browser console to view all the data the 'weather' object contains
        $('#city').text(/* city name from weather object*/ */ + ', ');
        $('#country').text(/* country name from weather object */);
        currentTempInCelsius = Math.round(/* temperature from weather object */ * 10) / 10;
        $('#temperature').html(/* temperature from weather object */ + ' &deg;');
        $('#temperatureUnit').text(temperatureUnit);
        $('.weatherIcon').html('<img src=' + /* weather icon value, a little tricky, but search through the object */ + 'alt="Your Local Weather Icon">');
        var sunrise = new Date(/* sunrise time from weather object */ * 1000);
        $('#sunrise').text(sunrise.toTimeString().substring(0,5) + ' am');
        var sunset = new Date(/* sunset time from weather object */ * 1000);
        $('#sunset').text(sunset.toTimeString().substring(0,5) + ' pm');
      }
    });

    $('.tempToggle').on('click', function() {
      var currentTemperatureUnit = $('#temperatureUnit').text();
      var newTemperatureUnit = currentTemperatureUnit === 'C' ? 'F' : 'C';
      $('#temperatureUnit').text(newTemperatureUnit);
      if (newTemperatureUnit === 'F') {
        $('#temperature').html(Math.round(currentTempInCelsius * 1.8 + 32) + ' &deg;');
      } else {
        $('#temperature').html(currentTempInCelsius + ' &deg;');
      }
    });
  }
});