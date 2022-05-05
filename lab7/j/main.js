var map,
  data = [
    [
      { label: "apple0", y: 9 },
      { label: "orange0", y: 6 },
      { label: "banana0", y: 25 }
    ],
    [
      { label: "apple1", y: 25 },
      { label: "orange1", y: 45 },
      { label: "banana1", y: 8 }
    ],
    [
      { label: "apple2", y: 55 },
      { label: "orange2", y: 85 },
      { label: "banana2", y: 8 }
    ]
  ];
init();
function init() {
  var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a target="_blank" href="https://openstreetmap.org" title="&copy; OpenStreetMap contributors">OpenStreetMap</a> contributors'
  }),
    statenew = L.tileLayer.wms("http://bhuvan-panchayat.nrsc.gov.in:8080/geoserver/wms", {
      layers: "sde:statenew",
      format: "image/png",
      transparent: true,
      attribution:
        '<a target="_blank" href="http://bhuvan-panchayat.nrsc.gov.in:8080/geoserver" title="Bhuvan Panchayat">Bhuvan Panchayat</a>'
    }),
    markers = L.layerGroup([
      L.marker([90, -180]), // Top Left
      L.marker([90, 180]), // TR
      L.marker([-90, -180]).bindPopup("[-90,-180]"), // BL
      L.marker([-90, 180]).bindPopup("[-90,180]") // BR
    ]),
    circle = L.circle([20, -130], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 500000
    }),
    polygon = L.polygon([[10, -130], [10, -0.06], [51, -0.047]]),
    base = {
      OSM: osm
    },
    overlays = {
      State: statenew,
      Markers: markers,
      Circle: circle,
      Polygon: polygon
    },
    loc = [[21, 68], [21, 78], [21, 88]];
  circle.bindTooltip("my tooltip text").openTooltip();
  map = L.map("map", {
    //crs: L.CRS.EPSG4326, // EPSG3857 (default), EPSG4326
    center: [21, 78],
    zoom: 2,
    layers: [osm, statenew]
  });

  L.control.layers(base, overlays).addTo(map);

  for (var i = 0, l = data.length; i < l; i++) {
    var marker = L.marker(loc[i])
      .addTo(map)
      .bindTooltip("You clicked marker: " + i).openTooltip(),
      options = { index: i };;
    marker.on("click", onMarkerClickFixedChart, options); // 3rd argument will be passed to 'this' object, when click event occures
  }

  loc = [[30, 68], [30, 78], [30, 88]];
  for (var i = 0, l = data.length; i < l; i++) {
    var marker = L.marker(loc[i]).bindPopup($("#pcc")[0]).addTo(map),
      options = { index: i };
    marker.on("click", onMarkerClickPopupChart, options);
  }

  /*
  var timer = 0;
var delay = 200;
var prevent = false;
   map.on("dblclick", 
         function(){
     
     clearTimeout(timer);
    prevent = true;
   // doDoubleClickAction();
   },
          wms);
  
  
  map.on("click", 
         function(){
    timer = setTimeout(function() {
      if (!prevent) {
        doClickAction();
      }
      prevent = false;
    }, delay);
      }
         
         
         , wms);
  
  
  
  

  function doClickAction(e) {   
    
    alert('doClickAction');
     
  }*/
}

function addPopups() {
  removePopups();
  for (var i = 0; i < 25; i++) {
    var popup = L.popup(/* {autoClose:false} */)
      .setLatLng([getRandomIntBetween(90, -90), getRandomIntBetween(180, -180)])
      .setContent("<b>usr " + i + "</b><br/>tweet " + i); // .openOn(map);
    popup.isRandom = true;
    map.addLayer(popup);
  }
}
function removePopups() {
  map.eachLayer(function(layer) {
    if (
      layer instanceof L.Popup &&
      layer.isRandom /* ensure that we are not removing any other popups available in the map, see how the popup is added to the map */
    ) {
      layer.remove(); // layer.removeFrom(map); map.removeLayer(layer);
    }
  });
}
function addMarkers() {
  removeMarkers();
  for (var i = 0; i < 25; i++) {
    var Icon = L.Icon.extend({
      options: {
        shadowUrl: "http://leafletjs.com/examples/custom-icons/leaf-shadow.png",
        iconSize: [38, 95],
        shadowSize: [50, 64],
        iconAnchor: [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor: [-3, -76]
      }
    }),
      loc = [getRandomIntBetween(90, -90), getRandomIntBetween(180, -180)],
      html = "<b>usr " + i + "</b><br/>tweet " + i,
      marker = L.marker(loc, {
        icon: new Icon({
          iconUrl:
            "http://leafletjs.com/examples/custom-icons/" +
              getRandomItemFromArray()
        }),
        title: "tweet " + i,
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
function onMarkerClickFixedChart(e) {
  //'this' object receives the value of 3rd argument which is passed when adding the click event
  $("#fcc").css("display", "block");
  var cc = new CanvasJS.Chart("fc", {
    title: {
      text: "CanvasJS Chart"
    },
    data: [
      {
        type: "spline",
        dataPoints: data[this.index]
      }
    ]
  });
  cc.render();
}
function onMarkerClickPopupChart(e) {
  var index = this.index;
  $("#pcc").html(
    "You clicked marker: " +
      index +
      "<br/><a id='link' href='#' onclick='showChart(" +
      index +
      ");'>show chart</a><br/><div id='pc' class='pc'></div>"
  );
}

function showChart(index) {
  $("#link").css("display", "none");
  $("#pc").css("display", "block");
  var cc = new CanvasJS.Chart("pc", {
    title: {
      text: "CanvasJS Chart"
    },
    data: [
      {
        type: "spline",
        dataPoints: data[index]
      }
    ]
  });
  cc.render();
}
function hideChart() {
  $("#fcc").hide();
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
