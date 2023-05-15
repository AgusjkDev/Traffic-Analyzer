"use client";
import { useContext } from "react";

import { SupabaseContext } from "context";

export default function Dashboard() {
    const { session, user, signOut } = useContext(SupabaseContext);

    if (!session || !user) return null;

    return (
        <main className="my-auto flex flex-col items-center justify-center gap-6 px-2.5">
            <h2 className="text-center text-2xl">¡Hola, {user.user_metadata.full_name}!</h2>

            <button
                onClick={signOut}
                className="w-full max-w-[192px] rounded-sm border-[1px] border-black py-2.5"
            >
                Cerrar sesión
            </button>
        </main>
    );
}
