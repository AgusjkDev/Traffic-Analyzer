import { useContext, useReducer, useEffect } from "react";
import type { PropsWithChildren } from "react";

import { SupabaseContext } from "context";
import DashboardContext from "./DashboardContext";
import DashboardReducer from "./DashboardReducer";
import initialState from "./initialState";
import { Types, type CreateStreet, type RemoveStreet, type UpdateStreet } from "./types";
import type { Street } from "types/schemas";

export default function DashboardProvider({ children }: PropsWithChildren) {
    const { getStreets, insertStreets, updateStreetName, deleteStreet } =
        useContext(SupabaseContext);
    const [state, dispatch] = useReducer(DashboardReducer, initialState);

    const setStreets = (streets: Street[]) => {
        dispatch({
            type: Types.SET_STREETS,
            payload: streets,
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

    useEffect(() => {
        if (state.streets) return;

        getStreets().then(streets => {
            console.log({ getStreetsResult: streets });
            if (!streets) return;

            setStreets(streets);
        });
    }, [getStreets]);

    return (
        <DashboardContext.Provider value={{ ...state, createStreet, updateStreet, removeStreet }}>
            {children}
        </DashboardContext.Provider>
    );
}
