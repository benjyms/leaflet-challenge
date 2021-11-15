# leaflet-challenge

CWRU Bootcamp Web Mapping Homework

Leaflet-Step-1

USGS Earthquake Data is obtained from an API clal to identify earthquakes in the last 7 days.  

The features output in the GeoJSON format is leveraged to plot the returned earthquakes by latitued and Longitude.  

Leaflet mapping functions are used to create the base map over the united states.  

Two additional functions were created to set the color of the markers on the map based on the depth of the earthquake and the sizie of the marker based on the magnitude of the earthquake.

For each earthquake maker, popup information detaling the magintued and depth of the earthquake is also added.

Lastly and agenda was added to the map to detail the depths of each earthquake on the map by color.

Leaflet-Step-1 Image:

![](image/README/1636935866017.png)

Leaflet-Step-2:

To create the second visualization, the existing index.html and logic.js files were replicated in the new directory with additional featrues added.

A second data set is being called from GitHub that will overlay the tectonic plates across the globe. This is being added to illustrate the relationship between tectonic plates and seeismic activity.

Addional base maps for both satalite and greyscale were added for the end user to select from as well as establishing layer controls for the end user to choose to visualize one, both or not data sets on the map.  Initial map creation will only include the earthquake data.

Leaflet-Step-2 Image:

![](image/README/1636936435794.png)
