import "./globals.css";

export const metadata = {
    title: "Traffic Analyzer",
    description:
        "Traffic Analyzer: soluciona la congestión del tráfico en zonas urbanas con nuestro dispositivo de monitoreo de tráfico.",
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="es">
            <body>{children}</body>
        </html>
    );
}
