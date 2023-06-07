"use client";
import type { PropsWithChildren } from "react";

import { SupabaseProvider } from "context";

export default function LoginLayout({ children }: PropsWithChildren) {
    return <SupabaseProvider>{children}</SupabaseProvider>;
}
