"use client"; // This directive marks the component as a Client Component

import React, { useState, useRef, useEffect } from 'react'; // Import useState, useRef, and useEffect
// Removed: import { Mail, X, Youtube } from 'lucide-react'; // Import Lucide React icons

import NozuLogo from '../../components/NozuLogo'; // This path is correct for your local setup (from src/app to components)

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuMenuOpen] = useState(false); // State for mobile menu visibility
  const videoRef = useRef(null); // Create a ref for the video element

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuMenuOpen(!isMobileMenuOpen);
  };

  // useEffect to set video playback speed after component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75; // Set playback rate to 0.75x speed
    }
  }, []); // Empty dependency array ensures this runs only once after initial render

  // Define the bold accent colors for the palette display (all 6)
  const nozuAccentPalette = [
    { name: 'Nozu Orange', className: 'bg-nozu-orange', textColor: 'text-white' },
    { name: 'Nozu Lime Green', className: 'bg-nozu-lime-green-refined', textColor: 'text-white' },
    { name: 'Nozu Electric Blue', className: 'bg-nozu-electric-blue', textColor: 'text-white' },
    { name: 'Nozu Magenta', className: 'bg-nozu-magenta', textColor: 'text-white' },
    { name: 'Nozu Golden Yellow', className: 'bg-nozu-golden-yellow', textColor: 'text-white' },
    { name: 'Nozu Deep Teal', className: 'bg-nozu-deep-teal', textColor: 'text-white' },
  ];

  // Placeholder product data for the new section
  const products = [
    { name: "Beginner Drones", link: "/products/beginner" },
    { name: "Professional Drones", link: "/products/professional" },
    { name: "Accessories", link: "/products/accessories" },
    { name: "Services", link: "/products/services" },
  ];

  // Favicon sizes and their typical uses - UPDATED
  const faviconSizes = [
    { size: 16, use: "Browser tab, address bar, bookmark icon" },
    { size: 20, use: "Chrome App Icon (macOS), some browser contexts" }, // Added 20x20
    { size: 28, use: "Chrome App Icon (Windows), some browser contexts" }, // Added 28x28
    { size: 32, use: "Taskbar icon (Windows), larger browser tab, desktop shortcut" },
    { size: 48, use: "Desktop shortcut (Windows), general purpose" },
    { size: 64, use: "Higher resolution desktop icons" },
    { size: 128, use: "Larger desktop shortcuts, general purpose" },
    { size: 180, use: "Apple Touch Icon (iOS 'Add to Home Screen')" },
    // Removed 192 and 512 as requested
  ];

  // Inline SVG for the Nozu thought bubble icon (for favicons without text)
  // This uses the exact path data from your NozuLogo but omits the <text> element.
  const NozuBubbleIconSVG = ({ size, className, ...props }) => (
    <svg
      width={size}
      height={size}
      viewBox="9.433704 9.767896995708155 320.409018 138.09785407725323"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink" // Note: xmlns:xlink is written as xmlnsXlink in React JSX
      overflow="hidden"
      className={`${className} text-nozu-dark-grey`} // Apply electric blue color
      aria-label="NozuDrones Bubble Icon"
      {...props} // Pass any other props
    >
      <g>
        <path d="M10.638 125.860C10.638 114.538 24.293 105.360 41.138 105.360 57.983 105.360 71.638 114.538 71.638 125.860 71.638 137.182 57.983 146.360 41.138 146.360 24.293 146.360 10.638 137.182 10.638 125.860Z" fill="currentColor" fillRule="evenodd"/>
        <path d="M55.638 77.860C55.638 41.133 116.751 11.360 192.138 11.360 267.525 11.360 328.638 41.133 328.638 77.860 328.638 114.587 267.525 144.360 192.138 144.360 116.751 144.360 55.638 114.587 55.638 77.860Z" fill="currentColor" fillRule="evenodd"/>
        {/* The 'Nozu' text element is intentionally omitted here */}
      </g>
    </svg>
  );


  return (
    // Main Container: Overall layout, background fallback, and font styling
    <div className="relative min-h-screen font-sans antialiased bg-nozu-sky-blue text-nozu-dark-grey">

      {/* Content Wrapper: This div now handles its own scrolling and contains the header, main, and footer */}
      <div className="relative z-10 flex flex-col h-screen overflow-y-auto">

        {/* Header Section: Sticky at the top, semi-transparent with blur effect, straight bottom */}
        <header className="px-2 py-1 md:px-12 md:py-3 flex items-center justify-between bg-nozu-white bg-opacity-90 shadow-xl backdrop-blur-sm sticky top-0 z-50">

          {/* Left Section: Mobile Hamburger OR Desktop Logo/Name/Strapline */}
          <div className="flex items-center flex-shrink-0">
            {/* Hamburger for mobile (visible only on md:hidden) */}
            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className="text-nozu-dark-grey focus:outline-none focus:ring-2 focus:ring-nozu-electric-blue rounded-md p-0 flex items-center justify-center">
                <svg className="w-9 h-9 block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>

            {/* Desktop Logo and Name/Strapline Group (hidden on mobile) */}
            <div className="hidden md:flex items-end space-x-6"> {/* Use items-end for desktop alignment */}
              <a href="/" aria-label="NozuDrones Home">
                <NozuLogo width={144} height={62} /> {/* Desktop size */}
              </a>
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
              <a href="/" aria-label="NozuDrones Home">
                <NozuLogo width={80} height={35} />
              </a>
            </div>

            {/* Desktop Navigation (hidden on mobile) */}
            <nav className="hidden md:block">
              <ul className="flex space-x-14 text-nozu-dark-grey font-semibold text-lg">
                <li><a href="/reviews" className="hover:text-nozu-electric-blue transition-colors duration-200">Drone Reviews</a></li>
                <li><a href="/guides" className="hover:text-nozu-electric-blue transition-colors duration-200">Buying Guides</a></li>
                <li><a href="/laws" className="hover:text-nozu-electric-blue transition-colors duration-200">UK Drone Laws</a></li>
                <li><a href="/safety" className="hover:text-nozu-electric-blue transition-colors duration-200">Safety Tips</a></li>
                <li><a href="/about" className="hover:text-nozu-electric-blue transition-colors duration-200">About Us</a></li>
                <li><a href="/contact" className="hover:text-nozu-electric-blue transition-colors duration-200">Contact</a></li>
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
            <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-nozu-white bg-opacity-95 backdrop-blur-md z-40 flex flex-col items-center justify-center space-y-8">
              <button onClick={toggleMobileMenu} className="absolute top-4 right-4 text-nozu-dark-grey focus:outline-none focus:ring-2 focus:ring-nozu-electric-blue rounded-md p-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <ul className="flex flex-col space-y-6 text-nozu-dark-grey font-semibold text-2xl">
                <li><a href="/reviews" onClick={toggleMobileMenu} className="hover:text-nozu-electric-blue transition-colors duration-200">Drone Reviews</a></li>
                <li><a href="/guides" onClick={toggleMobileMenu} className="hover:text-nozu-electric-blue transition-colors duration-200">Buying Guides</a></li>
                <li><a href="/laws" onClick={toggleMobileMenu} className="hover:text-nozu-electric-blue transition-colors duration-200">UK Drone Laws</a></li>
                <li><a href="/safety" onClick={toggleMobileMenu} className="hover:text-nozu-electric-blue transition-colors duration-200">Safety Tips</a></li>
                <li><a href="/about" onClick={toggleMobileMenu} className="hover:text-nozu-electric-blue transition-colors duration-200">About Us</a></li>
                <li><a href="/contact" className="hover:text-nozu-electric-blue transition-colors duration-200">Contact</a></li>
              </ul>
            </div>
          )}
        </header>

        {/* Main Content Area - This will contain the full-screen sections */}
        <main className="flex-grow">

          {/* Hero Section - Container for the image/video carousel */}
          <section className="relative z-10 h-[70vh] md:h-[60vh] flex items-center justify-center text-center px-10 py-16 md:py-24 bg-gradient-to-t from-nozu-sky-blue/30 to-transparent overflow-hidden">
            {/* Background Video: Moved inside hero section and changed to absolute positioning */}
            <video
              ref={videoRef} // Assign the ref to the video element
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-60 z-0"
            >
              <source src="/Car-Forrest-2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-nozu-sky-blue/30 to-transparent pointer-events-none"></div>

            <div className="max-w-5xl mx-auto space-y-10 relative z-20">
              {/* Refined Hero Heading: All bold text is now white, removed drop shadows */}
              <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-tight md:leading-tight">
                Master the Skies:
                <br className="hidden md:inline" />
                <span className="text-white">Your Expert Guide to Drones in the UK</span>
              </h2>
              {/* Refined Hero Paragraph: Text is now white, removed drop shadows */}
              <p className="text-white text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
                Unlock the world of drones with in-depth **reviews**, up-to-date **UK drone laws**, and essential **flying tips**. Become an **EEAT-certified drone expert** with NozuDrones.
              </p>
              <div className="mt-16 flex flex-col sm:flex-row justify-center gap-12">
                {/* CTA Buttons: Transparent fill, electric blue border, white text, subtle hover */}
                <a
                  href="/guides/drone-buying-guide"
                  className="bg-transparent border-2 border-nozu-electric-blue text-white font-bold py-6 px-16 rounded-full shadow-xl transition-all duration-300 text-xl transform hover:-translate-y-2 active:scale-95 hover:bg-nozu-electric-blue/10"
                >
                  Find Your Perfect Drone
                </a>
                <a
                  href="/laws/uk-drone-code"
                  className="bg-transparent border-2 border-nozu-electric-blue text-white font-bold py-6 px-16 rounded-full shadow-xl transition-all duration-300 text-xl transform hover:-translate-y-2 active:scale-95 hover:bg-nozu-electric-blue/10"
                >
                  Understand UK Drone Laws
                </a>
              </div>
            </div>
          </section>

          {/* Section Delineation: Pure White border */}
          <div className="w-full h-4 bg-white"></div> {/* Reduced height to h-4 (16px) */}

          {/* Key Features Section - Refined for more white space and minimalist cards */}
          <section className="relative z-10 py-20 px-10 bg-nozu-sky-blue"> {/* Removed shadow-2xl */}
            <div className="max-w-screen-xl mx-auto text-center">
              {/* Changed heading to dark grey for consistency with Apple/DJI aesthetic */}
              <h2 className="text-4xl md:text-5xl font-bold text-nozu-dark-grey mb-20">
                Why NozuDrones is Your Go-To Expert
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
                {[
                  { title: "In-Depth Reviews", description: "Unbiased analysis of the latest drone models, performance, and features. Researched by The Nozu Team.", link: "/reviews" },
                  { title: "UK Drone Laws & Safety", description: "Stay compliant and safe with up-to-date regulations and expert advice directly from official sources.", link: "/laws" },
                  { title: "Comprehensive Buying Guides", description: "From beginner drones to professional aerial platforms, find your ideal match with our detailed guides.", link: "/guides" },
                ].map((feature, index) => (
                  <a key={index} href={feature.link}>
                    {/* Changed card background to white for more white space, and border to light grey for subtlety */}
                    <div className="bg-white rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-500 p-12 text-center flex flex-col items-center justify-between h-full border-2 border-nozu-light-grey">
                      <div className="w-24 h-24 bg-nozu-electric-blue rounded-full flex items-center justify-center mb-8 text-white text-4xl font-bold shadow-inner flex-shrink-0">
                        {index + 1}
                      </div>
                      {/* Changed h3 text to dark grey for consistency with Apple/DJI aesthetic */}
                      <h3 className="text-2xl font-semibold text-nozu-dark-grey mb-4 leading-tight">
                        {feature.title}
                      </h3>
                      <p className="text-nozu-dark-grey leading-relaxed text-base">
                        {feature.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Section Delineation: Pure White border */}
          <div className="w-full h-4 bg-white"></div> {/* Reduced height to h-4 (16px) */}

          {/* NEW SECTION: Product Grid - Designed to mirror DJI/Apple full-width image approach */}
          <section className="relative z-10 py-20 px-0 bg-nozu-sky-blue overflow-hidden"> {/* Removed shadow-2xl */}
            <div className="w-full text-center space-y-16 px-4 sm:px-8 lg:px-12">
              {/* Changed heading to dark grey for consistency with Apple/DJI aesthetic */}
              <h2 className="text-4xl md:text-5xl font-bold text-nozu-dark-grey mb-10">
                Explore Our Drone Categories
              </h2>
              {/* Grid with controlled gaps for white space between images, no external borders on squares */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                {products.map((product, index) => (
                  <a key={index} href={product.link}>
                    <div className="relative w-full pb-[100%] rounded-none overflow-hidden group cursor-pointer transition-all duration-300"> {/* Removed shadow-md */}
                      {/* Inner content for the square - now white white background for placeholder */}
                      <div className="absolute inset-0 flex items-center justify-center bg-nozu-white text-nozu-dark-grey font-bold text-3xl md:text-4xl p-8 text-center leading-snug">
                        <span className="opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                            {product.name}
                        </span>
                          <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-nozu-electric-blue">
                            View {product.name}
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Section Delineation: Pure White border */}
          <div className="w-full h-4 bg-white"></div> {/* Reduced height to h-4 (16px) */}

          {/* The "Nozu Accent Palette Swatches" section - Refined for minimalist presentation */}
          <section className="relative z-10 py-20 px-10 bg-nozu-sky-blue"> {/* Changed background to sky blue, removed shadow-2xl */}
            <div className="max-w-screen-xl mx-auto text-center space-y-12">
              {/* Changed heading to dark grey for consistency with Apple/DJI aesthetic */}
              <h2 className="text-4xl md:text-5xl font-bold text-nozu-dark-grey mb-10">
                NozuDrones Bold Accent Palette
              </h2>
              <p className="text-nozu-dark-grey text-xl max-w-3xl mx-auto">
                These six vibrant colors provide unique branding and visual highlights.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {nozuAccentPalette.map((color, index) => (
                  <div
                    key={index}
                    className={`p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center h-48 ${color.className} ${color.textColor} border-4 border-nozu-dark-grey border-opacity-30`}
                  >
                    <p className="font-bold text-xl">{color.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section Delineation: Pure White border */}
          <div className="w-full h-4 bg-white"></div> {/* Reduced height to h-4 (16px) */}

          {/* Call to Action Buttons Section - Refined background and button styles */}
          <section className="relative z-10 py-20 px-10 bg-nozu-sky-blue"> {/* Removed shadow-2xl */}
            <div className="max-w-5xl mx-auto text-center space-y-12">
              <h2 className="text-4xl md:text-5xl font-bold text-nozu-dark-grey">
                Ready to Fly?
              </h2>
              <div className="flex flex-col sm:flex-row justify-center gap-16">
                {/* CTA Buttons: Transparent fill, electric blue border, dark grey text, subtle hover */}
                <a
                  href="/quiz"
                  className="bg-transparent border-2 border-nozu-electric-blue text-nozu-dark-grey font-bold py-6 px-16 rounded-full shadow-xl transition-all duration-300 text-xl transform hover:-translate-y-2 active:scale-95 hover:bg-nozu-electric-blue/10"
                >
                  Find Your Perfect Drone
                </a>
                <a
                  href="/laws/uk-drone-code"
                  className="bg-transparent border-2 border-nozu-electric-blue text-nozu-dark-grey font-bold py-6 px-16 rounded-full shadow-xl transition-all duration-300 text-xl transform hover:-translate-y-2 active:scale-95 hover:bg-nozu-electric-blue/10"
                >
                  Understand UK Drone Laws
                </a>
              </div>
            </div>
          </section>

          {/* Section Delineation: Pure White border */}
          <div className="w-full h-4 bg-white"></div> {/* Reduced height to h-4 (16px) */}

          {/* NEW SECTION: Favicon Preview */}
          <section className="relative z-10 py-20 px-10 bg-nozu-sky-blue">
            <div className="max-w-screen-xl mx-auto text-center space-y-12">
              <h2 className="text-4xl md:text-5xl font-bold text-nozu-dark-grey mb-10">
                Favicon Preview
              </h2>
              <p className="text-nozu-dark-grey text-xl max-w-3xl mx-auto">
                Understanding how your logo appears at various favicon sizes is crucial for brand consistency across different platforms.
              </p>

              {/* Full NozuDrones Logo Favicons */}
              <div className="mt-16">
                <h3 className="text-3xl font-semibold text-nozu-dark-grey mb-8">Full NozuDrones Logo Favicons</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
                  {faviconSizes.map((item, index) => (
                    <div key={`full-logo-${index}`} className="flex flex-col items-center justify-center p-4 bg-nozu-white rounded-lg shadow-md w-full max-w-[200px] h-[180px]">
                      {/* Using the original NozuLogo component for full logo display */}
                      <NozuLogo width={item.size} height={item.size * (62 / 144)} /> {/* Maintain aspect ratio */}
                      <p className="mt-4 text-nozu-dark-grey font-semibold">{item.size}x{item.size}px</p>
                      <p className="text-nozu-medium-grey text-sm text-center mt-1">{item.use}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* NozuDrones Bubble Icon Favicons */}
              <div className="mt-16">
                <h3 className="text-3xl font-semibold text-nozu-dark-grey mb-8">NozuDrones Bubble Icon Favicons</h3> {/* Updated heading */}
                <p className="text-nozu-dark-grey text-lg max-w-2xl mx-auto mb-8">
                  For smaller favicon sizes, a simplified bubble icon ensures clarity and recognition.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
                  {faviconSizes.map((item, index) => (
                    <div key={`bubble-icon-${index}`} className="flex flex-col items-center justify-center p-4 bg-nozu-white rounded-lg shadow-md w-full max-w-[200px] h-[180px]">
                      {/* Using the new NozuBubbleIconSVG component for the bubble without text */}
                      <NozuBubbleIconSVG size={item.size} /> {/* Using the new bubble icon */}
                      <p className="mt-4 text-nozu-dark-grey font-semibold">{item.size}x{item.size}px</p>
                      <p className="text-nozu-medium-grey text-sm text-center mt-1">{item.use}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* TODO: Decide on delineation before the footer. */}
          {/* Section Delineation: Pure White border (added before footer) */}
          <div className="w-full h-4 bg-white"></div> {/* Reduced height to h-4 (16px) */}

        </main> {/* End Main Content Area */}

        {/* Footer Section */}
        <footer className="text-center text-sm text-nozu-medium-grey py-8 bg-nozu-white relative z-10 mt-auto shadow-xl"> {/* Changed py-16 to py-8 */}
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left mb-12"> {/* Changed md:grid-cols-3 to md:grid-cols-4 */}
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

              {/* Column 2: About Us (formerly Support) */}
              <div>
                <h3 className="text-lg font-semibold text-nozu-dark-grey mb-4">About Us</h3> {/* Changed from Support */}
                <ul className="space-y-2">
                  <li><a href="/about" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">About Us</a></li>
                  <li><a href="/about-nozu" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">About Nozu</a></li>
                  <li><a href="/contact" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">Contact Us</a></li>
                  <li><a href="/faq" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">FAQ</a></li>
                  <li><a href="/downloads" className="text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200">Warranty & Repair</a></li>
                </ul>
              </div>

              {/* Column 3: Legal (moved from under Connect) */}
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

            <p className="mb-10 text-base border-t border-nozu-light-grey pt-8 mt-8"> {/* Added border-t for copyright separation */}
              &copy; {new Date().getFullYear()} NozuDrones. All rights reserved. {" "}
              <span className="font-semibold text-nozu-medium-grey">Authored by The Nozu Team.</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
