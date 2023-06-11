"use client";
import type { PropsWithChildren } from "react";

import { SupabaseProvider, DashboardProvider } from "context";
import { Layout } from "components/Dashboard";

export default function DashboardLayout({ children }: PropsWithChildren) {
    return (
        <SupabaseProvider>
            <DashboardProvider>
                <Layout>{children}</Layout>
            </DashboardProvider>
        </SupabaseProvider>
    );
}
