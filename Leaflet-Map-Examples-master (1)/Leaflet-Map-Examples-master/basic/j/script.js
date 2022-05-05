
// create the map and set the center of the map and its zoom setting
const map = L.map('map',{scrollWheelZoom:false}).setView([37.968923, -122.071100], 17);

//create a tile layer. Make sure to always include attribution
const streetView =  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})

//initialize the map with the StreetView map tiles
streetView.addTo(map);

// create a set of custom map markers and add them to the map
const marker1 = L.marker([37.969568, -122.068908])
  .bindPopup('Location of New Art/ARTDM Building')
  .addTo(map);

const marker2 = L.marker([37.969978, -122.071118])
  .bindPopup('Old Art Building')
  .addTo(map);

const marker3 = L.marker([37.969172, -122.072440])
  .bindPopup('My Physical Office FO-152')
  .addTo(map);

const marker4 = L.marker([37.969411, -122.071072])
  .bindPopup('Cafateria')
  .addTo(map);
