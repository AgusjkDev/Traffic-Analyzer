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
    {
        title: "Registrando dispositivos",
        paragraphs: [
            "Una vez hayas creado las calles, el siguiente paso es registrar los dispositivos a tu nombre.",
            "Sigue atentamente los siguientes pasos:",
            "1. Enciende tu Traffic Analyzer y conéctate a su red WiFi usando un dispositivo móvil.",
            "2. En un navegador, dirígete a 192.168.4.1 y luego ingresa las claves de la red WiFi a la que deseas conectar el dispositivo. Si ya has realizado este paso anteriormente, tu dispositivo ya tendrá un identificador único. Cópialo y guárdalo para las siguientes instrucciones.",
            "3. Una vez que tengas el identificador único, ve a la sección de dispositivos y completa los campos requeridos para el registro.",
            "¡Listo! Tu Traffic Analyzer debería funcionar correctamente ahora. Si tienes alguna duda, no dudes en contactarnos para recibir ayuda adicional.",
        ],
        anchor: {
            title: "¡Registrar dispositivos!",
            children: "Registrar dispositivos",
            href: "/dashboard/devices",
        },
    },
    {
        title: "Observando estadísticas",
        paragraphs: [
            "Al tener en funcionamiento tus dispositivos de Traffic Analyzer, solo te queda ver como han estado recolectando los datos de tu interés.",
            "Para tu fortuna, éstos datos los podrás observar en-tiempo-real dirigiéndote a la sección de gráficos.",
            "En dicha sección podrás seleccionar si filtrar por dispositivo, por calle o incluso rango de tiempo.",
        ],
        anchor: {
            title: "¡Ver estadísticas!",
            children: "Ver estadísticas",
            href: "/dashboard/charts",
        },
    },
];

export default dashboardCards;
