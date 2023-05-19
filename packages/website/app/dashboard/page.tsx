"use client";
import { useContext } from "react";
import Link from "next/link";
import { Callout } from "@tremor/react";

import { SupabaseContext } from "context";
import { dashboardAnchors, env } from "data";

export default function Dashboard() {
    const { user } = useContext(SupabaseContext);

    if (!user) return null;

    return (
        <div className="flex flex-col gap-8">
            <h2 className="text-lg text-primary md:text-2xl">
                ¡Hola de nuevo,&nbsp;
                <span className="text-secondary">{user.user_metadata.full_name}</span>!
            </h2>

            <p className="text-sm text-primary-light md:text-base">
                Éste es tu panel de control o <i>dashboard</i>, en él podrás realizar ciertas
                acciones como&nbsp;
                <Link href={dashboardAnchors[1].href} className="lowercase underline">
                    {dashboardAnchors[1].title}
                </Link>
                &nbsp; o&nbsp;
                <Link href={dashboardAnchors[2].href} className="lowercase underline">
                    {dashboardAnchors[2].title}
                </Link>
                .
            </p>

            <Callout
                className="md:text-base"
                title={
                    env.SYSTEM_ERRORS ? "Se han detectado errores" : "Todo funciona correctamente"
                }
                color={env.SYSTEM_ERRORS ? "red" : "emerald"}
            >
                {env.SYSTEM_ERRORS
                    ? "Se está investigando la causa de errores en los sistemas de Traffic Analyzer."
                    : "Todos los sistemas de Traffic Analyzer están funcionando correctamente."}
            </Callout>
        </div>
    );
}
