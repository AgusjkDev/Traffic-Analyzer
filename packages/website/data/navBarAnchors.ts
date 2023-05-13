interface NavBarAnchors {
    href: string;
    title: string;
    children: React.ReactNode;
}

const navBarAnchors: NavBarAnchors[] = [
    {
        href: "/",
        title: "Ir al Inicio",
        children: "Inicio",
    },
    {
        href: "/dashboard",
        title: "Ir al Dashboard",
        children: "Dashboard",
    },
    {
        href: "/pricing",
        title: "Consulta los precios",
        children: "Costo",
    },
    {
        href: "/about",
        title: "Lee sobre nosotros",
        children: "Sobre Nosotros",
    },
];

export default navBarAnchors;
