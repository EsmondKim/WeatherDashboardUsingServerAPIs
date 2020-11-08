$(document).ready(function() {
    console.log(moment().format());
    console.log(moment().hours());

    $("#btn").on("click", getWeather)

    $(document).keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            console.log('You pressed "enter"'); 
            getWeather();
        }
    });

    function getWeather() {
    console.log("You hit search btn.");
    let queryCity = $("#searchText").val(); 
    let queryURLCurrentWthr = "https://api.openweathermap.org/data/2.5/weather?q=" + queryCity + "&appid=87665d60f93b269a6c1aa2b881ea7347";
    alert(queryCity);
    
    window.localStorage.setItem("citySearched", JSON.stringify($("#searchText").val()))
    
    $.ajax({
        url: queryURLCurrentWthr,
        method: "GET"
      }).then(function(response) {
      console.log(response); 
      })
    }



})