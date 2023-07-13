"use client";
import { useState, useRef, useContext } from "react";

import { AlertsContext, DashboardContext } from "context";
import { regex } from "data";
import { reduceSpaces } from "helpers";
import type { Street } from "types/schemas";

interface useStreetInputProps {
    street?: Street;
}

export default function useStreetInput({ street }: useStreetInputProps) {
    const [streetName, setStreetName] = useState<string>(street?.name ?? "");
    const [isDisabled, setIsDisabled] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const { addAlert } = useContext(AlertsContext);
    const { createStreet, updateStreetName, removeStreet } = useContext(DashboardContext);

    const handleBlur = () => {
        setStreetName(street?.name ?? "");

        if (street) setIsDisabled(true);
    };

    const handleCreate = async () => {
        const cleanStreetName = reduceSpaces(streetName);
        if (!regex.streetName.test(cleanStreetName)) {
            return addAlert({
                success: false,
                message: "¡El nombre de la calle contiene un formato inválido!",
            });
        }

        const success = await createStreet(cleanStreetName);
        if (success) setStreetName("");
    };

    const handleUpdate = async () => {
        if (!street) return;

        if (isDisabled) {
            setIsDisabled(false);

            return setTimeout(() => inputRef.current?.focus(), 1);
        }

        const cleanStreetName = reduceSpaces(streetName);
        if (!regex.streetName.test(cleanStreetName)) {
            handleBlur();

            return addAlert({
                success: false,
                message: "¡El nombre de la calle contiene un formato inválido!",
            });
        }

        if (street.name === cleanStreetName) return setIsDisabled(true);

        const success = await updateStreetName(street.id, cleanStreetName);
        if (!success) setStreetName(street.name);

        setIsDisabled(true);
    };
    const handleDelete = () => {
        // TODO: Create custom confirm popup
        if (!street || !confirm("¿Realmente deseas eliminar esta calle?")) return;

        removeStreet(street.id);
    };

    return {
        streetName,
        isDisabled,
        inputRef,
        handleStreetName: setStreetName,
        handleBlur,
        handleCreate,
        handleUpdate,
        handleDelete,
    };
}
