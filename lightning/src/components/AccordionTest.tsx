import {
    Accordion,
    AccordionButton,
    AccordionHeader,
    AccordionItem,
    AccordionPanel,
} from 'solid-headless';
import {
    createResource,
    ErrorBoundary,
    For,
    Show,
} from 'solid-js';

import type { JSX } from 'solid-js';

import { stationsRequest, fetchStations } from '~/lib/fetchStations';

function ChevronUpIcon(props: JSX.IntrinsicElements['svg']) {
    return (<svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        {...props}
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 15l7-7 7 7"
        />
    </svg>) as JSX.Element;
};

export default function AccordionTest() {
    const [stations] = createResource(stationsRequest, fetchStations);

    return (
        <Show when={stations()}>
            <h1>Find Stations</h1>
            <ErrorBoundary fallback={<p>pretty list broke</p>}>
                <div class="w-full max-w-md p-2 mx-auto bg-black/90 rounded-2xl shadow-2xl">
                    <Accordion class="space-y-2" defaultValue={stations()[0]} toggleable>
                        <For each={stations()} fallback={<div>Loading...</div>}>
                            {(station) => (<AccordionItem value={station}>
                                <AccordionHeader>
                                    <AccordionButton
                                        as="div"
                                        class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-yellow-700 bg-gray-900 rounded-lg hover:bg-gray-800 focus:outline-none focus-visible:ring focus-visible:yellow-600 focus-visible:ring-opacity-75 shadow-2xl"
                                    >
                                        {({ isSelected }) => (<>
                                            <span>{station.Loc.Stations[0].Name}</span>
                                            <div>
                                                <ChevronUpIcon
                                                    class={`flex-0 ${isSelected() ? 'transform rotate-180' : ''} w-5 h-5 text-yellow-900`}
                                                />
                                            </div>
                                        </>)}
                                    </AccordionButton>
                                </AccordionHeader>
                                <AccordionPanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
                                    <ul>
                                        <li>Distance: {station.Dist}</li>
                                        <li>{station.Loc.StreetAddress}</li>
                                        <li>{station.Loc.City}, {station.Loc.State} {station.Loc.Zip} {station.Loc.Country}</li>
                                        <li>{station.Loc.CoordinateString}, {station.Loc.GeocodeStatus}</li>
                                    </ul>
                                </AccordionPanel>
                            </AccordionItem>)}
                        </For>
                    </Accordion>
                </div>
            </ErrorBoundary>
        </Show>
    ) as JSX.Element;
};
