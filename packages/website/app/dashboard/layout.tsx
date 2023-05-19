"use client";
import { SupabaseProvider } from "context";
import { Layout } from "components/Dashboard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SupabaseProvider>
            <Layout>{children}</Layout>
        </SupabaseProvider>
    );
}
