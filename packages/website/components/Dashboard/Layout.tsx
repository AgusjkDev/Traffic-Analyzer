"use client";
import { useContext } from "react";

import { SupabaseContext } from "context";
import Menu from "./Menu";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { session, user } = useContext(SupabaseContext);

    if (!session || !user) return null;

    return (
        <div className="flex min-h-[calc(100vh-129px)] flex-col md:min-h-[calc(100vh-85px)] md:flex-row">
            <Menu />

            <div className="mx-auto mb-[45px] max-h-[calc(100vh-129px)] min-h-[calc(100vh-129px)] w-[92.5%] overflow-y-auto py-6 md:mb-0 md:max-h-[calc(100vh-85px)] md:min-h-[calc(100vh-85px)] md:w-[85%] md:py-12">
                {children}
            </div>
        </div>
    );
}
