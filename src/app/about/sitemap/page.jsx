/* src/app/about/sitemap/page.jsx */

"use client";

import React from 'react';
import Link from 'next/link';

// The data for the sitemap, structured in a tree-like format.
// This is the single source of truth for all sitemap links.
const sitemapData = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Products",
    path: "/products",
    children: [
      { name: "Beginner Drones", path: "/products/beginner" },
      { name: "Professional Drones", path: "/products/professional" },
      { name: "Accessories", path: "/products/accessories" },
    ],
  },
  {
    name: "Services",
    path: "/services",
  },
  {
    name: "About Us",
    path: "/about",
    children: [
      { name: "About Nozu", path: "/about-nozu" },
      { name: "Contact Us", path: "/contact" },
      {
        name: "FAQ",
        path: "/faq",
        children: [
            { name: "Payments", path: "/faq/payments" },
            { name: "Shipping", path: "/faq/shipping" },
        ],
      },
      { name: "Warranty & Repair", path: "/downloads" },
      { name: "Sitemap", path: "/about/sitemap" },
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

// Recursive component to render the sitemap hierarchy
function RecursiveSitemap({ items, level = 0 }) {
  const isExternal = (path) => path.startsWith('http') || path.startsWith('mailto:');
  
  return (
    <ul className={`list-none ${level > 0 ? `pl-${level * 4}` : ''}`}>
      {items.map((item) => (
        <li key={item.path} className="my-2">
          {isExternal(item.path) ? (
            <a href={item.path} target="_blank" rel="noopener noreferrer" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">
              {item.name}
            </a>
          ) : (
            <Link href={item.path} className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">
              {item.name}
            </Link>
          )}
          {item.children && item.children.length > 0 && (
            <RecursiveSitemap items={item.children} level={level + 1} />
          )}
        </li>
      ))}
    </ul>
  );
}

export default function SitemapPage() {
  return (
    <div className="bg-nozu-white text-nozu-dark-grey p-6 md:p-10 lg:p-12 min-h-[calc(100vh-190px)]">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6">Website Sitemap</h1>
      <p className="text-lg text-nozu-medium-grey mb-8">
        This page provides a complete overview of all the pages on our website.
      </p>
      <nav aria-label="Website Sitemap">
        <RecursiveSitemap items={sitemapData} />
      </nav>
    </div>
  );
}