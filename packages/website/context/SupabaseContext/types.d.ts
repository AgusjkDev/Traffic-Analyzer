import type { Session, User, Provider } from "@supabase/supabase-js";

export interface SupabaseState {
    session: Session | null;
    user: User | null;
}

export type SigninWithProvider = (provider: Provider) => Promise<void>;
export type SignOut = () => Promise<void>;

export interface SupabaseContext extends SupabaseState {
    signinWithProvider: SigninWithProvider;
    signOut: SignOut;
}
