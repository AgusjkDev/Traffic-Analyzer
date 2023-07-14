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
            keyframes: {
                timer: {
                    "0%": {
                        "clip-path": "inset(0 0 0 0)",
                    },
                    "100%": {
                        "clip-path": "inset(0 100% 0 0)",
                    },
                },
            },
            animation: {
                timer: "timer 5s linear forwards",
            },
            boxShadow: {
                input: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
            },
        },
    },
    plugins: [],
};
