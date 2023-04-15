import { Title } from "solid-start";
import Counter from "~/components/Counter";

export default function Home() {
    return (
        <main>
            <Title>Lightning</Title>
            <h1>Lightning</h1>
            <Counter />
            <p>Click and drag to watch me explode!
            </p>
        </main>
    );
}
