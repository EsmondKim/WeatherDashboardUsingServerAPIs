# WeatherDashboardUsingServerAPIs

This site solves the problem of weather uncertainty for users by providing forecasts for searched cities.  The weather dashbord gives users the current weather and UV Index conditions as well as a five day forecast.

The site utilizes a weather API to provide real time information.
Users can search for cities, and the code automatically takes the search value and adds it to the API's queryURL. 
Then, the code displays current conditions, UV conditions, a five day forecast, and icons to accompany the daily forecast, when available from the API. During sessions, searched cities are added to the list.  Users can click the city names to search that city's forecast again.

To use the website, open it, and click a city name on the list.  Or, type the name of the city that you would like to search in the search box and either hit enter on your keyboard or click the search icon. 

Deployed website:
[Here is a link to the deployed website](https://esmondkim.github.io/WeatherDashboardUsingServerAPIs/) 

Sceenshots
![And a screenshot](/Assets/screenshot.jpg)

This is the User Story and Acceptance Criteria for the site.

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
```

The following image demonstrates the application functionality:

![weather dashboard demo](./Assets/06-server-side-apis-homework-demo.png)

## Review

You are required to submit the following for review:

* The URL of the deployed application.

* The URL of the GitHub repository. Give the repository a unique name and include a README describing the project.

Credits:
The enter key press listener function was learned from this website:
https://howtodoinjava.com/jquery/jquery-detect-if-enter-key-is-pressed/
Accessed: Sunday November 8, 2020
