<?php

namespace Bolt\Extension\Leskis\BoltFieldGeojson\Field;

use Bolt\Storage\Field\Type\FieldTypeBase;
use Doctrine\DBAL\Types\Type;

/**
 * GeojsonField class.
 *
 * @author Nicolas Béhier-Dévigne
 */
class GeojsonField extends FieldTypeBase
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
        return Type::getType('json_array');
    }

    public function getStorageOptions()
    {
        return ['default' => ''];
    }
}
