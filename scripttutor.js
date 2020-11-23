$(document).ready(function() {
    $("#btn").on("click", function() {
        let city = $("#searchText").val()
        getWeather(city) 
            
            //let queryCity = $("#searchText").val();
            //let queryURLCurrentWthr =
              //"https://api.openweathermap.org/data/2.5/weather?q=" +
              //queryCity +
              //"&appid=87665d60f93b269a6c1aa2b881ea7347";    
    })   
    
    function getWeather(city) {
        $.ajax ({
          type: "GET",
          url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=87665d60f93b269a6c1aa2b881ea7347",
          datatype: "json",
          success: function(data){
            console.log(data);
          }
          
        })
    }
    
})