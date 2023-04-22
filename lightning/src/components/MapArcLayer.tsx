import { MapboxLayer } from '@deck.gl/mapbox/typed';
import { ArcLayer } from '@deck.gl/layers/typed';
import { Layer } from 'solid-map-gl';

import type { JSX } from 'solid-js';


export default function MapArcLayer(props: any) {
    return (<Layer customLayer={
        new MapboxLayer({
            id: 'deckgl-arc',
            type: ArcLayer,
            data: props.data,
            getSourcePosition: (d: any) => d.source,
            getTargetPosition: (d: any) => d.target,
            getSourceColor: [200, 0, 0],
            getTargetColor: [0, 230, 0],
            getWidth: 6,
        } as any)} />) as JSX.Element;
};
