import type { Database } from "./supabase";

export type Street = Database["public"]["Tables"]["streets"]["Row"];
export type StreetInsert = Database["public"]["Tables"]["streets"]["Insert"];
export type StreetUpdate = Database["public"]["Tables"]["streets"]["Update"];
export type Device = Database["public"]["Tables"]["devices"]["Row"];
export type DeviceUpdate = Database["public"]["Tables"]["devices"]["Update"];
