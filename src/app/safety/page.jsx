// src/app/safety/page.jsx (v1.31)
// This file provides a comprehensive guide to drone safety, specifically for sub-250g drones.
// The hero section now includes a cycling list of page categories, animated using Framer Motion.
// The subtitle scroll speed has been increased, with the delay between text changes set to 2 seconds.
// The initial subtitle text now loads immediately, without an animation delay.
// Card headings are numbers-free, and card text is now consistently white on all cards.
// The card layout has been redesigned to be top-down, with a fixed-height image area on top
// and a colored, semi-transparent text overlay below it. All cards have a consistent minimum height, and text is aligned to the top.

"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function SafetyPage() {
  const categories = [
    "Why choose a sub 250g drone",
    "Pre-Flight Checks & Planning",
    "In-Flight Rules & Awareness",
    "Environmental & Privacy Awareness",
    "The Drone Code & CAA",
  ];

  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategoryIndex((prevIndex) => (prevIndex + 1) % categories.length);
    }, 2000); // Change category every 2 seconds
    return () => clearInterval(interval);
  }, [categories.length]);

  return (
    <div className="min-h-screen font-sans antialiased bg-nozu-white text-nozu-dark-grey overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative w-full overflow-hidden h-[200px] flex flex-col items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/beech-1920x400.jpg"
            alt="Drone flying over a UK landscape with a beech tree in the foreground"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
        </div>
        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white bg-nozu-dark-grey bg-opacity-40 w-full h-full px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2">
            Safety Tips for Drone Flying
          </h1>
          <AnimatePresence mode="wait">
            <motion.p
              key={activeCategoryIndex}
              className="text-lg md:text-xl lg:text-2xl font-semibold max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {categories[activeCategoryIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-lg space-y-8">
          <p>
            This guide is for new flyers, and as a new flyer, we strongly recommend selecting a sub-250g drone as your first drone. The rules are simpler, the requirements for competence less strict, and let's face it, the lighter the drone, the less damage you can do. For the vast majority of drone flyers, this is the only category they will ever need, as today's sub-250g drones offer amazing photography, stability, and flight times, with enhanced safety features and navigation aids.
          </p>

          {/* Cards Container with 2x2 grid on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Pre-Flight Checks & Planning */}
            <div
              className="relative rounded-lg shadow-lg overflow-hidden h-full flex flex-col min-h-[330px]"
              style={{
                backgroundImage: 'url(/beech-1920x400.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="h-24"></div>
              <div
                className="flex-grow flex flex-col justify-start p-8 text-white bg-nozu-card-coral/90"
              >
                <h2 className="text-3xl font-bold mb-4">Pre-Flight Checks & Planning</h2>
                <div className="space-y-2 text-base leading-snug">
                  <p>
                    <strong>Check the weather.</strong> Never fly in high winds, heavy rain, or fog. Use a reliable weather app like <a href="https://www.bbc.co.uk/weather" target="_blank" rel="noopener noreferrer" className="text-nozu-blue hover:underline">BBC Weather</a> to check for wind speed and precipitation before you leave.
                  </p>
                  <p>
                    <strong>Inspect your equipment.</strong> Ensure your drone, propellers, and batteries are in good working order. Check for any cracks or damage, and make sure all batteries are fully charged.
                  </p>
                  <p>
                    <strong>Know your airspace.</strong> Use a free drone safety app like the official CAA-linked <a href="https://dronedesk.io/drone-assist" target="_blank" rel="noopener noreferrer" className="text-nozu-blue hover:underline">Drone Assist</a> to check for any local flight restrictions or no-fly zones, especially around airports or other sensitive areas.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: In-Flight Rules & Awareness */}
            <div
              className="relative rounded-lg shadow-lg overflow-hidden h-full flex flex-col min-h-[330px]"
              style={{
                backgroundImage: 'url(/beech-1920x400.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="h-24"></div>
              <div
                className="flex-grow flex flex-col justify-start p-8 text-white bg-nozu-card-forest-green/90"
              >
                <h2 className="text-3xl font-bold mb-4">In-Flight Rules & Awareness</h2>
                <div className="space-y-2 text-base leading-snug">
                  <p>
                    <strong>Maintain visual line of sight (VLOS).</strong> You must always be able to see your drone with your own eyes, without the use of binoculars or other devices.
                  </p>
                  <p>
                    <strong>Stay below the altitude limit.</strong> The maximum legal height for drone flights is 120 metres (400 feet) above the ground.
                  </p>
                  <p>
                    <strong>Flying near people.</strong> With a sub-250g drone, you can fly closer to and over people, but you must still avoid flying over crowds. Always use common sense and fly responsibly.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Environmental & Privacy Awareness */}
            <div
              className="relative rounded-lg shadow-lg overflow-hidden h-full flex flex-col min-h-[330px]"
              style={{
                backgroundImage: 'url(/beech-1920x400.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="h-24"></div>
              <div
                className="flex-grow flex flex-col justify-start p-8 text-white bg-nozu-card-golden-yellow/90"
              >
                <h2 className="text-3xl font-bold mb-4">Environmental & Privacy Awareness</h2>
                <div className="space-y-2 text-base leading-snug">
                  <p>
                    <strong>Be mindful of wildlife.</strong> Avoid flying over nature reserves or areas with nesting birds to prevent disturbing animals and their habitats.
                  </p>
                  <p>
                    <strong>Protect people's privacy.</strong> Do not fly or record footage in a way that intrudes on the privacy of individuals without their consent.
                  </p>
                  <p>
                    <strong>Avoid noise pollution.</strong> While not a legal requirement, flying at a respectful distance from others and minimizing noise can improve the experience for everyone.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4: The Drone Code & CAA */}
            <div
              className="relative rounded-lg shadow-lg overflow-hidden h-full flex flex-col min-h-[330px]"
              style={{
                backgroundImage: 'url(/beech-1920x400.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="h-24"></div>
              <div
                className="flex-grow flex flex-col justify-start p-8 text-white bg-nozu-card-ocean-blue/90"
              >
                <h2 className="text-3xl font-bold mb-4">The Drone Code & CAA</h2>
                <div className="space-y-2 text-base leading-snug">
                  <p>
                    <strong>Read the Drone Code.</strong> The Drone and Model Aircraft Code is the official guide to flying safely and legally in the UK. Make sure you read and understand it by visiting the <a href="https://register-drones.caa.co.uk/drone-code" target="_blank" rel="noopener noreferrer" className="text-nozu-blue hover:underline">official CAA website</a>.
                  </p>
                  <p>
                    <strong>Register as an operator.</strong> If you own a sub-250g drone with a camera, you must register as an operator with the CAA and display your Operator ID on your drone.
                  </p>
                  <p>
                    <strong>Flyer ID.</strong> For sub-250g drones, a Flyer ID is not required unless you are flying a specific category of drone, which is not applicable to most new flyers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}