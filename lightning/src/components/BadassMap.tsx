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
import * as stylesheet from '~/style.json'

// test data
const FANEUIL_HALL: number[] = [-71.05625, 42.36]
const GD_TAVERN: number[] = [-71.056922, 42.360919]
const BBC: number[] = [-71.103, 42.3145]
const GARDEN: number[] = [-71.062228, 42.366303]
const PR_HOUSE: number[] = [-71.053678, 42.363722]

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

const TILES_STYLE: StyleSpecification = {
};


function BadassMap(): JSX.Element {
    const MY_LOC = FANEUIL_HALL;
    const options: MapOptions = {
        container: 'solid-map-gl will override me',
        style: stylesheet,
        maxPitch: 85,
        antialias: true,
    };
    const INITIAL_VIEW_STATE: Viewport = {
        center: MY_LOC,
        zoom: 15.5,
        bearing: 160,
        pitch: 60,
    };

    const [viewport, setViewport] = createSignal<Viewport>(INITIAL_VIEW_STATE);
    const [rotate, setRotate] = createSignal<boolean>(true);
    const toggleRotate = () => setRotate<boolean>(!rotate());

    return (
        <MapGL
            mapLib={maplibre}
            options={options}
            viewport={viewport()}
            onViewportChange={(evt: Viewport) => setViewport(evt)}
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

            <Show
                when={rotate()}
                fallback={<button onClick={toggleRotate}> Rotation On </button>}
            >
                <button onClick={toggleRotate}> Rotation Off </button>
            </Show>
            <MapControls />
        </MapGL >
    );
};

export default BadassMap;
