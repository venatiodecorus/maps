import MapGL, { Viewport } from 'solid-map-gl';
import * as maplibre from 'maplibre-gl';
import MapControls from './MapControls';

import type { JSX } from 'solid-js';
import type { MapOptions } from 'maplibre-gl';

import { arcData, scatData, viewport, setViewport } from '~/root';
import 'maplibre-gl/dist/maplibre-gl.css';
import StyleJson from '~/style/style.json';

// deck.gl
import { unstable_clientOnly } from 'solid-start';
const MapScatLayer = unstable_clientOnly(() => import('~/components/MapScatLayer'));
const MapArcLayer = unstable_clientOnly(() => import('~/components/MapArcLayer'));

const options: MapOptions = {
    container: 'solid-map-gl will override me',
    style: StyleJson,
    maxPitch: 85,
    antialias: true,
    renderWorldCopies: false,
};

export default function BadassMap() {
    return (
        <>
            <MapGL
                mapLib={maplibre}
                options={options}
                viewport={viewport()}
                onViewportChange={(evt: Viewport) => setViewport(evt)}
                transitionType="flyTo"
            >
                <MapScatLayer data={scatData()} />
                <MapArcLayer data={arcData()} />
                <MapControls />
            </MapGL >
        </>
    ) as JSX.Element;
};
