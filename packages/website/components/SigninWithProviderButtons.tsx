"use client";
import { useContext } from "react";

import { SupabaseContext, AlertsContext } from "context";
import { Svg } from "components";
import { signinWithProviderButtons } from "data";
import type { Provider } from "@supabase/supabase-js";

export default function SigninWithProviderButtons() {
    const { signinWithProvider } = useContext(SupabaseContext);
    const { addAlert } = useContext(AlertsContext);

    const handleSignin = async (provider: Provider) => {
        const response = await signinWithProvider(provider);

        if (response.success) return;

        addAlert({ success: false, message: "¡Ha ocurrido un error al iniciar sesión!" });
    };

    return (
        <div className="flex w-full flex-col items-center gap-y-3 md:gap-y-5 2xl:gap-y-6">
            {signinWithProviderButtons.map(({ provider, displayName, svg }) => (
                <button
                    key={provider}
                    onClick={() => handleSignin(provider)}
                    className="group grid w-full max-w-[280px] grid-cols-4 place-items-center rounded-sm border-[1px] border-primary bg-white py-2.5 transition-colors duration-300 hover:border-secondary lg:max-w-xs"
                >
                    <Svg {...svg} width={24} height={24} />

                    <span className="col-span-3 w-full text-left text-sm transition-colors duration-300 group-hover:text-secondary lg:text-base">
                        Iniciar sesión con {displayName}
                    </span>
                </button>
            ))}
        </div>
    );
}
