import {
    AuthSessionMissingError,
    type Session,
    type Provider,
    type AuthError,
    type PostgrestError,
} from "@supabase/supabase-js";
import type { Street, StreetInsert, StreetUpdate, Device, DeviceUpdate } from "types/schemas";

export interface SupabaseState {
    session: Session | null;
}

type SupabaseResponse<T, K = undefined> =
    | {
          success: true;
          data: K extends undefined ? undefined : T;
      }
    | {
          success: false;
          error: K extends undefined ? T : K;
      };

export type SigninWithProvider = (provider: Provider) => Promise<SupabaseResponse<AuthError>>;
export type SignOut = () => Promise<SupabaseResponse<AuthError>>;
export type SelectStreets = () => Promise<
    SupabaseResponse<Street[], AuthSessionMissingError | PostgrestError>
>;
export type InsertStreet = (
    values: Pick<StreetInsert, "name">
) => Promise<SupabaseResponse<Street, AuthSessionMissingError | PostgrestError>>;
export type UpdateStreet = (
    streetId: Street["id"],
    values: Pick<StreetUpdate, "name">
) => Promise<SupabaseResponse<Street, AuthSessionMissingError | PostgrestError>>;
export type DeleteStreet = (
    streetId: Street["id"]
) => Promise<SupabaseResponse<AuthSessionMissingError | PostgrestError>>;
export type SelectDevices = () => Promise<
    SupabaseResponse<Device[], AuthSessionMissingError | PostgrestError>
>;
export type UpdateDevice = (
    deviceId: Device["id"],
    update: Pick<DeviceUpdate, "street_id" | "street_number">
) => Promise<SupabaseResponse<Device, AuthSessionMissingError | PostgrestError>>;

export interface SupabaseContext extends SupabaseState {
    signinWithProvider: SigninWithProvider;
    signOut: SignOut;
    selectStreets: SelectStreets;
    insertStreet: InsertStreet;
    updateStreet: UpdateStreet;
    deleteStreet: DeleteStreet;
    selectDevices: SelectDevices;
    updateDevice: UpdateDevice;
}
