// @refresh reload
import { Suspense, createSignal, createEffect } from "solid-js";
import { A, Body, ErrorBoundary, FileRoutes, Head, Html, Meta, Routes, Scripts, Title } from "solid-start";
import "./root.css";
import BadassMap from './components/BadassMap';
import { StationsProvider } from "./components/StationsContext";

import type { Viewport } from "solid-map-gl";

const TEST = {
    FAN: { LngLatLike: { lng: -71.05625, lat: 42.36, }, coords: [-71.05625, 42.36] },
    GDT: { LngLatLike: { lng: -71.056922, lat: 42.360919 }, coords: [-71.056922, 42.360919], },
    BBC: { LngLatLike: { lng: -71.103, lat: 42.3145 }, coords: [-71.103, 42.3145], },
    GAR: { LngLatLike: { lng: -71.062228, lat: 42.366303 }, coords: [-71.062228, 42.366303], },
    PRH: { LngLatLike: { lng: -71.053678, lat: 42.363722 }, coords: [-71.053678, 42.363722], },
    NSE: { LngLatLike: { lng: -74.0112660425065, lat: 40.70689167578798 }, coords: [-74.0112660425065, 40.70689167578798], },
};

export const [scatData, setScatData] = createSignal([
    { coordinates: TEST.FAN.coords },
    { coordinates: TEST.GDT.coords },
    { coordinates: TEST.BBC.coords },
    { coordinates: TEST.GAR.coords },
    { coordinates: TEST.PRH.coords },
    { coordinates: TEST.NSE.coords },
]);

export const [arcData, setArcData] = createSignal([
    { source: TEST.FAN.coords, target: TEST.GDT.coords },
    { source: TEST.FAN.coords, target: TEST.BBC.coords },
    { source: TEST.FAN.coords, target: TEST.GAR.coords },
    { source: TEST.FAN.coords, target: TEST.PRH.coords },
]);

export const [USER_LOC] = createSignal(TEST.FAN.LngLatLike);

export const [viewport, setViewport] = createSignal<Viewport>();

export default function Root() {
    return (
        <Html lang="en">
            <Head>
                <Title>Ride the Lightning</Title>
                <Meta charset="utf-8" />
                <Meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Body>
                <Suspense>
                    <ErrorBoundary>
                        <StationsProvider>
                            <A href="/">Map</A>
                            <A href="/about">About</A>
                            <Routes>
                                <FileRoutes />
                            </Routes>
                            <BadassMap />
                        </StationsProvider>
                    </ErrorBoundary>
                </Suspense>
                <Scripts />
            </Body>
        </Html>
    );
};
