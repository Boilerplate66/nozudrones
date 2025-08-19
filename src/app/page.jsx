// src/app/page.jsx v2.40.18
// This update adds a key to the parent animation div to ensure it resets properly on each loop, which may resolve the visual issue.
'use client'; // This directive marks the component as a Client Component

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useScroll, useTransform, useAnimation } from 'framer-motion';

// Import your components
import NozuLogo from '../components/NozuLogo';

// Define the content for the Hero section with new videos and messages
const heroContent = [
  // New 'mobilePan' property defines the cropping/panning for mobile view
  { message: "Capture the impossible", digit: 1, videoDesktop: "/hero-clip-rainbow-1920x1080.mp4", videoMobile: "/hero-clip-rainbow-1280x720.mp4", objectPositionDesktop: "center", objectPositionMobile: "center" },
  { message: "Follow the journey", digit: 2, videoDesktop: "/hero-clip-bike-1920x1080.mp4", videoMobile: "/hero-clip-bike-1280x720.mp4", objectPositionDesktop: "bottom", objectPositionMobile: "left" },
  { message: "Explore the peaks", digit: 3, videoDesktop: "/hero-clip-mountain-1920x1080.mp4", videoMobile: "/hero-clip-mountain-1280x720.mp4", objectPositionDesktop: "center", objectPositionMobile: "center" },
  { message: "Chase new adventures", digit: 4, videoDesktop: "/hero-clip-dog-1920x1080.mp4", videoMobile: "/hero-clip-dog-1280x720.mp4", objectPositionDesktop: "center", objectPositionMobile: "right" },
  { message: "Ride the big waves", digit: 5, videoDesktop: "/hero-clip-surf-1280x720.mp4", videoMobile: "/hero-clip-surf-1280x720.mp4", objectPositionDesktop: "bottom", objectPositionMobile: "pan-left-to-center" },
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

// New content for the Core Message 2x2 grid
const coreMessageGridContent = {
  topLeft: {
    title: "Choosing",
    text: "Choosing your first drone can be overwhelming. That's why we take the confusion out of the buying process, helping you find the perfect drone to match your budget and flying style. With our clear, simple guides, you'll be **ready to fly** and capture incredible aerial content from day one.",
    image: "/blue-drone.jpg",
    alt: "Placeholder image of a blue drone",
    color: "bg-nozu-sky-blue",
    animation: { initial: { x: -200, opacity: 0 }, whileInView: { x: 0, opacity: 1 }, transition: { duration: 0.8 } },
  },
  bottomLeft: {
    title: "Safety",
    text: "Safety is our highest priority. We provide practical, step-by-step guides on everything you need to know before you fly. By learning essential safety checks and best practices, you'll feel confident and reassured, so you are always **ready to fly** without harm.",
    image: "/blue-drone.jpg",
    alt: "Placeholder image of a blue drone",
    color: "bg-nozu-lime-green-refined/30",
    animation: { initial: { y: 200, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, transition: { duration: 0.8 } },
  },
  bottomRight: {
    title: "Legal",
    text: "Navigating UK drone law is essential. We clarify the rules set by the Civil Aviation Authority (CAA), so you understand where you can fly and how to stay compliant. With our reliable and up-to-date information, you can pilot your drone knowing you are legally **ready to fly**.",
    image: "/blue-drone.jpg",
    alt: "Placeholder image of a blue drone",
    color: "bg-nozu-electric-blue/30",
    animation: { initial: { x: 200, opacity: 0 }, whileInView: { x: 0, opacity: 1 }, transition: { duration: 0.8 } },
  },
};

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
  const specsVideoRef = useRef(null);
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const [interactiveImage, setInteractiveImage] = useState(interactiveShowcaseData[0].image);
  const words = heroContent[activeMessageIndex].message.split(" ");
  const [isMessageVisible, setIsMessageVisible] = useState(true);
  const [videoObjectPosition, setVideoObjectPosition] = useState(heroContent[0].objectPositionDesktop);
  const [isMobile, setIsMobile] = useState(false);

  // New state for the animated video sequence
  const [animationStep, setAnimationStep] = useState(0);

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

  // New logic for the Animated Video Sequence
  useEffect(() => {
    const sequence = async () => {
      // Step 1: Start video
      setAnimationStep(1);
      // Wait for 10 seconds to allow video to play completely
      await new Promise(r => setTimeout(r, 10000)); 

      // Step 2: Flash
      setAnimationStep(2);
      await new Promise(r => setTimeout(r, 200));

      // Step 3: Show new screen (controller + still frame)
      setAnimationStep(3);
      await new Promise(r => setTimeout(r, 500)); 
      
      // Step 4: Animate into controller screen
      setAnimationStep(4);
      await new Promise(r => setTimeout(r, 500)); 

      // Step 5: Hold for 2 seconds
      setAnimationStep(5);
      await new Promise(r => setTimeout(r, 2000));

      // Step 6: Repeat
      setAnimationStep(0); // Reset to trigger re-render and restart
    };

    if (animationStep === 0) {
      sequence();
    }
  }, [animationStep]);

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

        {/* ======================= Core Message 2x2 Grid Section ======================= */}
        <section ref={coreMessageRef} className="relative bg-nozu-white py-6 px-4">
          <div className="max-w-screen-xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-nozu-electric-blue text-center mb-8 lg:mb-12">
              Equipping you to fly.
            </h2>
            {/* NEW: This container provides the 2x2 grid layout on larger screens. */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* This is the top-left item (the 'Choosing' box) */}
              <motion.div
                initial={coreMessageGridContent.topLeft.animation.initial}
                whileInView={coreMessageGridContent.topLeft.animation.whileInView}
                transition={coreMessageGridContent.topLeft.animation.transition}
                viewport={{ once: true, amount: 0.3 }}
                className={`flex flex-col justify-center space-y-6 p-8 bg-nozu-sky-blue min-h-[300px]`}
              >
                <h3 className="text-3xl md:text-4xl font-bold text-nozu-electric-blue">
                  {coreMessageGridContent.topLeft.title}
                </h3>
                <p 
                  className="text-lg text-nozu-dark-grey"
                  dangerouslySetInnerHTML={{ __html: coreMessageGridContent.topLeft.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                />
              </motion.div>
              {/* This is the top-right item (the animation) */}
              <div className="relative w-full h-auto aspect-video overflow-hidden shadow-xl min-h-[300px]">
                <AnimatePresence key={animationStep}>
                    {animationStep === 1 && (
                      <motion.video
                        key="video"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        autoPlay
                        muted
                        playsInline
                        preload="auto"
                        className="absolute inset-0 w-full h-full object-cover"
                      >
                        <source src="/Desert-1920X1080.mp4" type="video/mp4" />
                      </motion.video>
                    )}
                    {animationStep === 2 && (
                      <motion.div
                        key="flash"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        className="absolute inset-0 z-10 bg-white"
                      />
                    )}
                    {(animationStep >= 3) && (
                      <motion.div
                        key="controller"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 w-full h-full"
                      >
                        <Image
                          src="/drone-controller.webp"
                          alt="Person operating drone with controller"
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    )}
                    {(animationStep >= 3) && (
                      <motion.div
                        key="animated-image"
                        initial={{ 
                          scale: 1, 
                          opacity: 1, 
                          top: "50%", 
                          left: "50%", 
                          translateX: "-50%", 
                          translateY: "-50%", 
                        }}
                        animate={animationStep >= 4 ? { 
                          opacity: 1,
                          top: '52.87%',
                          left: '38.75%',
                          width: '12.12%',
                          height: '17.80%',
                          rotate: '-11.4deg',
                          translateX: "0%",
                          translateY: "0%",
                          transition: { duration: 1, ease: "easeInOut" } 
                        } : {}}
                        exit={{ opacity: 0, transition: { duration: 0.5 } }}
                        className="absolute"
                        style={{ transformOrigin: 'top left' }}
                      >
                        <Image
                          src="/desert.webp"
                          alt="Still frame from video"
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
              </div>
              {/* This is the bottom-left item (Safety) */}
              <motion.div
                initial={coreMessageGridContent.bottomLeft.animation.initial}
                whileInView={coreMessageGridContent.bottomLeft.animation.whileInView}
                transition={coreMessageGridContent.bottomLeft.animation.transition}
                viewport={{ once: true, amount: 0.3 }}
                className={`flex flex-col justify-center space-y-6 p-8 bg-nozu-lime-green-refined/30 min-h-[300px]`}
              >
                <h3 className="text-3xl md:text-4xl font-bold text-nozu-electric-blue">
                  {coreMessageGridContent.bottomLeft.title}
                </h3>
                <p 
                  className="text-lg text-nozu-dark-grey"
                  dangerouslySetInnerHTML={{ __html: coreMessageGridContent.bottomLeft.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                />
              </motion.div>
              {/* This is the bottom-right item (Legal) */}
              <motion.div
                initial={coreMessageGridContent.bottomRight.animation.initial}
                whileInView={coreMessageGridContent.bottomRight.animation.whileInView}
                transition={coreMessageGridContent.bottomRight.animation.transition}
                viewport={{ once: true, amount: 0.3 }}
                className={`flex flex-col justify-center space-y-6 p-8 bg-nozu-electric-blue/30 min-h-[300px]`}
              >
                <h3 className="text-3xl md:text-4xl font-bold text-nozu-electric-blue">
                  {coreMessageGridContent.bottomRight.title}
                </h3>
                <p 
                  className="text-lg text-nozu-dark-grey"
                  dangerouslySetInnerHTML={{ __html: coreMessageGridContent.bottomRight.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                />
              </motion.div>
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