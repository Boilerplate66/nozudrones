// src/components/ThreeKeysSection.jsx v1.4.11
// Version Log (Top of File)
// - [2025-09-04] v1.4.11: Added subtle inner hover/tap zoom to the Nozu logo tile (lockup scales; container remains fixed).
// - [2025-09-04] v1.4.10: Strapline made bold and pinned bottom-right via absolute positioning; added bottom padding reserve to prevent overlap. Titles/body unchanged.
// - [2025-09-04] v1.4.9: Removed all image effects (filters/tints/overlays); images now render as-is. Layout, copy, links, and hover zoom unchanged.

'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import NozuLogo from '@/components/NozuLogo';
import Link from 'next/link';

const items = [
  {
    id: 'key-1',
    title: 'Choose the Right Drone',
    body:
      'Overwhelmed by options? We help you cut through the noise to find the perfect drone for your goals, skills, and budget.',
    strap: 'From confusion to clarity',
    img: '/xp-1200x525.webp',
    href: '/#choose',
  },
  {
    id: 'key-2',
    title: 'Fly Safely',
    body:
      'Safety made simple. We guide you through the essentials, so you can fly with confidence, knowing you have the skills to protect yourself, your drone, and others.',
    strap: 'Confidence in the clouds.',
    img: '/beech-1200x525.webp',
    href: '/#fly-safe',
  },
  {
    id: 'key-3',
    title: 'Fly Legally',
    body:
      'Navigating UK drone law can be complex. We simplify the rules and show you what to do, so you can fly legally and worry-free.',
    strap: 'Know the rules, enjoy the skies.',
    img: '/twilight-cloud-1200x525.webp',
    href: '/#fly-legal',
  },
];

// Parent stagger
const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.22 } },
};

// Per-card animation: bigger slide offset + mirrored curtain
const cardVariants = (fromRight = false) => ({
  hidden: {
    opacity: 0,
    x: fromRight ? 120 : -120,
    y: 32,
    clipPath: fromRight ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)',
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1.2, ease: [0.22, 0.61, 0.36, 1] },
  },
});

export default function ThreeKeysSection() {
  return (
    <section
      id="three-keys"
      className="
        relative
        -mt-10 md:-mt-16
        bg-nozu-white
        px-4 md:px-8
        pt-20 md:pt-28
        pb-16 md:pb-20
      "
      aria-labelledby="three-keys-heading"
    >
      {/* Heading */}
      <div className="max-w-6xl mx-auto">
        <h2
          id="three-keys-heading"
          className="text-center text-3xl md:text-5xl font-extrabold text-nozu-dark-grey tracking-tight"
        >
          What we can do for you
        </h2>
        <div className="mt-4 md:mt-6 flex justify-center">
          <div className="h-[2px] w-28 md:w-36 bg-nozu-electric-blue" />
        </div>
      </div>

      {/* Grid */}
      <motion.div
        className="
          max-w-5xl mx-auto
          mt-10
          grid grid-cols-1 md:grid-cols-2
          gap-4
        "
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* 3 message tiles */}
        {items.map((card, idx) => {
          const isRightCol = idx % 2 === 1;
          return (
            <Link key={card.id} href={card.href} className="block">
              <motion.article
                variants={cardVariants(isRightCol)}
                className="
                  relative
                  aspect-[16/7]
                  overflow-hidden
                  group
                  bg-nozu-light-grey
                "
              >
                {/* Media (no filters/tints/overlays) */}
                <div className="absolute inset-0">
                  <Image
                    src={card.img}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="
                      object-cover
                      transition-transform duration-500 ease-out
                      transform-gpu group-hover:scale-[1.10] group-active:scale-[1.10]
                    "
                    priority={false}
                  />
                </div>

                {/* Content grid: Title (top-left), Body (center-left), Strap (absolute bottom-right) */}
                <motion.div
                  className="
                    relative z-10 h-full
                    grid grid-rows-[auto_1fr]
                    p-4 md:p-6
                    pb-12 md:pb-14
                    transform-gpu transition-transform duration-400
                    group-hover:scale-[1.05] group-active:scale-[1.05]
                  "
                >
                  {/* Title — top-left */}
                  <h3 className="text-nozu-dark-grey text-lg md:text-2xl font-bold leading-tight">
                    {card.title}
                  </h3>

                  {/* Body — center-left */}
                  <p className="self-center mt-2 text-nozu-dark-grey opacity-90 text-sm md:text-lg max-w-[60ch]">
                    {card.body}
                  </p>

                  {/* Strapline — absolute bottom-right, bold */}
                  <p
                    className="
                      absolute right-4 md:right-6 bottom-4 md:bottom-6
                      text-right text-nozu-dark-grey opacity-90
                      text-sm md:text-base font-bold
                    "
                  >
                    {card.strap}
                  </p>
                </motion.div>
              </motion.article>
            </Link>
          );
        })}

        {/* Logo tile with right-angle accent */}
        <Link href="/about/nozudrones" aria-label="NozuDrones" className="block">
          <motion.article
            key="logo-tile"
            variants={cardVariants(true)}
            className="
              relative
              aspect-[16/7]
              overflow-hidden
              bg-white
              flex items-center justify-center
              group
            "
          >
            {/* Right-angle corner accents; CSS var matches section underline */}
            <div
              className="absolute top-0 left-0 w-4 h-4 border-nozu-electric-blue"
              style={{
                borderTopWidth: 'var(--nozu-accent-thin, 2px)',
                borderLeftWidth: 'var(--nozu-accent-thin, 2px)',
              }}
            />
            <div
              className="absolute bottom-0 right-0 w-4 h-4 border-nozu-electric-blue"
              style={{
                borderBottomWidth: 'var(--nozu-accent-thin, 2px)',
                borderRightWidth: 'var(--nozu-accent-thin, 2px)',
              }}
            />

            {/* Centered lockup (scales on hover/tap) */}
            <div
              className="
                flex flex-col items-center gap-3 md:gap-4 text-center
                transform-gpu transition-transform duration-400 ease-out
                group-hover:scale-[1.05] group-active:scale-[1.05]
              "
            >
              <NozuLogo width={140} height={60} />
              <div className="leading-none">
                <div className="text-2xl md:text-4xl font-extrabold tracking-tight">
                  <span className="text-nozu-dark-grey">Nozu</span>
                  <span className="text-nozu-electric-blue">Drones</span>
                </div>
                <p className="mt-2 text-nozu-medium-grey text-sm md:text-base">
                  Your UK Drone Companion
                </p>
              </div>
            </div>
          </motion.article>
        </Link>
      </motion.div>
    </section>
  );
}

// Archive (Bottom of File Log)
// - [2025-09-04] v1.4.8: Updated background images to plain minimal assets: Choose → /xp-1200x525.webp; Safely → /beech-1200x525.webp; Legally → /twilight-cloud-1200x525.webp.
// - [2025-09-04] v1.4.7: Switched card text to dark grey; brightened images and flipped overlays to light (white) gradients for readability. No animation/link changes.
// - [2025-09-04] v1.4.5: Build fix — replaced TypeScript-style style key (['--tk-tint' as any]) with plain CSS var key ('--tk-tint') in .jsx.
// - [2025-09-04] v1.4.4: Swapped real images; added CSS filters/tints; aligned content to Top/Center/Bottom layout.
// - [2025-09-04] v1.4.3: Copy-only update. Titles clarified; bodies + straplines set. No layout/animation changes.
// - [2025-09-03] v1.4.0: Cards fly in from further outside; zoom includes text as well as background; text sizes increased and alignment corrected; logo card redesigned with right-angle corner accent in nozu-electric-blue instead of border.
// - [2025-09-03] v1.3.0: Cards made ~half height; added side slide-in + mirrored curtain; gap tightened to 16px; removed hover wobble and replaced with BG zoom; initial logo tile redesign.
// - [2025-09-03] v1.2.0: Slower reveal, mirrored curtain toward center; logo tile with lockup; smaller cards.
