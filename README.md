# Data Visualization with Angular and D3

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.3 and deployed on [GitHub pages](https://docs.github.com/en/pages). [D3](https://d3js.org/) was used for data viz.

## What is this?

A CSV file from [SimpleMaps](https://simplemaps.com/data/us-cities), containing longitudes and latitudes of all United States cities, was processed (see "intro-to-apis/src/app/py/preprocessing.py") to extract longitudes and latitudes of all 52 US capital cities (one for each of 50 states plus D.C. and Puerto Rico).
For each city, the application makes one call to the [current weather data API at OpenWeather](https://openweathermap.org/current).
(The progress of these calls can be examined by checking `console.log()`.)
After all calls have been made, a scatterplot of temperature vs. % humidity is created.

The unbuilt app files can be found on the `main` branch, in the "intro-to-apis" folder. 
The "barplot-scatterplot-example" folder contains unbuilt app files for an app that uses data from a CSV to create a simple barplot and scatterplot.
The built app files are on the `gh-pages` branch, and the application itself can be viewed on [my GitHub pages](https://mturner0.github.io/Data-Viz-with-AngularJS-d3JS/). Thanks for reading!
