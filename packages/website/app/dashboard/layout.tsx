"use client";
import type { PropsWithChildren } from "react";

import { SupabaseProvider } from "context";
import { Layout } from "components/Dashboard";

export default function DashboardLayout({ children }: PropsWithChildren) {
    return (
        <SupabaseProvider>
            <Layout>{children}</Layout>
        </SupabaseProvider>
    );
}
