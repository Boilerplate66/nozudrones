// This component is a Server Component as it has no client-side interactivity

import React from 'react';

export default function FooterWrapper() {
  // Placeholder product data for the footer links
  // In a real app, these might come from a global context or API
  const products = [
    { name: "Beginner Drones", link: "/products/beginner" },
    { name: "Professional Drones", link: "/products/professional" },
    { name: "Accessories", link: "/products/accessories" },
    { name: "Services", link: "/services" }, // Corrected link from /products/services
  ];

  return (
    // Footer Section
    <footer className="text-center text-sm text-nozu-medium-grey py-8 bg-nozu-white relative z-10 mt-auto shadow-xl">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left mb-12">
          {/* Column 1: Products */}
          <div>
            <h3 className="text-lg font-semibold text-nozu-dark-grey mb-4">Products</h3>
            <ul className="space-y-2">
              <li><a href="/products/beginner" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">Beginner Drones</a></li>
              <li><a href="/products/professional" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">Professional Drones</a></li>
              <li><a href="/products/accessories" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">Accessories</a></li>
              <li><a href="/services" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">Services</a></li>
            </ul>
          </div>

          {/* Column 2: About Us */}
          <div>
            <h3 className="text-lg font-semibold text-nozu-dark-grey mb-4">About Us</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">About Us</a></li>
              <li><a href="/about-nozu" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">About Nozu</a></li>
              <li><a href="/contact" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">Contact Us</a></li>
              <li><a href="/faq" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">FAQ</a></li>
              <li><a href="/downloads" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">Warranty & Repair</a></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-lg font-semibold text-nozu-dark-grey mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="/terms" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">Terms of Service</a></li>
              <li><a href="/cookies" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">Cookie Settings</a></li>
              <li><a href="/disclaimer" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">Disclaimer</a></li>
              <li><a href="/sitemap.xml" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">Sitemap</a></li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h3 className="text-lg font-semibold text-nozu-dark-grey mb-4">Connect</h3>
            <div className="flex space-x-4 mb-6">
              {/* Email Icon (Inline SVG) - Corrected mailto link */}
              <a href="mailto:hello@nozudrones.co.uk" aria-label="Email Us" className="text-nozu-dark-grey hover:text-nozu-electric-blue transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
              {/* X (Twitter) Icon (Inline SVG) - Corrected SVG for X logo */}
              <a href="https://x.com/nozudrones" target="_blank" rel="noopener noreferrer" aria-label="Follow us on X" className="text-nozu-dark-grey hover:text-nozu-electric-blue transition-colors duration-200">
                <svg role="img" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6">
                  <title>X</title>
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>
              {/* YouTube Icon (Inline SVG) - Corrected SVG for YouTube logo */}
              <a href="https://www.youtube.com/@nozudrones" target="_blank" rel="noopener noreferrer" aria-label="Subscribe to our YouTube channel" className="text-nozu-dark-grey hover:text-nozu-electric-blue transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M19.61 5.09A2.99 2.99 0 0 0 17.51 3C15.7 2.5 12 2.5 12 2.5s-3.7 0-5.51.59A2.99 2.99 0 0 0 4.39 5.09C3.8 6.9 3.8 12 3.8 12s0 5.1.59 6.91A2.99 2.99 0 0 0 6.49 21c1.81.5 5.51.5 5.51.5s3.7 0 5.51-.59A2.99 2.99 0 0 0 19.61 18.91C20.2 17.1 20.2 12 20.2 12s0-5.1-.59-6.91zM9.91 15.48V8.52L15.21 12l-5.3 3.48z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <p className="mb-10 text-base border-t border-nozu-light-grey pt-8 mt-8">
          &copy; {new Date().getFullYear()} NozuDrones. All rights reserved. {" "}
          <span className="font-semibold text-nozu-medium-grey">Authored by The Nozu Team.</span>
        </p>
      </div>
    </footer>
  );
}
