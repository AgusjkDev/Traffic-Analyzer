interface DashboardCard {
    title: string;
    paragraphs: string[];
    anchor: {
        title: string;
        children: string;
        href: string;
    };
}

const dashboardCards: DashboardCard[] = [
    {
        title: "¡Comenzando!",
        paragraphs: [
            "Para empezar a utilizar los servicios de Traffic Analyzer deberás añadir calles y también registrar los dispositivos a tu propiedad.",
            "Te recomendamos seguir todos los tutoriales paso a paso para poder utilizar correctamente nuestro dispositivo.",
        ],
        anchor: {
            title: "¡Empezar ahora!",
            children: "Empezar ahora",
            href: "/dashboard/streets",
        },
    },
];

export default dashboardCards;
