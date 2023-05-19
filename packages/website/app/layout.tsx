import { Lexend } from "next/font/google";

import { Heading } from "components";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <body className={`text-primary ${font.className}`}>
                <Heading />

                {children}
            </body>
        </html>
    );
}
