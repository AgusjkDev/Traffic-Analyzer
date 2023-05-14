import type { Provider } from "@supabase/supabase-js";

import { svgs } from "data";
import type { SVG } from "./svgs";

interface SigninWithProviderButton {
    displayName: string;
    provider: Provider;
    svg: SVG;
}

const signinWithProviderButtons: SigninWithProviderButton[] = [
    {
        displayName: "Google",
        provider: "google",
        svg: svgs.google,
    },
    {
        displayName: "GitHub",
        provider: "github",
        svg: svgs.github,
    },
    {
        displayName: "LinkedIn",
        provider: "linkedin",
        svg: svgs.linkedin,
    },
];

export default signinWithProviderButtons;
