"use client";
import { SupabaseProvider } from "context";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <SupabaseProvider>{children}</SupabaseProvider>;
}
