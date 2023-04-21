import { createContext, useContext, createResource } from "solid-js";

import type { JSX } from "solid-js";

type ChargingStation = {
    Name: string
    PhoneNumer: string
    IntersectionDirections: string
    AccessTime: string
    Connectors: string[]
    Network: string
    Pricing: string
    RestrictedAccess: boolean
    CntLevel2Chargers: number
    CntLevel3Chargers: number
};
type Location = {
    StreetAddresss: string
    City: string
    State: string
    Country: string
    Zip: string
    GeocodeStatus: string
    Coordinates: string
    CoordinateString: string
    Stations: ChargingStation[]
};
type StationRequest = {
    Latitude: number
    Longitude: number
    Distance: number
    CountLimit: number
};
type StationResponse = {
    Dist: number
    Loc: Location
};
const USER_LOC = { lng: -71.05625, lat: 42.36, };
const TEST_PACKET: StationRequest = {
    Latitude: USER_LOC.lat,
    Longitude: USER_LOC.lng,
    Distance: 10,
    CountLimit: 10,
};

const StationsContext = createContext();

export function StationsProvider(props: any) {
    const [stations] = createResource(async () => {
        const response = await fetch("https://kevinfwu.com/getnearest", {
            method: "POST",
            cache: 'default',
            body: JSON.stringify(TEST_PACKET),
            headers: { 'Content-Type': 'application/json' }
        }); return await response.json() as Promise<StationResponse[]>;
    });
    return (
        <StationsContext.Provider value={stations()}>
            {props.children}
        </StationsContext.Provider>
    ) as JSX.Element;
};

export function getStations() { return useContext(StationsContext); };
