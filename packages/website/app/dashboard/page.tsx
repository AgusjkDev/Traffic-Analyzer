"use client";
import { useContext } from "react";

import { SupabaseContext } from "context";
import { PageWrapper, WelcomeText, SystemStatus, Cards } from "components/Dashboard";

export default function Dashboard() {
    const { session } = useContext(SupabaseContext);

    const fullname: string | undefined = session?.user.user_metadata.full_name;

    const title = `¡Hola de nuevo${fullname ? `, ${fullname}` : ""}!`;

    return (
        <PageWrapper title={title} introduction={<WelcomeText />}>
            <div className="flex flex-col gap-y-8">
                <SystemStatus />

                <Cards />
            </div>
        </PageWrapper>
    );
}
