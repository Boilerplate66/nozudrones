// postcss.config.js
// This configuration is standard for Tailwind CSS v3 with PostCSS,
// now correctly using CommonJS syntax (module.exports) for compatibility
// with Next.js 15's requirements for this file.

module.exports = {
  plugins: {
    tailwindcss: {}, // This plugin processes Tailwind directives
    autoprefixer: {}, // This plugin adds vendor prefixes for broader browser compatibility
  },
};
