import { useState } from "react";

import SupabaseContext from "./SupabaseContext";
import type { SupabaseState, Login, SignUp } from "./types";

interface SupabaseProviderProps {
    children: React.ReactNode;
}

export default function SupabaseProvider({ children }: SupabaseProviderProps) {
    const [session, setSession] = useState<SupabaseState["session"] | null>(null);

    const login: Login = async (email, password) => {
        console.log(`Login: ${email}:${password}`);
    };

    const signUp: SignUp = async (username, email, password) => {
        console.log(`Sign Up: ${username}:${email}:${password}`);
    };

    return (
        <SupabaseContext.Provider value={{ session, login, signUp }}>
            {children}
        </SupabaseContext.Provider>
    );
}
