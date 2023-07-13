"use client";
import { useContext } from "react";

import { SupabaseContext, AlertsContext } from "context";
import { OutlinedButton } from "components";
import { PageWrapper } from "components/Dashboard";

export default function Settings() {
    const { signOut } = useContext(SupabaseContext);
    const { addAlert } = useContext(AlertsContext);

    const handleSignOut = async () => {
        const response = await signOut();

        if (response.success) return;

        addAlert({ success: false, message: "¡Ha ocurrido un error al cerrar sesión!" });
    };

    return (
        <PageWrapper
            title="Ajustes"
            introduction="Aquí podrás cambiar las preferencias de la cuenta a tu gusto."
        >
            <OutlinedButton onClick={handleSignOut} className="md:max-w-xs">
                Cerrar sesión
            </OutlinedButton>
        </PageWrapper>
    );
}
