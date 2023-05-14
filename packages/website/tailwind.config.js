import colors from "tailwindcss/colors";

/** @type {import("tailwindcss").Config} */
module.exports = {
    content: ["./**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: colors.neutral[700],
            },
        },
    },
    plugins: [],
};
