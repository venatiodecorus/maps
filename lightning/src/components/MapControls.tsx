import { Control } from 'solid-map-gl';

import type { JSX } from 'solid-js';
import type {
    NavigationOptions,
    GeolocateOptions,
    AttributionOptions,
    ScaleOptions,
} from 'maplibre-gl';


export default function MapControls() {

    return (
        <>

            <Control
                type="navigation"
                position="top-right"
                options={{
                    showCompass: true,
                    showZoom: true,
                    visualizePitch: true,
                } as NavigationOptions}
            />

            <Control
                type="geolocate"
                position="top-right"
                options={{
                    positionOptions: {
                        enableHighAccuracy: false,
                        timeout: 6000,
                        maximumAge: 0,
                    },
                    fitBoundsOptions: { maxZoom: 15 },
                    trackUserLocation: false,
                    showAccuracyCircle: false,
                    showUserLocation: true,
                } as GeolocateOptions}
            />

            <Control
                type="attribution"
                position="bottom-right"
                options={{
                    compact: false,
                    customAttribution: 'OpenStreetMap',
                } as AttributionOptions}
            />

            <Control
                type="scale"
                position="bottom-left"
                options={{
                    maxWidth: 100,
                    unit: 'imperial',
                } as ScaleOptions}
            />

        </>
    ) as JSX.Element;
};
