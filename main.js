var temperatureUnit = 'C';
var currentTempInCelsius;

$(document).ready(function() {

  navigator.geolocation.getCurrentPosition(getWeatherInfo);

  function getWeatherInfo(position) {

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    $.ajax({
      url: 'https://fcc-weather-api.glitch.me/api/current?lat=' + latitude + '&lon=' + longitude,
      success: function(weather) {
        $('#city').text(weather.name + ', ');
        $('#country').text(weather.sys.country);
        currentTempInCelsius = Math.round(weather.main.temp * 10) / 10;
        $('#temperature').html(currentTempInCelsius + ' &deg;');
        $('#temperatureUnit').text(temperatureUnit);
        $('.weatherIcon').html('<img src=' + weather.weather[0].icon + 'alt="Your Local Weather Icon">');
        var sunrise = new Date(weather.sys.sunrise * 1000);
        $('#sunrise').text(sunrise.toTimeString().substring(0,5) + ' am');
        var sunset = new Date(weather.sys.sunset * 1000);
        $('#sunset').text(sunset.toTimeString().substring(0,5) + ' pm');

        console.log(latitude, longitude);
        console.log(weather);
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