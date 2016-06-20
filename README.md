[![SensioLabsInsight](https://insight.sensiolabs.com/projects/1f5e57ff-4b6b-4a59-b953-925e7ac90ce3/mini.png)](https://insight.sensiolabs.com/projects/1f5e57ff-4b6b-4a59-b953-925e7ac90ce3)

Geojson Field for Bolt
======================

This [bolt.cm](https://bolt.cm/) extension add an extra field type : `geojson`.
It enables to draw geolocalised shapes on map.

![Bolt geojson Field image](https://raw.githubusercontent.com/nbehier/bolt-field-geojson/master/extra/screenshot.png)

### Requirements
- Bolt 3.x installation
- [optional] [Sahassar Gmap Extension](https://github.com/SahAssar/bolt-google-maps) to display shapes with ease on frontend

### Installation
1. Login to your Bolt installation
2. Go to "View/Install Extensions" (Hover over "Extras" menu item)
3. Type `bolt-field-geojson` into the input field
4. Click on the extension name
5. Click on "Browse Versions"
6. Click on "Install This Version" on the latest stable version

### Extension Configuration
```(yml)
map:
    zoom:     13        # Initial default zoom level for the default backend map (0 for all earth, 23 for house details)
    max_zoom: 18        # Max default detailed zoom level for the backend map
    height:   300px     # Default height for the backend map
    lat:      48.856578 # Default center latitude for the default backend map
    long:     2.351828  # Default center longitude for the default backend map
draw:
    polyline:  true     # Defined if user could draw polylines
    polygon:   true     # Defined if user could draw polygons
    marker:    true     # Defined if user could draw markers
    circle:    false    # Defined if user could draw circles
    rectangle: false    # Defined if user could draw rectangles
    remove:    true     # Defined if user could remove shapes
    style:     false    # not implemented yet
```

### Add a geojson field on your record
```(yml)
showcases:
    [...]
    fields:
        shapes:
            type: geojson
            map:
                zoom: 13         # Initial zoom level for the default backend map (0 for all earth, 23 for house details)
                max_zoom: 18     # Max detailed zoom level for the backend map
                height: 300px    # Height for the backend map
                lat: 48.856578   # Center latitude for the default backend map
                long: 2.351828   # Center longitude for the default backend map
            draw:
                polyline: true   # Defined if user could draw polylines
                polygon: true    # Defined if user could draw polygons
                marker: true     # Defined if user could draw markers
                circle: false    # Defined if user could draw circles
                rectangle: false # Defined if user could draw rectangles
                remove: true     # Defined if user could remove shapes
                style: false     # not implemented yet
```

### Display a map with `sahassar/gmap` extension
The `sahassar/gmaps` extension enable to display a Google Map.
You can easily add your geojson field as a new layer of your map.
In your twig template :
```(twig)
{% if record.values.shapes is defined %}
    {% autoescape false %}
    <script>
    window.mapjs = {
        afterRender: function(element){
            var map = element.map;
            var geojson = {{ record.values.shapes|default('') }};
            if (geojson != '') {
                geojson = JSON.parse(geojson);
                map.data.addGeoJson(geojson);

                // map.data.setStyle({
                //   fillColor: 'green',
                //   strokeWeight: 1
                // });
            }
        }
    }
    </script>
    {% endautoescape %}
    {{ map( record = record ) }}
{% endif %}
```

---

## See also
- [Geojson specifications](http://geojson.org/geojson-spec.html)
- [Style GeoJson specifications](http://gis.stackexchange.com/questions/22474/geojson-styling-information)
- [Leaflet](https://github.com/Leaflet/Leaflet)
- [Leaflet Draw Plugin](https://github.com/Leaflet/Leaflet.draw)
- [Leaflet Style Editor Plugin](https://github.com/dwilhelm89/Leaflet.StyleEditor)

### License
This Bolt extension is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
