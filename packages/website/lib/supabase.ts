import { createClient } from "@supabase/supabase-js";

import type { Database } from "types/supabase";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

if (!URL || !API_KEY) {
    throw new Error(
        "NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_API_KEY not found in .env file!"
    );
}

const supabase = createClient<Database>(URL, API_KEY);

export default supabase;
