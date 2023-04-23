import { createSignal } from "solid-js";

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
    StreetAddress: string
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

const TEST_PACKET: StationRequest = {
    Latitude: 42.36,
    Longitude: -71.05625,
    Distance: 10,
    CountLimit: 10,
};

export const [stationsRequest, setStationsRequest] = createSignal<StationRequest>(TEST_PACKET)

export async function fetchStations() {
    let response = await fetch('https://kevinfwu.com/getnearest', {
        method: 'POST',
        cache: 'default',
        body: JSON.stringify(stationsRequest()),
        headers: { 'Content-Type': 'application/json' }
    });
    let resJson = await response.json();
    return resJson as StationResponse[];
};
