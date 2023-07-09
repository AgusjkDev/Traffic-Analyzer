import type { Session, Provider } from "@supabase/supabase-js";
import type { Street } from "types/schemas";

export interface SupabaseState {
    session: Session | null;
}

export type SigninWithProvider = (provider: Provider) => Promise<void>;
export type SignOut = () => Promise<void>;
export type GetStreets = () => Promise<Street[] | null>;
export type InsertStreets = (streetName: string) => Promise<Street | null>;
export type UpdateStreetName = (streetId: string, streetName: string) => Promise<void>;
export type DeleteStreet = (streetId: string) => Promise<void>;

export interface SupabaseContext extends SupabaseState {
    signinWithProvider: SigninWithProvider;
    signOut: SignOut;
    getStreets: GetStreets;
    insertStreets: InsertStreets;
    updateStreetName: UpdateStreetName;
    deleteStreet: DeleteStreet;
}
