import { useContext, useReducer, useEffect, type PropsWithChildren } from "react";

import { SupabaseContext } from "context";
import DashboardContext from "./DashboardContext";
import DashboardReducer from "./DashboardReducer";
import initialState from "./initialState";
import {
    Types,
    type CreateStreet,
    type UpdateStreet,
    type RemoveStreet,
    type ActivateDevice,
} from "./types";
import type { Street, Device } from "types/schemas";

export default function DashboardProvider({ children }: PropsWithChildren) {
    const {
        session,
        getStreets,
        insertStreets,
        updateStreetName,
        deleteStreet,
        getDevices,
        updateDevice,
    } = useContext(SupabaseContext);
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
        if (!streetName) return;

        const street = await insertStreets(streetName);
        if (!street) return;

        setStreets(state.streets ? [...state.streets, street] : [street]);
    };

    const updateStreet: UpdateStreet = async (streetId, streetName) => {
        if (!state.streets || !streetName) return;

        await updateStreetName(streetId, streetName);
        setStreets(
            state.streets.map(street =>
                street.id === streetId ? { ...street, name: streetName } : street
            )
        );
    };

    const removeStreet: RemoveStreet = async streetId => {
        if (!state.streets || !streetId) return;

        await deleteStreet(streetId);
        setStreets(state.streets ? state.streets.filter(street => street.id !== streetId) : []);
    };

    const activateDevice: ActivateDevice = async values => {
        if (!session || !state.streets) return false;

        const { deviceId, streetName, streetNumber } = values;

        const street = state.streets.find(({ name }) => streetName === name);
        if (!street) {
            alert("¡Calle inválida!"); // TODO: Create custom alert

            return false;
        }

        const device = await updateDevice(deviceId, {
            user_id: session.user.id,
            street_id: street.id,
            street_number: streetNumber,
        });
        if (!device) return false;

        setDevices(state.devices ? [...state.devices, device] : [device]);

        return true;
    };

    useEffect(() => {
        if (!session) return;

        Promise.allSettled([getStreets(), getDevices()]).then(([streets, devices]) => {
            if (streets.status === "fulfilled" && streets.value) setStreets(streets.value);
            if (devices.status === "fulfilled" && devices.value) setDevices(devices.value);
        });
    }, [session]);

    return (
        <DashboardContext.Provider
            value={{ ...state, createStreet, updateStreet, removeStreet, activateDevice }}
        >
            {children}
        </DashboardContext.Provider>
    );
}
