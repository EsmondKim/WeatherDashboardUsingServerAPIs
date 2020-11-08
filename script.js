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
    console.log(queryCity);
    window.localStorage.setItem("citySearched", JSON.stringify($("#searchText").val()))
    
    $("#citiesList").append('<li class="list-group-item">' + queryCity + "</li>")

    $.ajax({
        url: queryURLCurrentWthr,
        method: "GET"
      }).then(function(response) {
      console.log(response); 
      })
  
    $("#cityCard").text(queryCity);

  //$("#").append('<li class="">' +  + "</li>")

  //THEN I am presented with the city name, 
  //the date, 
  //an icon representation of weather conditions, 
  //the temperature, the humidity, the wind speed, and the UV index

      
    }

  







})