// src/app/page.jsx v2.43.1
// Version Log (Top of File)
// - [2025-09-08] v2.43.1: Updated SpecsSection import to '@/components/SpecsSection' (no '/home'); no behavioural changes.
// - [2025-09-08] v2.43.0: Extracted Drone Specs Spotlight into src/components/SpecsSection.jsx; added anchor id="choose"; simplified page. No visual/behaviour changes.
// - [2025-09-03] v2.42.0: Replaced ScrollytellingSection with ThreeKeysSection for a lighter, more reliable Section 2.

'use client';

import React from 'react';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import ThreeKeysSection from '@/components/ThreeKeysSection';
import SpecsSection from '@/components/SpecsSection';

export default function Home() {
  return (
    <>
      <HeroSection className="mt-0" />

      {/* Section 2: Three Keys */}
      <ThreeKeysSection />

      {/* Section 3: Drone Specs Spotlight (extracted) */}
      <SpecsSection />

      {/* Section 4: Safety teaser */}
      <section className="relative z-10 py-20 px-10 bg-nozu-lime-green-refined/30">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="p-8 bg-white/10 backdrop-blur-sm border border-white/20">
            <h2 className="text-4xl md:text-5xl font-bold text-nozu-dark-grey">
              Your Guide to UK Drone Laws
            </h2>
            <p className="text-lg text-nozu-dark-grey mt-4">
              We&apos;re committed to keeping you compliant and safe. Our resources are regularly
              updated to reflect the latest CAA regulations.
            </p>
            <Link
              href="/laws/uk-drone-code"
              className="mt-8 inline-block bg-nozu-electric-blue hover:bg-nozu-darker-electric-blue text-white font-bold py-6 px-16 transition-all duration-300 text-xl transform hover:-translate-y-2 active:scale-95"
            >
              Read the UK Drone Code
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// Version Log (Bottom Archive)
// - (none)
