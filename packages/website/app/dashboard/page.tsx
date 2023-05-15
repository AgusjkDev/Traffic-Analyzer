"use client";
import { useContext } from "react";

import { SupabaseContext } from "context";

export default function Dashboard() {
    const { session, user, signOut } = useContext(SupabaseContext);

    if (!session || !user) return null;

    return (
        <main className="gap-6 my-auto flex-col px-2.5 flex justify-center items-center">
            <h2 className="text-2xl text-center">¡Hola, {user.user_metadata.full_name}!</h2>

            <button
                onClick={signOut}
                className="py-2.5 w-full max-w-[192px] border-[1px] rounded-sm border-black"
            >
                Cerrar sesión
            </button>
        </main>
    );
}
