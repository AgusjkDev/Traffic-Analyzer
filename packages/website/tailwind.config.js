import colors from "tailwindcss/colors";

/** @type {import("tailwindcss").Config} */
module.exports = {
    content: ["./**/*.{ts,tsx}", "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: colors.neutral[500],
                    DEFAULT: colors.neutral[700],
                },
                secondary: {
                    DEFAULT: colors.emerald[600],
                    dark: colors.emerald[700],
                },
            },
            maxWidth: {
                "prose-lg": "75ch",
            },
        },
    },
    plugins: [],
};
