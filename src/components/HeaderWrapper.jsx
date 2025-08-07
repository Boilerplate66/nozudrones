// src/components/HeaderWrapper.jsx
"use client"; // This component contains client-side interactivity

import React, { useState } from 'react';
import NozuLogo from './NozuLogo'; // Corrected path: NozuLogo is now in the same directory (src/components)
import Link from 'next/link'; // Import Link for client-side navigation

export default function HeaderWrapper() {
  const [isMobileMenuOpen, setIsMobileMenuMenuOpen] = useState(false); // State for mobile menu visibility

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuMenuOpen(!isMobileMenuOpen);
  };

  return (
    // Header Section: Sticky at the top, semi-transparent with blur effect, straight bottom
    <header className="px-2 py-1 md:px-12 md:py-3 flex items-center justify-between bg-nozu-white bg-opacity-90 shadow-xl backdrop-blur-sm sticky top-0 z-50">

      {/* Left Section: Mobile Hamburger OR Desktop Logo/Name/Strapline */}
      <div className="flex items-center flex-shrink-0">
        {/* Hamburger for mobile (visible only on md:hidden) */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-nozu-dark-grey focus:outline-none focus:ring-2 focus:ring-nozu-electric-blue rounded-md p-0 flex items-center justify-center"
            aria-expanded={isMobileMenuOpen} // Accessibility: indicates if menu is expanded
            aria-controls="mobile-menu-overlay" // Accessibility: links to the menu element
          >
            <svg className="w-9 h-9 block align-middle" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Desktop Logo and Name/Strapline Group (hidden on mobile) */}
        <div className="hidden md:flex items-end space-x-6"> {/* Use items-end for desktop alignment */}
          {/* Use Link for internal navigation */}
          <Link href="/" aria-label="NozuDrones Home">
            <NozuLogo width={144} height={62} /> {/* Desktop size */}
          </Link>
          <div>
            <h1 className="text-4xl font-extrabold text-nozu-dark-grey mt-1">NozuDrones</h1>
            <p className="text-base text-nozu-medium-grey italic mt-0">Your UK Drone Companion</p>
          </div>
        </div>
      </div>

      {/* Center Section: Mobile Logo (visible only on mobile, centered) / Desktop Nav (centered) */}
      <div className="flex-grow flex items-center justify-center md:justify-center">
        {/* Mobile Logo (visible only on mobile) */}
        <div className="md:hidden">
          {/* Use Link for internal navigation */}
          <Link href="/" aria-label="NozuDrones Home">
            <NozuLogo width={80} height={35} />
          </Link>
        </div>

        {/* Desktop Navigation (hidden on mobile) */}
        <nav className="hidden md:block">
          <ul className="flex space-x-14 text-nozu-dark-grey font-semibold text-lg">
            {/* Removed 'Drone Reviews' */}
            <li className="min-w-0"><Link href="/guides" className="hover:text-nozu-electric-blue transition-colors duration-200">Buying Guides</Link></li>
            <li className="min-w-0"><Link href="/laws" className="hover:text-nozu-electric-blue transition-colors duration-200">UK Drone Laws</Link></li>
            <li className="min-w-0"><Link href="/safety" className="hover:text-nozu-electric-blue transition-colors duration-200">Safety Tips</Link></li>
            <li className="min-w-0"><Link href="/faqs" className="hover:text-nozu-electric-blue transition-colors duration-200">FAQs</Link></li> {/* Added 'FAQs' */}
            <li className="min-w-0"><Link href="/about" className="hover:text-nozu-electric-blue transition-colors duration-200">About Us</Link></li>
            <li className="min-w-0"><Link href="/contact" className="hover:text-nozu-electric-blue transition-colors duration-200">Contact</Link></li>
          </ul>
        </nav>
      </div>

      {/* Right Section: Search Icon (always on the right) */}
      <div className="flex items-center flex-shrink-0">
        <button className="text-nozu-dark-grey focus:outline-none focus:ring-2 focus:ring-nozu-electric-blue rounded-md p-0">
          {/* Search Icon SVG */}
          <svg className="w-9 h-9 block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay (full screen) */}
      {isMobileMenuOpen && (
        <div id="mobile-menu-overlay" className="md:hidden absolute top-0 left-0 w-full h-screen bg-nozu-white bg-opacity-95 backdrop-blur-md z-40 flex flex-col items-center justify-center space-y-8">
          <button onClick={toggleMobileMenu} className="absolute top-4 right-4 text-nozu-dark-grey focus:outline-none focus:ring-2 focus:ring-nozu-electric-blue rounded-md p-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <ul className="flex flex-col space-y-6 text-nozu-dark-grey font-semibold text-2xl">
            {/* Removed 'Drone Reviews' from mobile menu */}
            <li><Link href="/guides" onClick={toggleMobileMenu} className="hover:text-nozu-electric-blue transition-colors duration-200">Buying Guides</Link></li>
            <li><Link href="/laws" onClick={toggleMobileMenu} className="hover:text-nozu-electric-blue transition-colors duration-200">UK Drone Laws</Link></li>
            <li><Link href="/safety" onClick={toggleMobileMenu} className="hover:text-nozu-electric-blue transition-colors duration-200">Safety Tips</Link></li>
            <li><Link href="/faqs" onClick={toggleMobileMenu} className="hover:text-nozu-electric-blue transition-colors duration-200">FAQs</Link></li> {/* Added 'FAQs' to mobile menu */}
            <li><Link href="/about" onClick={toggleMobileMenu} className="hover:text-nozu-electric-blue transition-colors duration-200">About Us</Link></li>
            <li><Link href="/contact" onClick={toggleMobileMenu} className="hover:text-nozu-electric-blue transition-colors duration-200">Contact</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
}