// src/app/page.jsx v2.41.32
// Refactored the Hero Section and Scrollytelling Section into their own components to improve modularity and reduce file size.
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useInView, useAnimation } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import ScrollytellingSection from '@/components/ScrollytellingSection';

const specsSpotlightData = [
  { message: "Precision Gimbal", time: 0, link: "/guides/gimbal-tech" },
  { message: "High-Powered Motor", time: 1.5, link: "/guides/motor-tech" },
  { message: "Advanced Battery System", time: 3.5, link: "/guides/battery-tech" },
  { message: "UK-Compliant Sensors", time: 5.5, link: "/guides/sensor-tech" },
];

export default function Home() {
  const specsVideoRef = useRef(null);
  const specsVideoPlayerRef = useRef(null);
  const [currentSpecsMessage, setCurrentSpecsMessage] = useState(specsSpotlightData[0]);

  const specsStepRefs = useRef(specsSpotlightData.map(() => React.createRef()));
  const specsVideoController = useAnimation();
  const specsInViewRef = useRef(null);
  const isSpecsSectionInView = useInView(specsInViewRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isSpecsSectionInView) {
      specsVideoController.start('visible');
    }
  }, [isSpecsSectionInView, specsVideoController]);

  useEffect(() => {
    const videoElement = specsVideoPlayerRef.current;
    if (!videoElement) return;

    if (isSpecsSectionInView) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  }, [isSpecsSectionInView]);

  useEffect(() => {
    const videoElement = specsVideoPlayerRef.current;
    if (!videoElement) return;

    const unsub = () => {
      specsSpotlightData.forEach((item) => {
        if (videoElement.currentTime >= item.time) {
          setCurrentSpecsMessage(item);
        }
      });
    };
    
    videoElement.addEventListener('timeupdate', unsub);
    return () => videoElement.removeEventListener('timeupdate', unsub);
  }, []);

  return (
    <>
      <HeroSection className="mt-0" />

      <ScrollytellingSection />

      <section
        ref={specsVideoRef}
        className="relative bg-nozu-white py-20 px-4 min-h-[400vh] flex flex-col items-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-nozu-electric-blue mb-20">
          Drone Specs Spotlight
        </h2>

        <div ref={specsInViewRef} className="sticky top-0 w-full max-w-7xl h-screen flex items-center justify-center">
          <div className="relative w-full h-[80vh] overflow-hidden">
            <video
              ref={specsVideoPlayerRef}
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/drone-landing-1920x1080.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 flex items-end justify-start p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSpecsMessage.message}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-black/50 backdrop-blur-sm p-6 text-white"
                >
                  <p className="text-2xl font-bold">{currentSpecsMessage.message}</p>
                  <Link
                    href={currentSpecsMessage.link}
                    className="text-nozu-lime-green-refined hover:underline"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {specsSpotlightData.map((item, index) => (
          <div key={index} className="h-[100vh] flex items-center justify-center">
            <div ref={specsStepRefs.current[index]}>
            </div>
          </div>
        ))}
      </section>

      <section className="relative z-10 py-20 px-10 bg-nozu-lime-green-refined/30">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="p-8 bg-white/10 backdrop-blur-sm border border-white/20">
            <h2 className="text-4xl md:text-5xl font-bold text-nozu-dark-grey">
              Your Guide to UK Drone Laws
            </h2>
            <p className="text-lg text-nozu-dark-grey mt-4">
              We're committed to keeping you compliant and safe. Our resources are regularly updated to reflect the latest CAA regulations.
            </p>
            <Link
              href="/laws/uk-drone-code"
              className="mt-8 inline-block bg-nozu-electric-blue hover:bg-nozu-darker-electric-blue text-white font-bold py-6 px-16 transition-all duration-300 text-xl transform hover:-translate-y-2 active:scale-95"
            >
              Read the UK Drone Code
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}