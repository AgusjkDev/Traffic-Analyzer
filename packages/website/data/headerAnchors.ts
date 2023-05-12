export interface HeaderAnchor {
    href: string;
    title: string;
    children: React.ReactNode;
}

const headerAnchors: HeaderAnchor[] = [
    {
        href: "/dashboard",
        title: "Ir al Dashboard",
        children: "Dashboard",
    },
];

export default headerAnchors;
