import { createSignal, Show } from 'solid-js';
import * as maplibre from 'maplibre-gl';
import MapGL, { Viewport, Camera, Layer, Popup, Marker } from 'solid-map-gl';
import { MapboxLayer } from '@deck.gl/mapbox/typed';
import { ArcLayer, ScatterplotLayer } from '@deck.gl/layers/typed';

import MapControls from './MapControls';

import type { JSX } from 'solid-js';
import type { MapOptions } from 'maplibre-gl';

import 'maplibre-gl/dist/maplibre-gl.css';


function BadassMap(): JSX.Element {
    const FANEUIL_HALL: number[] = [-71.05625, 42.36]
    const GD_TAVERN: number[] = [-71.056922, 42.360919]

    const TILES_URL: string = 'https://api.maptiler.com/maps/024da34e-fa66-4cb3-8f5f-0466b51e972e/style.json?key=Ukl2QNcQUCPAwuelQOvM'
    const options: MapOptions = {
        container: 'solid-map-gl will override me',
        style: TILES_URL,
        maxPitch: 85,
        antialias: true,
    };
    const INITIAL_VIEW_STATE: Viewport = {
        center: FANEUIL_HALL,
        zoom: 15.5,
        bearing: 160,
        pitch: 60,
    };
    const [viewport, setViewport] = createSignal<Viewport>(INITIAL_VIEW_STATE);
    const [rotate, setRotate] = createSignal<boolean>(true);
    const toggleRotate = () => setRotate<boolean>(!rotate());

    const arcLayer = new MapboxLayer({
        id: 'deckgl-arc',
        type: ArcLayer,
        data: [
            { source: FANEUIL_HALL, target: GD_TAVERN },
        ],
        getSourcePosition: (d: any) => d.source,
        getTargetPosition: (d: any) => d.target,
        getSourceColor: [255, 208, 0],
        getTargetColor: [0, 128, 255],
        getWidth: 8,
    });

    const scatterplotLayer = new MapboxLayer({
        id: 'deckgl-scatterplot',
        type: ScatterplotLayer,
        data: [
            { coordinates: FANEUIL_HALL },
            { coordinates: GD_TAVERN },
        ],
        getPosition: (d: any) => d.coordinates,
        getRadius: 30,
        getFillColor: [255, 140, 0],
        getLineColor: [0, 0, 0,]
    });

    return (
        <MapGL
            mapLib={maplibre}
            options={options}
            viewport={viewport()}
            onViewportChange={(evt: Viewport) => setViewport(evt)}
        >
            <Layer customLayer={arcLayer} />
            <Layer customLayer={scatterplotLayer} />

            <Marker
                lngLat={FANEUIL_HALL}
                options={{ color: '#900' }}
            >
                hi
            </Marker>

                <MapControls />
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
        </MapGL >
    );
};

export default BadassMap;
