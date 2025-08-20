// src/app/page.jsx v2.40.51
// This version refines the scrollytelling section for smoother transitions and proper element placement.
'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useScroll, useInView, useAnimation } from 'framer-motion';
import { RotateCcw, ArrowDown } from 'lucide-react';

import NozuLogo from '../components/NozuLogo';

const heroContent = [
  { message: "Capture the impossible", digit: 1, videoDesktop: "/hero-clip-rainbow-1920x1080.mp4", videoMobile: "/hero-clip-rainbow-1280x720.mp4", objectPositionDesktop: "center", objectPositionMobile: "center" },
  { message: "Follow the journey", digit: 2, videoDesktop: "/hero-clip-bike-1920x1080.mp4", videoMobile: "/hero-clip-bike-1280x720.mp4", objectPositionDesktop: "bottom", objectPositionMobile: "left" },
  { message: "Explore the peaks", digit: 3, videoDesktop: "/hero-clip-mountain-1280x720.mp4", videoMobile: "/hero-clip-mountain-1280x720.mp4", objectPositionDesktop: "center", objectPositionMobile: "center" },
  { message: "Chase new adventures", digit: 4, videoDesktop: "/hero-clip-dog-1920x1080.mp4", videoMobile: "/hero-clip-dog-1280x720.mp4", objectPositionDesktop: "center", objectPositionMobile: "right" },
  { message: "Ride the big waves", digit: 5, videoDesktop: "/hero-clip-surf-1280x720.mp4", videoMobile: "/hero-clip-surf-1280x720.mp4", objectPositionDesktop: "bottom", objectPositionMobile: "pan-left-to-center" },
];

const interactiveShowcaseData = [
  { category: "Best for Beginners", image: "/showcase/beginner.webp" },
  { category: "Best for Video", image: "/showcase/video.webp" },
  { category: "Best for Professionals", image: "/showcase/professional.webp" },
];

const specsSpotlightData = [
  { message: "Precision Gimbal", time: 0, link: "/guides/gimbal-tech" },
  { message: "High-Powered Motor", time: 1.5, link: "/guides/motor-tech" },
  { message: "Advanced Battery System", time: 3.5, link: "/guides/battery-tech" },
  { message: "UK-Compliant Sensors", time: 5.5, link: "/guides/sensor-tech" },
];

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

export default function Home() {
  const heroVideoRef = useRef(null);
  const coreMessageRef = useRef(null);
  const specsVideoRef = useRef(null);
  const specsVideoPlayerRef = useRef(null);
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const [interactiveImage, setInteractiveImage] = useState(interactiveShowcaseData[0].image);
  const words = heroContent[activeMessageIndex].message.split(" ");
  const [isMessageVisible, setIsMessageVisible] = useState(true);
  const [videoObjectPosition, setVideoObjectPosition] = useState(heroContent[0].objectPositionDesktop);
  const [isMobile, setIsMobile] = useState(false);

  const [showReplayButton, setShowReplayButton] = useState(false);
  const [isControllerShrunk, setIsControllerShrunk] = useState(false);
  const [currentSpecsMessage, setCurrentSpecsMessage] = useState(specsSpotlightData[0]);

  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [hasVideoPlayed, setHasVideoPlayed] = useState(false);

  // 1. Add these states:
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  // Also update your useEffect for better auto-play:
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '0px'
      }
    );

    observer.observe(containerRef.current);

    const calculateProgress = () => {
      if (!containerRef.current) return;

      const windowY = window.pageYOffset || 
                      document.documentElement.scrollTop || 
                      document.body.scrollTop || 
                      window.scrollY;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = containerRef.current.offsetHeight;

      let progress = 0;
      
      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        const scrolledIntoSection = Math.abs(rect.top);
        const maxScroll = sectionHeight - windowHeight;
        progress = Math.min(1, Math.max(0, scrolledIntoSection / maxScroll));
      } else if (rect.top > 0) {
        progress = 0;
      } else {
        progress = 1;
      }

      setScrollProgress(progress);

      // More aggressive auto-play logic
      if (progress > 0.01 && !hasVideoPlayed && videoRef.current && isInView) {
        const playVideo = async () => {
          try {
            // Add user interaction simulation for autoplay policies
            videoRef.current.muted = true;
            await videoRef.current.play();
            setHasVideoPlayed(true);
            console.log('Video started at progress:', progress);
          } catch (error) {
            console.log('Video play failed:', error);
            // Fallback: show manual play button
          }
        };
        // Reduced delay for faster trigger
        setTimeout(playVideo, 50);
      }

      if (progress < 0.005 && hasVideoPlayed && videoRef.current) {
        setHasVideoPlayed(false);
        videoRef.current.currentTime = 0;
        videoRef.current.pause();
      }
    };

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          calculateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    calculateProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculateProgress);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateProgress);
    };
  }, [hasVideoPlayed, isInView]);

  // 3. Improved animation helper with smoother transitions:
  const getSmoothedValue = (progress, start, end, fromValue, toValue) => {
    if (progress <= start) return fromValue;
    if (progress >= end) return toValue;
    
    const range = end - start;
    const localProgress = (progress - start) / range;
    
    // Use easing for smoother animation
    const easedProgress = localProgress < 0.5 
      ? 2 * localProgress * localProgress 
      : 1 - Math.pow(-2 * localProgress + 2, 2) / 2;
      
    return fromValue + (toValue - fromValue) * easedProgress;
  };

  const handleVideoEnd = useCallback(() => {
    setIsControllerShrunk(true);
    setShowReplayButton(true);
  }, []);

  useEffect(() => {
    const currentVideoRef = videoRef.current;
    if (currentVideoRef) {
      currentVideoRef.addEventListener('ended', handleVideoEnd);
      return () => {
        currentVideoRef.removeEventListener('ended', handleVideoEnd);
      };
    }
  }, [handleVideoEnd]);

  const handleReplay = useCallback(() => {
    setHasVideoPlayed(false);
    setIsControllerShrunk(false);
    setShowReplayButton(false);
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Hero Section Logic
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
          const currentVideo = heroContent[activeMessageIndex];
          if (currentVideo.objectPositionMobile === "pan-left-to-center") {
            const videoDuration = videoElement.duration || 1;
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

  // Specs section refs for useInView
  const specsStepRefs = useRef(specsSpotlightData.map(() => React.createRef()));
  const specsVideoController = useAnimation();
  const specsInViewRef = useRef(null);
  const isSpecsSectionInView = useInView(specsInViewRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isSpecsSectionInView) {
      specsVideoController.start('visible');
    }
  }, [isSpecsSectionInView, specsVideoController]);

  // Use useEffect to handle video playback based on isSpecsSectionInView
  useEffect(() => {
    const videoElement = specsVideoPlayerRef.current;
    if (!videoElement) return;

    if (isSpecsSectionInView) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  }, [isSpecsSectionInView]);


  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
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

        {/* ======================= Pure Framer Motion Scrollytelling Section ======================= */}
        <section
          ref={containerRef}
          className="relative bg-nozu-white py-20 px-4 min-h-[500vh] flex flex-col items-center justify-start"
        >
          <div className="sticky top-10 flex flex-col items-center justify-center h-screen w-full">
            
            {/* Main Video Container */}
            <div
              className="relative w-full max-w-6xl aspect-video overflow-hidden shadow-xl bg-gray-100"
              style={{
                transform: `
                  scale(${getSmoothedValue(scrollProgress, 0.7, 0.9, 1, 0.5)}) 
                  translateX(${getSmoothedValue(scrollProgress, 0.7, 0.9, 0, 25)}%) 
                  translateY(${getSmoothedValue(scrollProgress, 0.7, 0.9, 0, -25)}%)
                `,
                borderRadius: `${getSmoothedValue(scrollProgress, 0.7, 0.9, 0, 16)}px`,
                transition: 'all 0.05s ease-out',
                zIndex: scrollProgress > 0.7 ? 10 : 20
              }}
            >
              {/* Static image */}
              <Image
                src="/open-desert.webp"
                alt="Opening frame still from desert video"
                fill
                className="object-cover"
                priority
              />
              
              {/* Main video */}
              <video
                ref={videoRef}
                autoPlay={false}
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover z-10"
                style={{ 
                  opacity: hasVideoPlayed ? 1 : 0,
                  transition: 'opacity 0.5s ease'
                }}
                onEnded={handleVideoEnd}
              >
                <source src="/Desert-1920X1080.mp4" type="video/mp4" />
              </video>
              
              {/* Auto-play trigger - removed manual button, made more aggressive */}
              {!hasVideoPlayed && scrollProgress > 0.02 && (
                <div 
                  className="absolute inset-0 z-30"
                  ref={(el) => {
                    if (el && scrollProgress > 0.02) {
                      // More aggressive auto-play
                      setTimeout(async () => {
                        try {
                          await videoRef.current?.play();
                          setHasVideoPlayed(true);
                          console.log('Auto-play triggered at progress:', scrollProgress);
                        } catch (error) {
                          console.log('Auto-play failed:', error);
                        }
                      }, 100);
                    }
                  }}
                />
              )}
              
              {/* Fallback manual play button - only show if auto-play fails */}
              {!hasVideoPlayed && scrollProgress > 0.1 && (
                <button
                  onClick={async () => {
                    try {
                      await videoRef.current.play();
                      setHasVideoPlayed(true);
                    } catch (error) {
                      console.log('Manual play failed:', error);
                    }
                  }}
                  className="absolute inset-0 z-30 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors"
                >
                  <div className="w-20 h-20 bg-white/80 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-8 border-l-black border-y-6 border-y-transparent ml-1"></div>
                  </div>
                </button>
              )}
              
              {/* Debug Panel */}
              <div className="absolute top-4 left-4 bg-black/90 text-white p-3 rounded text-xs z-50 font-mono">
                <div className="text-green-300">Progress: {scrollProgress.toFixed(3)}</div>
                <div>In View: {isInView.toString()}</div>
                <div>Video: {hasVideoPlayed.toString()}</div>
                <div>Scale: {getSmoothedValue(scrollProgress, 0.7, 0.9, 1, 0.5).toFixed(2)}</div>
              </div>
              
              {/* Controller overlay - only shows after video ends */}
              <AnimatePresence>
                {isControllerShrunk && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="absolute inset-0 w-full h-full z-20"
                    >
                      <Image
                        src="/drone-controller.webp"
                        alt="Person operating drone with controller"
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{
                        scale: 1,
                        opacity: 1,
                        top: "50%",
                        left: "50%",
                        translateX: "-50%",
                        translateY: "-50%",
                      }}
                      animate={{
                        opacity: 1,
                        top: '52.87%',
                        left: '38.75%',
                        width: '12.12%',
                        height: '17.80%',
                        rotate: '-11.4deg',
                        translateX: "0%",
                        translateY: "0%",
                      }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                      className="absolute z-30"
                      style={{ transformOrigin: 'top left' }}
                    >
                      <Image
                        src="/desert.webp"
                        alt="Still frame from video"
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
              
              <AnimatePresence>
                {showReplayButton && (
                  <motion.button
                    onClick={handleReplay}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-4 right-4 z-40 p-3 rounded-full bg-white/80 backdrop-blur-sm text-nozu-electric-blue hover:bg-white transition-colors"
                  >
                    <RotateCcw size={24} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Sequential Messages - now properly timed to not conflict with grid */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="sticky top-[60vh] w-full max-w-4xl mx-auto text-center pointer-events-none">
              
              {/* Message 1 - appears 5-20% */}
              <div
                style={{ 
                  opacity: scrollProgress > 0.65 ? 0 : getSmoothedValue(scrollProgress, 0.05, 0.2, 0, 1),
                  transform: `translateY(${getSmoothedValue(scrollProgress, 0.05, 0.2, 50, 0)}px)`,
                  display: scrollProgress > 0.02 && scrollProgress < 0.68 ? 'block' : 'none'
                }}
                className="px-4"
              >
                <h2 className="text-3xl md:text-5xl font-bold text-nozu-dark-grey">Your Drone, Your Way.</h2>
                <p className="text-lg text-nozu-dark-grey mt-2 max-w-2xl mx-auto">
                  Choosing your first drone can be overwhelming. We guide you to find the perfect match for your style and budget.
                </p>
              </div>
              
              {/* Message 2 - appears 20-40% */}
              <div
                style={{ 
                  opacity: scrollProgress > 0.65 ? 0 : getSmoothedValue(scrollProgress, 0.2, 0.4, 0, 1),
                  transform: `translateY(${getSmoothedValue(scrollProgress, 0.2, 0.4, 50, 0)}px)`,
                  display: scrollProgress > 0.18 && scrollProgress < 0.68 ? 'block' : 'none'
                }}
                className="px-4 absolute top-0 w-full"
              >
                <h2 className="text-3xl md:text-5xl font-bold text-nozu-dark-grey">Fly Safe, Fly Confident.</h2>
                <p className="text-lg text-nozu-dark-grey mt-2 max-w-2xl mx-auto">
                  Safety is our highest priority. Learn essential safety checks and best practices with our step-by-step guides.
                </p>
              </div>
              
              {/* Message 3 - appears 40-65% */}
              <div
                style={{ 
                  opacity: scrollProgress > 0.65 ? 0 : getSmoothedValue(scrollProgress, 0.4, 0.65, 0, 1),
                  transform: `translateY(${getSmoothedValue(scrollProgress, 0.4, 0.65, 50, 0)}px)`,
                  display: scrollProgress > 0.38 && scrollProgress < 0.68 ? 'block' : 'none'
                }}
                className="px-4 absolute top-0 w-full"
              >
                <h2 className="text-3xl md:text-5xl font-bold text-nozu-dark-grey">Know the Law, Fly Free.</h2>
                <p className="text-lg text-nozu-dark-grey mt-2 max-w-2xl mx-auto">
                  Navigate UK drone law with confidence using our up-to-date legal guidance and CAA compliance resources.
                </p>
                <div className="mt-6 flex justify-center">
                  <ArrowDown size={48} className="text-nozu-electric-blue animate-bounce" />
                </div>
              </div>
            </div>

            {/* 2x2 Grid - appears 70%+ and stays visible, positioned to show video in top-right */}
            <div className="sticky top-0 w-full h-screen flex items-center justify-center pointer-events-none">
              <div
                style={{ 
                  opacity: getSmoothedValue(scrollProgress, 0.7, 0.85, 0, 1),
                  transform: `scale(${getSmoothedValue(scrollProgress, 0.7, 0.85, 0.9, 1)})`,
                  display: scrollProgress > 0.68 ? 'grid' : 'none'
                }}
                className="w-full max-w-6xl grid grid-cols-2 grid-rows-2 gap-6 p-6 relative z-0"
              >
                {/* Top Left - Choosing */}
                <div className="bg-nozu-sky-blue/90 backdrop-blur-sm rounded-xl p-8 flex items-center justify-center">
                  <div className="text-center text-nozu-dark-grey">
                    <h3 className="text-2xl font-bold mb-4">Choosing</h3>
                    <p className="text-sm leading-relaxed">
                      Find your perfect drone match with our comprehensive buying guides and recommendations.
                    </p>
                  </div>
                </div>
                
                {/* Top Right - Video space (empty div to maintain grid structure) */}
                <div className="bg-transparent rounded-xl relative">
                  {/* Video will appear here due to transform positioning */}
                </div>
                
                {/* Bottom Left - Safety */}
                <div className="bg-nozu-lime-green-refined/90 backdrop-blur-sm rounded-xl p-8 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold mb-4">Safety</h3>
                    <p className="text-sm leading-relaxed">
                      Master essential safety protocols with our practical, step-by-step safety guides.
                    </p>
                  </div>
                </div>
                
                {/* Bottom Right - Legal */}
                <div className="bg-nozu-electric-blue/90 backdrop-blur-sm rounded-xl p-8 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold mb-4">Legal</h3>
                    <p className="text-sm leading-relaxed">
                      Navigate UK regulations with our up-to-date legal guidance and CAA compliance resources.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= Specs Spotlight ======================= */}
        <section
          ref={specsVideoRef}
          className="relative bg-nozu-white py-20 px-4 min-h-[400vh] flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-nozu-electric-blue mb-20">
            Drone Specs Spotlight
          </h2>

          <div ref={specsInViewRef} className="sticky top-0 w-full max-w-7xl h-screen flex items-center justify-center">
            <div className="relative w-full h-[80vh] rounded-lg overflow-hidden">
              <video
                ref={specsVideoPlayerRef}
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
                {/* This invisible div acts as the scroll trigger for the video time updates */}
              </div>
            </div>
          ))}
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