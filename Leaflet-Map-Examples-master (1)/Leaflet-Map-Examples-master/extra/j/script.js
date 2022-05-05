
// create the map and set the center of the map and its zoom setting
const map = L.map('map',{scrollWheelZoom:false}).setView([37.968923, -122.071100], 3);

//create a set of user selectable map tile layers. You must have at least one tile layer.
const basemaps = { 
  StreetView: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})

  ,Topography: L.tileLayer.wms('http://ows.mundialis.de/services/service?', {layers: 'TOPO-WMS'})

  ,Places: L.tileLayer.wms('http://ows.mundialis.de/services/service?', {layers: 'OSM-Overlay-WMS'})

  ,Stamen_Watercolor: L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})

 ,Esri_WorldImagery: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'})

};

//create the UI to select different map layers
L.control.layers(basemaps).addTo(map);

//initialize the map with the StreetView map tiles
basemaps.StreetView.addTo(map);

// specify an icon to be used for the custom map markers
const customMarker = L.icon({iconUrl: 'i/marker.svg', iconSize: [40, 40]});

// create a set of custom map markers and add them to the map
const marker1 = L.marker([37.969568, -122.068908], {icon: customMarker})
  .bindPopup('Location of New Art/ARTDM Building')
  .addTo(map);

const marker2 = L.marker([37.969978, -122.071118], {icon: customMarker})
  .bindPopup('Old Art Building')
  .addTo(map);

const marker3 = L.marker([37.969172, -122.072440], {icon: customMarker})
  .bindPopup('My Physical Office FO-152')
  .addTo(map);

const marker4 = L.marker([37.969411, -122.071072], {icon: customMarker})
  .bindPopup('Cafateria')
  .addTo(map);