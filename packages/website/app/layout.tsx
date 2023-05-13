import { Lexend } from "next/font/google";

import { NavBar } from "components";

import "styles/globals.css";

export const metadata = {
    title: "Traffic Analyzer",
    description:
        "Traffic Analyzer: soluciona la congestión del tráfico en zonas urbanas con nuestro dispositivo de monitoreo de tráfico.",
};

// Should delete all unused weights.
const font = Lexend({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="es">
            <body className={font.className}>
                <NavBar />

                {children}
            </body>
        </html>
    );
}
