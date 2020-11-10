$(document).ready(function() {
  //moment.js time info 
    console.log(moment().format());
    console.log(moment().hours());
    //retrieving the last searched city from local storage
    function getFromLocalStorage() {
        let lastSearched = JSON.parse(window.localStorage.getItem("citySearched"));
        $(':input').removeAttr('placeholder');
        $("#searchText").val(lastSearched);
    }
    getFromLocalStorage()
    //click listener for the getWeather function
    $("#btn").on("click", getWeather)
    //enter key listener
    $(document).keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            getWeather();
        }
    });
    //the function that gets the weather
    function getWeather() {
    let queryCity = $("#searchText").val(); 
    let queryURLCurrentWthr = "https://api.openweathermap.org/data/2.5/weather?q=" + queryCity + "&appid=87665d60f93b269a6c1aa2b881ea7347";
    window.localStorage.setItem("citySearched", JSON.stringify($("#searchText").val()))
    $("#citiesList").append('<li style="text-align: center;" class="list-group-item">' + queryCity + "</li>")
    //Ajax for current conditions
    $.ajax({
        url: queryURLCurrentWthr,
        method: "GET"
      }).then(function(response) {
      console.log(response); 
      //rendering the current conditions
      let tempF = (response.main.temp - 273.15) * 1.80 + 32;
      let humidity = response.main.humidity;
      let wind = response.wind.speed;
      $("#cityName").text("Currently: " + response.name);
      $("#cityTime").text(moment().format("MMM Do YY"));
      $("#cityTemp").text(tempF.toFixed(0) + " degrees Farenheit");
      $("#cityHumidity").text("Humidity: " + humidity); 
      $("#cityWind").text("Wind Speed: " + wind);
      //variables and if statements to render weather icons for current conditions
      let nightAndDay = moment().hours()
      let cloudiness = response.clouds.all;
      if (cloudiness < 50 && nightAndDay < 17) {
        $("#cityIcons").addClass("far fa-sun");
        $("#cityIcons").text("");
      }
      if (cloudiness > 50 && nightAndDay < 17) {
        $("#cityIcons").addClass("fas fa-cloud");
        $("#cityIcons").text("");
      }
      if (cloudiness < 50 && nightAndDay > 17) {
        $("#cityIcons").addClass("far fa-moon");
        $("#cityIcons").text("");
      }
      if (cloudiness > 50 && nightAndDay > 17) {
        $("#cityIcons").addClass("fas fa-cloud-moon");
        $("#cityIcons").text("");
      }

      let windy = response.wind.speed;
      if (windy > 10) {
        $("#cityIcons").addClass("fas fa-wind");
      }
      
      //setting up the ajax for UV indicator
      let uvLat = response.coord.lat;
      let uvLon = response.coord.lon;
      console.log(uvLat);
      console.log(uvLon);
      let queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + uvLat + "&lon=" + uvLon + "&appid=87665d60f93b269a6c1aa2b881ea7347";
      
      //ajax for UV conditions
      $.ajax({
        url: queryURLUV,
        method: "GET"
      }).then(function(response) {
      console.log(response); 
      //code for the color coding of UV conditions
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
    
      //setting query for five day forecast
      let queryURLDaily = "https://api.openweathermap.org/data/2.5/onecall?lat=" + uvLat + "&lon=" + uvLon + "&exclude=current,minutely,hourly,alerts&appid=87665d60f93b269a6c1aa2b881ea7347";
      //ajax for the five day forecast and getting the UNIX timestamp to display human readable date
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
      
      let unixTSDay2 = response.daily[2].dt;
      let day2Milli = unixTSDay2 * 1000;
      let day2DateObj = new Date(day2Milli);
      let hmnDay2 = day2DateObj.toDateString();
      let day2Temp = response.daily[2].temp.day;
      let day2TempToF = (day2Temp - 273.15) * 1.80 + 32;
      let day2Humidity = response.daily[2].humidity;

      let unixTSDay3 = response.daily[3].dt;
      let day3Milli = unixTSDay3 * 1000;
      let day3DateObj = new Date(day3Milli);
      let hmnDay3 = day3DateObj.toDateString();
      let day3Temp = response.daily[3].temp.day;
      let day3TempToF = (day3Temp - 273.15) * 1.80 + 32;
      let day3Humidity = response.daily[3].humidity;

      let unixTSDay4 = response.daily[4].dt;
      let day4Milli = unixTSDay4 * 1000;
      let day4DateObj = new Date(day4Milli);
      let hmnDay4 = day4DateObj.toDateString();
      let day4Temp = response.daily[4].temp.day
      let day4TempToF = (day4Temp - 273.15) * 1.80 + 32;
      let day4Humidity = response.daily[4].humidity;

      let unixTSDay5 = response.daily[5].dt;
      let day5Milli = unixTSDay5 * 1000;
      let day5DateObj = new Date(day5Milli);
      let hmnDay5 = day5DateObj.toDateString();
      let day5Temp = response.daily[5].temp.day;
      let day5TempToF = (day5Temp - 273.15) * 1.80 + 32;
      let day5Humidity = response.daily[5].humidity;
      //rendering the five day forecast
      $("#dayOne").text("DATE: " + hmnDay1 + ";" + " TEMP: " + day1TempToF.toFixed(0) + ";" +" HUMIDITY: " + day1Humidity);
      $("#dayTwo").text("DATE: " + hmnDay2 + ";" + " TEMP: " + day2TempToF.toFixed(0) + ";" +" HUMIDITY: " + day2Humidity);
      $("#dayThree").text("DATE: " + hmnDay3 + ";" + " TEMP: " + day3TempToF.toFixed(0) + ";" +" HUMIDITY: " + day3Humidity);
      $("#dayFour").text("DATE: " + hmnDay4 + ";" + " TEMP: " + day4TempToF.toFixed(0) + ";" +" HUMIDITY: " + day4Humidity); 
      $("#dayFive").text("DATE: " + hmnDay5 + ";" + " TEMP: " + day5TempToF.toFixed(0) + ";" +" HUMIDITY: " + day5Humidity);
                
      //variables and if statements to render icons for the five day forecast
      let dayOneClouds = response.daily[1].clouds;
      if (dayOneClouds < 50) {
        $("#dayOne").addClass("far fa-sun");
      }
      if (dayOneClouds > 50) {
        $("#dayOne").addClass("fas fa-cloud");
      }
      let dayOneTemp = response.daily[1].feels_like.day;        
      let dayOneTempF = (dayOneTemp - 273.15) * 1.80 + 32;
      if (dayOneTempF < 30) {
        $("#dayOne").addClass("fas fa-temperature-low");
      }
      if (dayOneTempF > 80) {
        $("#dayOne").addClass("fas fa-temperature-high");
      }
    
      let dayTwoClouds = response.daily[2].clouds;
      if (dayTwoClouds < 50) {
        $("#dayTwo").addClass("far fa-sun");
      }
      if (dayTwoClouds > 50) {
        $("#dayTwo").addClass("fas fa-cloud");
      }
      let dayTwoTemp = response.daily[2].feels_like.day;        
      let dayTwoTempF = (dayTwoTemp - 273.15) * 1.80 + 32;
      if (dayTwoTempF < 30) {
        $("#dayTwo").addClass("fas fa-temperature-low");
      }
      if (dayTwoTempF > 80) {
        $("#dayTwo").addClass("fas fa-temperature-high");
      }
     
      let dayThreeClouds = response.daily[3].clouds;
      if (dayThreeClouds < 50) {
        $("#dayThree").addClass("far fa-sun");
      }
      if (dayThreeClouds > 50) {
        $("#dayThree").addClass("fas fa-cloud");
      }
      let dayThreeTemp = response.daily[1].feels_like.day;        
      let dayThreeTempF = (dayThreeTemp - 273.15) * 1.80 + 32;
      if (dayThreeTempF < 30) {
        $("#dayThree").addClass("fas fa-temperature-low");
      }
      if (dayThreeTempF > 80) {
        $("#dayThree").addClass("fas fa-temperature-high");
      }
     
      let dayFourClouds = response.daily[4].clouds;
      if (dayFourClouds < 50) {
        $("#dayFour").addClass("far fa-sun");
      }
      if (dayFourClouds > 50) {
        $("#dayFour").addClass("fas fa-cloud");
      }
      let dayFourTemp = response.daily[4].feels_like.day;        
      let dayFourTempF = (dayFourTemp - 273.15) * 1.80 + 32;
      if (dayFourTempF < 30) {
        $("#dayFour").addClass("fas fa-temperature-low");
      }
      if (dayFourTempF > 80) {
        $("#dayFour").addClass("fas fa-temperature-high");
      }
     
      let dayFiveClouds = response.daily[5].clouds;
      if (dayFiveClouds < 50) {
        $("#dayFive").addClass("far fa-sun");
      }
      if (dayOneClouds > 50) {
        $("#dayFive").addClass("fas fa-cloud");
      }
      let dayFiveTemp = response.daily[5].feels_like.day;        
      let dayFiveTempF = (dayOneTemp - 273.15) * 1.80 + 32;
      if (dayFiveTempF < 30) {
        $("#dayFive").addClass("fas fa-temperature-low");
      }
      if (dayFiveTempF > 80) {
        $("#dayFive").addClass("fas fa-temperature-high");
      }









//DO NOT CHANGE BRACKETS BELOW!!!!      
                })  
            })
        })        
    }
})