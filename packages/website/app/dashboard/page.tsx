import { PageWrapper, WelcomeTitle, WelcomeText, SystemStatus } from "components/Dashboard";

export default function Dashboard() {
    return (
        <PageWrapper title={<WelcomeTitle />} introduction={<WelcomeText />}>
            <SystemStatus />
        </PageWrapper>
    );
}
