import { WelcomeText, Introduction, SystemStatus } from "components/Dashboard";

export default function Dashboard() {
    return (
        <main className="flex flex-col gap-8">
            <WelcomeText />

            <Introduction />

            <SystemStatus />
        </main>
    );
}
