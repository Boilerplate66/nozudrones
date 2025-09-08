// src/components/SpecsSection.jsx v1.2.8
// Version Log (Top of File)
// - [2025-09-08] v1.2.8: Halved pointer speed (extend 600ms → hold 200ms → retract 600ms, linear). Dot now wrapped in a single AnimatePresence (mode="wait") group so both core and light-blue glow fade together (250ms) with no lingering. New arrows wait until the previous dot’s fade completes.
// - [2025-09-08] v1.2.7: Fixed prior speeds; retract into dot; slower pulse; dot fades out per-category and on merge.
// - [2025-09-08] v1.2.6: Pointer choreography (extend → hold → retract); lit dot with glow.
// - [2025-09-08] v1.2.5: Added “Motors & Power”; updated anchors; stepper to 4 segments.

'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

const START_TIME = 1.0;
const LAND_END_TIME = 5.0;
const TAKEOFF_DURATION = 2500;
const SPLIT_ANIM_MS = 600;
const CURTAIN_MS = 380;
const CARD_HOLD_MS = 3000;
const BORDER_PULSE_MS = 300;
const SPLIT_GAP_PX = 24;

// Pointer timings (slower)
const ARROW_EXTEND_MS = 600;
const ARROW_HOLD_MS = 200;
const ARROW_RETRACT_MS = 600;
const DOT_FADE_MS = 250;
const DOT_PULSE_S = 2.0; // slower pulse

// Helper: convert absolute px coords (1920×1080) to normalized [0..1]
const norm = (x, y) => ({ x: x / 1920, y: y / 1080 });

const GROUPS = [
  {
    title: 'GPS & Safety',
    cards: [
      'GPS stabilisation holds position in wind for calm, predictable control.',
      'Precise positioning helps you avoid controlled or restricted zones.',
      'Return to Home brings the drone back if you lose signal or when the battery runs low.',
    ],
    anchor: norm(958, 754),
  },
  {
    title: 'Camera & Gimbal',
    cards: [
      'Crisp 4K video from a high definition camera.',
      'Larger sensors capture more detail and handle low light better.',
      'A three axis gimbal keeps footage stable even when the drone moves.',
    ],
    anchor: norm(1030, 930),
  },
  {
    title: 'Obstacle Sensing',
    cards: [
      'Multidirectional sensors help avoid obstacles.',
      'Automatic braking and alerts support safer flying in tight spaces.',
      'Landing protection checks the ground before touchdown.',
    ],
    anchor: norm(900, 815),
  },
  {
    title: 'Motors & Power',
    cards: [
      'High powered motors hold position in gusts and climb with confidence.',
      'Intelligent batteries estimate remaining flight time so you can plan a safe return.',
      'Fast charging options get you back in the air sooner.',
    ],
    anchor: norm(490, 730),
  },
];

export default function SpecsSection() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const videoWrapRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const activeFrameRef = useRef(null);
  const rafRef = useRef(null);
  const timersRef = useRef([]);

  const inView = useInView(stickyRef, { amount: 0.5, once: true });

  // 'idle' | 'landing' | 'groups' | 'merging' | 'takeoff' | 'outro'
  const [phase, setPhase] = useState('idle');

  // Layout
  const [isSplit, setIsSplit] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);

  // Progress
  const [currentGroup, setCurrentGroup] = useState(0);
  const [currentCard, setCurrentCard] = useState(0);
  const [paused, setPaused] = useState(false);

  // Merge latch
  const [mergeDone, setMergeDone] = useState({ gap: false, video: false });
  const [videoPulseKey, setVideoPulseKey] = useState(0);

  // Pointer state
  const [line, setLine] = useState(null); // {x1,y1,x2,y2}
  const [arrowPhase, setArrowPhase] = useState('idle'); // 'idle'|'extending'|'holding'|'retracting'|'done'
  const [dot, setDot] = useState(null); // {x,y}
  const [dotVisible, setDotVisible] = useState(false);
  const [lastArrowGroup, setLastArrowGroup] = useState(null); // to avoid replay within same group
  const [dotKey, setDotKey] = useState(0); // force remount for clean exit/enter timing

  const reducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Utilities
  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };
  const setTimer = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
  };

  // Landing → Split
  useEffect(() => {
    if (!inView) return;
    const video = videoRef.current;
    if (!video) return;

    setPhase('landing');
    try { video.currentTime = START_TIME; } catch {}
    video.muted = true;
    video.playsInline = true;

    const onTimeUpdate = () => {
      if (video.currentTime >= LAND_END_TIME) {
        video.pause();
        video.removeEventListener('timeupdate', onTimeUpdate);

        setVideoPulseKey((k) => k + 1);
        setIsSplit(true);

        setTimer(() => {
          setPanelVisible(true);
          setTimer(() => {
            setPhase('groups');
            setCurrentGroup(0);
            setCurrentCard(0);
            setDotVisible(false);
            setArrowPhase('idle');
            setLastArrowGroup(null);
            setDotKey((k) => k + 1);
            requestAnimationFrame(() => {
              updatePointerGeometry();
              maybeStartArrow();
            });
          }, SPLIT_ANIM_MS);
        }, 40);
      }
    };

    if (reducedMotion) {
      try { video.currentTime = LAND_END_TIME; } catch {}
      onTimeUpdate();
      return;
    }

    video.addEventListener('timeupdate', onTimeUpdate);
    video.play().catch(() => {
      try { video.currentTime = LAND_END_TIME; } catch {}
      onTimeUpdate();
    });

    return () => video.removeEventListener('timeupdate', onTimeUpdate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reducedMotion]);

  // Groups cycle
  useEffect(() => {
    if (phase !== 'groups' || paused) return;

    setTimer(() => {
      const group = GROUPS[currentGroup];
      const lastCard = currentCard >= group.cards.length - 1;

      if (!lastCard) {
        setCurrentCard((c) => c + 1); // no arrow for later cards
      } else {
        const lastGroup = currentGroup >= GROUPS.length - 1;
        if (!lastGroup) {
          // End of group → fade out dot first, then advance and start next arrow
          setDotVisible(false);
          const delay = DOT_FADE_MS + 30;
          setTimer(() => {
            setCurrentGroup((g) => g + 1);
            setCurrentCard(0);
            setArrowPhase('idle');
            setLastArrowGroup(null);
            setDotKey((k) => k + 1);
            requestAnimationFrame(() => {
              updatePointerGeometry();
              maybeStartArrow();
            });
          }, delay);
        } else {
          // Sequence complete → fade out dot and merge
          setDotVisible(false);
          setTimer(() => {
            setPhase('merging');
            setMergeDone({ gap: false, video: false });
            setPanelVisible(false);
            setIsSplit(false);
            setArrowPhase('idle');
          }, DOT_FADE_MS); // let the dot exit visibly before merging
        }
      }
    }, reducedMotion ? 0 : CARD_HOLD_MS);

    return clearAllTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, currentGroup, currentCard, paused, reducedMotion]);

  // Takeoff after merge
  useEffect(() => {
    if (phase === 'merging' && mergeDone.gap && mergeDone.video) {
      setVideoPulseKey((k) => k + 1);
      setPhase('takeoff');
    }
  }, [phase, mergeDone]);

  // Takeoff scrub 5s → 1s
  useEffect(() => {
    if (phase !== 'takeoff') return;
    const video = videoRef.current;
    if (!video) return;

    try { video.currentTime = LAND_END_TIME; } catch {}

    if (reducedMotion) {
      try { video.currentTime = START_TIME; } catch {}
      setPhase('outro');
      return;
    }

    const start = performance.now();
    const total = TAKEOFF_DURATION;

    const loop = (now) => {
      const t = Math.min(1, (now - start) / total);
      const ct = LAND_END_TIME - t * (LAND_END_TIME - START_TIME);
      try { video.currentTime = ct; } catch {}
      if (t < 1) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        cancelAnimationFrame(rafRef.current);
        setPhase('outro');
      }
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase, reducedMotion]);

  // Controls
  const onPauseToggle = () => setPaused((p) => !p);
  const onReplay = () => {
    clearAllTimers();
    const video = videoRef.current;
    if (video) {
      try { video.currentTime = LAND_END_TIME; } catch {}
      video.pause();
    }
    setPhase('groups');
    setIsSplit(true);
    setPanelVisible(true);
    setCurrentGroup(0);
    setCurrentCard(0);
    setPaused(false);
    setDotVisible(false);
    setArrowPhase('idle');
    setLastArrowGroup(null);
    setDotKey((k) => k + 1);
    requestAnimationFrame(() => {
      updatePointerGeometry();
      maybeStartArrow();
    });
  };
  const onSkip = () => {
    clearAllTimers();
    // Fade out dot, then jump
    setDotVisible(false);
    setTimer(() => {
      setPanelVisible(false);
      setIsSplit(false);
      setArrowPhase('idle');
      setPhase('takeoff');
    }, DOT_FADE_MS);
  };
  const jumpToGroup = (idx) => {
    clearAllTimers();
    const video = videoRef.current;
    if (video) {
      try { video.currentTime = LAND_END_TIME; } catch {}
      video.pause();
    }
    // Fade dot first if visible
    setDotVisible(false);
    setTimer(() => {
      setPhase('groups');
      setIsSplit(true);
      setPanelVisible(true);
      setCurrentGroup(idx);
      setCurrentCard(0);
      setPaused(false);
      setArrowPhase('idle');
      setLastArrowGroup(null);
      setDotKey((k) => k + 1);
      requestAnimationFrame(() => {
        updatePointerGeometry();
        maybeStartArrow();
      });
    }, DOT_FADE_MS);
  };

  // ----- Pointer geometry & animation -----
  function getRects() {
    const overlay = overlayRef.current;
    const frameEl = activeFrameRef.current;
    const videoBox = videoWrapRef.current;
    if (!overlay || !frameEl || !videoBox) return null;

    const overlayRect = overlay.getBoundingClientRect();
    const frameRect = frameEl.getBoundingClientRect();
    const videoRect = videoBox.getBoundingClientRect();
    if (!frameRect.width || !frameRect.height || !videoRect.width || !videoRect.height) return null;
    return { overlayRect, frameRect, videoRect };
  }

  function computeStartAndEnd() {
    const rects = getRects();
    if (!rects) return null;
    const { overlayRect, frameRect, videoRect } = rects;

    // Start at LEFT-center of active fineline frame
    const sx = frameRect.left - overlayRect.left;
    const sy = frameRect.top + frameRect.height / 2 - overlayRect.top;

    // End at the group anchor within the video box
    const { x, y } = GROUPS[currentGroup].anchor;
    const ex = videoRect.left + videoRect.width * x - overlayRect.left;
    const ey = videoRect.top + videoRect.height * y - overlayRect.top;

    return { sx, sy, ex, ey };
  }

  function updatePointerGeometry() {
    const pts = computeStartAndEnd();
    if (!pts) return;
    const { sx, sy, ex, ey } = pts;
    setLine({ x1: sx, y1: sy, x2: ex, y2: ey }); // final geometry anchor positions
    setDot({ x: ex, y: ey });
  }

  // Trigger arrow ONLY for the first card of a new group
  function maybeStartArrow() {
    if (currentCard !== 0) return;
    if (lastArrowGroup === currentGroup) return;

    const pts = computeStartAndEnd();
    if (!pts) return;
    const { sx, sy, ex, ey } = pts;

    // Reset: start collapsed at the frame; hide dot
    setDotVisible(false);
    setLine({ x1: sx, y1: sy, x2: sx, y2: sy });
    setArrowPhase('extending');

    // 1) EXTEND to anchor (600ms)
    setTimer(() => {
      setLine({ x1: sx, y1: sy, x2: ex, y2: ey });
      setArrowPhase('holding');

      // 2) HOLD (200ms)
      setTimer(() => {
        // 3) RETRACT from start → anchor (600ms); show dot during retract start
        setArrowPhase('retracting');
        setDot({ x: ex, y: ey });
        setDotVisible(true);
        setLine({ x1: ex, y1: ey, x2: ex, y2: ey });

        // End → mark done
        setTimer(() => {
          setArrowPhase('done');
          setLastArrowGroup(currentGroup);
        }, ARROW_RETRACT_MS);
      }, ARROW_HOLD_MS);
    }, 0);
  }

  // Recompute on resize/layout shifts
  useEffect(() => {
    const onResize = () => {
      updatePointerGeometry();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep geometry fresh when active card border moves
  useEffect(() => {
    if (!panelVisible || phase !== 'groups') return;
    const id = requestAnimationFrame(() => {
      updatePointerGeometry();
    });
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panelVisible, phase, currentGroup, currentCard]);

  // Computed
  const videoObjectPosition = isSplit ? '50% 35%' : '50% 50%';

  return (
    <section
      id="choose"
      ref={sectionRef}
      className="relative bg-nozu-white py-20 px-4 min-h-[220vh] flex flex-col items-center"
      aria-labelledby="specs-spotlight-heading"
    >
      <h2
        id="specs-spotlight-heading"
        className="text-4xl md:text-5xl font-bold text-nozu-electric-blue mb-10 md:mb-16"
      >
        Drone Specs Spotlight
      </h2>

      {/* Sticky container with animated gap */}
      <motion.div
        ref={stickyRef}
        className="sticky top-0 w-full max-w-7xl h-screen md:flex"
        animate={{ gap: isSplit ? SPLIT_GAP_PX : 0 }}
        transition={{ duration: SPLIT_ANIM_MS / 1000, ease: [0.22, 0.61, 0.36, 1] }}
        style={{ position: 'relative' }}
        onAnimationComplete={() => {
          if (phase === 'merging' && !isSplit) {
            setMergeDone((m) => ({ ...m, gap: true }));
          }
        }}
      >
        {/* Left / Video column — tiny right gutter */}
        <motion.div
          className="w-full flex grow-0 shrink-0 pr-1.5"
          animate={{ flexBasis: isSplit ? '55%' : '100%' }}
          transition={{ duration: SPLIT_ANIM_MS / 1000, ease: [0.22, 0.61, 0.36, 1] }}
          onAnimationComplete={() => {
            if (phase === 'merging' && !isSplit) {
              setMergeDone((m) => ({ ...m, video: true }));
            }
          }}
        >
          <div className="relative w-full">
            <div
              ref={videoWrapRef}
              className="relative w-full aspect-video max-h-[80vh] overflow-hidden bg-white"
            >
              {/* Neutral fineline */}
              <div className="absolute inset-0 pointer-events-none border border-nozu-light-grey" />
              {/* Pulse when video is focus */}
              <AnimatePresence>
                {(phase === 'landing' || phase === 'takeoff') && (
                  <motion.div
                    key={videoPulseKey}
                    initial={{ boxShadow: '0 0 0 1px rgba(0,119,255,1)' }}
                    animate={{
                      boxShadow: [
                        '0 0 0 1px rgba(0,119,255,1)',
                        '0 0 0 2px rgba(0,119,255,1)',
                        '0 0 0 1px rgba(0,119,255,1)',
                      ],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: BORDER_PULSE_MS / 1000, ease: 'easeOut' }}
                    className="absolute inset-0 pointer-events-none"
                  />
                )}
              </AnimatePresence>

              {/* Video (top-only crop on split via object-position) */}
              <video
                ref={videoRef}
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: videoObjectPosition }}
              >
                <source src="/drone-landing-1920x1080.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </motion.div>

        {/* Right / Panel — tiny left gutter; fixed basis; mounted only in split */}
        <AnimatePresence initial={false}>
          {isSplit && (
            <motion.aside
              key="panel"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: panelVisible ? 1 : 0, x: panelVisible ? 0 : 24 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: SPLIT_ANIM_MS / 1000, ease: [0.22, 0.61, 0.36, 1] }}
              className="hidden md:flex flex-col grow-0 shrink-0 basis-[45%] min-w-0 pl-1.5"
              aria-label="Feature details"
            >
              {/* Header + stepper (4 segments) */}
              <div className="mb-4">
                <h3 className="text-nozu-dark-grey text-2xl font-bold tracking-tight">
                  {GROUPS[currentGroup]?.title ?? GROUPS[0].title}
                </h3>

                <div className="mt-3 flex items-center gap-3">
                  <div className="flex-1 grid grid-cols-4 gap-2 min-w-0">
                    {GROUPS.map((g, i) => (
                      <button
                        key={g.title}
                        onClick={() => jumpToGroup(i)}
                        aria-label={`Jump to ${g.title}`}
                        className={[
                          'h-1.5 rounded-none transition-colors',
                          i < currentGroup
                            ? 'bg-nozu-electric-blue'
                            : i === currentGroup
                            ? 'bg-nozu-electric-blue/70'
                            : 'bg-nozu-light-grey',
                        ].join(' ')}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={onPauseToggle}
                      aria-pressed={paused}
                      aria-label={paused ? 'Play' : 'Pause'}
                      title={paused ? 'Play' : 'Pause'}
                      className="p-2 border border-nozu-electric-blue rounded-none hover:bg-nozu-light-grey/30 transition"
                    >
                      {paused ? <Play size={16} /> : <Pause size={16} />}
                    </button>
                    <button
                      onClick={onReplay}
                      aria-label="Replay"
                      title="Replay"
                      className="p-2 border border-nozu-electric-blue rounded-none hover:bg-nozu-light-grey/30 transition"
                    >
                      <RotateCcw size={16} />
                    </button>
                    <button
                      onClick={onSkip}
                      aria-label="Skip to next section"
                      title="Skip"
                      className="p-2 border border-nozu-electric-blue rounded-none hover:bg-nozu-light-grey/30 transition"
                    >
                      <SkipForward size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Cards with curtain + moving fineline frame (origin for pointer) */}
              <div className="relative flex-1 overflow-hidden min-w-0">
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent" />
                <div className="absolute inset-0 overflow-hidden pr-1">
                  <div className="flex flex-col gap-3">
                    {GROUPS[currentGroup].cards
                      .slice(0, currentCard + 1)
                      .map((text, idx, arr) => {
                        const isActive = idx === arr.length - 1;
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: CURTAIN_MS / 1000, ease: [0.22, 0.61, 0.36, 1] }}
                            className={[
                              'relative p-4 bg-white border rounded-none',
                              isActive ? 'border-nozu-electric-blue' : 'border-nozu-medium-grey/40',
                            ].join(' ')}
                          >
                            {isActive && (
                              <motion.div
                                ref={activeFrameRef}
                                layoutId="activeFrame"
                                className="pointer-events-none absolute inset-0 border border-nozu-electric-blue"
                                onLayoutAnimationComplete={() =>
                                  requestAnimationFrame(() => {
                                    updatePointerGeometry();
                                    maybeStartArrow();
                                  })
                                }
                              />
                            )}
                            <p className={isActive ? 'text-nozu-dark-grey font-medium' : 'text-nozu-dark-grey/80'}>
                              {text}
                            </p>
                          </motion.div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* SVG overlay for pointer (arrow + lit dot) */}
        <svg ref={overlayRef} className="pointer-events-none absolute inset-0" width="100%" height="100%">
          <defs>
            {/* Soft glow for the dot */}
            <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
            </filter>
          </defs>

          {/* Arrow: single element, extends → holds → retracts at linear speed */}
          {(arrowPhase === 'extending' || arrowPhase === 'holding' || arrowPhase === 'retracting') && line && (
            <motion.line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="rgb(0,119,255)"
              strokeWidth="1.5"
              initial={false}
              animate={
                arrowPhase === 'extending'
                  ? { x2: line.x2, y2: line.y2 }
                  : arrowPhase === 'holding'
                  ? { x1: line.x1, y1: line.y1, x2: line.x2, y2: line.y2 }
                  : { x1: line.x1, y1: line.y1 }
              }
              transition={{
                duration:
                  arrowPhase === 'extending'
                    ? ARROW_EXTEND_MS / 1000
                    : arrowPhase === 'holding'
                    ? ARROW_HOLD_MS / 1000
                    : ARROW_RETRACT_MS / 1000,
                ease: 'linear',
              }}
            />
          )}

          {/* Lit dot: blue core + light-blue glow; slower pulse; fade-out under AnimatePresence (mode="wait") */}
          <AnimatePresence mode="wait">
            {dot && dotVisible && (
              <motion.g
                key={`dot-${dotKey}-${currentGroup}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: [1, 1.08, 1] }}
                exit={{ opacity: 0, transition: { duration: DOT_FADE_MS / 1000, ease: 'easeOut' } }}
                transition={{ duration: DOT_PULSE_S, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' }}
              >
                {/* Glow (light blue) */}
                <circle
                  cx={dot.x}
                  cy={dot.y}
                  r="12"
                  fill="rgba(83,156,255,0.35)"
                  filter="url(#dotGlow)"
                />
                {/* Core (electric blue) */}
                <circle cx={dot.x} cy={dot.y} r="5" fill="rgb(0,119,255)" />
              </motion.g>
            )}
          </AnimatePresence>
        </svg>

        {/* Outro overlay */}
        <AnimatePresence>
          {phase === 'outro' && (
            <motion.div
              key="outro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex items-center justify-center px-4"
              onAnimationComplete={() => {
                setMergeDone({ gap: true, video: true });
              }}
            >
              <div className="text-center">
                <p className="text-2xl md:text-4xl font-bold text-nozu-dark-grey">
                  Ready to choose your first drone?
                </p>
                <Link
                  href="/drones"
                  className="mt-4 inline-block text-nozu-electric-blue underline underline-offset-4 text-lg"
                >
                  Explore beginner friendly picks
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
