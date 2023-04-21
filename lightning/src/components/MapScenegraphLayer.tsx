import { ScenegraphLayer } from '@deck.gl/mesh-layers/typed';
import { MapboxLayer } from '@deck.gl/mapbox/typed';
import { Layer } from 'solid-map-gl';

import type { JSX } from 'solid-js';

function MapScenegraphLayer(props: any) {

    const scenegraphLayer = new MapboxLayer({
        id: 'deckgl-scenegraph',
        type: ScenegraphLayer,
        data: props.data,
        pickable: true,
        scenegraph: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxAnimated/glTF-Binary/BoxAnimated.glb',
        getPosition: d => d.coordinates,
        getOrientation: d => [0, Math.random() * 180, 90],
        _animations: {
            '*': { speed: 5 }
        },
        sizeScale: 500,
        _lighting: 'pbr'
    });

    return (
        <>
            <Layer customLayer={scenegraphLayer} />
        </>
    ) as JSX.Element;
};

export default MapScenegraphLayer;
