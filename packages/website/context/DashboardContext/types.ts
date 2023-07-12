import type { FormValues } from "data";
import type { Street, Device } from "types/schemas";

export interface DashboardState {
    streets: Street[] | null;
    devices: Device[] | null;
}

export type CreateStreet = (streetName: string) => Promise<void>;
export type UpdateStreet = (streetId: string, streetName: string) => Promise<void>;
export type RemoveStreet = (streetId: string) => Promise<void>;
export type ActivateDevice = (values: FormValues) => Promise<boolean>;

export interface DashboardContext extends DashboardState {
    createStreet: CreateStreet;
    updateStreet: UpdateStreet;
    removeStreet: RemoveStreet;
    activateDevice: ActivateDevice;
}

export enum Types {
    SET_STREETS = "SET_STREETS",
    SET_DEVICES = "SET_DEVICES",
}

export type DashboardAction =
    | {
          type: Types.SET_STREETS;
          payload: Street[];
      }
    | {
          type: Types.SET_DEVICES;
          payload: Device[];
      };
