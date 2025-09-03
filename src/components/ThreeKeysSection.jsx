// src/components/ThreeKeysSection.jsx v1.4.0
// Version Log (Top of File)
// - [2025-09-03] v1.4.0: Cards fly in from further outside; zoom includes text as well as background; text sizes increased and alignment corrected; logo card redesigned with right-angle corner accent in nozu-electric-blue instead of border.
// - [2025-09-03] v1.3.0: Cards made ~half height; added side slide-in + mirrored curtain; gap tightened to 16px; removed hover wobble and replaced with BG zoom; initial logo tile redesign.
// - [2025-09-03] v1.2.0: Slower reveal, mirrored curtain toward center; logo tile with lockup; smaller cards.

'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import NozuLogo from '@/components/NozuLogo';

const items = [
  {
    id: 'key-1',
    title: 'Your Drone, Your Way.',
    body:
      'We help you choose the right model for your style, goals, and budget—without the noise.',
    img: '/blue-ocean.webp', // replace with sky.webp later
  },
  {
    id: 'key-2',
    title: 'Fly Safe, Fly Confident.',
    body:
      'Clear checklists and essentials so every flight feels calm, capable, and under control.',
    img: '/blue-ocean.webp', // replace with sea.webp later
  },
  {
    id: 'key-3',
    title: 'Know the Law, Fly Free.',
    body:
      'UK-specific guidance and references so you can fly legally—and enjoy it more.',
    img: '/blue-ocean.webp', // replace with forest.webp later
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
            <motion.article
              key={card.id}
              variants={cardVariants(isRightCol)}
              whileHover={{ scale: 1.05 }}
              className="
                relative
                aspect-[16/7]
                overflow-hidden
                group
                bg-nozu-light-grey
              "
            >
              {/* BG image */}
              <div className="absolute inset-0">
                <Image
                  src={card.img}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.10]"
                  priority={false}
                />
                {/* wash overlay for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none" />
              </div>

              {/* Content (also scales on hover) */}
              <motion.div
                className="relative z-10 h-full flex flex-col justify-end p-4 md:p-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-white text-lg md:text-2xl font-bold leading-tight">
                  {card.title}
                </h3>
                <p className="mt-2 text-nozu-sky-blue text-sm md:text-lg max-w-[60ch]">
                  {card.body}
                </p>
              </motion.div>
            </motion.article>
          );
        })}

        {/* Logo tile with right-angle accent */}
        <motion.article
          key="logo-tile"
          variants={cardVariants(true)}
          whileHover={{ scale: 1.02 }}
          className="
            relative
            aspect-[16/7]
            overflow-hidden
            bg-white
            flex items-center justify-center
          "
          aria-label="NozuDrones"
        >
          {/* Right-angle corner accent */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-[4px] border-l-[4px] border-nozu-electric-blue" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[4px] border-r-[4px] border-nozu-electric-blue" />

          {/* Centered lockup */}
          <div className="flex flex-col items-center gap-3 md:gap-4 text-center">
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
      </motion.div>
    </section>
  );
}
