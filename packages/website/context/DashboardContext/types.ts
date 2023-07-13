import type { Street, Device } from "types/schemas";

export interface DashboardState {
    streets: Street[] | null;
    devices: Device[] | null;
}

export type CreateStreet = (streetName: Street["name"]) => Promise<boolean>;

export type UpdateStreetName = (
    streetId: Street["id"],
    streetName: Street["name"]
) => Promise<boolean>;

export type RemoveStreet = (streetId: Street["id"]) => Promise<void>;

export type ActivateDevice = (values: {
    deviceId: Device["id"];
    streetName: Street["name"];
    streetNumber: Required<Device["street_number"]>;
}) => Promise<boolean>;

export interface DashboardContext extends DashboardState {
    createStreet: CreateStreet;
    updateStreetName: UpdateStreetName;
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
