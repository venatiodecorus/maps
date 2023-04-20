import { ScenegraphLayer } from '@deck.gl/mesh-layers/typed';
import { MapboxLayer } from '@deck.gl/mapbox/typed';
import { Layer } from 'solid-map-gl';

import type { JSX } from 'solid-js';


function MapScenegraphLayer(props): JSX.Element {

    const scenegraphLayer = new MapboxLayer({
        id: 'deckgl-arc',
        type: ScenegraphLayer,
        data: props.data,
        getSourcePosition: (d: any) => d.source,
        getTargetPosition: (d: any) => d.target,
        getSourceColor: [200, 0, 0],
        getTargetColor: [0, 230, 0],
        getWidth: 6,
    });

    return (
        <>
            <Layer customLayer={scenegraphLayer} />
        </>
    );
};

export default MapScenegraphLayer;
