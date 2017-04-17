<?php

namespace Bolt\Extension\Leskis\BoltFieldGeojson;

use Bolt\Asset\File\JavaScript;
use Bolt\Asset\File\Stylesheet;
use Bolt\Controller\Zone;
use Bolt\Extension\SimpleExtension;
use Bolt\Extension\Leskis\BoltFieldGeojson\Field\GeojsonField;
use Silex\Application;
use Symfony\Component\HttpFoundation\ParameterBag;

/**
 * BoltFieldGeojson extension class.
 *
 * @author Nicolas Béhier-Dévigne
 */
class BoltFieldGeojsonExtension extends SimpleExtension
{
    protected function registerFields()
    {
        return [
            new GeojsonField(),
        ];
    }

    protected function registerTwigPaths()
    {
        return [
            'templates' => ['position' => 'prepend', 'namespace' => 'bolt']
        ];
    }

    protected function registerAssets()
    {
        return [
            (new Stylesheet('leaflet-dist/leaflet.css'))->setZone(Zone::BACKEND),
            (new JavaScript('leaflet-dist/leaflet.js'))->setZone(Zone::BACKEND)->setLate(true)->setPriority(21),
            (new Stylesheet('leaflet-draw/dist/leaflet.draw.css'))->setZone(Zone::BACKEND),
            (new JavaScript('leaflet-draw/dist/leaflet.draw.js'))->setZone(Zone::BACKEND)->setLate(true)->setPriority(22),
            (new Stylesheet('Leaflet.StyleEditor/dist/css/Leaflet.StyleEditor.min.css'))->setZone(Zone::BACKEND),
            (new JavaScript('Leaflet.StyleEditor/dist/javascript/Leaflet.StyleEditor.min.js'))->setZone(Zone::BACKEND)->setLate(true)->setPriority(23),
            (new JavaScript('run.js'))->setZone(Zone::BACKEND)->setLate(true)->setPriority(24)
        ];
    }

    protected function registerServices(Application $app)
    {
        $app['bolt-field-geojson.config'] = $app->share(
           function ($app) {
               return new ParameterBag($this->getConfig() );
           }
        );
    }

    protected function getDefaultConfig()
    {
        return [
            'map' => [
                'zoom'     => 13,
                'max_zoom' => 18,
                'height'   => '300px',
                'lat'      => 48.856578,
                'long'     => 2.351828,
            ],
            'draw' => [
                'polyline'  => true,
                'polygon'   => true,
                'marker'    => true,
                'circle'    => false,
                'rectangle' => false,
                'remove'    => true,
                'style'     => false
            ]
        ];
    }

}
