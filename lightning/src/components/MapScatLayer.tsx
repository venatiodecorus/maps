import { ScatterplotLayer } from '@deck.gl/layers/typed';
import { MapboxLayer } from '@deck.gl/mapbox/typed';
import { Layer } from 'solid-map-gl';

import type { JSX } from 'solid-js';

function MapScatLayer(props: any) {
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
    ) as JSX.Element;
};

export default MapScatLayer;
