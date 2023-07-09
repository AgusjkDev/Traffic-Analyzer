import { useState, useCallback, useEffect, type PropsWithChildren } from "react";
import { useRouter, usePathname } from "next/navigation";

import { supabase } from "lib";
import SupabaseContext from "./SupabaseContext";
import type {
    SupabaseState,
    SigninWithProvider,
    SignOut,
    GetStreets,
    InsertStreets,
    DeleteStreet,
    UpdateStreetName,
} from "./types";

export default function SupabaseProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState<SupabaseState["session"]>(null);
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

    const getStreets: GetStreets = useCallback(async () => {
        if (!session) return null;

        const { data, error } = await supabase
            .from("streets")
            .select("*")
            .eq("user_id", session.user.id)
            .order("created_at", { ascending: true });

        console.log({ data, error });

        if (!data && error) {
            alert(error.message); // TODO: Create custom alert
            return null;
        }

        return data;
    }, [session]);

    const insertStreets: InsertStreets = async streetName => {
        if (!session) return null;

        const { data, error } = await supabase
            .from("streets")
            .insert({ name: streetName, user_id: session.user.id })
            .select("*")
            .single();

        if (!data && error) {
            alert(error.message); // TODO: Create custom alert
            return null;
        }

        return data;
    };

    const updateStreetName: UpdateStreetName = async (streetId, streetName) => {
        if (!session) return;

        const { data, error } = await supabase
            .from("streets")
            .update({ name: streetName })
            .eq("id", streetId);

        if (!data && error) {
            alert(error.message); // TODO: Create custom alert
        }
    };

    const deleteStreet: DeleteStreet = async streetId => {
        if (!session) return;

        const { data, error } = await supabase.from("streets").delete().eq("id", streetId);

        if (!data && error) {
            alert(error.message); // TODO: Create custom alert
        }
    };

    const handleAuthStateChange = useCallback(() => {
        supabase.auth.onAuthStateChange((authEvent, changedSession) => {
            setSession(changedSession);

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
        <SupabaseContext.Provider
            value={{
                session,
                signinWithProvider,
                signOut,
                getStreets,
                insertStreets,
                updateStreetName,
                deleteStreet,
            }}
        >
            {children}
        </SupabaseContext.Provider>
    );
}
