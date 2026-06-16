import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-public-sans)', 'Public Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        floren: {
          primary: '#313030',
          secondary: '#454742',
          accent: '#b8f9d3',
          lavender: '#dfe1fa',
          neutral: '#605e58',
          bg: '#fcf8f7',
          surface: '#f7f3f2',
          card: '#f0ece4',
          'card-alt': '#e6e2da',
          border: '#c6c7c0',
          text: '#1c1b1b',
          'text-muted': '#767872',
          'text-body': '#454742',
          light: '#f4f0ef',
          error: '#b4413c',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.4s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
