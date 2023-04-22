import { Show } from 'solid-js';
import { Title } from 'solid-start';
import { viewport, rotate, toggleRotate, flyTo } from '~/root';

import type { Viewport } from 'solid-map-gl';

const TEST = {
    FAN: { LngLatLike: { lng: -71.05625, lat: 42.36, }, coords: [-71.05625, 42.36] },
    GDT: { LngLatLike: { lng: -71.056922, lat: 42.360919 }, coords: [-71.056922, 42.360919], },
    BBC: { LngLatLike: { lng: -71.103, lat: 42.3145 }, coords: [-71.103, 42.3145], },
    GAR: { LngLatLike: { lng: -71.062228, lat: 42.366303 }, coords: [-71.062228, 42.366303], },
    PRH: { LngLatLike: { lng: -71.053678, lat: 42.363722 }, coords: [-71.053678, 42.363722], },
    NSE: { LngLatLike: { lng: -74.0112660425065, lat: 40.70689167578798 }, coords: [-74.0112660425065, 40.70689167578798], },
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

import type { JSX } from 'solid-js';

export default function Home() {
    return (
        <main>
            <Title>Ride the Lightning</Title>
            <ul> <li>
                <Show when={rotate()}
                    fallback={<button onClick={toggleRotate}> Turn Rotation On </button>} >

                    <button onClick={toggleRotate}> Turn Rotation Off </button> </Show> </li>
                <li><button onClick={() => flyTo({ ...viewport(), ...BOS })}> Boston </button> </li>
                <li><button onClick={() => flyTo({ ...viewport(), ...NYC })}> NYC </button> </li>
            </ul>
        </main>
    ) as JSX.Element;
};
