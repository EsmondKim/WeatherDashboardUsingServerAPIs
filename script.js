$(document).ready(function() {
    console.log(moment().format());
    console.log(moment().hours());

    function getFromLocalStorage() {
        let lastSearched = JSON.parse(window.localStorage.getItem("citySearched"));
        $(':input').removeAttr('placeholder');
        $("#searchText").val(lastSearched);
        //alert(lastSearched);
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
    //console.log(queryCity);
    window.localStorage.setItem("citySearched", JSON.stringify($("#searchText").val()))
    
    $("#citiesList").append('<li class="list-group-item">' + queryCity + "</li>")

    $.ajax({
        url: queryURLCurrentWthr,
        method: "GET"
      }).then(function(response) {
      console.log(response); 
      console.log(response.name)
      console.log(response.main.temp);
      console.log(response.main.humidity);
   
      let tempF = (response.main.temp - 273.15) * 1.80 + 32;
      let humidity = response.main.humidity;
      $("#cityName").text(response.name);
      $("#cityTime").text(moment().format("MMM Do YY"));
      $("#cityTemp").text(tempF.toFixed(0) + " degrees Farenheit");
      $("#cityHumidity").text("Humidity: " + humidity); 
      })
  

    //the humidity, the wind speed, and the UV index
    //an icon representation of weather conditions,

    }


      
    

  







})