"use client";
import { useContext } from "react";
import type { PropsWithChildren } from "react";

import { SupabaseContext } from "context";
import Menu from "./Menu";

export default function DashboardLayout({ children }: PropsWithChildren) {
    const { session } = useContext(SupabaseContext);

    if (!session) return null;

    return (
        <div className="flex min-h-[calc(100vh-134.56px)] flex-col md:min-h-[calc(100vh-92.56px)] md:flex-row">
            <Menu />

            <div className="mx-auto mb-[45px] max-h-[calc(100vh-134.56px)] min-h-[calc(100vh-134.56px)] w-[92.5%] overflow-y-auto py-6 md:mb-0 md:max-h-[calc(100vh-92.56px)] md:min-h-[calc(100vh-92.56px)] md:w-[85%] md:py-12">
                {children}
            </div>
        </div>
    );
}
