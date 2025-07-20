"use client"; // This directive marks the component as a Client Component

import React, { useState, useRef, useEffect } from 'react'; // Import useState, useRef, and useEffect

// All global layout elements (header, footer, and their wrapping divs)
// are now handled by layout.js and components/HeaderWrapper.js and components/FooterWrapper.js.
// Therefore, no global layout imports or state are needed here.


export default function Home() {
  const videoRef = useRef(null); // Create a ref to access the video DOM element
  const [isPlayingForward, setIsPlayingForward] = useState(true); // State to track video playback direction (for forward/reverse loop)
  const [displayMode, setDisplayMode] = useState('image'); // 'image' or 'video' - controls what's visible
  const [videoCanPlay, setVideoCanPlay] = useState(false); // Tracks if the video has enough data to play through

  // Effect to handle video loading and initial transition from image to video
  useEffect(() => {
    const videoElement = videoRef.current;

    // Callback for when the video has enough data to play through
    const handleCanPlayThrough = () => {
      setVideoCanPlay(true);
      // If we are currently showing the image, and video is now ready, switch to video
      if (displayMode === 'image') {
        setDisplayMode('video');
      }
    };

    if (videoElement) {
      // Add event listener for when video can play through
      videoElement.addEventListener('canplaythrough', handleCanPlayThrough);

      // Set a timeout to switch to the video after 4 seconds IF it's ready
      const initialDelayTimer = setTimeout(() => {
        if (videoCanPlay) { // Only switch if the video is ready by this time
          setDisplayMode('video');
        }
        // If not videoCanPlay, it remains 'image'. The handleCanPlayThrough will switch it later.
      }, 4000); // 4 seconds

      // Cleanup function for this effect
      return () => {
        videoElement.removeEventListener('canplaythrough', handleCanPlayThrough);
        clearTimeout(initialDelayTimer);
      };
    }
  }, [videoCanPlay, displayMode]); // Dependencies: videoCanPlay status and current displayMode

  // Effect to handle video playback direction (forward and reverse loop)
  useEffect(() => {
    const videoElement = videoRef.current;

    // This effect only runs if the displayMode is 'video'
    if (videoElement && displayMode === 'video') {
      // Function to start video playing forward from the beginning
      const startVideoForward = () => {
        videoElement.playbackRate = 1;
        videoElement.currentTime = 0;
        // Attempt to play the video, catching any potential errors (e.g., user gesture not met)
        videoElement.play().catch(error => console.error("Video play failed:", error));
        setIsPlayingForward(true);
      };

      // Handle the forward/reverse loop on time update
      const handleTimeUpdate = () => {
        // If playing forward and almost at the end, switch direction
        if (isPlayingForward && videoElement.currentTime >= videoElement.duration - 0.1) { // 0.1s buffer for precision
          videoElement.playbackRate = -1; // Play backward
          videoElement.currentTime = videoElement.duration; // Set to end to start reverse
          videoElement.play().catch(error => console.error("Video play failed (reverse):", error));
          setIsPlayingForward(false);
        }
        // If playing backward and almost at the beginning, switch direction
        else if (!isPlayingForward && videoElement.currentTime <= 0.1) { // 0.1s buffer for precision
          videoElement.playbackRate = 1; // Play forward
          videoElement.currentTime = 0; // Set to beginning to start forward
          videoElement.play().catch(error => console.error("Video play failed (forward):", error));
          setIsPlayingForward(true);
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
  }, [displayMode, isPlayingForward]); // Dependencies: displayMode and current playback direction

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
    // Main Content Area - This will contain the full-screen sections
    <main className="flex-grow">

      {/* Hero Section - Container for the image/video carousel */}
      <section className="relative z-10 min-h-[calc(100vh - 44px)] md:min-h-[calc(100vh - 86px)] flex items-center justify-center text-center px-10 py-32 md:py-52 bg-gradient-to-t from-nozu-sky-blue/30 to-transparent">

        {/* Conditional rendering for Image or Video - only one is visible */}
        {displayMode === 'image' && (
          <img
            src="[https://placehold.co/1920x1080/E0E0E0/333333?text=Fast+Loading+Image](https://placehold.co/1920x1080/E0E0E0/333333?text=Fast+Loading+Image)" // Placeholder for your fast-loading image
            alt="NozuDrones Hero Background Image"
            className="absolute inset-0 w-full h-full object-cover opacity-60 z-0 transition-opacity duration-1000 ease-in-out"
          />
        )}

        {displayMode === 'video' && (
          <video
            ref={videoRef} // Attach the ref to the video element
            autoPlay
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60 z-0 transition-opacity duration-1000 ease-in-out"
            // onCanPlayThrough is now handled in the useEffect for setup
          >
            <source src="/drone-background.mp4" type="video/mp4" /> {/* Replace with your optimized mountain-top.mp4 */}
            {/* Add WebM source here if you create one for better browser support and smaller size */}
            {/* <source src="/path/to/your/optimized-video.webm" type="video/webm" /> */}
            Your browser does not support the video tag.
          </video>
        )}

        {/* Hidden Video element for background loading - always in DOM to preload */}
        {/* This video element is not conditionally rendered based on displayMode,
            but its opacity and z-index keep it hidden and behind the active content. */}
        <video
          ref={videoRef} // This ref is shared with the conditionally rendered video
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-0 -z-10" // Hidden and behind everything
          // onCanPlayThrough is handled by the useEffect
        >
          <source src="/drone-background.mp4" type="video/mp4" /> {/* Replace with your optimized mountain-top.mp4 */}
          {/* Add WebM source here if you create one */}
          {/* <source src="/path/to/your/optimized-video.webm" type="video/webm" /> */}
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
            {/* Replaced Next.js Link with standard <a> tags */}
            <a
              href="/guides/drone-buying-guide"
              className="bg-nozu-lime-green-refined hover:bg-nozu-electric-blue text-white font-bold py-6 px-16 rounded-full shadow-xl transition-all duration-300 text-xl transform hover:-translate-y-2 active:scale-95"
            >
              Find Your Perfect Drone
            </a>
            {/* Replaced Next.js Link with standard <a> tags */}
            <a
              href="/laws/uk-drone-code"
              className="bg-nozu-electric-blue hover:bg-nozu-darker-electric-blue text-white font-bold py-6 px-16 rounded-full shadow-xl transition-all duration-300 text-xl transform hover:-translate-y-2 active:scale-95"
            >
              Understand UK Drone Laws
            </a>
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
              // Replaced Next.js Link with standard <a> tag
              <a key={index} href={feature.link}>
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
              </a>
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
              // Replaced Next.js Link with standard <a> tag
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
            {/* Replaced Next.js Link with standard <a> tags */}
            <a
              href="/quiz"
              className="bg-nozu-lime-green-refined hover:bg-nozu-electric-blue text-white font-bold py-6 px-16 rounded-full shadow-xl transition-all duration-300 text-xl transform hover:-translate-y-2 active:scale-95"
            >
              Find Your Perfect Drone
            </a>
            {/* Replaced Next.js Link with standard <a> tags */}
            <a
              href="/laws/uk-drone-code"
              className="bg-nozu-electric-blue hover:bg-nozu-darker-electric-blue text-white font-bold py-6 px-16 rounded-full shadow-xl transition-all duration-300 text-xl transform hover:-translate-y-2 active:scale-95"
            >
              Understand UK Drone Laws
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
