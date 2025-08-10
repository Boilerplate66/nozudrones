// src/app/page.jsx v2.0.7
'use client'; // This directive marks the component as a Client Component

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';

// Import your components
import NozuLogo from '../components/NozuLogo';

// Define the content for the Hero section
const heroContent = [
  { message: "Master the skies", digit: 1 },
  { message: "Choose the right drone", digit: 2 },
  { message: "Fly safely", digit: 3 },
  { message: "Stay within the law", digit: 4 },
];

// Data for the Interactive Showcase section
const interactiveShowcaseData = [
  { category: "Best for Beginners", image: "/showcase/beginner.webp" },
  { category: "Best for Video", image: "/showcase/video.webp" },
  { category: "Best for Professionals", image: "/showcase/professional.webp" },
];

// Data for the Specs Spotlight section
const specsSpotlightData = [
  { message: "Precision Gimbal", time: 0, link: "/guides/gimbal-tech" },
  { message: "High-Powered Motor", time: 1.5, link: "/guides/motor-tech" },
  { message: "Advanced Battery System", time: 3.5, link: "/guides/battery-tech" },
  { message: "UK-Compliant Sensors", time: 5.5, link: "/guides/sensor-tech" },
];

export default function Home() {
  const heroVideoRef = useRef(null);
  const coreMessageRef = useRef(null);
  const specsVideoRef = useRef(null);
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const [interactiveImage, setInteractiveImage] = useState(interactiveShowcaseData[0].image);

  // Framer Motion scroll hook for Core Message Split Screen
  const { scrollYProgress } = useScroll({ target: coreMessageRef });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 20]);

  // Framer Motion scroll hook for Specs Spotlight
  const { scrollYProgress: specsScrollYProgress } = useScroll({ target: specsVideoRef });
  const specsVideoTime = useTransform(specsScrollYProgress, [0, 1], [0, 8]); // Video is 4s, played at 0.5x speed for 8s
  const [currentSpecsMessage, setCurrentSpecsMessage] = useState(specsSpotlightData[0]);

  // Hero Video & Text Carousel Logic
  useEffect(() => {
    const videoElement = heroVideoRef.current;
    let messageTimer;

    if (videoElement) {
      const playVideoFromStart = () => {
        videoElement.currentTime = 0;
        videoElement.play().catch(error => console.error("Video play failed:", error));
      };

      const intervalDuration = 4000;
      playVideoFromStart();
      messageTimer = setInterval(() => {
        setActiveMessageIndex((prevIndex) => (prevIndex + 1) % heroContent.length);
        playVideoFromStart();
      }, intervalDuration);

      return () => clearInterval(messageTimer);
    }
  }, []);

  // Specs Spotlight Logic
  useEffect(() => {
    const videoElement = specsVideoRef.current;
    if (!videoElement) return;

    // This effect handles the video scrubbing and message changes
    const unsubscribeScroll = specsVideoTime.on('change', (latestTime) => {
      videoElement.currentTime = latestTime;

      // Update the message based on video time
      const nextMessage = specsSpotlightData.find(
        (message, index) => latestTime >= message.time && (index === specsSpotlightData.length - 1 || latestTime < specsSpotlightData[index + 1].time)
      );
      if (nextMessage && nextMessage.message !== currentSpecsMessage.message) {
        setCurrentSpecsMessage(nextMessage);
      }
    });

    return () => unsubscribeScroll();
  }, [specsVideoTime, currentSpecsMessage]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* ======================= Hero Section ======================= */}
        <section className="relative h-[calc(75vh-64px)] overflow-hidden flex items-center justify-center text-center">
          <video
            ref={heroVideoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/Car-Forrest-2.mp4" type="video/mp4" />
            <source src="/Car-Forrest-2.webm" type="video/webm" />
          </video>
          <AnimatePresence mode="wait">
            <motion.div
              key={heroContent[activeMessageIndex].digit}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute top-4 left-4 text-7xl font-bold opacity-75"
            >
              {heroContent[activeMessageIndex].digit}
            </motion.div>
          </AnimatePresence>
          <div className="max-w-5xl mx-auto space-y-10 relative z-10 text-white">
            <AnimatePresence mode="wait">
              <motion.h1
                key={heroContent[activeMessageIndex].message}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-6xl md:text-8xl font-extrabold text-white text-shadow-lg leading-tight md:leading-tight mt-10"
              >
                {heroContent[activeMessageIndex].message}
              </motion.h1>
            </AnimatePresence>
          </div>
        </section>

        {/* ======================= Core Message Split Screen ======================= */}
        <section ref={coreMessageRef} className="relative bg-nozu-white py-20 px-4 min-h-[200vh] flex">
          <div className="sticky top-0 left-0 h-screen w-1/2 flex items-center justify-center">
            <motion.div style={{ scale, y, borderRadius }} className="relative w-full h-[80vh]">
              <Image src="/aerial-view.webp" alt="Cinematic aerial view" fill className="object-cover rounded-lg" />
              <div className="absolute inset-0 flex items-center justify-center p-8 bg-nozu-dark-grey/50 rounded-lg">
                <Image src="/drone-controller.webp" alt="Drone controller screen" width={500} height={300} className="object-contain" />
              </div>
            </motion.div>
          </div>
          <div className="w-1/2 p-12 space-y-16">
            <h2 className="text-4xl md:text-5xl font-bold text-nozu-electric-blue">Our Mission</h2>
            <div className="space-y-12">
              <p className="text-lg text-nozu-dark-grey">At NozuDrones, we believe that the sky is not the limit, it’s just the beginning. Our mission is to empower everyone from hobbyists to professionals to master the art of flight.</p>
              <p className="text-lg text-nozu-dark-grey">We provide comprehensive, up-to-date resources on the latest drone technology, safety regulations, and flying techniques, all tailored for the UK market.</p>
              <p className="text-lg text-nozu-dark-grey">Our content is meticulously researched and verified by experts, ensuring you get the most accurate and reliable information possible. We are dedicated to building a community of knowledgeable and responsible drone pilots.</p>
              <p className="text-lg text-nozu-dark-grey">Whether you're looking for your first drone, seeking to upgrade your professional gear, or simply want to stay on top of the latest laws, NozuDrones is your trusted guide.</p>
            </div>
          </div>
        </section>

        {/* ======================= Specs Spotlight ======================= */}
        <section ref={specsVideoRef} className="relative bg-nozu-white py-20 px-4 min-h-[200vh] flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold text-nozu-electric-blue mb-20">Drone Specs Spotlight</h2>
          <div className="sticky top-0 w-full max-w-7xl h-screen flex items-center justify-center">
            <div className="relative w-full h-[80vh] rounded-lg overflow-hidden">
              <video
                ref={specsVideoRef}
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/specs-spotlight.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 flex items-end justify-start p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSpecsMessage.message}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="bg-black/50 backdrop-blur-sm p-6 rounded-lg text-white"
                  >
                    <p className="text-2xl font-bold">{currentSpecsMessage.message}</p>
                    <Link href={currentSpecsMessage.link} className="text-nozu-lime-green-refined hover:underline">
                      Learn More
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div className="h-[100vh]"></div> {/* Spacer to allow for scrolling */}
        </section>

        {/* ======================= Interactive Showcase ======================= */}
        <section className="relative z-10 py-20 px-10 bg-nozu-white shadow-2xl">
          <div className="max-w-screen-xl mx-auto text-center space-y-16">
            <h2 className="text-4xl md:text-5xl font-bold text-nozu-electric-blue">Find Your Perfect Drone</h2>
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="relative flex-1 bg-nozu-dark-grey rounded-lg overflow-hidden flex items-center justify-center p-8">
                <Image src={interactiveImage} alt="Drone showcase" width={800} height={600} className="object-contain transition-opacity duration-300" />
              </div>
              <div className="flex-1 flex flex-col justify-center space-y-8">
                {interactiveShowcaseData.map((item, index) => (
                  <Link
                    key={index}
                    href="#"
                    onMouseEnter={() => setInteractiveImage(item.image)}
                    onMouseLeave={() => setInteractiveImage(interactiveShowcaseData[0].image)}
                    className="p-8 bg-nozu-sky-blue rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:bg-nozu-lime-green-refined hover:text-white"
                  >
                    <h3 className="text-3xl font-semibold text-nozu-electric-blue transition-colors duration-300 group-hover:text-white">
                      {item.category}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======================= Trust & Information Section ======================= */}
        <section className="relative z-10 py-20 px-10 bg-nozu-lime-green-refined/30 shadow-2xl">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            <div className="p-8 bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
              <h2 className="text-4xl md:text-5xl font-bold text-nozu-dark-grey">
                Your Guide to UK Drone Laws
              </h2>
              <p className="text-lg text-nozu-dark-grey mt-4">
                We're committed to keeping you compliant and safe. Our resources are regularly updated to reflect the latest CAA regulations.
              </p>
              <Link
                href="/laws/uk-drone-code"
                className="mt-8 inline-block bg-nozu-electric-blue hover:bg-nozu-darker-electric-blue text-white font-bold py-6 px-16 rounded-full shadow-xl transition-all duration-300 text-xl transform hover:-translate-y-2 active:scale-95"
              >
                Read the UK Drone Code
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}