// @refresh reload
import { Suspense } from "solid-js";
import { A, Body, ErrorBoundary, FileRoutes, Head, Html, Meta, Routes, Scripts, Title } from "solid-start";
import "./root.css";
import BadassMap from './components/BadassMap';
import { StationsProvider } from "./components/StationsContext";

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
