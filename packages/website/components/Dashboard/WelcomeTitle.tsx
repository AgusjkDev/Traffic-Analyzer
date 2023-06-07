"use client";
import { useContext } from "react";

import { SupabaseContext } from "context";

export default function WelcomeTitle() {
    const { session } = useContext(SupabaseContext);

    const username: string | undefined = session?.user.user_metadata.full_name;

    return (
        <>
            ¡Hola de nuevo
            {username && (
                <>
                    &#44;&nbsp;
                    <span className="text-secondary">{username}</span>
                </>
            )}
            &#33;
        </>
    );
}
