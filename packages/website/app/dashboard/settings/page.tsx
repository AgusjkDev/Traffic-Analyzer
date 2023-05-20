"use client";
import { useContext } from "react";

import { SupabaseContext } from "context";
import { OutlinedButton } from "components";
import { PageWrapper } from "components/Dashboard";

export default function Settings() {
    const { signOut } = useContext(SupabaseContext);

    return (
        <PageWrapper
            title="Ajustes"
            introduction="Aquí podrás cambiar las preferencias de la cuenta a tu gusto."
        >
            <OutlinedButton onClick={signOut} className="md:max-w-xs">
                Cerrar sesión
            </OutlinedButton>
        </PageWrapper>
    );
}
