"use client";
import { SupabaseProvider } from "context";
import { DashboardLayout } from "components";

export default function DashboardLayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <SupabaseProvider>
            <DashboardLayout>{children}</DashboardLayout>
        </SupabaseProvider>
    );
}
