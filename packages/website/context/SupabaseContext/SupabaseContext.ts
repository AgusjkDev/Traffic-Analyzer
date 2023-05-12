import { createContext } from "react";

import type { SupabaseContext as ISupabaseContext } from "./types";

const SupabaseContext = createContext({} as ISupabaseContext);

export default SupabaseContext;
