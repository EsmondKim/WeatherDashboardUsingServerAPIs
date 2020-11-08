$(document).ready(function() {
    console.log(moment().format());
    console.log(moment().hours());

    let queryURLCurrentWthr = "https://api.openweathermap.org/data/2.5/weather?q=Boston&appid=87665d60f93b269a6c1aa2b881ea7347";
    
    $.ajax({
        url: queryURLCurrentWthr,
        method: "GET"
      }).then(function(response) {
      console.log(response); 
      })
    



})