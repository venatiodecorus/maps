import MapGL, { Viewport, Camera } from 'solid-map-gl';
import { createSignal, Show, createEffect, createResource, For, Accessor } from 'solid-js';
import { useRouteData } from 'solid-start';
import * as maplibre from 'maplibre-gl';
import MapControls from './MapControls';
import { createStore } from 'solid-js/store';

// deck.gl
import { unstable_clientOnly } from 'solid-start';
const MapScatLayer = unstable_clientOnly(() => import('~/components/MapScatLayer'));
const MapArcLayer = unstable_clientOnly(() => import('~/components/MapArcLayer'));

import type { JSX } from 'solid-js';
import type { MapOptions } from 'maplibre-gl';

import 'maplibre-gl/dist/maplibre-gl.css';
import * as MAP_STYLE from '~/style.json';

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
type StationRequest = {
    Latitude: number
    Longitude: number
    Distance: number
    CountLimit: number
};
type StationResponse = {
    Dist: number
    Loc: Location
}

const TEST = {
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
const TEST_PACKET: StationRequest = {
    Latitude: USER_LOC.lat,
    Longitude: USER_LOC.lng,
    Distance: 10,
    CountLimit: 10,
}
function BadassMap(): JSX.Element {
    async function fetchStations() {
        const payload: RequestInit = {
            method: "POST",
            cache: 'default',
            body: JSON.stringify(TEST_PACKET),
            headers: { 'Content-Type': 'application/json' },
        }
        const response = await fetch("https://kevinfwu.com/getnearest", payload);
        return await response.json() as StationResponse[];
    };
    const [stations] = createResource(fetchStations);

    const [viewport, setViewport] = createSignal<Viewport>(INITIAL_VIEWPORT);
    const [rotate, setRotate] = createSignal<boolean>(true);
    const toggleRotate = () => setRotate<boolean>(!rotate());

    function flyTo(viewUpdate: Viewport) {
        setRotate<boolean>(false)
        setViewport<Viewport>(viewUpdate);
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
                <li><button onClick={() => console.log(stations())}> log stations </button> </li>
                <For each={stations()}>
                    {(station) => <li>{station.Dist}</li>}
                </For>
            </ul>

            <MapControls />
        </MapGL >
    );
};

export default BadassMap;
