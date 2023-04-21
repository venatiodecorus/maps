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
import type { ArcLayer, ArcLayerProps } from '@deck.gl/layers/typed';
const MAP_STYLE: StyleSpecification = styleJson;


const TEST = {
    FAN: { LngLatLike: { lng: -71.05625, lat: 42.36, }, coords: [-71.05625, 42.36] },
    GDT: { LngLatLike: { lng: -71.056922, lat: 42.360919 }, coords: [-71.056922, 42.360919], },
    BBC: { LngLatLike: { lng: -71.103, lat: 42.3145 }, coords: [-71.103, 42.3145], },
    GAR: { LngLatLike: { lng: -71.062228, lat: 42.366303 }, coords: [-71.062228, 42.366303], },
    PRH: { LngLatLike: { lng: -71.053678, lat: 42.363722 }, coords: [-71.053678, 42.363722], },
    NSE: { LngLatLike: { lng: -74.0112660425065, lat: 40.70689167578798 }, coords: [-74.0112660425065, 40.70689167578798], },
};
const ARC_DATA = [
    { source: TEST.FAN.coords, target: TEST.GDT.coords },
    { source: TEST.FAN.coords, target: TEST.BBC.coords },
    { source: TEST.FAN.coords, target: TEST.GAR.coords },
    { source: TEST.FAN.coords, target: TEST.PRH.coords },
];
const SCAT_DATA = [
    { coordinates: TEST.FAN.coords },
    { coordinates: TEST.GDT.coords },
    { coordinates: TEST.BBC.coords },
    { coordinates: TEST.GAR.coords },
    { coordinates: TEST.PRH.coords },
    { coordinates: TEST.NSE.coords },
];
const BOS: Viewport = {
    center: TEST.FAN.coords,
    zoom: 15.5,
    bearing: 160,
    pitch: 60,
};
const NYC: Viewport = {
    center: TEST.NSE.coords,
    zoom: 15.5,
    bearing: 10,
    pitch: 60,
};

const USER_LOC = TEST.FAN.LngLatLike;
const INITIAL_VIEWPORT: Viewport = {
    center: USER_LOC,
    zoom: 15.5,
    bearing: 10,
    pitch: 60,
};
const options: MapOptions = {
    container: 'solid-map-gl will override me',
    style: MAP_STYLE,
    maxPitch: 85,
    antialias: true,
    renderWorldCopies: false,
};

function BadassMap(props: any): JSX.Element {

    const [viewport, setViewport] = createSignal<Viewport>(INITIAL_VIEWPORT);
    const [rotate, setRotate] = createSignal<boolean>(true);
    const [scatData, setScatData] = createSignal(SCAT_DATA);
    const [arcData, setArcData] = createSignal(ARC_DATA);
    const toggleRotate = () => setRotate<boolean>(!rotate());

    async function flyTo(viewUpdate: Viewport) {
        setRotate<boolean>(false)
        setViewport<Viewport>(viewUpdate);
    };
    async function eventHandler(event: any) {
        switch (event.type) {
            case 'mousedown':
                setRotate(false)
                break;
            case 'zoomstart':
                setRotate(false)
                break;
            case 'touchstart':
                setRotate(false)
                break;
            case 'drag':
                setRotate(false)
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

                <ul> <li>
                    <Show when={rotate()}
                        fallback={<button onClick={toggleRotate}> Turn Rotation On </button>} >

                        <button onClick={toggleRotate}> Turn Rotation Off </button> </Show> </li>
                    <li><button onClick={() => flyTo({ ...viewport(), ...BOS })}> Boston </button> </li>
                    <li><button onClick={() => flyTo({ ...viewport(), ...NYC })}> NYC </button> </li>
                </ul>

                <MapControls />
            </MapGL >
        </>
    ) as JSX.Element;
};

export default BadassMap;
