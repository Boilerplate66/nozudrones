// src/components/HeroSection.jsx v1.0.1
// This version uses a combination of screen width and orientation to ensure the hero section video is correctly sized on all devices.
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const heroContent = [
  { message: "Capture the impossible", digit: 1, videoDesktop: "/hero-clip-rainbow-1920x1080.mp4", videoMobile: "/hero-clip-rainbow-1280x720.mp4", objectPositionDesktop: "center", objectPositionMobile: "center" },
  { message: "Follow the journey", digit: 2, videoDesktop: "/hero-clip-bike-1920x1080.mp4", videoMobile: "/hero-clip-bike-1280x720.mp4", objectPositionDesktop: "bottom", objectPositionMobile: "left" },
  { message: "Explore the peaks", digit: 3, videoDesktop: "/hero-clip-mountain-1280x720.mp4", videoMobile: "/hero-clip-mountain-1280x720.mp4", objectPositionDesktop: "center", objectPositionMobile: "center" },
  { message: "Chase new adventures", digit: 4, videoDesktop: "/hero-clip-dog-1920x1080.mp4", videoMobile: "/hero-clip-dog-1280x720.mp4", objectPositionDesktop: "center", objectPositionMobile: "right" },
  { message: "Ride the big waves", digit: 5, videoDesktop: "/hero-clip-surf-1280x720.mp4", videoMobile: "/hero-clip-surf-1280x720.mp4", objectPositionDesktop: "bottom", objectPositionMobile: "pan-left-to-center" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      ease: "easeInOut",
      duration: 0.5,
    },
  },
};

export default function HeroSection() {
  const heroVideoRef = useRef(null);
  const [heroMessageIndex, setHeroMessageIndex] = useState(0);
  const words = heroContent[heroMessageIndex].message.split(" ");
  const [isMessageVisible, setIsMessageVisible] = useState(true);
  const [videoObjectPosition, setVideoObjectPosition] = useState(heroContent[0].objectPositionDesktop);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const videoElement = heroVideoRef.current;
    if (videoElement) {
      const handleVideoEnd = () => {
        setHeroMessageIndex((prevIndex) => (prevIndex + 1) % heroContent.length);
      };

      const handleTimeUpdate = () => {
        if (videoElement.duration && videoElement.currentTime >= videoElement.duration - 1.0) {
          setIsMessageVisible(false);
        }
        if (isMobile) {
          const currentVideo = heroContent[heroMessageIndex];
          if (currentVideo.objectPositionMobile === "pan-left-to-center") {
            const panProgress = (videoElement.currentTime / (videoElement.duration || 1)) * 50;
            setVideoObjectPosition(`${panProgress}% 50%`);
          } else {
            setVideoObjectPosition(currentVideo.objectPositionMobile);
          }
        } else {
          if (heroContent[heroMessageIndex].message === "Follow the journey") {
            const videoDuration = videoElement.duration || 1;
            const currentTime = videoElement.currentTime;
            let panProgress;
            if (currentTime <= 3.5) {
              panProgress = (currentTime / 3.5);
            } else {
              const remainingTime = videoDuration - 3.5;
              if (remainingTime > 0) {
                panProgress = 1 - ((currentTime - 3.5) / remainingTime);
              } else {
                panProgress = 0;
              }
            }
            const invertedProgress = 1 - panProgress;
            setVideoObjectPosition(`50% ${invertedProgress * 100}%`);
          } else {
            setVideoObjectPosition(heroContent[heroMessageIndex].objectPositionDesktop);
          }
        }
      };

      const handleLoadedData = () => {
        setIsMessageVisible(true);
        if (isMobile) {
          setVideoObjectPosition(heroContent[heroMessageIndex].objectPositionMobile);
        } else {
          setVideoObjectPosition(heroContent[heroMessageIndex].objectPositionDesktop);
        }
      };

      videoElement.addEventListener('loadeddata', handleLoadedData);
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
      videoElement.addEventListener('ended', handleVideoEnd);

      return () => {
        videoElement.removeEventListener('loadeddata', handleLoadedData);
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        videoElement.removeEventListener('ended', handleVideoEnd);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [heroMessageIndex, isMobile]);

  return (
    <section className="relative h-[40vh] md:h-[calc(85vh-64px)] lg:h-[calc(85vh-64px)] overflow-hidden flex items-center justify-center text-center landscape:h-[calc(85vh-64px)]">
      <video
        ref={heroVideoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        key={isMobile ? heroContent[heroMessageIndex].videoMobile : heroContent[heroMessageIndex].videoDesktop}
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ objectPosition: videoObjectPosition }}
      >
        <source src={heroContent[heroMessageIndex].videoDesktop} type="video/mp4" media="(min-width: 769px)" />
        <source src={heroContent[heroMessageIndex].videoMobile} type="video/mp4" media="(max-width: 768px)" />
      </video>
      <AnimatePresence mode="wait">
        <motion.div
          key={heroContent[heroMessageIndex].digit}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute top-4 left-4 text-7xl font-bold opacity-75"
        >
          {heroContent[heroMessageIndex].digit}
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-4 right-4 z-10 text-white md:relative md:max-w-5xl md:mx-auto md:space-y-10 md:text-center">
        <AnimatePresence mode="wait">
          {isMessageVisible && (
            <motion.h1
              className="text-2xl md:text-8xl font-extrabold text-white text-shadow-lg leading-tight md:leading-tight"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  variants={itemVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  {word}
                  {index < words.length - 1 && <>&nbsp;</>}
                </motion.span>
              ))}
            </motion.h1>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}