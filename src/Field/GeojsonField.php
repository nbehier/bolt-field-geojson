<?php

namespace Bolt\Extension\Leskis\BoltFieldGeojson\Field;

//use Bolt\Storage\Field\Type\FieldTypeBase;
use Bolt\Storage\Field\FieldInterface;
use Doctrine\DBAL\Types\Type;

/**
 * GeojsonField class.
 *
 * @author Nicolas Béhier-Dévigne
 */
class GeojsonField implements FieldInterface //extends FieldTypeBase
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
        return 'json_array';//Type::getType('json_array');
    }

    public function getStorageOptions()
    {
        return ['default' => ''];
    }
}
