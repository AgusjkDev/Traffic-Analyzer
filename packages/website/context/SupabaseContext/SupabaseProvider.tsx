"use client";
import { useState, useCallback, useEffect, type PropsWithChildren } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthSessionMissingError } from "@supabase/supabase-js";

import { supabase } from "lib";
import SupabaseContext from "./SupabaseContext";
import type {
    SupabaseState,
    SigninWithProvider,
    SignOut,
    SelectStreets,
    InsertStreet,
    DeleteStreet,
    UpdateStreet,
    SelectDevices,
    UpdateDevice,
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

        if (!error) return { success: true, data: undefined };

        return { success: false, error };
    };

    const signOut: SignOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (!error) return { success: true, data: undefined };

        return { success: false, error };
    };

    const selectStreets: SelectStreets = useCallback(async () => {
        if (!session) {
            return {
                success: false,
                error: new AuthSessionMissingError(),
            };
        }

        const { data, error } = await supabase
            .from("streets")
            .select("*")
            .eq("user_id", session.user.id)
            .order("created_at", { ascending: true });

        if (!error) return { success: true, data };

        return { success: false, error };
    }, [session]);

    const insertStreet: InsertStreet = async values => {
        if (!session) {
            return {
                success: false,
                error: new AuthSessionMissingError(),
            };
        }

        const { data, error } = await supabase
            .from("streets")
            .insert({ ...values, user_id: session.user.id })
            .select("*")
            .single();

        if (!error) return { success: true, data };

        return { success: false, error };
    };

    const updateStreet: UpdateStreet = async (streetId, values) => {
        if (!session) {
            return {
                success: false,
                error: new AuthSessionMissingError(),
            };
        }

        const { data, error } = await supabase
            .from("streets")
            .update(values)
            .eq("id", streetId)
            .select("*")
            .single();

        if (!error) return { success: true, data };

        return { success: false, error };
    };

    const deleteStreet: DeleteStreet = async streetId => {
        if (!session) {
            return {
                success: false,
                error: new AuthSessionMissingError(),
            };
        }

        const { error } = await supabase.from("streets").delete().eq("id", streetId);

        if (!error) return { success: true, data: undefined };

        return { success: false, error };
    };

    const selectDevices: SelectDevices = useCallback(async () => {
        if (!session) {
            return {
                success: false,
                error: new AuthSessionMissingError(),
            };
        }

        const { data, error } = await supabase
            .from("devices")
            .select("*")
            .eq("user_id", session.user.id)
            .order("created_at", { ascending: true });

        if (!error) return { success: true, data };

        return { success: false, error };
    }, [session]);

    const updateDevice: UpdateDevice = async (deviceId, update) => {
        if (!session) {
            return {
                success: false,
                error: new AuthSessionMissingError(),
            };
        }

        const { data, error } = await supabase
            .from("devices")
            .update({ ...update, user_id: session.user.id })
            .eq("id", deviceId)
            .select("*")
            .single();

        if (!error) return { success: true, data };

        return { success: false, error };
    };

    const handleAuthStateChange = useCallback(() => {
        supabase.auth.onAuthStateChange((authEvent, session) => {
            if (authEvent === "INITIAL_SESSION") {
                setSession(session);
                return setIsLoading(false);
            }

            if (authEvent === "SIGNED_OUT") {
                setSession(null);
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
                selectStreets,
                insertStreet,
                updateStreet,
                deleteStreet,
                selectDevices,
                updateDevice,
            }}
        >
            {children}
        </SupabaseContext.Provider>
    );
}
