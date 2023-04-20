import { ScatterplotLayer } from '@deck.gl/layers/typed';
import { MapboxLayer } from '@deck.gl/mapbox/typed';
import { Layer } from 'solid-map-gl';

import type { JSX } from 'solid-js';
import type { ScatterplotLayerProps } from '@deck.gl/layers/typed';


function MapScatLayer(props): JSX.Element {

    const scatterplotLayer = new MapboxLayer({
        id: 'deckgl-scatterplot',
        type: ScatterplotLayer,
        data: props.data,
        getPosition: (d: any) => d.coordinates,
        getRadius: 30,
        getFillColor: [255, 140, 0],
        getLineColor: [0, 0, 0,]
    });
    return (
        <>
            <Layer customLayer={scatterplotLayer} />
        </>
    );
};

export default MapScatLayer;
