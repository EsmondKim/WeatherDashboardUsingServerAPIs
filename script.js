$(document).ready(function() {
    console.log(moment().format());
    console.log(moment().hours());

    function getFromLocalStorage() {
        let lastSearched = JSON.parse(window.localStorage.getItem("citySearched"));
        $(':input').removeAttr('placeholder');
        $("#searchText").val(lastSearched);
    }
    getFromLocalStorage()

    $("#btn").on("click", getWeather)

    $(document).keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            getWeather();
        }
    });

    function getWeather() {
    let queryCity = $("#searchText").val(); 
    let queryURLCurrentWthr = "https://api.openweathermap.org/data/2.5/weather?q=" + queryCity + "&appid=87665d60f93b269a6c1aa2b881ea7347";
    window.localStorage.setItem("citySearched", JSON.stringify($("#searchText").val()))
    $("#citiesList").append('<li class="list-group-item">' + queryCity + "</li>")

    $.ajax({
        url: queryURLCurrentWthr,
        method: "GET"
      }).then(function(response) {
      console.log(response); 
   
      let tempF = (response.main.temp - 273.15) * 1.80 + 32;
      let humidity = response.main.humidity;
      let wind = response.wind.speed;
      $("#cityName").text("Currently: " + response.name);
      $("#cityTime").text(moment().format("MMM Do YY"));
      $("#cityTemp").text(tempF.toFixed(0) + " degrees Farenheit");
      $("#cityHumidity").text("Humidity: " + humidity); 
      $("#cityWind").text("Wind Speed: " + wind);
   
      let uvLat = response.coord.lat;
      let uvLon = response.coord.lon;
      console.log(uvLat);
      console.log(uvLon);
      let queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + uvLat + "&lon=" + uvLon + "&appid=87665d60f93b269a6c1aa2b881ea7347";
     
      $.ajax({
        url: queryURLUV,
        method: "GET"
      }).then(function(response) {
      console.log(response); 
      
      if (response.value < 5) {
        //favorable
        $("#uvIndicator").text("Favorable UV");
        $("#uvIndicator").css("background-color", "green")
      }
      if (response.value > 5 && response.value < 8) {
        //moderate
        $("#uvIndicator").text("Moderate UV");
        $("#uvIndicator").css("background-color", "yellow")
      }

      if (response.value > 8 && response.value < 10) {
        //severe
        $("#uvIndicator").text("Severe UV");
        $("#uvIndicator").css("background-color", "red")
      }

      let queryURLDaily = "https://api.openweathermap.org/data/2.5/onecall?lat=" + uvLat + "&lon=" + uvLon + "&exclude=current,minutely,hourly,alerts&appid=87665d60f93b269a6c1aa2b881ea7347";
     
      $.ajax({
        url: queryURLDaily,
        method: "GET"
      }).then(function(response) {
      console.log(response); 
      let tempF = (response.main.temp - 273.15) * 1.80 + 32;
      let humidity = response.main.humidity;
      let wind = response.wind.speed;
      $("#dayOne").text( );
      $("#dayTwo").text( );
      $("#dayThree").text( );
      $("#dayFour").text( ); 
      $("#dayFive").text( );
 //displays the date, 
//an icon representation of weather conditions, the temperature, and the humidity
        })


            })
        })  
    }

})