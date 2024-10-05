import defaultTheme from 'tailwindcss/defaultTheme';
import { RadialGradientPlugin } from './plugins/tw-radial-gradient';

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{vue,html,js,ts}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Play"', ...defaultTheme.fontFamily.sans]
            },
            colors: {
                'drop-blue-300': '#081C2F',
                'drop-blue-800': '#305793',
                'drop-blue-900': '#031531'
            }
        },
    },
    plugins: [],
}

