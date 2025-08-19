// src/app/page.jsx v2.17.4
// This version re-implements the drone controller visual and the freeze-frame effect for the Core Message section.
'use client'; // This directive marks the component as a Client Component

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';

// Import your components
import NozuLogo from '../components/NozuLogo';

// Define the content for the Hero section with new videos and messages
const heroContent = [
  // New 'mobilePan' property defines the cropping/panning for mobile view
  { message: "Capture the impossible", digit: 1, videoDesktop: "/hero-clip-rainbow-1920x1080.mp4", videoMobile: "/hero-clip-rainbow-1280x720.mp4", objectPositionDesktop: "center", objectPositionMobile: "center" },
  { message: "Follow the journey", digit: 2, videoDesktop: "/hero-clip-bike-1920x1080.mp4", videoMobile: "/hero-clip-bike-1280x720.mp4", objectPositionDesktop: "bottom", objectPositionMobile: "left" },
  { message: "Explore the peaks", digit: 3, videoDesktop: "/hero-clip-mountain-1920x1080.mp4", videoMobile: "/hero-clip-mountain-1280x720.mp4", objectPositionDesktop: "center", objectPositionMobile: "center" },
  { message: "Chase new adventures", digit: 4, videoDesktop: "/hero-clip-dog-1920x1080.mp4", videoMobile: "/hero-clip-dog-1280x720.mp4", objectPositionDesktop: "center", objectPositionMobile: "right" },
  { message: "Ride the big waves", digit: 5, videoDesktop: "/hero-clip-surf-1920x1080.mp4", videoMobile: "/hero-clip-surf-1280x720.mp4", objectPositionDesktop: "bottom", objectPositionMobile: "pan-left-to-center" },
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

// Animation variants for staggered word reveal
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Delay between each child animation
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

export default function Home() {
  const heroVideoRef = useRef(null);
  const coreMessageRef = useRef(null);
  const coreVideoRef = useRef(null);
  const specsVideoRef = useRef(null);
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const [interactiveImage, setInteractiveImage] = useState(interactiveShowcaseData[0].image);
  const words = heroContent[activeMessageIndex].message.split(" ");
  const [isMessageVisible, setIsMessageVisible] = useState(true);
  const [videoObjectPosition, setVideoObjectPosition] = useState(heroContent[0].objectPositionDesktop);
  const [isMobile, setIsMobile] = useState(false);
  const [isDroneViewCaptured, setIsDroneViewCaptured] = useState(false);

  // Framer Motion scroll hook for Core Message Split Screen
  const { scrollYProgress } = useScroll({ target: coreMessageRef });

  // Framer Motion scroll hook for Specs Spotlight
  const { scrollYProgress: specsScrollYProgress } = useScroll({ target: specsVideoRef });
  const specsVideoTime = useTransform(specsScrollYProgress, [0, 1], [0, 8]); // Video is 4s, played at 0.5x speed for 8s
  const [currentSpecsMessage, setCurrentSpecsMessage] = useState(specsSpotlightData[0]);

  // This effect handles the video playback and message changes.
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const videoElement = heroVideoRef.current;
    if (videoElement) {
      const handleVideoEnd = () => {
        setActiveMessageIndex((prevIndex) => (prevIndex + 1) % heroContent.length);
      };

      const handleTimeUpdate = () => {
        if (videoElement.duration && videoElement.currentTime >= videoElement.duration - 1.0) {
          setIsMessageVisible(false);
        }
        if (isMobile) {
          const videoDuration = videoElement.duration || 1;
          const currentVideo = heroContent[activeMessageIndex];
          if (currentVideo.objectPositionMobile === "pan-left-to-center") {
            const panProgress = (videoElement.currentTime / videoDuration) * 50;
            setVideoObjectPosition(`${panProgress}% 50%`);
          } else {
            setVideoObjectPosition(currentVideo.objectPositionMobile);
          }
        } else {
          if (heroContent[activeMessageIndex].message === "Follow the journey") {
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
            setVideoObjectPosition(heroContent[activeMessageIndex].objectPositionDesktop);
          }
        }
      };

      const handleLoadedData = () => {
        setIsMessageVisible(true);
        if (isMobile) {
          setVideoObjectPosition(heroContent[activeMessageIndex].objectPositionMobile);
        } else {
          setVideoObjectPosition(heroContent[activeMessageIndex].objectPositionDesktop);
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
  }, [activeMessageIndex, isMobile]);

  // New logic for the Core Message section
  useEffect(() => {
    const videoElement = coreVideoRef.current;
    if (!videoElement) return;

    const unsubscribeScroll = scrollYProgress.on('change', (latest) => {
      // Trigger the freeze-frame transition when the user scrolls 25% of the way down the section
      if (latest >= 0.25 && !isDroneViewCaptured) {
        setIsDroneViewCaptured(true);
        videoElement.pause();
      }
    });

    return () => unsubscribeScroll();
  }, [scrollYProgress, isDroneViewCaptured]);

  // Specs Spotlight Logic
  useEffect(() => {
    const videoElement = specsVideoRef.current;
    if (!videoElement) return;

    const unsubscribeScroll = specsVideoTime.on('change', (latestTime) => {
      videoElement.currentTime = latestTime;
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
        <section className="relative h-[calc(85vh-64px)] lg:h-[calc(85vh-64px)] md:h-[calc(85vh-64px)] h-[40vh] overflow-hidden flex items-center justify-center text-center">
          <video
            ref={heroVideoRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            key={isMobile ? heroContent[activeMessageIndex].videoMobile : heroContent[activeMessageIndex].videoDesktop}
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ objectPosition: videoObjectPosition }}
          >
            <source src={heroContent[activeMessageIndex].videoDesktop} type="video/mp4" media="(min-width: 769px)" />
            <source src={heroContent[activeMessageIndex].videoMobile} type="video/mp4" media="(max-width: 768px)" />
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
          <div className="absolute bottom-4 right-4 z-10 text-white md:relative md:max-w-5xl md:mx-auto md:space-y-10 md:text-center">
            <AnimatePresence mode="wait">
              {isMessageVisible && (
                <motion.h1
                  key={heroContent[activeMessageIndex].message}
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

        {/* ======================= Core Message Split Screen ======================= */}
        <section ref={coreMessageRef} className="relative bg-nozu-white py-20 px-4 min-h-[200vh] flex flex-col items-center">
          <div className="sticky top-0 w-full max-w-7xl h-screen flex items-center justify-center">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-xl">
              <AnimatePresence>
                {!isDroneViewCaptured && (
                  <motion.div
                    key="live-view"
                    initial={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <video
                      ref={coreVideoRef}
                      autoPlay
                      muted
                      playsInline
                      preload="auto"
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src="/Desert-1920X1080.mp4" type="video/mp4" />
                    </video>
                  </motion.div>
                )}
                {isDroneViewCaptured && (
                  <motion.div
                    key="controller-view"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src="/ai-drone-controller.webp"
                      alt="Person operating drone with controller"
                      fill
                      className="object-cover"
                    />
                    <motion.div
                      initial={{ opacity: 0, x: -100, y: -100, rotate: -20 }}
                      animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="absolute w-[30%] h-[30%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <Image
                        src="/image_7d6fcc.jpg"
                        alt="Captured drone view"
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="w-full max-w-7xl p-12 space-y-16 mt-20 md:mt-0">
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