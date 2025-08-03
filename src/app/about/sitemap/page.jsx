/* src/app/about/sitemap/page.jsx */

"use client";

import React from 'react';
import Link from 'next/link';

// The data for the sitemap, structured in a simple list format.
// This data now includes placeholder child pages to demonstrate the hierarchy.
const sitemapData = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Drone Reviews",
    path: "/reviews",
    children: [
      { name: "Dummy 1", path: "/reviews/dummy1" },
      { name: "Dummy 2", path: "/reviews/dummy2" },
    ],
  },
  {
    name: "Buying Guides",
    path: "/guides",
  },
  {
    name: "UK Drone Laws",
    path: "/laws",
  },
  {
    name: "Safety Tips",
    path: "/safety",
  },
  {
    name: "About Us",
    path: "/about",
    children: [
      { name: "Sitemap", path: "/about/sitemap" },
      { name: "Contact", path: "/contact" },
    ],
  },
  {
    name: "Legal",
    path: "/legal",
    children: [
      { name: "Privacy Policy", path: "/legal/privacy-policy" },
      { name: "Terms of Service", path: "/legal/terms-of-service" },
      { name: "Cookie Settings", path: "/legal/cookies" },
      { name: "Disclaimer", path: "/legal/disclaimer" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="font-sans antialiased bg-nozu-white text-nozu-dark-grey">
      {/* Sticky Title Bar */}
      <div className="sticky top-[43px] md:top-[92px] w-full z-40 bg-nozu-dark-grey text-white py-4 px-6 md:px-10 lg:px-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center">Website Sitemap</h1>
      </div>

      <div className="flex flex-col md:flex-row min-h-[calc(100vh-190px)]">
        {/* Main Content Area */}
        <div className="flex-grow bg-nozu-white p-6 md:p-10 lg:p-12">
          <p className="text-lg text-nozu-medium-grey mb-8">
            This page provides a complete overview of all the pages on our website.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sitemapData.map((section) => (
              <div key={section.name}>
                <h2 className="text-xl font-semibold mb-4 text-nozu-dark-grey">{section.name}</h2>
                <ul className="space-y-2">
                  {section.path && (
                    <li>
                      <Link href={section.path} className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">
                        {section.name}
                      </Link>
                    </li>
                  )}
                  {section.children && section.children.map((child) => (
                    <li key={child.path}>
                      <Link href={child.path} className="pl-4 text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}