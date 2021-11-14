// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var tectonicPlates = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";


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
  return mag * 4;
}

// // Perform a GET request to the query URL/
// d3.json(queryUrl).then(function(data) {
//   // Once we get a response, send the data.features object to the createFeatures function.
//   createFeatures(data.features);
//   console.log("Json Data", data.features);
// });



// function createFeatures(earthquakeData) {

//   // Define a function we want to run once for each feature in the features array
//   // Give each feature a popup describing the magnitude and depth of the earthquake
//   function onEachFeature(feature, layer) {
//     layer.bindPopup(`<h3>Magnitude: ${feature.properties.mag}</h3><hr><p>Earthquake Depth: ${(feature.geometry.coordinates[2])}</p>`);
//   }

//   // Create a GeoJSON layer containing the features array on the earthquakeData object
//   // Run the onEachFeature function once for each piece of data in the array
//   var earthquakes = L.geoJSON(earthquakeData, {
//     // styling the markers
//     pointToLayer: function(feature, latlng) {
//       return L.circleMarker(latlng, {
//         radius: getRadius(feature.properties.mag),
//         fillColor: getColor(feature.geometry.coordinates[2]),
//         color: "#000",
//         weight: 1,
//         opacity: 1,
//         fillOpacity: 0.8
//       });
//   },
//     onEachFeature: onEachFeature
//     }); 

 
//   // Sending our earthquakes layer to the createMap function
//   createMap(earthquakes);
// }

// perform a data request to the tectonic plates data
d3.json(tectonicPlates).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
  console.log("Tectonic Data", data.features);
});

function createFeatures(tectonicPlatesData) {

  var tectonicPlates = L.geoJSON(tectonicPlatesData, {
    // styling the markers
    color: "#f5bf42",
    weight: 2
  });

  // sending our tectonic plates layer to the createMap function
  createMap(tectonicPlates);
}





function createMap(tectonicPlates) {

  // create the base layers
  var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  })

  var Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
  })

  var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  })


  // create a baseMaps object
  var baseMaps = {
    "Satellite Map": Esri_WorldImagery,
    "Grayscale Map": Esri_WorldGrayCanvas,
    "Outdoors Map": OpenTopoMap,   
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    // "Tectonic Plates": tectonicPlates,
    "Tectonic Plates": tectonicPlates,
    // "Earthquakes": earthquakes
  };

  // Create our map, giving it the satalite and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 3,
    layers: [Esri_WorldImagery, tectonicPlates]
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

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}












        


