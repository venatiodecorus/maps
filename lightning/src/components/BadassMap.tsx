import { createSignal, Show } from 'solid-js';
import * as maplibre from 'maplibre-gl';
import MapGL, {
    Viewport,
    Light,
    Camera,
    Source,
    Layer,
} from 'solid-map-gl';
import { MapboxLayer } from '@deck.gl/mapbox';
import { ArcLayer } from '@deck.gl/layers';

import MapControls from './MapControls';

import type { JSX } from 'solid-js';
import type { MapOptions } from 'maplibre-gl';

import 'maplibre-gl/dist/maplibre-gl.css';


function BadassMap(): JSX.Element {
    // data stuff
    const FANEUIL_HALL: number[] = [-71.05625, 42.36]
    const GD_TAVERN: number[] = [-71.056922, 42.360919]
    const FAKE_GJSON = {
        type: 'geojson',
        data: {
            "type": "FeatureCollection", "features": [
                { "type": "Feature", "geometry": { "type": "Point", "coordinates": FANEUIL_HALL } },
                { "type": "Feature", "geometry": { "type": "Point", "coordinates": GD_TAVERN } },
            ],
        }
    };

    // markers
    const RED_DOT = {
        type: 'circle',
        paint: {
            'circle-radius': 4,
            'circle-color': 'red',
        }
    };

    // map stuff
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

    const myDeckLayer = new MapboxLayer({
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

    return (
        <MapGL
            mapLib={maplibre}
            options={options}
            viewport={viewport()}
            onViewportChange={(evt: Viewport) => setViewport(evt)}
        >
            <Source source={FAKE_GJSON} >
                <Layer style={RED_DOT} />
            </Source>
            <Layer customLayer={myDeckLayer} />
            <MapControls />
            <Camera
                rotateViewport={rotate()}
                reverse={true}
            />
            <Light style={{
                anchor: 'viewport',
                color: 'white',
                intensity: 0.9,
            }} />
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
