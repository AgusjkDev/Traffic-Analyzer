"use client";
import { SupabaseProvider } from "context";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <SupabaseProvider>{children}</SupabaseProvider>;
}
