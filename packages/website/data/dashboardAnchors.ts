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
        href: "/dashboard/streets",
        label: "Calles",
        title: "Ir a las calles",
        svg: svgs.streets,
    },
    {
        href: "/dashboard/devices",
        label: "Dispositivos",
        title: "Ir a los dispositivos",
        svg: svgs.devices,
    },
    {
        href: "/dashboard/charts",
        label: "Gráficos",
        title: "Visitar los gráficos",
        svg: svgs.charts,
    },
    {
        href: "/dashboard/downloads",
        label: "Descargas",
        title: "Descargar los datos",
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
