import { Component, createSignal, Show } from 'solid-js';
import MapGL, { Viewport, Control, Light, Camera } from 'solid-map-gl';
import * as maplibre from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function BadassMap(): Component {
    const [viewport, setViewport] = createSignal({
        center: [-71.05625, 42.36],
        zoom: 15.5,
        bearing: 160,
        pitch: 60,
        maxPitch: 85,
        antialias: true,
    } as Viewport);

    const [rotate, setRotate] = createSignal(true)
    const toggleRotate = () => setRotate(!rotate())

    return (
        <MapGL
            mapLib={maplibre}
            options={{
                style: 'https://api.maptiler.com/maps/024da34e-fa66-4cb3-8f5f-0466b51e972e/style.json?key=Ukl2QNcQUCPAwuelQOvM'
            }}
            viewport={viewport()}
            onViewportChange={(evt: Viewport) => setViewport(evt)}
        >

            <Show
                when={rotate()}
                fallback={<button onClick={toggleRotate}> Rotation On </button>}
            >
                <button onClick={toggleRotate}> Rotation Off </button>
            </Show>

            <Control type="fullscreen" position="top-right" />
            <Control type="navigation" position="top-right" />
            <Control type="geolocate" position="top-right" />
            <Control type="scale" position="bottom-left" />

            <Light style={{
                anchor: 'viewport',
                color: 'white',
                intensity: 0.9,
            }} />

            <Camera
                rotateViewport={rotate()}
                reverse={true}
            />

        </MapGL>
    );
};
