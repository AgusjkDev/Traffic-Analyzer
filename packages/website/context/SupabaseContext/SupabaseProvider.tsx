import { useState, useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { supabase } from "lib";
import SupabaseContext from "./SupabaseContext";
import type { SupabaseState, SigninWithProvider, SignOut } from "./types";

interface SupabaseProviderProps {
    children: React.ReactNode;
}

export default function SupabaseProvider({ children }: SupabaseProviderProps) {
    const [session, setSession] = useState<SupabaseState["session"]>(null);
    const [user, setUser] = useState<SupabaseState["user"]>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    const signinWithProvider: SigninWithProvider = async provider => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${location.origin}/dashboard`,
            },
        });

        if (error) {
            alert(error.message); // TODO: Create custom alert
        }
    };

    const signOut: SignOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            alert(error.message); // TODO: Create custom alert
        }
    };

    const handleAuthStateChange = useCallback(() => {
        supabase.auth.onAuthStateChange((authEvent, changedSession) => {
            setSession(changedSession);
            setUser(changedSession?.user ?? null);

            if (authEvent === "INITIAL_SESSION") {
                return setIsLoading(false);
            }

            if (authEvent === "SIGNED_OUT") {
                router.push("/");
            }
        });
    }, []);

    useEffect(() => {
        handleAuthStateChange();
    }, []);

    useEffect(() => {
        if (isLoading) return;

        if (session && pathname === "/login") {
            return router.push("/");
        }

        if (!session && pathname !== "/login") {
            router.push("/login");
        }
    }, [isLoading, pathname]);

    return (
        <SupabaseContext.Provider value={{ session, user, signinWithProvider, signOut }}>
            {children}
        </SupabaseContext.Provider>
    );
}
