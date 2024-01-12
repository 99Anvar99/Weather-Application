# Weather-Dashboard
![image](https://github.com/99Anvar99/Weather-Application/assets/60616540/00261ac8-39d2-4886-ae1a-7bd1a019ad4e)

# Description
A weather dashboard is a digital tool or application that provides users with various weather-related information in a visual and easily accessible format. It typically presents current weather conditions, forecasts, and other meteorological data for a particular location or multiple locations.

# Changes
- Added Search Bar (User input).
- Added Search history.
- Added Clear search history.
- Added 5 days weather forecast (first is current).

When clicked on the search history city, it will bring up the weather forecast for that city.

# API
- Using weatherapi.com (https://www.weatherapi.com/)

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
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```
