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
      let unixTSDay1 = response.daily[1].dt;
      let day1Milli = unixTSDay1 * 1000;
      let day1DateObj = new Date(day1Milli);
      let hmnDay1 = day1DateObj.toDateString();
      let day1Temp = response.daily[1].temp.day;
      let day1TempToF = (day1Temp - 273.15) * 1.80 + 32;
      let day1Humidity = response.daily[1].humidity;
      console.log(day1Humidity)
      
      //let unixTSDay2 = response.daily[2].dt;
      //let day2Milli = unixTSDay2 * 1000;
      //let day2DateObj = new Date(day2Milli);
     // let hmnDay2 = day2DateObj.toDateString();
     // let day2Temp = response.daily[2].temp;

      //let unixTSDay3 = response.daily[3].dt;
      //let day3Milli = unixTSDay3 * 1000;
      //let day3DateObj = new Date(day3Milli);
      //let hmnDay3 = day3DateObj.toDateString();
      //let day3Temp = response.daily[3].temp;

      //let unixTSDay4 = response.daily[4].dt;
      //let day4Milli = unixTSDay4 * 1000;
      //let day4DateObj = new Date(day4Milli);
      //let hmnDay4 = day4DateObj.toDateString();
      //let day4Temp = response.daily[4].temp;

      //let unixTSDay5 = response.daily[5].dt;
      //let day5Milli = unixTSDay5 * 1000;
      //let day5DateObj = new Date(day5Milli);
      //let hmnDay5 = day5DateObj.toDateString();
      //let day5Temp = response.daily[5].temp;
      
      $("#dayOne").text("Date: " + hmnDay1 + " Temp: " + day1TempToF.toFixed(0) + " Humidity: " + day1Humidity);
      //$("#dayTwo").text(hmnDay2 + );
      //$("#dayThree").text(hmnDay3 + );
      //$("#dayFour").text(hmnDay4 + ); 
      //$("#dayFive").text(hmnDay5 + );
                
//DO NOT CHANGE BRACKETS BELOW!!!!      
                })  
            })
        })        
    }
})