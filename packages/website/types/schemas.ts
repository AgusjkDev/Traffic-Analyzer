import type { Database } from "./supabase";

export type Street = Database["public"]["Tables"]["streets"]["Row"];
