var myMap = L.map("map", {
    center: [38, -97],
    zoom: 4,
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var APILink = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

d3.json(APILink, function(data) {



    function circleColor(mag) {
        if (mag > 5) {
            return '#800026'
        } else if (mag > 4) {
            return '#BD0026'
        } else if (mag > 3) {
            return '#E31A1C'
        } else if (mag > 2) {
            return '#FEB24C'
        } else if (mag > 1) {
            return '#3FBA00'
        } else {
            return '#20E500'
        }
    };

    function circleSize(mag) {
        if (mag === 0){
            return .1;
        }
        return mag
    };


    function circleStyle(feature) {
        return {
            color: circleColor(feature.properties.mag),
            fillColor: circleColor(feature.properties.mag),
            fillOpacity: .75,
            radius: (circleSize(feature.properties.mag) *3),
        };
    };

    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>"  + feature.properties.place + "<br>" + "Magnitude: " + feature.properties.mag + "</br></h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    };

    L.geoJson(data, {

        pointToLayer: function(feature,latlng) {
            return L.circleMarker(latlng);
        },
        // We set the style for each circleMarker using our styleInfo function.
        style: circleStyle,

        onEachFeature: onEachFeature,
        
    }).addTo(myMap);



    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function() {

        var div = L.DomUtil.create('div', 'info legend');

        labels = ['<strong>Categories</strong>'],
        categories = ['0-1', '1-2', '2-3', '3-4', '4-5', '5+'];
        colors = ['#20E500', '#3FBA00', '#FEB24C','#E31A1C', '#BD0026', '#800026'];
        
        for (var i = 0; i < categories.length; i++) {

            div.innerHTML += 
            labels.push(
            '<i class="circle" style="background:' + colors[i] + '"></i> ' +
            (categories[i] ? categories[i] : '+'));

        }
        div.innerHTML = labels.join('<br>');
        return div;
        };
    legend.addTo(myMap);

    // legend = function() {
    //     for (i = 0; i < layers.length; i++) {
    //         var layer = layers[i];
    //         var color = colors[i];
    //         var item = document.createElement('div');
    //         var key = document.createElement('span');
    //         key.className = 'legend-key';
    //         key.style.backgroundColor = color;
        
    //         var value = document.createElement('span');
    //         value.innerHTML = layer;
    //         item.appendChild(key);
    //         item.appendChild(value);
    //         legend.appendChild(item);
    //     };
    // };
    
    // legend.addTo(myMap);


});

    



