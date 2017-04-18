/*
 *  jquery-boilerplate - v4.0.0
 *  A jump-start for jQuery plugins development.
 *  http://jqueryboilerplate.com
 *
 *  Made by Zeno Rocha
 *  Under MIT License
 */
;( function( $, window, document, undefined ) {

    "use strict";

    // Create the defaults once
    var pluginName = "jqGeojsonField",
        defaults   = {
            inputSelector: "",
            zoom:          13,
            maxzoom:       18,
            lat:           48.856578,
            long:          2.351828,
            polyline:      true,
            polygon:       true,
            marker:        true,
            circle:        false,
            rectangle:     false,
            remove:        true,
            style:         false
        };

    // The actual plugin constructor
    function Plugin ( element, options ) {
        this.element    = element;
        this.settings   = $.extend( {}, defaults, options );
        this._defaults  = defaults;
        this._name      = pluginName;
        this.$input     = $(this.settings.inputSelector);
        this.map        = undefined;
        this.drawnItems = undefined;

        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend( Plugin.prototype, {
        init: function() {
            this.loadSettingsFromDataAttributes();
            this.createMap();
            this.addDrawEditor();

            if (this.settings.style) {
                this.addStyleEditor();
            }

            this.waitingToShow();
        },
        // Wait until div is visible, to load tiles on every part of the container
        waitingToShow: function() {
            var _this = this;

            if (! $(_this.element).is(':visible') ) {
                window.setTimeout(function(){ _this.waitingToShow(); }, 500);
            } else {
                _this.map.invalidateSize();
            }
        },
        loadSettingsFromDataAttributes: function() {
            var defaults = $(this.element).data();

            if (defaults.hasOwnProperty('geojsonfieldZoom') )      { this.settings.zoom = defaults.geojsonfieldZoom; }
            if (defaults.hasOwnProperty('geojsonfieldMaxzoom') )   { this.settings.maxzoom = defaults.geojsonfieldMaxzoom; }
            if (defaults.hasOwnProperty('geojsonfieldLat') )       { this.settings.lat = defaults.geojsonfieldLat; }
            if (defaults.hasOwnProperty('geojsonfieldLong') )      { this.settings.long = defaults.geojsonfieldLong; }
            if (defaults.hasOwnProperty('geojsonfieldPolyline') )  { this.settings.polyline = defaults.geojsonfieldPolyline; }
            if (defaults.hasOwnProperty('geojsonfieldPolygon') )   { this.settings.polygon = defaults.geojsonfieldPolygon; }
            if (defaults.hasOwnProperty('geojsonfieldMarker') )    { this.settings.marker = defaults.geojsonfieldMarker; }
            if (defaults.hasOwnProperty('geojsonfieldCircle') )    { this.settings.circle = defaults.geojsonfieldCircle; }
            if (defaults.hasOwnProperty('geojsonfieldRectangle') ) { this.settings.rectangle = defaults.geojsonfieldRectangle; }
            if (defaults.hasOwnProperty('geojsonfieldRemove') )    { this.settings.remove = defaults.geojsonfieldRemove; }
            if (defaults.hasOwnProperty('geojsonfieldStyle') )     { this.settings.style = defaults.geojsonfieldStyle; }
        },
        createMap: function() {
            var osmUrl    = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                osm       = L.tileLayer(osmUrl, {
                                maxZoom:     this.settings.maxzoom,
                                attribution: osmAttrib
                            }),
                sVal      = this.$input.val();

            this.map      = new L.Map(this.element, {
                                layers: [osm],
                                center: new L.LatLng(this.settings.lat, this.settings.long),
                                zoom:   this.settings.zoom
                            });

            this.map.invalidateSize();

            if (sVal != '') {
                this.drawnItems = L.geoJson(JSON.parse(sVal ) );

                // zoom to show all the features
                this.map.fitBounds(this.drawnItems.getBounds() );
            }
            else {
                this.drawnItems = L.geoJson();
            }
            this.map.addLayer(this.drawnItems);
        },
        addDrawEditor: function() {
            var _this       = this,
                drawControl = new L.Control.Draw({
                    position: 'topright',
                    draw: {
                        polyline:  this.settings.polyline,
                        polygon:   this.settings.polygon,
                        marker:    this.settings.marker,
                        circle:    this.settings.circle,
                        rectangle: this.settings.rectangle
                    },
                    edit: {
                        featureGroup: this.drawnItems,
                        remove:       this.settings.remove
                    }
                });
            this.map.addControl(drawControl);

            this.map.on('draw:created', function (e) {
                _this.drawnItems.addLayer(e.layer);
                _this.saveGeojson();
            });

            this.map.on('draw:edited', function (e) {
                _this.saveGeojson();
            });

            this.map.on('draw:deleted', function (e) {
                _this.drawnItems.removeLayer(e.layer); // required ?
                _this.saveGeojson();
            });
        },
        addStyleEditor: function() {
            var _this = this;

            //Initialize the StyleEditor
            var styleEditor = L.control.styleEditor({
                position:          "topright",
                useGrouping:       false,
                openOnLeafletDraw: false
            });
            this.map.addControl(styleEditor);

            this.map.on('styleeditor:changed', function(e){
                _this.saveGeojson();
            });

            // Prevent to submit bolt record form
            $('.leaflet-styleeditor button').on('click', function(e) {
                e.preventDefault();
            })
        },
        saveGeojson: function() {
            var i       = 0,
                geojson = this.drawnItems.toGeoJSON();

            this.drawnItems.eachLayer(function(layer) {
                var options = layer.options;
                delete options.editing;
                delete options.original;
                delete options._initHooksCalled;
                delete options.clickable;

                geojson.features[i].style = options;

                i++;
            });

            this.$input.val(JSON.stringify(geojson ) );
        }
    } );

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function( options ) {
        return this.each( function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" +
                    pluginName, new Plugin( this, options ) );
            }
        } );
    };

} )( jQuery, window, document );
