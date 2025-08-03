/* src/app/about/nozu/page.jsx */

"use client";

import React from 'react';
import Markdown from 'react-markdown';

// This content has been drafted and finalized to describe the Nozu team's mission and methods.
const aboutContent = `
### About The Nozu Team

The Nozu Team is a group of researchers dedicated to simplifying your purchasing decisions. We are a premier source for expert, unbiased research, providing a clear path to a confident purchase. Our mission is to present you with thoroughly researched information, helping you navigate complex markets and make informed choices.

### What We Offer You

We do the extensive research and synthesis for you, so you get a comprehensive understanding of the products you're interested in. We meticulously compile insights from countless user discussions, expert opinions from respected industry voices, and official product specifications. The result is a clear, definitive guide that empowers you to make the right choice, without the hassle of sifting through fragmented information yourself.

### Our Commitment to Accuracy

We maintain an unwavering standard of factual accuracy. Every piece of information we present is gathered from multiple sources and cross-referenced for completeness. We explicitly cite and link to authoritative and reputable sources, such as regulatory bodies, manufacturer resources, and established tech review sites, for every fact we report. This rigorous approach ensures that our content is not only detailed but also fully trustworthy.

### Why We Are a Trusted Resource

You can trust us because our work is clear, thorough, and fact-based. Our content is built on a foundation of extensive, web-based research and analysis. This honest approach builds a relationship based on integrity. We back this up with a professionally designed, fast, and secure website that provides a seamless user experience.
`;

export default function AboutNozuPage() {
  return (
    <div className="font-sans antialiased bg-nozu-white text-nozu-dark-grey">
      {/* Sticky Title Bar - consistent with other legal pages */}
      <div className="sticky top-[43px] md:top-[92px] w-full z-40 bg-nozu-dark-grey text-white py-4 px-6 md:px-10 lg:px-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center">About Nozu</h1>
      </div>

      <div className="flex flex-col min-h-[calc(100vh-190px)]">
        {/* Main Content Area */}
        <div className="flex-grow bg-nozu-white p-6 md:p-10 lg:p-12">
          <article className="prose prose-lg max-w-4xl mx-auto text-nozu-dark-grey">
            <Markdown>{aboutContent}</Markdown>
          </article>
        </div>
      </div>
    </div>
  );
}