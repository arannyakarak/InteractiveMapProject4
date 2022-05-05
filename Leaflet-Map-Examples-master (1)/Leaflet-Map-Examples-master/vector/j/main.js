
  var map = L.map('map').setView([37.968923, -122.071100], 5);

  L.marker([37.969568, -122.068908])
    .bindPopup("Hello!<br> find us at <b>DVC!</b>")
    .addTo(map)
    .openPopup();

  var gl = L.mapboxGL({
        attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
        style: 'https://api.maptiler.com/maps/streets/style.json?key=YOUR_MAPTILER_API_KEY_GOES_HERE',
        interactive: true
      }).addTo(map);

  var mapboxMap = gl.getMapboxMap();
  
