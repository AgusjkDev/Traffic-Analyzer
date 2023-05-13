interface NavBarAnchors {
    href: string;
    title: string;
    children: React.ReactNode;
}

const navBarAnchors: NavBarAnchors[] = [
    {
        href: "/dashboard",
        title: "Ir al Dashboard",
        children: "Dashboard",
    },
    {
        href: "/profile",
        title: "Ir al Perfil",
        children: "Perfil",
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
