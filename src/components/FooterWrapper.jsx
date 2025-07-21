// src/components/FooterWrapper.jsx
// This component is a Server Component as it has no client-side interactivity

import React from 'react';
import Link from 'next/link'; // Import Link for internal navigation

export default function FooterWrapper() {
  // Placeholder product data for the footer links (not directly used in JSX now, but kept for context)
  const products = [
    { name: "Beginner Drones", link: "/products/beginner" },
    { name: "Professional Drones", link: "/products/professional" },
    { name: "Accessories", link: "/products/accessories" },
    { name: "Services", link: "/services" },
  ];

  return (
    // Footer Section
    <footer className="text-center text-sm text-nozu-medium-grey py-8 bg-nozu-white relative z-10 shadow-xl">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left mb-12">
          {/* Column 1: Products */}
          <div>
            <h3 className="text-lg font-semibold text-nozu-dark-grey mb-4">Products</h3>
            <ul className="space-y-2">
              {/* Use Link for internal navigation */}
              <li><Link href="/products/beginner" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">Beginner Drones</Link></li>
              <li><Link href="/products/professional" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">Professional Drones</Link></li>
              <li><Link href="/products/accessories" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">Accessories</Link></li>
              <li><Link href="/services" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">Services</Link></li>
            </ul>
          </div>

          {/* Column 2: About Us */}
          <div>
            <h3 className="text-lg font-semibold text-nozu-dark-grey mb-4">About Us</h3>
            <ul className="space-y-2">
              {/* Use Link for internal navigation */}
              <li><Link href="/about" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">About Us</Link></li>
              <li><Link href="/about-nozu" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">About Nozu</Link></li>
              <li><Link href="/contact" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">Contact Us</Link></li>
              <li><Link href="/faq" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">FAQ</Link></li>
              <li><Link href="/downloads" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">Warranty & Repair</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-lg font-semibold text-nozu-dark-grey mb-4">Legal</h3>
            <ul className="space-y-2">
              {/* Use Link for internal navigation */}
              <li><Link href="/privacy" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">Cookie Settings</Link></li>
              <li><Link href="/disclaimer" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">Disclaimer</Link></li>
              <li><Link href="/sitemap.xml" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">Sitemap</Link></li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h3 className="text-lg font-semibold text-nozu-dark-grey mb-4">Connect</h3>
            <div className="flex space-x-4 mb-6">
              {/* Email Icon (Inline SVG) - Mailto link does not use Next.js Link */}
              <a href="mailto:hello@nozudrones.co.uk" aria-label="Email Us" className="text-nozu-dark-grey hover:text-nozu-electric-blue transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
              {/* X (Twitter) Icon (Inline SVG) - External link does not use Next.js Link */}
              <a href="https://x.com/nozudrones" target="_blank" rel="noopener noreferrer" aria-label="Follow us on X" className="text-nozu-dark-grey hover:text-nozu-electric-blue transition-colors duration-200">
                <svg role="img" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6">
                  <title>X</title>
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>
              {/* YouTube Icon (Inline SVG) - External link does not use Next.js Link */}
              <a href="https://www.youtube.com/@nozudrones" target="_blank" rel="noopener noreferrer" aria-label="Subscribe to our YouTube channel" className="text-nozu-dark-grey hover:text-nozu-electric-blue transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M19.61 5.09A2.99 2.99 0 0 0 17.51 3C15.7 2.5 12 2.5 12 2.5s-3.7 0-5.51.59A2.99 2.99 0 0 0 4.39 5.09C3.8 6.9 3.8 12 3.8 12s0 5.1.59 6.91A2.99 2.99 0 0 0 6.49 21c1.81.5 5.51.5 5.51.5s3.7 0 5.51-.59A2.99 2.99 0 0 0 19.61 18.91C20.2 17.1 20.2 12 20.2 12s0-5.1-.59-6.91zM9.91 15.48V8.52L15.21 12l-5.3 3.48z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <p className="mb-10 text-base border-t border-nozu-light-grey pt-8 mt-8">
          © {new Date().getFullYear()} NozuDrones. All rights reserved. {" "}
          <span className="font-semibold text-nozu-medium-grey">Authored by The Nozu Team.</span>
        </p>
      </div>
    </footer>
  );
}