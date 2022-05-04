
    /*===================================================
                      OSM  LAYER               
===================================================*/

var map = L.map('map').setView([40.91, -96.63], 4);
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
osm.addTo(map);

/*===================================================
                      MARKER               
===================================================*/

var singleMarker = L.marker([28.25255,83.97669]);
singleMarker.addTo(map);
var popup = singleMarker.bindPopup('This is a popup')
popup.addTo(map);

/*===================================================
                     TILE LAYER               
===================================================*/

var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
subdomains: 'abcd',
	maxZoom: 19
});
CartoDB_DarkMatter.addTo(map);

// Google Map Layer

googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
 });
 googleStreets.addTo(map);

 // Satelite Layer
googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
   maxZoom: 20,
   subdomains:['mt0','mt1','mt2','mt3']
 });
googleSat.addTo(map);

var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
 attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
subdomains: 'abcd',
minZoom: 1,
maxZoom: 16,
ext: 'jpg'
});
Stamen_Watercolor.addTo(map);


/*===================================================
                      GEOJSON               
===================================================*/

var linedata = L.geoJSON(lineJSON).addTo(map);
var pointdata = L.geoJSON(pointJSON).addTo(map);
var nepalData = L.geoJSON(nepaldataa).addTo(map);
var polygondata = L.geoJSON(polygonJSON,{
    onEachFeature: function(feature,layer){
        layer.bindPopup('<b>This is a </b>' + feature.properties.name)
    },
    style:{
        fillColor: 'red',
        fillOpacity:1,
        color: 'green'
    }
}).addTo(map);

/*===================================================
                      LAYER CONTROL               
===================================================*/

var baseLayers = {
    "Satellite":googleSat,
    "Google Map":googleStreets,
    "Water Color":Stamen_Watercolor,
    "OpenStreetMap": osm,
};

// var overlays = {
//     "Marker": singleMarker,
//     "PointData":pointdata,
//     "LineData":linedata,
//     "PolygonData":polygondata
// };

// L.control.layers(baseLayers, overlays).addTo(map);
L.control.layers(baseLayers).addTo(map);


/*===================================================
                      SEARCH BUTTON               
===================================================*/

L.Control.geocoder().addTo(map);


/*===================================================
                      Choropleth Map               
===================================================*/

L.geoJSON(statesData).addTo(map);


function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

L.geoJson(statesData, {style: style}).addTo(map);

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

var geojson;
// ... our listeners
geojson = L.geoJson(statesData);

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
        : 'Hover over a state');
};

info.addTo(map);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);


//////////////
const apiKey = 'eb380ce293c80acb396c9d71258f3d32';

// add marker with popup
async function addMarkers() {
    removeMarkers();
  
    var states = await fetchStates();
  
    for (var i = 0; i < states.length; i++) {
  
      var weatherResult = await fetchWeather(apiKey, states[i].state_name);
  
      var Icon = L.Icon.extend({
        options: {
          shadowUrl: "http://leafletjs.com/examples/custom-icons/leaf-shadow.png",
          iconSize: [30, 85],
          shadowSize: [50, 64],
          iconAnchor: [22, 94],
          shadowAnchor: [4, 62],
          popupAnchor: [-3, -76]
        }
      }),
        loc = [weatherResult.coord.lat, weatherResult.coord.lon],
        html = "<b>usr " + i + "</b><br/>tweet " + i,
        marker = L.marker(loc, {
          icon: new Icon({
            iconUrl:
              "http://leafletjs.com/examples/custom-icons/" +
                getRandomItemFromArray()
          }),
          // title: "tweet " + i,
          // title: states[i].state_name,
          // title: "Temp: " + weatherResult.main.temp + "°C",
          title: states[i].state_name + "/" + "Temp: " + weatherResult.main.temp + "°C",
          alt: "usr " + i,
          riseOnHover: true
        }).bindPopup(html /* ,{autoClose:false} */);
      marker.isRandom = true; // just to differenciate from any other markers available in the map
      // add just marker/ marker with popup/ just popup
      marker.addTo(map); // map.addLayer(marker); .openPopup();
    }
  }
  function removeMarkers() {
    map.eachLayer(function(layer) {
      if (
        layer instanceof L.Marker &&
        layer.isRandom /* ensure that we are not removing any other markers available in the map, see how the marker is added to the map */
      ) {
        layer.remove(); // layer.removeFrom(map); map.removeLayer(layer);
      }
    });
  }
  
  function getRandomIntBetween(max, min = 1) {
    // Math.random() returns 0<=random number<1
    // Math.floor() returns a int downward to its nearest int
    // 1 to max
    // Math.floor(Math.random() * max + 1);
    // min to max
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  function getRandomItemFromArray(
    ar = ["leaf-green.png", "leaf-red.png", "leaf-orange.png"]
  ) {
    return ar[getRandomIntBetween(ar.length - 1, 0)];
  }
  
  async function fetchStates(){
    let headers = new Headers();
  
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('api-token','D5ZOKr2VHZcCJfb4_tCeHI5VTXpoP-fvoTLyIy8hGIrVqsgFZThkIO9x-dEnt2wvOIg');
    headers.append('user-email','arannya.karak@gmail.com');
        try {
            let response1 = await fetch(`https://www.universal-tutorial.com/api/getaccesstoken`, {
                // mode: 'no-cors',
                // credentials: 'include',
                method: 'GET',
                headers: headers
            });
            // let response = await fetch(`https://api.waqi.info/feed/${city}/?token=c3d00f04680ed6402e8567a9314b1df8073cae74`);
            let data1 = await response1.json();
            console.log("START");
            console.log(data1.auth_token);
            console.log("END");
        // } catch (err1) {
        //     //this only runs if an error occurs in above process
        //     console.log('Oops!', err1);
        // }
  
      ////////
  
      let tkn = "Bearer " + data1.auth_token;
      
      
     let headers2 = new Headers();
  
     headers2.append('Content-Type', 'application/json');
     headers2.append('Accept', 'application/json');
     headers2.append('Authorization', tkn);
        //   try {
              let response2 = await fetch(`https://www.universal-tutorial.com/api/states/United%20States`, {
                  method: 'GET',
                  headers: headers2
              });
              let data2 = await response2.json();
            //   console.log("START");
            //   console.log(data2);
            // for(let i = 0; i < data2.length; i++){
            //     console.log(data2[i].state_name);
            // }
            //   console.log("END");
              return data2;
          } catch (err1) {
              //this only runs if an error occurs in above process
              console.log('Oops!', err1);
          }
  
      /////
  }
  
  async function fetchWeather(key,city){
    
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);
    let data = response.json();
    return data;
  }
  
