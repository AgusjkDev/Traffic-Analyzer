"use client";
import { useContext } from "react";
import type { Provider } from "@supabase/supabase-js";

import { SupabaseContext } from "context";
import Svg from "./Svg";
import { signinWithProviderButtons } from "data";

export default function SigninWithProviderButtons() {
    const { signinWithProvider } = useContext(SupabaseContext);

    const handleSignin = (provider: Provider) => {
        signinWithProvider(provider);
    };

    return (
        <div className="flex flex-col items-center w-full gap-y-3 md:gap-y-5 2xl:gap-y-6">
            {signinWithProviderButtons.map(({ provider, displayName, svg }) => (
                <button
                    key={provider}
                    onClick={() => handleSignin(provider)}
                    className="group bg-white hover:border-emerald-600 transition-colors duration-300 w-full border-primary lg:max-w-xs max-w-[280px] rounded-sm border-[1px] grid grid-cols-4 py-2.5 lg:py-3 place-items-center"
                >
                    <Svg {...svg} width={24} height={24} />

                    <span className="w-full col-span-3 text-sm text-left transition-colors duration-300 lg:text-base group-hover:text-emerald-600">
                        Iniciar sesión con {displayName}
                    </span>
                </button>
            ))}
        </div>
    );
}
