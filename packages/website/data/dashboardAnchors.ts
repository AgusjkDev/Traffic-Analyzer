import { svgs } from "data";
import type { SVG } from "./svgs";

interface DashboardAnchor {
    href: string;
    label: string;
    title: string;
    svg: SVG;
}

const dashboardAnchors: DashboardAnchor[] = [
    {
        href: "/dashboard",
        label: "Dashboard",
        title: "Ir al Dasboard",
        svg: svgs.home,
    },
    {
        href: "/dashboard/charts",
        label: "Gráficos",
        title: "Visita los gráficos",
        svg: svgs.charts,
    },
    {
        href: "/dashboard/downloads",
        label: "Descargas",
        title: "Descarga los datos",
        svg: svgs.download,
    },
    {
        href: "/dashboard/settings",
        label: "Ajustes",
        title: "Cambia los ajustes",
        svg: svgs.settings,
    },
];

export default dashboardAnchors;
