import { PageWrapper, WelcomeTitle, WelcomeText, SystemStatus, Cards } from "components/Dashboard";

export default function Dashboard() {
    return (
        <PageWrapper title={<WelcomeTitle />} introduction={<WelcomeText />}>
            <div className="flex flex-col gap-y-8">
                <SystemStatus />

                <Cards />
            </div>
        </PageWrapper>
    );
}
