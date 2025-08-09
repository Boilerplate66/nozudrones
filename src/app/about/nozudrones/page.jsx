// src/app/about/nozudrones/page.jsx (v1.6)
// This file creates the About NozuDrones page, using the hero section layout from the FAQs page and new content.

"use client"; // This is a client component

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Dummy data for the hero section's cycling phrases
const cyclingPhrases = [
  "Building the definitive UK resource for drone users.",
  "Your guide to safe, legal, and enjoyable drone flying.",
  "Simplifying UK drone law for first-time pilots.",
  "In-depth reviews and guides for informed purchasing.",
];

export default function NozudronesAboutPage() {
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhraseIndex((prevIndex) => (prevIndex + 1) % cyclingPhrases.length);
    }, 4000); // Change phrase every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen font-sans antialiased bg-nozu-white text-nozu-dark-grey overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative w-full overflow-hidden h-[200px] flex flex-col items-center justify-center">
        {/* The hero image container with fluid aspect ratio */}
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            About NozuDrones
          </h1>
          <AnimatePresence mode="wait">
            <motion.p
              key={activePhraseIndex}
              className="text-lg md:text-xl lg:text-2xl font-semibold max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {cyclingPhrases[activePhraseIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-lg space-y-8">
          <h2 className="text-3xl font-bold">Our Mission: Your Confidence to Fly</h2>
          <p>
            Are you a first-time pilot looking to take to the skies, but feel overwhelmed by confusing UK drone laws, the sheer number of drones on the market, or the technical jargon that comes with it all? We know the feeling. The world of drone flying should be exciting, not intimidating. That’s why we created NozuDrones.co.uk. Our mission is to take away the stress and replace it with the confidence you need to fly safely, legally, and creatively.
          </p>

          <h2 className="text-3xl font-bold">Who We Are</h2>
          <p>
            We are a small, UK-based team of passionate drone enthusiasts. We're not corporate drones; we're just like you, and we've been on the same journey. Our goal is to be the trusted friend who gives you the honest, reliable information you need. We promise to provide content that is meticulously researched and easy to understand, so you can focus on the fun part—flying!
          </p>

          <h2 className="text-3xl font-bold">How We Help You</h2>
          <p>
            NozuDrones.co.uk is the ultimate resource built to solve your biggest flying problems. We give you:
          </p>
          <div className="space-y-4 pl-4">
            <div>
              <strong>The confidence to fly safely and legally</strong>
              <br />
              with clear, easy-to-digest guides on UK drone regulations.
            </div>
            <div>
              <strong>The peace of mind that you're choosing the right drone</strong>
              <br />
              with unbiased, in-depth reviews and buying guides tailored to your needs.
            </div>
            <div>
              <strong>The ability to capture amazing images and video</strong>
              <br />
              with tutorials and tips on flight techniques and camera settings.
            </div>
          </div>

          <h2 className="text-3xl font-bold">Our Promise of Transparency</h2>
          <p>
            To keep this resource free for everyone, NozuDrones.co.uk participates in affiliate marketing programs. This means we may earn a commission on qualifying purchases made through our links to retailer sites. This comes at absolutely no extra cost to you. We want to be clear: our reviews and recommendations are always honest and are never influenced by these partnerships. Your trust is our most important asset.
          </p>
        </div>
      </div>
    </div>
  );
}