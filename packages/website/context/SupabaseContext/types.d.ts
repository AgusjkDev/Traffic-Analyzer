import { Session } from "@supabase/supabase-js";

export interface SupabaseState {
    session: Session | null;
}

export type Login = (email: string, password: string) => Promise<void>;
export type SignUp = (username: string, email: string, password: string) => Promise<void>;

export interface SupabaseContext extends SupabaseState {
    login: Login;
    signUp: SignUp;
}
