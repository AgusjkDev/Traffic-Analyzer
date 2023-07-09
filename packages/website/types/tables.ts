import type { Database } from "./supabase";

export type Streets = Database["public"]["Tables"]["streets"]["Row"][];
