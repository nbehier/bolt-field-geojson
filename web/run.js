$(document).ready(function() {
    var $fields = $("[data-field-type='geojson']");
    if ($fields.length > 0) {
        $(document).trigger('leskis-field-geojson:js-load');
    }
});
