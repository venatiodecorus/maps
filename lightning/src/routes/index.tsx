import { Title } from 'solid-start';

import type { JSX } from 'solid-js';

import { viewport, flyTo, BOS, NYC } from '~/root';

export default function Home() {
    return (
        <main>
            <Title>Ride the Lightning</Title>
            <ul><li>Toolbox</li>
                <li><button onClick={() => flyTo({ ...viewport(), ...BOS })}> Boston </button> </li>
                <li><button onClick={() => flyTo({ ...viewport(), ...NYC })}> NYC </button> </li>
            </ul>
        </main>
    ) as JSX.Element;
};
