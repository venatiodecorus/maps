import { Title, } from 'solid-start';
import { Suspense } from 'solid-js';

import AccordionTest from '~/components/AccordionTest';

import type { JSX } from 'solid-js';

export default function Home() {
    return (<>
        <Title>Ride the Lightning</Title>
        <Suspense>
            <AccordionTest />
        </Suspense>
    </>) as JSX.Element;
};
