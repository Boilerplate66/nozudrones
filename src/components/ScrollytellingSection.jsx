// src/components/ScrollytellingSection.jsx v1.2.4
// Version Log (Top of File)
// - [2025-08-28] v1.2.4: Added a temporary red border for visual debugging to confirm when container growth is complete and the video should begin to play.
// - [2025-08-28] v1.2.3: Added extensive console logging to diagnose why the video is not playing automatically, as requested. No user-facing changes.
// - [2025-08-28] v1.2.2: Added a play button to manually start the video and a console log to verify video readiness, addressing the issue of video not playing automatically.

'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useScroll, useAnimation, useInView } from 'framer-motion';
import { RotateCcw } from 'lucide-react';

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

export default function ScrollytellingSection() {
  const scrollytellingRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const targetRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const topRightGridRef = useRef(null);
  const hasVideoCompletedOnce = useRef(false);

  const [scrollyMessageIndex, setScrollyMessageIndex] = useState(-1);
  const [videoFrameUrl, setVideoFrameUrl] = useState(null);
  const [transformationComplete, setTransformationComplete] = useState(false);
  const [containerGrowthComplete, setContainerGrowthComplete] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const containerAnimationController = useAnimation();
  const localizedFlashController = useAnimation();
  const globalFlashController = useAnimation();
  const gridQuadrantControllers = {
    topLeft: useAnimation(),
    bottomLeft: useAnimation(),
    bottomRight: useAnimation(),
  };

  const isInView = useInView(scrollytellingRef, { once: true, amount: 0.1 });
  const { scrollYProgress } = useScroll({ target: scrollytellingRef });

  useEffect(() => {
    console.log('ScrollytellingSection States:', {
      isInView,
      containerGrowthComplete,
      videoLoaded,
      showVideoContent: videoLoaded && containerGrowthComplete,
      scrollY: scrollYProgress.get()
    });
  }, [isInView, containerGrowthComplete, videoLoaded, scrollYProgress]);

  const generateVideoFrame = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const v = videoRef.current;
    const c = canvasRef.current;
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(v, 0, 0, c.width, c.height);
    setVideoFrameUrl(c.toDataURL('image/jpeg'));
  }, []);

  const runPostVideoAnimations = useCallback(async () => {
    if (!targetRef.current || !videoWrapperRef.current || !topRightGridRef.current) return;

    generateVideoFrame();

    const from = videoWrapperRef.current.getBoundingClientRect();
    const to = targetRef.current.getBoundingClientRect();
    const scrollyRect = scrollytellingRef.current.getBoundingClientRect();

    const dx = to.left - from.left;
    const dy = to.top - from.top;
    const scale = to.width / from.width;

    await containerAnimationController.start({
      x: `+=${dx}`,
      y: `+=${dy}`,
      scale: `*=${scale}`,
      rotate: 1.5,
      transition: { duration: 1.2, ease: "easeInOut" }
    });

    await localizedFlashController.start({
      opacity: [0, 1, 0],
      transition: { duration: 0.3, times: [0, 0.5, 1] }
    });

    const finalTo = topRightGridRef.current.getBoundingClientRect();
    const finalFrom = videoWrapperRef.current.getBoundingClientRect();
    const finalDx = finalTo.left - finalFrom.left;
    const finalDy = finalTo.top - finalFrom.top;
    const finalScale = finalTo.width / finalFrom.width;

    await containerAnimationController.start({
      x: `+=${finalDx}`,
      y: `+=${finalDy}`,
      scale: `*=${finalScale}`,
      rotate: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    });

    setTransformationComplete(true);
    await gridQuadrantControllers.topLeft.start({ clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.8, delay: 0.1, ease: 'easeOut' } });
    await gridQuadrantControllers.bottomLeft.start({ clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.8, delay: 0.3, ease: 'easeOut' } });
    await gridQuadrantControllers.bottomRight.start({ clipPath: 'inset(0% 0% 0% 100%)', transition: { duration: 0.8, delay: 0.5, ease: 'easeOut' } });

  }, [containerAnimationController, localizedFlashController, gridQuadrantControllers, generateVideoFrame]);

  useEffect(() => {
    containerAnimationController.set({ scale: 0 });
    gridQuadrantControllers.topLeft.set({ clipPath: 'inset(0% 100% 0% 0%)' });
    gridQuadrantControllers.bottomLeft.set({ clipPath: 'inset(100% 0% 0% 0%)' });
    gridQuadrantControllers.bottomRight.set({ clipPath: 'inset(0% 0% 0% 100%)' });
  }, [containerAnimationController, gridQuadrantControllers]);

  useEffect(() => {
    if (!isInView || containerGrowthComplete) return;

    (async () => {
      await containerAnimationController.start({
        scale: 1,
        transition: { duration: 2.0, ease: 'easeOut' }
      });
      setContainerGrowthComplete(true);
    })();
  }, [isInView, containerGrowthComplete, containerAnimationController]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onReady = () => {
      console.log('Video is ready to play.');
      setVideoLoaded(true);
    }
    if (v.readyState >= 3) onReady();
    else v.addEventListener('canplaythrough', onReady, { once: true });

    return () => v.removeEventListener('canplaythrough', onReady);
  }, []);

  useEffect(() => {
    if (videoLoaded && containerGrowthComplete) {
      const v = videoRef.current;
      if (v) {
        console.log('Attempting to play video...');
        v.play().then(() => {
          console.log('Video playback started successfully.');
          setVideoPlaying(true);
        }).catch(error => {
          console.error('Video playback failed:', error);
          setVideoPlaying(false);
        });
      }
    }
  }, [videoLoaded, containerGrowthComplete]);


  useEffect(() => {
    const unsub = scrollYProgress.on('change', async (latest) => {
      console.log('Scroll listener active: latest=', latest);
      const videoProgressStart = 0.25;
      const videoProgressEnd = 0.75;
      const transitionPoint = 0.75;

      if (!containerGrowthComplete) {
        setScrollyMessageIndex(-1);
        return;
      }
      
      if (latest > videoProgressStart && latest < videoProgressEnd) {
        if (!videoPlaying) return;
        const videoDuration = videoRef.current.duration;
        videoRef.current.currentTime = Math.min(
          Math.max(
            (latest - videoProgressStart) / (videoProgressEnd - videoProgressStart),
            0
          ),
          1
        ) * videoDuration;
        const messageClamped = Math.min(Math.max((latest - videoProgressStart) / (videoProgressEnd - videoProgressStart), 0), 1);
        const idx = Math.min(Math.floor(messageClamped * sequentialMessages.length), sequentialMessages.length - 1);
        setScrollyMessageIndex(idx);
      } else {
        setScrollyMessageIndex(-1);
      }

      if (latest >= transitionPoint && !hasVideoCompletedOnce.current) {
        hasVideoCompletedOnce.current = true;
        if (videoRef.current) {
          videoRef.current.pause();
        }
        await globalFlashController.start({ opacity: [0, 1, 0], transition: { duration: 0.25, times: [0, 0.5, 1] } });
        runPostVideoAnimations();
      }

      if (latest < transitionPoint && hasVideoCompletedOnce.current) {
        console.log('---RESET BLOCK ACTIVATED---');
        setTransformationComplete(false);
        setVideoFrameUrl(null);
        hasVideoCompletedOnce.current = false;
        containerAnimationController.stop();
        containerAnimationController.set({ x: 0, y: 0, rotate: 0, scale: 0 });
        gridQuadrantControllers.topLeft.set({ clipPath: 'inset(0% 100% 0% 0%)' });
        gridQuadrantControllers.bottomLeft.set({ clipPath: 'inset(100% 0% 0% 0%)' });
        gridQuadrantControllers.bottomRight.set({ clipPath: 'inset(0% 0% 0% 100%)' });
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.pause();
          setVideoPlaying(false);
        }
      }
    });

    return () => unsub();
  }, [scrollYProgress, containerAnimationController, localizedFlashController, globalFlashController, gridQuadrantControllers, runPostVideoAnimations, containerGrowthComplete, videoPlaying]);

  const handleReplay = useCallback(() => {
    if (scrollytellingRef.current) {
      const topOffset = scrollytellingRef.current.offsetTop;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  }, []);

  const showVideoContent = videoLoaded && containerGrowthComplete;

  return (
    <div ref={scrollytellingRef} className="w-full min-h-[250vh] relative z-10 bg-gray-200">
      <h2 className="text-center text-4xl md:text-5xl font-bold text-nozu-electric-blue pt-10 pb-8">What we can do for you</h2>
      <div className="sticky top-0 h-screen w-full flex justify-center items-center overflow-hidden z-40 relative">
        <canvas ref={canvasRef} className="hidden" />
        <motion.div
          ref={videoWrapperRef}
          className={`absolute aspect-video w-full max-w-[1280px] z-30 ${containerGrowthComplete ? 'border-4 border-red-500' : ''}`}
          layout
          style={{ originX: 1, originY: 0 }}
          initial={{ scale: 0 }}
          animate={containerAnimationController}
        >
          <Image
            src="/open-desert.webp"
            alt="A still image of a desert landscape"
            fill
            className="absolute inset-0 object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 100vw"
            style={{ opacity: showVideoContent ? 0 : 1 }}
            onError={() => console.log('Image failed to load: /open-desert.webp')}
            onLoad={() => console.log('Image loaded: /open-desert.webp')}
          />
          <motion.video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src="/Desert-1920X1080.mp4"
            muted
            playsInline
            style={{ opacity: showVideoContent ? 1 : 0 }}
          />
          {videoFrameUrl && (
            <Image
              src={videoFrameUrl}
              alt="Final video frame"
              fill
              className="absolute inset-0 object-cover z-40"
              priority
            />
          )}
          {(scrollyMessageIndex !== -1) && (
            <motion.div className="absolute bottom-10 left-10 text-white p-4">
              <AnimatePresence mode="wait">
                <motion.p
                  key={sequentialMessages[scrollyMessageIndex].text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl font-bold"
                >
                  {sequentialMessages[scrollyMessageIndex].text}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          )}
        </motion.div>

        <AnimatePresence>
          {transformationComplete && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center p-4 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3 } }}
            >
              <div className="relative w-full max-w-[1280px] aspect-video">
                <Image
                  src="/drone-controller.webp"
                  alt="Drone controller"
                  fill
                  className="absolute inset-0 object-cover object-center"
                  priority
                />
                <div ref={targetRef} className="absolute inset-0" style={{ clipPath: 'polygon(56.7% 41.5%, 63% 40.5%, 68.3% 53.5%, 61.5% 54.5%)' }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {transformationComplete && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="grid grid-cols-2 grid-rows-2 gap-4 max-w-[1280px] w-full aspect-video">
              <motion.div
                className="relative flex items-center justify-center p-4 text-center overflow-hidden"
                initial={{ clipPath: 'inset(0% 100% 0% 0%)' }}
                animate={gridQuadrantControllers.topLeft}
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

              <div ref={topRightGridRef} className="relative flex items-center justify-center p-4 overflow-hidden">
                <Image
                  src={videoFrameUrl}
                  alt="Final frame of drone video"
                  fill
                  className="absolute inset-0 object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>

              <motion.div
                className="relative flex items-center justify-center p-4 text-center overflow-hidden"
                initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                animate={gridQuadrantControllers.bottomLeft}
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
                animate={gridQuadrantControllers.bottomRight}
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

        <AnimatePresence>
          {transformationComplete && (
            <motion.button
              onClick={handleReplay}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-4 right-4 z-40 p-3 bg-white/80 backdrop-blur-sm text-nozu-electric-blue hover:bg-white transition-colors"
            >
              <RotateCcw size={24} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Version Log (Bottom of File)
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