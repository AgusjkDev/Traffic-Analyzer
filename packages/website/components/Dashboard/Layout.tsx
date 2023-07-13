"use client";
import { useContext, type PropsWithChildren } from "react";

import { SupabaseContext } from "context";
import Menu from "./Menu";

export default function DashboardLayout({ children }: PropsWithChildren) {
    const { session } = useContext(SupabaseContext);

    if (!session) return null;

    return (
        <div className="flex min-h-[calc(100vh-127px)] flex-col md:min-h-[calc(100vh-81px)] md:flex-row">
            <Menu />

            <div className="max-h-[calc(100vh-134.56px)] min-h-[calc(100vh-127px)] w-full overflow-y-auto md:max-h-[calc(100vh-92.56px)] md:min-h-[calc(100vh-81px)]">
                <div className="mx-auto mb-[45px] w-[92.5%] py-6 md:mb-0 md:w-[87.5%] md:py-12">
                    {children}
                </div>
            </div>
        </div>
    );
}
