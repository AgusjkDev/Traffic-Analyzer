import { Callout } from "@tremor/react";

import { env } from "data";

export default function SystemStatus() {
    const title = env.SYSTEM_ERRORS ? "Se han detectado errores" : "Todo funciona correctamente";
    const color = env.SYSTEM_ERRORS ? "red" : "emerald";
    const children = env.SYSTEM_ERRORS
        ? "Se está investigando la causa de errores en los sistemas de Traffic Analyzer."
        : "Todos los sistemas de Traffic Analyzer están funcionando correctamente.";

    return (
        <Callout className="md:text-base" title={title} color={color}>
            {children}
        </Callout>
    );
}
