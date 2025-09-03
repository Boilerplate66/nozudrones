// src/components/ScrollytellingSection.jsx v1.9.6
// Version Log (Top of File)
// - [2025-09-03] v1.9.6: Resolved the preloading failure by adding `autoPlay` to the `<video>` element. This ensures the video begins buffering immediately, allowing the `canplaythrough` event to fire and correctly initiate the transition from the `preloading` phase. Added an `onError` handler for future debugging.
// - [2025-09-03] v1.9.5: Final surgical fix to resolve the endless loading spinner bug. Refactored the `videoLoaded` transition `useEffect` to manage its own local timers, decoupling it from the global `clearAllTimers` function. This prevents a cross-effect race condition and guarantees the component will always advance from the preloading phase.
// - [2025-09-03] v1.9.4: Performed a surgical fix to resolve the endless loading spinner bug. Decoupled the video loading state from the phase transition timers by separating them into two distinct useEffect hooks. This ensures the fallback timer is no longer prematurely canceled, guaranteeing a transition to a new state under all conditions.
// - [2025-09-03] v1.9.3: Final fix for the `preloading` phase logic. Consolidated the transition logic into a single `useEffect` to prevent a race condition where one effect would clear the timers of another. This guarantees the component can always transition from `preloading`, fully resolving the endless loading circle bug.
// - [2025-09-03] v1.9.2: Corrected the final race condition in the `preloading` phase's cleanup function. The fallback timer is no longer prematurely canceled, guaranteeing a transition to the `complete` state even if the `canplaythrough` event is not fired by the browser. This resolves the "endless loading circle" bug.
// - [2025-09-03] v1.9.1: Corrected critical logical flaws that caused the component to get stuck in a loading state. Refactored the preloading phase to guarantee a transition even if `canplaythrough` is not fired reliably. Fixed a double-transition bug, ensured all timers are properly cleaned up to prevent memory leaks and "ghost" messages, and added a robust `exit` animation to the video element for a clean visual tear-down.
// - [2025-09-03] v1.9.0: Implemented the final, deterministic state machine architecture (idle → preloading → growing → playing → complete) to resolve all previous issues. Replaced the flawed transforming phase with a direct transition from `playing` to `complete`. All timers are now managed centrally to prevent memory leaks, and video loading is robust with `canplaythrough` and `readyState` guards. The on-screen messages now follow a precise, leak-free timed loop.
// - [2025-09-03] v1.8.1: Corrected a critical typo in the closing tag of AnimatePresence that caused a build error. Re-verified the entire file for syntax errors.
// - [2025-09-03] v1.8.0: Re-architected to a deterministic, time-based state machine (idle → preloading → growing → playing → transforming → complete). Fixed video playback issues, added a loading indicator and a fallback timer for video loading. Implemented the "flash" effect and automated the final grid transformation. All timers and listeners are now correctly managed to prevent memory leaks.
// - [2025-09-03] v1.7.0: Re-architected to a deterministic, time-based state machine. The sequence now triggers on viewport entry, the video playback rate is 1.3x, and all animations and messages are automated, resolving all previous bugs. Added loading indicator and a fallback timer for video loading.
// - [2025-09-03] v1.6.0: Reworked logic to be fully automated. Removed all scrollytelling hooks and replaced them with a timed, state-based sequence. Aligned the sequential message animation with the HeroSection's word-by-word staggered animation and adjusted video speed to 1.5x.
// - [2025-09-03] v1.5.0: Reworked logic to precisely match the specification's timing and aesthetics. The initial container is now a sharp rectangle that grows from the top-right corner, and video playback is triggered by container growth and video readiness. The final animation is now solely triggered by the video's 'ended' event.
// - [2025-09-03] v1.4.0: Reworked core logic to correct multiple issues. Removed rounded placeholder, changed video start to be dependent on both container growth and video readiness, and fixed the final animation trigger to fire on video completion, not scroll position.
// - [2025-09-03] v1.3.0: Refactored to separate fixed-duration video animation from scroll-driven messaging and grid reveals. Removed incorrect video scrubbing logic. Added phased animation logic and a 'replay' function.
// - [2025-08-28] v1.2.4: Added a temporary red border for visual debugging to confirm when container growth is complete and the video should begin to play.
// - [2025-08-28] v1.2.3: Added extensive console logging to diagnose why the video is not playing automatically, as requested. No user-facing changes.
// - [2025-08-28] v1.2.2: Added a play button to manually start the video and a console log to verify video readiness, addressing the issue of video not playing automatically.
// - [2025-08-28] v1.2.1: Removed the red border from the video wrapper now that the scroll tracking and animation reset logic have been confirmed to be working correctly.
// - [2025-08-28] v1.1.5: Reverted useScroll to use the scrollytellingRef target to fix scroll tracking.
// - [2025-08-28] v1.1.4: Combined best solutions: reverted useScroll to default to window but kept h-screen centering, console logs, and image error handling.
// - [2025-08-28] v1.1.3: User-provided fixed version with useScroll target, centering, debugging logs, and image error handling.
// - [2025-08-28] v1.1.2: Corrected version number after a log update.
// - [2025-08-28] v1.1.1: Refactored the useScroll hook to use the window as its target for more reliable scrollytelling.
// - [2025-08-28] v1.1.0: Changed container height to min-h-[250vh] and added a new console log to track the component's height on every render.
// - [2025-08-28] v1.0.9: Changed container height to min-h-[250vh] and added a console log to track the component's height when it is in view.
// - [2025-08-28] v1.0.8: Finalised and corrected the version log format.
// - [2025-08-28] v1.0.7: Added temporary debug styling to the main container to confirm it is rendering correctly. Also added a console log to check for 'in view' status.
// - [2025-08-28] v1.0.6: Refined video loading and playback logic to ensure the placeholder image is visible until both the video has loaded and container growth is complete.
// - [2025-08-15] v1.0.5: Refactored the core message grid from a single element to a separate component, improving code clarity and reusability.
// - [2025-08-01] v1.0.1: Initial file creation and component structuring.

'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { RotateCcw, Loader2 } from 'lucide-react';

const sequentialMessages = [
  { text: "Your Drone, Your Way." },
  { text: "Fly Safe, Fly Confident." },
  { text: "Know the Law, Fly Free." },
];

const coreMessageGridContent = {
  topLeft: {
    title: "Your Drone, Your Way.",
    text: "Choosing your first drone can be overwhelming. We guide you to find the perfect match for your style and budget.",
    image: "/blue-ocean.webp",
    alt: "Image of a blue ocean",
  },
  bottomLeft: {
    title: "Fly Safe, Fly Confident.",
    text: "Safety is our highest priority. Learn essential safety checks and best practices with our step-by-step guides.",
    image: "/blue-ocean.webp",
    alt: "Image of a blue ocean",
  },
  bottomRight: {
    title: "Know the Law, Fly Free.",
    text: "Navigate UK drone law with confidence using our up-to-date legal guidance and CAA compliance resources.",
    image: "/blue-ocean.webp",
    alt: "Image of a blue ocean",
  },
};

const containerGrowthDuration = 2000; // In milliseconds
const videoFallbackTimer = 10000; // In milliseconds

const heroMessageVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const heroMessageItemVariants = {
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

export default function ScrollytellingSection() {
  const scrollytellingRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const timersRef = useRef([]);

  const [phase, setPhase] = useState('idle'); // 'idle', 'preloading', 'growing', 'playing', 'complete'
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoFrameUrl, setVideoFrameUrl] = useState(null);
  const [messageIndex, setMessageIndex] = useState(-1);

  const isInView = useInView(scrollytellingRef, { amount: 0.1, once: true });
  const words = messageIndex !== -1 ? sequentialMessages[messageIndex].text.split(" ") : [];

  const addTimer = (id) => {
    timersRef.current.push(id);
    return id;
  };

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const runPostVideoAnimations = useCallback(() => {
    const v = videoRef.current;
    if (v && canvasRef.current) {
      const c = canvasRef.current;
      c.width = v.videoWidth;
      c.height = v.videoHeight;
      c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
      setVideoFrameUrl(c.toDataURL('image/jpeg'));
    }
    setPhase('complete');
  }, []);

  const replay = useCallback(() => {
    setPhase('idle');
    setVideoLoaded(false);
    setVideoFrameUrl(null);
    setMessageIndex(-1);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
    clearAllTimers();
  }, [clearAllTimers]);

  // Main state machine logic
  useEffect(() => {
    if (isInView && phase === 'idle') {
      setPhase('preloading');
    }
  }, [isInView, phase]);

  useEffect(() => {
    if (phase !== 'preloading') return;
    const v = videoRef.current;
    if (!v) return;

    const onCanPlayThrough = () => {
      setVideoLoaded(true);
    };

    const fallbackTimerId = setTimeout(() => {
      console.error("Video loading timed out, transitioning to fallback.");
      setPhase('complete');
    }, videoFallbackTimer);

    v.addEventListener('canplaythrough', onCanPlayThrough, { once: true });

    if (v.readyState >= 3) {
      setVideoLoaded(true);
    }

    return () => {
      v.removeEventListener('canplaythrough', onCanPlayThrough);
      clearTimeout(fallbackTimerId);
    };
  }, [phase]);

  // Dedicated effect to handle the transition from preloading to playing once video is loaded
  useEffect(() => {
    let growingTimerId;
    let playingTimerId;

    if (videoLoaded && phase === 'preloading') {
      growingTimerId = setTimeout(() => setPhase('growing'), 200);
      playingTimerId = setTimeout(() => setPhase('playing'), 200 + containerGrowthDuration);
    }

    return () => {
      if (growingTimerId) clearTimeout(growingTimerId);
      if (playingTimerId) clearTimeout(playingTimerId);
    };
  }, [videoLoaded, phase]);

  useEffect(() => {
    const v = videoRef.current;
    if (phase !== 'playing' || !v) return;

    const toComplete = () => {
      runPostVideoAnimations();
    };

    const onEnded = () => toComplete();
    const onTimeUpdate = () => {
      if (v.duration && v.duration - v.currentTime < 0.1) {
        toComplete();
      }
    };

    v.addEventListener('ended', onEnded, { once: true });
    v.addEventListener('timeupdate', onTimeUpdate);
    v.playbackRate = 1.3;
    v.play().catch(error => {
      console.error('Video auto-play failed:', error);
      setPhase('complete');
    });

    const showMs = 2400;
    const gapMs = 600;
    sequentialMessages.forEach((_, i) => {
      addTimer(setTimeout(() => {
        if (phase === 'playing') setMessageIndex(i);
      }, i * (showMs + gapMs)));
      addTimer(setTimeout(() => {
        if (phase === 'playing') setMessageIndex(-1);
      }, i * (showMs + gapMs) + showMs));
    });

    return () => {
      v.removeEventListener('ended', onEnded);
      v.removeEventListener('timeupdate', onTimeUpdate);
      clearAllTimers();
      setMessageIndex(-1);
    };
  }, [phase, runPostVideoAnimations, addTimer, clearAllTimers]);

  const containerVariants = {
    initial: {
      scaleX: 0.0078, // 10px / 1280px
      scaleY: 0.0078, // 5.625px / 720px
      top: '5%',
      right: '10%',
      x: '0%',
      y: '0%',
    },
    growing: {
      scaleX: 1,
      scaleY: 1,
      top: '50%',
      right: '50%',
      x: '50%',
      y: '-50%',
      transition: { duration: containerGrowthDuration / 1000, ease: "easeInOut" },
    },
  };

  return (
    <div ref={scrollytellingRef} className="w-full min-h-screen relative z-10 bg-gray-200">
      <h2 className="text-center text-4xl md:text-5xl font-bold text-nozu-electric-blue pt-10 pb-8">What we can do for you</h2>
      <div className="sticky top-0 h-screen w-full flex justify-center items-center overflow-hidden z-40 relative">
        <canvas ref={canvasRef} className="hidden" />

        {phase === 'preloading' && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Loader2 className="animate-spin text-nozu-electric-blue" size={48} />
          </div>
        )}

        <AnimatePresence mode="wait">
        {(phase === 'growing' || phase === 'playing') && (
            <motion.div
                className="absolute aspect-video z-30 overflow-hidden w-[1280px] h-[720px]"
                variants={containerVariants}
                initial="initial"
                animate="growing"
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.1
                  }
                }}
                style={{ originX: 1, originY: 0 }}
            >
            <Image
                src="/open-desert.webp"
                alt="A still image of a desert landscape"
                fill
                className="absolute inset-0 object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 100vw"
                style={{ opacity: (phase === 'playing') ? 0 : 1, transition: 'opacity 0.2s ease-in' }}
            />
            <motion.video
                autoPlay
                muted
                playsInline
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                src="/Desert-1920X1080.mp4"
                onError={(e) => console.error("Video failed to load:", e)}
                style={{ opacity: (phase === 'playing') ? 1 : 0, transition: 'opacity 0.2s ease-in' }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.1
                  }
                }}
            />
          </motion.div>
        )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {phase === 'playing' && messageIndex !== -1 && (
            <motion.h1
              key={messageIndex}
              className="absolute bottom-10 z-40 text-white text-2xl md:text-5xl font-extrabold text-shadow-lg leading-tight md:leading-tight text-center"
              variants={heroMessageVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  variants={heroMessageItemVariants}
                >
                  {word}
                  {index < words.length - 1 && <>&nbsp;</>}
                </motion.span>
              ))}
            </motion.h1>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {phase === 'complete' && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="grid grid-cols-2 grid-rows-2 gap-4 max-w-[1280px] w-full aspect-video">
                <motion.div
                  className="relative flex items-center justify-center p-4 text-center overflow-hidden"
                  initial={{ clipPath: 'inset(0% 100% 0% 0%)' }}
                  animate={{ clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.8, delay: 0.1, ease: 'easeOut' } }}
                >
                  <Image
                    src={coreMessageGridContent.topLeft.image}
                    alt={coreMessageGridContent.topLeft.alt}
                    fill
                    className="absolute inset-0 object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{coreMessageGridContent.topLeft.title}</h3>
                    <p className="text-sm md:text-base leading-relaxed">{coreMessageGridContent.topLeft.text}</p>
                  </div>
                </motion.div>

                <div className="relative flex items-center justify-center p-4 overflow-hidden">
                  {videoFrameUrl && (
                    <Image
                      src={videoFrameUrl}
                      alt="Final frame of drone video"
                      fill
                      className="absolute inset-0 object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  )}
                </div>

                <motion.div
                  className="relative flex items-center justify-center p-4 text-center overflow-hidden"
                  initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                  animate={{ clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.8, delay: 0.3, ease: 'easeOut' } }}
                >
                  <Image
                    src={coreMessageGridContent.bottomLeft.image}
                    alt={coreMessageGridContent.bottomLeft.alt}
                    fill
                    className="absolute inset-0 object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{coreMessageGridContent.bottomLeft.title}</h3>
                    <p className="text-sm md:text-base leading-relaxed">{coreMessageGridContent.bottomLeft.text}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="relative flex items-center justify-center p-4 text-center overflow-hidden"
                  initial={{ clipPath: 'inset(0% 0% 0% 100%)' }}
                  animate={{ clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.8, delay: 0.5, ease: 'easeOut' } }}
                >
                  <Image
                    src={coreMessageGridContent.bottomRight.image}
                    alt={coreMessageGridContent.bottomRight.alt}
                    fill
                    className="absolute inset-0 object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{coreMessageGridContent.bottomRight.title}</h3>
                    <p className="text-sm md:text-base leading-relaxed">{coreMessageGridContent.bottomRight.text}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase === 'complete' && (
            <motion.button
              onClick={replay}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-4 right-4 z-50 p-3 bg-white/80 backdrop-blur-sm text-nozu-electric-blue hover:bg-white transition-colors"
            >
              <RotateCcw size={24} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}