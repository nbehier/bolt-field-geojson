<?php

namespace Bolt\Extension\Leskis\BoltFieldGeojson\Field;

use Bolt\Storage\Field\FieldInterface;

/**
 * GeojsonField class.
 *
 * @author Nicolas Béhier-Dévigne
 */
class GeojsonField implements FieldInterface
{
    public function getName()
    {
        return 'geojson';
    }

    public function getTemplate()
    {
        return '_geojson.twig';
    }

    public function getStorageType()
    {
        return 'json_array';
    }

    public function getStorageOptions()
    {
        return ['default' => ''];
    }
}
