import { useState, useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import SupabaseContext from "./SupabaseContext";
import { supabase } from "lib";
import type { SupabaseState, Login, SignUp } from "./types";

interface SupabaseProviderProps {
    children: React.ReactNode;
}

export default function SupabaseProvider({ children }: SupabaseProviderProps) {
    const [session, setSession] = useState<SupabaseState["session"] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    const login: Login = async (email, password) => {
        console.log(`Login: ${email}:${password}`);
    };

    const signUp: SignUp = async (username, email, password) => {
        console.log(`Sign Up: ${username}:${email}:${password}`);
    };

    const getSession = useCallback(async () => {
        const { data, error } = await supabase.auth.getSession();
        const { session: storedSession } = data;

        if (!error && storedSession) setSession(storedSession);

        setIsLoading(false);
    }, []);

    const handleAuthStateChange = useCallback(() => {
        supabase.auth.onAuthStateChange((_, changedSession) => {
            if (!changedSession) {
                setSession(changedSession);
            }
        });
    }, []);

    useEffect(() => {
        getSession();
        handleAuthStateChange();
    }, []);

    useEffect(() => {
        if (isLoading) return;

        if (!session && pathname !== "/login") {
            router.push("/login");
        }
    }, [isLoading]);

    return (
        <SupabaseContext.Provider value={{ session, login, signUp }}>
            {children}
        </SupabaseContext.Provider>
    );
}
