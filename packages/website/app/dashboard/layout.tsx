"use client";
import { SupabaseProvider } from "context";
import { DashboardMenu } from "components";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SupabaseProvider>
            <div className="flex min-h-[calc(100vh-129px)] flex-col md:min-h-[calc(100vh-85px)] md:flex-row">
                <DashboardMenu />

                <main className="mb-[45px] max-h-[calc(100vh-129px)] min-h-[calc(100vh-129px)] w-full overflow-y-auto md:mb-0 md:max-h-[calc(100vh-85px)] md:min-h-[calc(100vh-85px)]">
                    {children}
                </main>
            </div>
        </SupabaseProvider>
    );
}
