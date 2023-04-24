import { ScatterplotLayer } from '@deck.gl/layers/typed';
import { MapboxLayer } from '@deck.gl/mapbox/typed';
import { Layer } from 'solid-map-gl';

import type { JSX } from 'solid-js';

import { scatData } from '~/root';


export default function MapScatLayer(props: any) {
    return (<Layer customLayer={
        new MapboxLayer({
            id: 'deckgl-scatterplot',
            type: ScatterplotLayer,
            data: scatData(),
            getPosition: (d: any) => d.coordinates,
            getRadius: 30,
            getFillColor: [255, 140, 0],
            getLineColor: [0, 0, 0,],
        } as any)} />) as JSX.Element;
};
