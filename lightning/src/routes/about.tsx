import { Title } from 'solid-start';

export default function Home() {
    return (
        <main>
            <Title>Lightning</Title>
            <h1>About</h1>
            <ul>
                <li>
                    <a href="https://maplibre.org/" target="_blank">
                        MapLibre
                    </a>
                </li>
                <li>
                    <a href="https://openmaptiles.org/" target="_blank">
                        OpenMapTiles
                    </a>
                </li>
                <li>
                    <a href="https://start.solidjs.com/" target="_blank">
                        SolidStart
                    </a>
                </li>
                <li>
                    <a href="https://gis-hub.gitbook.io/solid-map-gl/" target="_blank">
                        Solid Map GL
                    </a>
                </li>
            </ul>
            <img src='5Q14.gif' />
            <p>
                <a href="https://github.com/adoyle0/maps" target="_blank">
                    github.com/adoyle0/maps
                </a>
            </p>
        </main>
    );
}
