"use client";
import { useContext } from "react";

import { SupabaseContext } from "context";

export default function WelcomeText() {
    const { user } = useContext(SupabaseContext);

    const username: string | undefined = user?.user_metadata.full_name;

    return (
        <h2 className="text-lg text-primary md:text-2xl">
            ¡Hola de nuevo
            {username && (
                <>
                    &#44;&nbsp;
                    <span className="text-secondary">{username}</span>
                </>
            )}
            &#33;
        </h2>
    );
}
