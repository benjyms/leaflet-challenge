// Creating the map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// // Perform a GET request to the query URL/
// d3.json(queryUrl).then(function(data) {
//   // Once we get a response, send the data.features object to the createFeatures function.
//   console.log("Json Data", data.features);
// });

// the function that will determine the color of the marker based on the depth of the earthquake
function getColor(d) {
  return d > 90 ? '#ff0000' :
          d > 70  ? '#ff3300' :
          d > 50  ? '#ff6600' :
          d > 30  ? '#ff9900' :
          d > 10  ? '#b8c714' :
                    '#14c720';
}

// the function that will determine the size of the marker based on the magnitude of the earthquake
function getRadius(mag) {
  return mag * 5;
}

  // getting our geoJSON data
  d3.json(queryUrl).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data
    console.log(data.features);
    L.geoJson(data, {
    // styling the markers
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng, {
        radius: getRadius(feature.properties.mag),
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      });
    },
    // populating the info window
    onEachFeature: function(feature, layer) {
      layer.bindPopup(`<h3>Magnitude: ${feature.properties.mag}</h3><hr><p>Earthquake Depth: ${(feature.geometry.coordinates[2])}</p>`);
    }
  }).addTo(myMap);
});

/*Legend specific*/
var legend = L.control({ position: "bottomright" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Earthquake Depth</h4>";
  div.innerHTML += '<i style="background: #14c720"></i><span>-10-10</span><br>';
  div.innerHTML += '<i style="background: #b8c714"></i><span>10-30</span><br>';
  div.innerHTML += '<i style="background: #ff9900"></i><span>30-50</span><br>';
  div.innerHTML += '<i style="background: #ff6600"></i><span>50-70</span><br>';
  div.innerHTML += '<i style="background: #ff3300"></i><span>70-90</span><br>';
  div.innerHTML += '<i style="background: #ff0000"></i><span>90+</span><br>';
  div.innerHTML += '<i class="icon" style="background-image: url(https://d30y9cdsu7xlg0.cloudfront.net/png/194515-200.png);background-repeat: no-repeat;"></i><span></span><br>';
 
  return div;
};

legend.addTo(myMap);



        


