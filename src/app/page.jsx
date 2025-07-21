'use client'; // This directive marks the component as a Client Component

import React, { useState, useRef, useEffect, useCallback } from 'react'; // Import useState, useRef, useEffect, and useCallback
import Link from 'next/link'; // Import Link for client-side navigation
import Image from 'next/image'; // Import Image for optimized images

// Import your components (assuming they are structured as in the briefing)
// HeaderWrapper and FooterWrapper are removed from here as they are in layout.jsx
import NozuLogo from '../components/NozuLogo'; // Assuming this is for the favicon preview

// Placeholder for drone image (replace with actual image paths later)
// Hero section placeholder is now a simple colored div.
// Grid placeholder uses simplest placehold.co URL for a plain color.
const droneGridPlaceholderImage = "https://placehold.co/400x300/6B7280"; // Background: #6B7280, no text


export default function Home() {
  const videoRef = useRef(null); // Create a ref to access the video DOM element
  const [displayMode, setDisplayMode] = useState('image'); // 'image' or 'video' - controls what's visible
  const [isVideoLoaded, setIsVideoLoaded] = useState(false); // Tracks if the video has enough data to play through

  // Callback for when the video has enough data to play through
  const handleVideoLoad = useCallback(() => {
    setIsVideoLoaded(true);
    if (videoRef.current) {
      // Add a small delay before attempting to play the video.
      // This can sometimes help with browser autoplay policies.
      setTimeout(() => {
        videoRef.current.play().catch(error => console.log("Video autoplay prevented or failed:", error));
      }, 50); // Small delay, e.g., 50ms
    }
    // Switch to video mode only if it's successfully loaded
    setDisplayMode('video');
  }, []);

  // Effect to handle video loading and initial transition from image to video
  useEffect(() => {
    const currentVideo = videoRef.current;

    if (currentVideo) {
      // Add event listener for when video can play through
      currentVideo.addEventListener('canplaythrough', handleVideoLoad);
      // Explicitly load the video to trigger canplaythrough event if not already loaded
      currentVideo.load();
    }

    // Set a timeout to switch to the image if the video doesn't load within 7 seconds (increased from 3s)
    const timeoutId = setTimeout(() => {
      if (!isVideoLoaded && displayMode === 'image') { // Only fallback if still in image mode and video hasn't loaded
        console.log("Video not loaded in time, ensuring image remains visible.");
        // No need to change displayMode here, as it's already 'image'.
        // This just ensures we don't try to switch to video if it fails to load.
      }
    }, 7000); // Increased timeout to 7 seconds

    // Cleanup function for this effect
    return () => {
      if (currentVideo) {
        currentVideo.removeEventListener('canplaythrough', handleVideoLoad);
      }
      clearTimeout(timeoutId);
    };
  }, [handleVideoLoad, isVideoLoaded, displayMode]); // Dependencies

  // Effect to handle video playback direction (forward and reverse loop)
  // This logic now runs only when displayMode is 'video'
  useEffect(() => {
    const videoElement = videoRef.current;

    // This effect only runs if the displayMode is 'video' and the video is loaded
    if (videoElement && displayMode === 'video' && isVideoLoaded) {
      let isPlayingForward = true; // Local state for this effect

      // Function to start video playing forward from the beginning
      const startVideoForward = () => {
        videoElement.playbackRate = 1;
        videoElement.currentTime = 0;
        videoElement.play().catch(error => console.error("Video play failed:", error));
        isPlayingForward = true;
      };

      // Handle the forward/reverse loop on time update
      const handleTimeUpdate = () => {
        // If playing forward and almost at the end, switch direction
        if (isPlayingForward && videoElement.currentTime >= videoElement.duration - 0.1) { // 0.1s buffer for precision
          videoElement.playbackRate = -1; // Play backward
          videoElement.currentTime = videoElement.duration; // Set to end to start reverse
          videoElement.play().catch(error => console.error("Video play failed (reverse):", error));
          isPlayingForward = false;
        }
        // If playing backward and almost at the beginning, switch direction
        else if (!isPlayingForward && videoElement.currentTime <= 0.1) { // 0.1s buffer for precision
          videoElement.playbackRate = 1; // Play forward
          videoElement.currentTime = 0; // Set to beginning to start forward
          videoElement.play().catch(error => console.error("Video play failed (forward):", error));
          isPlayingForward = true;
        }
      };

      // Ensure video starts playing when it becomes active in the DOM
      // This is important if the video was already loaded when displayMode switched to 'video'
      startVideoForward();

      // Add timeupdate listener for looping
      videoElement.addEventListener('timeupdate', handleTimeUpdate);

      // Cleanup function for this effect
      return () => {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [displayMode, isVideoLoaded]); // Dependencies: displayMode and whether video is loaded

  // Define the bold accent colors for the palette display (all 6)
  const nozuAccentPalette = [
    { name: 'Nozu Orange', className: 'bg-nozu-orange', textColor: 'text-white' },
    { name: 'Nozu Lime Green', className: 'bg-nozu-lime-green-refined', textColor: 'text-white' },
    { name: 'Nozu Electric Blue', className: 'bg-nozu-electric-blue', textColor: 'text-white' },
    { name: 'Nozu Magenta', className: 'bg-nozu-magenta', textColor: 'text-white' },
    { name: 'Nozu Golden Yellow', className: 'bg-nozu-golden-yellow', textColor: 'text-white' },
    { name: 'Nozu Deep Teal', 'className': 'bg-nozu-deep-teal', textColor: 'text-white' },
  ];

  // Placeholder product data for the new section
  const products = [
    { name: "Beginner Drones", link: "/products/beginner" },
    { name: "Professional Drones", link: "/products/professional" },
    { name: "Accessories", link: "/products/accessories" },
    { name: "Services", link: "/products/services" },
  ];

  return (
    // The main div no longer contains HeaderWrapper and FooterWrapper
    // as they are handled by RootLayout.
    <div className="flex flex-col min-h-screen">
      {/* Main Content Area - This will contain the full-screen sections */}
      <main className="flex-grow">

        {/* Hero Section - Container for the image/video carousel */}
        <section className="relative z-10 flex items-center justify-center text-center px-10 py-20 bg-gradient-to-t from-nozu-sky-blue/30 to-transparent">

          {/* Background Placeholder (simple colored div) */}
          <div
            className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ease-in-out bg-[#1F2937] ${ // Use bg-[#hexcode] for desired color
              displayMode === 'image' ? 'opacity-60' : 'opacity-0'
            }`}
          ></div>

          {/* Background Video (always present, opacity controlled, and only one ref) */}
          <video
            ref={videoRef} // Attach the ref to this single video element
            autoPlay={isVideoLoaded} // Only autoplay if video is confirmed loaded
            loop // Loop the video continuously
            muted // Muted is crucial for autoplay in most modern browsers
            playsInline // playsInline is also crucial for autoplay on iOS devices
            preload="auto" // Preload for faster `canplaythrough`
            className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ease-in-out ${
              displayMode === 'video' ? 'opacity-60' : 'opacity-0'
            }`}
            onError={(e) => {
              console.error('Video load error:', e);
              setDisplayMode('image'); // Fallback to image on error
            }}
          >
            {/* Corrected video source paths as per your explicit instruction */}
            <source src="/Car-Forrest-2.mp4" type="video/mp4" />
            {/* Add WebM source here for better browser support and smaller size if you have one */}
            <source src="/Car-Forrest-2.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-nozu-sky-blue/30 to-transparent pointer-events-none"></div>

          <div className="max-w-5xl mx-auto space-y-10 relative z-20">
            <h2 className="text-6xl md:text-8xl font-extrabold text-nozu-dark-grey leading-tight md:leading-tight drop-shadow-lg text-shadow-xl">
              Master the Skies:
              <br className="hidden md:inline" />
              <span className="text-nozu-lime-green-refined">Your Expert Guide to Drones in the UK</span>
            </h2>
            <p className="text-nozu-dark-grey text-xl md:text-2xl max-w-3xl mx-auto drop-shadow-md leading-relaxed text-shadow-lg">
              Unlock the world of drones with in-depth **reviews**, up-to-date **UK drone laws**, and essential **flying tips**. Become an **EEAT-certified drone expert** with NozuDrones.
            </p>
            <div className="mt-16 flex flex-col sm:flex-row justify-center gap-12">
              {/* Replaced standard <a> tags with Next.js Link */}
              <Link
                href="/guides/drone-buying-guide"
                className="bg-nozu-lime-green-refined hover:bg-nozu-electric-blue text-white font-bold py-6 px-16 rounded-full shadow-xl transition-all duration-300 text-xl transform hover:-translate-y-2 active:scale-95"
              >
                Find Your Perfect Drone
              </Link>
              {/* Replaced standard <a> tags with Next.js Link */}
              <Link
                href="/laws/uk-drone-code"
                className="bg-nozu-electric-blue hover:bg-nozu-darker-electric-blue text-white font-bold py-6 px-16 rounded-full shadow-xl transition-all duration-300 text-xl transform hover:-translate-y-2 active:scale-95"
              >
                Understand UK Drone Laws
              </Link>
            </div>
          </div>
        </section>

        {/* Key Features Section - Removed h-screen to stack correctly */}
        <section className="relative z-10 py-20 px-10 bg-nozu-white shadow-2xl">
          <div className="max-w-screen-xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-nozu-electric-blue mb-20">
              Why NozuDrones is Your Go-To Expert
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
              {[
                { title: "In-Depth Reviews", description: "Unbiased analysis of the latest drone models, performance, and features. Researched by The Nozu Team.", link: "/reviews" },
                { title: "UK Drone Laws & Safety", description: "Stay compliant and safe with up-to-date regulations and expert advice directly from official sources.", link: "/laws" },
                { title: "Comprehensive Buying Guides", description: "From beginner drones to professional aerial platforms, find your ideal match with our detailed guides.", link: "/guides" },
              ].map((feature, index) => (
                // Replaced standard <a> tag with Next.js Link
                <Link key={index} href={feature.link}>
                  <div className="bg-nozu-sky-blue rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-500 p-12 text-center flex flex-col items-center justify-between h-full border-2 border-nozu-lime-green-refined">
                    <div className="w-24 h-24 bg-nozu-electric-blue rounded-full flex items-center justify-center mb-8 text-white text-4xl font-bold shadow-inner flex-shrink-0">
                      {index + 1}
                    </div>
                    <h3 className="text-2xl font-semibold text-nozu-electric-blue mb-4 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-nozu-dark-grey leading-relaxed text-base">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* NEW SECTION: Product Grid - Designed to mirror DJI/Apple full-width image approach */}
        <section className="relative z-10 py-20 px-0 bg-nozu-white shadow-2xl overflow-hidden">
          <div className="w-full text-center space-y-16 px-4 sm:px-8 lg:px-12">
            <h2 className="text-4xl md:text-5xl font-bold text-nozu-electric-blue mb-10">
              Explore Our Drone Categories
            </h2>
            {/* Grid with controlled gaps for white space between images, no external borders on squares */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              {products.map((product, index) => (
                // Replaced standard <a> tag with Next.js Link
                <Link key={index} href={product.link}>
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
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* The "Nozu Accent Palette Swatches" section - Removed h-screen to stack correctly */}
        <section className="relative z-10 py-20 px-10 bg-nozu-white shadow-2xl">
          <div className="max-w-screen-xl mx-auto text-center space-y-12">
            <h2 className="text-4xl md:text-5xl font-bold text-nozu-electric-blue mb-10">
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

        {/* Call to Action Buttons Section - Removed h-screen to stack correctly */}
        <section className="relative z-10 py-20 px-10 bg-nozu-lime-green-refined/30 shadow-2xl">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            <h2 className="text-4xl md:text-5xl font-bold text-nozu-dark-grey">
              Ready to Fly?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-16">
              {/* Replaced standard <a> tags with Next.js Link */}
              <Link
                href="/quiz"
                className="bg-nozu-lime-green-refined hover:bg-nozu-electric-blue text-white font-bold py-6 px-16 rounded-full shadow-xl transition-all duration-300 text-xl transform hover:-translate-y-2 active:scale-95"
              >
                Find Your Perfect Drone
              </Link>
              {/* Replaced standard <a> tags with Next.js Link */}
              <Link
                href="/laws/uk-drone-code"
                className="bg-nozu-electric-blue hover:bg-nozu-darker-electric-blue text-white font-bold py-6 px-16 rounded-full shadow-xl transition-all duration-300 text-xl transform hover:-translate-y-2 active:scale-95"
              >
                Understand UK Drone Laws
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
