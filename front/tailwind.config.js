import defaultTheme from 'tailwindcss/defaultTheme';
import { RadialGradientPlugin } from './plugins/tw-radial-gradient';

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{vue,html,js,ts}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Unbounded"', ...defaultTheme.fontFamily.sans]
            },
            colors: {
                'sol-400': '#86EFAC',
            }
        },
    },
    plugins: [],
}

