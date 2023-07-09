interface DevicesActionTab {
    href: string;
    title: string;
    children: React.ReactNode;
}

const devicesActionTabs: DevicesActionTab[] = [
    {
        href: "/dashboard/devices/activate",
        title: "Activar dispositivos",
        children: "Activar",
    },
    {
        href: "/dashboard/devices/configure",
        title: "Configurar dispositivos",
        children: "Configurar",
    },
    {
        href: "/dashboard/devices/monitor",
        title: "Monitorear dispositivos",
        children: "Monitorear",
    },
];

export default devicesActionTabs;
