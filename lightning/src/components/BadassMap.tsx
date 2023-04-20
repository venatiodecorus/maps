import MapGL, { Viewport, Camera, Marker } from 'solid-map-gl';
import { createSignal, Show } from 'solid-js';
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
import * as MAP_STYLE from '~/style.json';

const TEST_LOCS = {
    FAN: {
        LngLatLike: { lng: -71.05625, lat: 42.36, },
        coords: [-71.05625, 42.36]
    },
    GDT: {
        LngLatLike: { lng: -71.056922, lat: 42.360919 },
        coords: [-71.056922, 42.360919],
    },
    BBC: {
        LngLatLike: { lng: -71.103, lat: 42.3145 },
        coords: [-71.103, 42.3145],
    },
    GAR: {
        LngLatLike: { lng: -71.062228, lat: 42.366303 },
        coords: [-71.062228, 42.366303],
    },
    PRH: {
        LngLatLike: { lng: -71.053678, lat: 42.363722 },
        coords: [-71.053678, 42.363722],
    },
    NSE: {
        LngLatLike: { lng: -74.0112660425065, lat: 40.70689167578798 },
        coords: [-74.0112660425065, 40.70689167578798],
    },
}
const ARC_DATA = [
    { source: TEST_LOCS.FAN.coords, target: TEST_LOCS.GDT.coords },
    { source: TEST_LOCS.FAN.coords, target: TEST_LOCS.BBC.coords },
    { source: TEST_LOCS.FAN.coords, target: TEST_LOCS.GAR.coords },
    { source: TEST_LOCS.FAN.coords, target: TEST_LOCS.PRH.coords },
];
const SCAT_DATA = [
    { coordinates: TEST_LOCS.FAN.coords },
    { coordinates: TEST_LOCS.GDT.coords },
    { coordinates: TEST_LOCS.BBC.coords },
    { coordinates: TEST_LOCS.GAR.coords },
    { coordinates: TEST_LOCS.PRH.coords },
    { coordinates: TEST_LOCS.NSE.coords },
];
const USER_LOC = TEST_LOCS.FAN.LngLatLike;
const INITIAL_VIEWPORT: Viewport = {
    center: USER_LOC,
    zoom: 15.5,
    bearing: 10,
    pitch: 60,
};
type ChargingStation = {
    Name: string
    PhoneNumer: string
    IntersectionDirections: string
    AccessTime: string
    Connectors: string[]
    Network: string
    Pricing: string
    RestrictedAccess: boolean
    CntLevel2Chargers: number
    CntLevel3Chargers: number
};
type Location = {
    StreetAddresss: string
    City: string
    State: string
    Country: string
    Zip: string
    GeocodeStatus: string
    Coordinates: string
    CoordinateString: string
    Stations: ChargingStation[]
};

function BadassMap(): JSX.Element {
    const options: MapOptions = {
        container: 'solid-map-gl will override me',
        style: MAP_STYLE,
        maxPitch: 85,
        antialias: true,
        renderWorldCopies: false,
    };

    const [viewport, setViewport] = createSignal<Viewport>(INITIAL_VIEWPORT);
    const [rotate, setRotate] = createSignal<boolean>(true);
    const toggleRotate = () => setRotate<boolean>(!rotate());

    function flyTo(viewUpdate: Viewport) {
        setRotate<boolean>(false)
        setViewport<Viewport>(viewUpdate);
    };
    const BOS: Viewport = {
        center: TEST_LOCS.FAN.coords,
        zoom: 15.5,
        bearing: 160,
        pitch: 60,
    };
    const NYC: Viewport = {
        center: TEST_LOCS.NSE.coords,
        zoom: 15.5,
        bearing: 10,
        pitch: 60,
    };
    function eventHandler(event: any) {
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
            <MapScatLayer data={SCAT_DATA} />
            <MapArcLayer data={ARC_DATA} />

            <Camera rotateViewport={rotate()} reverse={true} />

            <ul> <li>
                <Show when={rotate()}
                    fallback={<button onClick={toggleRotate}> Rotation On </button>} >

                    <button onClick={toggleRotate}> Rotation Off </button> </Show> </li>
                <li><button onClick={() => flyTo({ ...viewport(), ...BOS })}> Boston </button> </li>
                <li><button onClick={() => flyTo({ ...viewport(), ...NYC })}> NYC </button> </li>
            </ul>

            <MapControls />
        </MapGL >
    );
};

export default BadassMap;
