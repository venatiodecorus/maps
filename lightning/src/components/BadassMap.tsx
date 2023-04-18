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
import * as MAP_STYLE from '~/style.json'

// test data
const FANEUIL_HALL = [-71.05625, 42.36]
const GD_TAVERN = [-71.056922, 42.360919]
const BBC = [-71.103, 42.3145]
const GARDEN = [-71.062228, 42.366303]
const PR_HOUSE = [-71.053678, 42.363722]

const NYSE = [-74.0112660425065, 40.70689167578798]

const ARC_DATA = [
    { source: FANEUIL_HALL, target: GD_TAVERN },
    { source: FANEUIL_HALL, target: BBC },
    { source: FANEUIL_HALL, target: GARDEN },
    { source: FANEUIL_HALL, target: PR_HOUSE },
];

const SCAT_DATA = [
    { coordinates: FANEUIL_HALL },
    { coordinates: GD_TAVERN },
    { coordinates: BBC },
    { coordinates: GARDEN },
    { coordinates: PR_HOUSE },
];

const TILES_URL: string = 'https://api.maptiler.com/maps/024da34e-fa66-4cb3-8f5f-0466b51e972e/style.json?key=Ukl2QNcQUCPAwuelQOvM';

const INITIAL_VIEWPORT: Viewport = {
    center: NYSE,
    zoom: 15.5,
    bearing: 10,
    pitch: 60,
}

function BadassMap(): JSX.Element {
    const MY_LOC = FANEUIL_HALL;
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

    function boston() {
        setRotate(false);
        setViewport({
            ...viewport(),
            center: FANEUIL_HALL,
            zoom: 15.5,
            bearing: 160,
            pitch: 60,
        });
    }

    function nyc() {
        setRotate(false);
        setViewport({
            ...viewport(),
            center: NYSE,
            zoom: 15.5,
            bearing: 10,
            pitch: 60,
        });
    }

    return (
        <MapGL
            mapLib={maplibre}
            options={options}
            viewport={viewport()}
            onViewportChange={(evt: Viewport) => setViewport(evt)}
            onDrag={() => setRotate(false)}
            onMouseDown={() => setRotate(false)}
            onZoomStart={() => setRotate(false)}
            onTouchStart={() => setRotate(false)}
            transitionType="easeTo"
        >
            <MapScatLayer data={SCAT_DATA} />
            <MapArcLayer data={ARC_DATA} />

            <Marker
                lngLat={MY_LOC}
                options={{ color: '#900' }}
            >
                hi
            </Marker>

            <Camera
                rotateViewport={rotate()}
                reverse={true}
            />

            <ul>
                <li>
                    <Show
                        when={rotate()}
                        fallback={<button onClick={toggleRotate}> Rotation On </button>}
                    >
                        <button onClick={toggleRotate}> Rotation Off </button>
                    </Show>
                </li>
                <li>
                    <button onClick={boston}> Boston </button>
                </li>
                <li>
                    <button onClick={nyc}> NYC </button>
                </li>
            </ul>
            <MapControls />
        </MapGL >
    );
};

export default BadassMap;
