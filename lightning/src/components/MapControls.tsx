import { Control } from 'solid-map-gl';
import type {
    NavigationOptions,
    GeolocateOptions,
    ScaleOptions,
    AttributionOptions,
} from 'maplibre-gl';

import type { JSX } from 'solid-js';

function MapControls(): JSX.Element {
    const NAV_OPTIONS: NavigationOptions = {
        showCompass: true,
        showZoom: true,
        visualizePitch: true,
    }

    const GEO_OPTIONS: GeolocateOptions = {
        positionOptions: {
            enableHighAccuracy: false,
            timeout: 6000,
        },
        fitBoundsOptions: { maxZoom: 15 },
        trackUserLocation: false,
        showAccuracyCircle: false,
        showUserLocation: true,
    }

    const SCALE_OPTIONS: ScaleOptions = {
        maxWidth: 100,
        unit: 'imperial',
    }

    return (
        <>
            <Control
                type="navigation"
                position="top-right"
                options={NAV_OPTIONS}
            />

            <Control
                type="geolocate"
                position="top-right"
                options={GEO_OPTIONS}
            />

            <Control
                type="scale"
                position="bottom-left"
                options={SCALE_OPTIONS}
            />
        </>
    )
}

export default MapControls;

