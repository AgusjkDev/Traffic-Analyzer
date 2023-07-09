import type { Street } from "types/schemas";

export interface DashboardState {
    streets: Street[] | null;
}

export type CreateStreet = (streetName: string) => Promise<void>;
export type UpdateStreet = (streetId: string, streetName: string) => Promise<void>;
export type RemoveStreet = (streetId: string) => Promise<void>;

export interface DashboardContext extends DashboardState {
    createStreet: CreateStreet;
    updateStreet: UpdateStreet;
    removeStreet: RemoveStreet;
}

export enum Types {
    SET_STREETS = "SET_STREETS",
}

export type DashboardAction = {
    type: Types.SET_STREETS;
    payload: Street[];
};