// @refresh reload
import { Suspense } from "solid-js";
import {
    A,
    Body,
    ErrorBoundary,
    FileRoutes,
    Head,
    Html,
    Meta,
    Routes,
    Scripts,
    Title,
    unstable_clientOnly,
} from "solid-start";
import "./root.css";
const BadassMap = unstable_clientOnly(() => import('~/components/BadassMap'));

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
                        <A href="/">Map</A>
                        <A href="/about">About</A>
                        <BadassMap fallback={<div>hi</div>} />
                        <Routes>
                            <FileRoutes />
                        </Routes>
                    </ErrorBoundary>
                </Suspense>
                <Scripts />
            </Body>
        </Html>
    );
}
