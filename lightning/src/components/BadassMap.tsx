import MapGL, { Viewport, Camera } from 'solid-map-gl';
import { createSignal, Show} from 'solid-js';
import * as maplibre from 'maplibre-gl';
import MapControls from './MapControls';

// deck.gl
import { unstable_clientOnly } from 'solid-start';
const MapScatLayer = unstable_clientOnly(() => import('~/components/MapScatLayer'));
const MapArcLayer = unstable_clientOnly(() => import('~/components/MapArcLayer'));

import type { JSX } from 'solid-js';
import type { MapOptions } from 'maplibre-gl';
import type { StyleSpecification } from 'maplibre-gl';

import 'maplibre-gl/dist/maplibre-gl.css';
import styleJson from '~/style/style.json';
import { arcData, scatData, viewport, setViewport, rotate, setRotate } from '~/root';

const MAP_STYLE: StyleSpecification = styleJson;


const TEST = {
    FAN: { LngLatLike: { lng: -71.05625, lat: 42.36, }, coords: [-71.05625, 42.36] },
    GDT: { LngLatLike: { lng: -71.056922, lat: 42.360919 }, coords: [-71.056922, 42.360919], },
    BBC: { LngLatLike: { lng: -71.103, lat: 42.3145 }, coords: [-71.103, 42.3145], },
    GAR: { LngLatLike: { lng: -71.062228, lat: 42.366303 }, coords: [-71.062228, 42.366303], },
    PRH: { LngLatLike: { lng: -71.053678, lat: 42.363722 }, coords: [-71.053678, 42.363722], },
    NSE: { LngLatLike: { lng: -74.0112660425065, lat: 40.70689167578798 }, coords: [-74.0112660425065, 40.70689167578798], },
};

const options: MapOptions = {
    container: 'solid-map-gl will override me',
    style: MAP_STYLE,
    maxPitch: 85,
    antialias: true,
    renderWorldCopies: false,
};

function BadassMap(props: any): JSX.Element {

    async function eventHandler(event: any) {
        switch (event.type) {
            case 'mousedown':
                // setRotate(false)
                break;
            case 'zoomstart':
                // setRotate(false)
                break;
            case 'touchstart':
                // setRotate(false)
                break;
            case 'drag':
                // setRotate(false)
                break;
        };
    };
    return (
        <>
            <MapGL
                mapLib={maplibre}
                options={options}
                viewport={viewport()}
                onViewportChange={(evt: Viewport) => setViewport(evt)}
                onDrag={eventHandler}
                onMouseDown={eventHandler}
                onZoomStart={eventHandler}
                onTouchStart={eventHandler}
                transitionType="flyTo"
            >
                <MapScatLayer data={scatData()} />
                <MapArcLayer data={arcData()} />

                <Camera rotateViewport={rotate()} reverse={true} />

                <MapControls />
            </MapGL >
        </>
    ) as JSX.Element;
};

export default BadassMap;
