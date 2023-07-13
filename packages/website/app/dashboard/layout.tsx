import type { PropsWithChildren } from "react";

import { SupabaseProvider, DashboardProvider, AlertsProvider } from "context";
import { Layout } from "components/Dashboard";

export default function DashboardLayout({ children }: PropsWithChildren) {
    return (
        <SupabaseProvider>
            <AlertsProvider>
                <DashboardProvider>
                    <Layout>{children}</Layout>
                </DashboardProvider>
            </AlertsProvider>
        </SupabaseProvider>
    );
}
