// tailwind.config.js
// This configuration uses Tailwind CSS v3 syntax (CommonJS module).

const { fontFamily } = require("tailwindcss/defaultTheme"); // Import default font families from Tailwind

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Specify files where Tailwind should look for classes
  // This is crucial for tree-shaking (removing unused CSS) in production.
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Extend Tailwind's default font families
      fontFamily: {
        // Set 'font-sans' to use the '--font-inter' CSS variable,
        // which is defined in globals.css via next/font/google.
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
      // Define your custom Nozu colors directly here with HSL values.
      // These will be used to generate Tailwind utility classes.
      colors: {
        'nozu-sky-blue': 'hsl(210, 29%, 91%)',
        'nozu-dark-grey': 'hsl(216, 15%, 20%)',
        'nozu-electric-blue': 'hsl(215, 100%, 50%)',
        'nozu-orange': 'hsl(30, 100%, 50%)',
        'nozu-lime-green-refined': 'hsl(100, 60%, 50%)',
        'nozu-medium-grey': 'hsl(217, 7%, 52%)',
        'nozu-darker-electric-blue': 'hsl(215, 100%, 40%)',
        'nozu-white': 'hsl(0, 0%, 100%)',
        'nozu-light-grey': 'hsl(210, 33%, 95%)',
        'nozu-magenta': 'hsl(330, 70%, 53%)',
        'nozu-golden-yellow': 'hsl(45, 100%, 50%)',
        'nozu-deep-teal': 'hsl(180, 50%, 25%)',
      }
    },
  },
  plugins: [], // Any Tailwind plugins you might use go here
};
