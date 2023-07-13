"use client";
import { useContext, useReducer, useCallback, useEffect, type PropsWithChildren } from "react";

import { SupabaseContext, AlertsContext } from "context";
import DashboardContext from "./DashboardContext";
import DashboardReducer from "./DashboardReducer";
import initialState from "./initialState";
import {
    Types,
    type CreateStreet,
    type UpdateStreetName,
    type RemoveStreet,
    type ActivateDevice,
} from "./types";
import type { Street, Device } from "types/schemas";

export default function DashboardProvider({ children }: PropsWithChildren) {
    const {
        session,
        selectStreets,
        insertStreet,
        updateStreet,
        deleteStreet,
        selectDevices,
        updateDevice,
    } = useContext(SupabaseContext);
    const { addAlert } = useContext(AlertsContext);
    const [state, dispatch] = useReducer(DashboardReducer, initialState);

    const setStreets = (streets: Street[]) => {
        dispatch({
            type: Types.SET_STREETS,
            payload: streets,
        });
    };

    const setDevices = (devices: Device[]) => {
        dispatch({
            type: Types.SET_DEVICES,
            payload: devices,
        });
    };

    const createStreet: CreateStreet = async streetName => {
        const response = await insertStreet({ name: streetName });

        if (response.success) {
            const street = response.data;

            addAlert({ success: true, message: "Calle registrada satisfactoriamente." });
            setStreets(state.streets ? [...state.streets, street] : [street]);
        } else {
            addAlert({ success: false, message: "¡Ha ocurrido un error al registrar la calle!" });
        }

        return response.success;
    };

    const updateStreetName: UpdateStreetName = async (streetId, streetName) => {
        const response = await updateStreet(streetId, { name: streetName });

        if (response.success) {
            const updatedStreet = response.data;

            addAlert({ success: true, message: "Calle actualizada satisfactoriamente." });
            setStreets(
                state.streets
                    ? state.streets.map(street => (streetId === street.id ? updatedStreet : street))
                    : [updatedStreet]
            );
        } else {
            addAlert({ success: false, message: "¡Ha ocurrido un error al actualizar la calle!" });
        }

        return response.success;
    };

    const removeStreet: RemoveStreet = async streetId => {
        const response = await deleteStreet(streetId);

        const stateStreets = state.streets;
        if (response.success && stateStreets) {
            addAlert({ success: true, message: "Calle eliminada satisfactoriamente." });
            setStreets(stateStreets.filter(({ id }) => streetId !== id));
        } else {
            addAlert({ success: false, message: "¡Ha ocurrido un error al eliminar la calle!" });
        }
    };

    const activateDevice: ActivateDevice = async values => {
        const { deviceId, streetName, streetNumber } = values;
        const street = state.streets?.find(({ name }) => streetName === name);

        if (!street) {
            addAlert({
                success: false,
                message: "¡Ha ocurrido un error al referenciar la calle del dispositivo!",
            });

            return false;
        }

        const response = await updateDevice(deviceId, {
            street_id: street.id,
            street_number: streetNumber,
        });

        if (response.success) {
            const device = response.data;

            addAlert({ success: true, message: "Dispositivo activado correctamente." });
            setDevices(state.devices ? [...state.devices, device] : [device]);
        } else {
            addAlert({
                success: false,
                message: "¡Ha ocurrido un error al activar el dispositivo!",
            });
        }

        return response.success;
    };

    const getInitialValues = useCallback(async () => {
        const [streetsResponse, devicesResponse] = await Promise.allSettled([
            selectStreets(),
            selectDevices(),
        ]);

        if (streetsResponse.status === "rejected" || !streetsResponse.value.success) {
            addAlert({
                success: false,
                message: "¡Ha ocurrido un error al obtener las calles!",
            });
        } else {
            setStreets(streetsResponse.value.data);
        }

        if (devicesResponse.status === "rejected" || !devicesResponse.value.success) {
            return addAlert({
                success: false,
                message: "¡Ha ocurrido un error al obtener los dispositivos!",
            });
        }

        setDevices(devicesResponse.value.data);
    }, [session]);

    useEffect(() => {
        if (!session) return;

        getInitialValues();
    }, [session]);

    return (
        <DashboardContext.Provider
            value={{ ...state, createStreet, updateStreetName, removeStreet, activateDevice }}
        >
            {children}
        </DashboardContext.Provider>
    );
}
