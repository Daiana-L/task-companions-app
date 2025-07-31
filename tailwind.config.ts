// tailwind.config.ts
import defaultTheme from "tailwindcss/defaultTheme";

const config = {
    content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
    theme: {
        screens: {
            xs: "360px",
            ...defaultTheme.screens,
        },
        extend: {},
    },
    plugins: [],
};

export default config;
