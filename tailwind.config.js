// tailwind.config.js
// This file uses CommonJS syntax (module.exports) for compatibility
// with Next.js and Tailwind CSS v3.

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
      },
      // Customize the @tailwindcss/typography plugin
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            // Ensure consistent list styling (bullet outside, text aligned)
            ul: {
              'list-style-position': 'outside', // Bullet outside the text block
              'margin-left': '1.25em', // Adjust indentation for bullet
              'padding-left': '0', // Ensure no extra padding from the list itself
              'li::marker': {
                'color': theme('colors.nozu-dark-grey'), // Match text color for bullet
              },
              'li p': { // Target paragraphs directly inside list items
                'margin-top': '0',
                'margin-bottom': '0',
                'display': 'inline', // Make paragraph inline to align with marker
              },
            },
            ol: {
              'list-style-position': 'outside', // Number outside the text block
              'margin-left': '1.25em', // Adjust indentation for number
              'padding-left': '0',
              'li::marker': {
                'color': theme('colors.nozu-dark-grey'), // Match text color for number
              },
              'li p': { // Target paragraphs directly inside list items
                'margin-top': '0',
                'margin-bottom': '0',
                'display': 'inline', // Make paragraph inline to align with marker
              },
            },
            // Control margin-top for headings within prose to ensure vertical alignment
            'h2': {
              'font-size': theme('fontSize.2xl'), // Ensure h2 is 2xl
              'margin-top': theme('spacing.6'), // Default top margin for h2 in prose (24px)
              'margin-bottom': theme('spacing.4'), // Default bottom margin for h2 in prose (16px)
            },
            'h2:first-of-type': { // Target the very first h2 in the prose content
              'margin-top': theme('spacing.0'), // Explicitly set margin-top to 0 for the first h2
            },
            'h3': {
              'font-size': theme('fontSize.xl'),
              'margin-top': theme('spacing.6'),
              'margin-bottom': theme('spacing.3'),
            },
            'h4': {
              'font-size': theme('fontSize.lg'),
              'margin-top': theme('spacing.4'),
              'margin-bottom': theme('spacing.2'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Add this line to include the typography plugin
  ],
  // IMPORTANT: Safelist dynamic classes so Tailwind generates them
  safelist: [
    // Header heights (from HeaderWrapper)
    'top-[43px]', // Mobile header height and mobile top for title bar
    'md:top-[92px]', // Desktop header height and desktop top for title bar

    // Sidebar top offsets (below header + title bar)
    // Mobile: 43px (header) + 68px (title bar actual height) = 111px
    'top-[111px]',
    // Desktop: 92px (header) + 68px (title bar actual height) = 160px
    'md:top-[160px]',

    // Heights for main content area (to create scrolling context for sticky elements)
    // Mobile: 100vh - 111px
    'h-[calc(100vh-111px)]',
    // Desktop: 100vh - 160px
    'md:h-[calc(100vh-160px)]',

    // Margin-top for article (to push content below sticky elements)
    // Mobile: 111px
    'mt-[111px]',
    // Desktop: 160px
    'md:mt-[160px]',

    // Max-height for sidebar (to allow internal scrolling if menu is too long)
    // Mobile: 100vh - 111px (same as parent div height)
    'max-h-[calc(100vh-111px)]',
    // Desktop: 100vh - 160px (same as parent div height)
    'md:max-h-[calc(100vh-160px)]',
  ],
};
