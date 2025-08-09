// src/app/laws/page.jsx (v1.2)
// This page provides an interactive, SEO-friendly guide to UK drone laws with dynamic hover-over detail pages.
// The hero section's subtitle now loads immediately and cycles every 2 seconds, and the hero image height is now a consistent 200px.

"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Final data for the 8 categories based on the user's requirements
const categories = [
  {
    id: 'advantages-sub-250g',
    title: 'Advantages of sub 250g drones',
    summary: 'The benefits of flying a lightweight drone and why the rules are different.',
    icon: 'fa-solid fa-feather-pointed',
    color: 'nozu-card-coral',
    content: (
      <>
        <p className="mb-4 text-nozu-medium-grey">Drones weighing less than 250g, such as the DJI Mini series, are highly popular because they fall into a lower-risk category, giving pilots more flexibility and fewer legal requirements. This makes them an ideal choice for beginners and hobbyists.</p>
        <h3 className="text-xl font-bold text-nozu-dark-grey mt-6 mb-3">Key Advantages:</h3>
        <ul className="list-disc pl-5 mb-4 space-y-2 text-nozu-medium-grey">
          <li><strong>Simplified Rules:</strong> In the UK, you do not need to register for a Flyer ID to operate these drones, though you do need an Operator ID if the drone has a camera.</li>
          <li><strong>Greater Flexibility:</strong> You can fly a sub-250g drone closer to people and in more built-up areas, as long as you do so safely and responsibly.</li>
          <li><strong>Travel-Friendly:</strong> Their lightweight design makes them easy to pack and carry, perfect for taking on your travels.</li>
        </ul>
        <p className="mb-4 text-nozu-medium-grey">Despite these advantages, you must always fly responsibly, stay away from restricted airspace, and prioritize the safety of others.</p>
      </>
    ),
  },
  {
    id: 'altitude-limit',
    title: 'Fly Below the Altitude Limit of 120m',
    summary: 'Understanding the legal altitude limit set by the CAA for all drone flights.',
    icon: 'fa-solid fa-plane-up',
    color: 'nozu-card-forest-green',
    content: (
      <>
        <p className="mb-4 text-nozu-medium-grey">The UK's Civil Aviation Authority (CAA) strictly enforces a maximum flying height for all drones. The primary reason for this rule is to prevent drones from interfering with manned aircraft, such as planes and helicopters, which typically fly at higher altitudes.</p>
        <h3 className="text-xl font-bold text-nozu-dark-grey mt-6 mb-3">The Rule:</h3>
        <p className="mb-4 text-nozu-medium-grey">The legal limit is **120 meters (400 feet)** above the ground. You must not fly your drone above this height, even if you are in an unpopulated area.</p>
        <p className="mb-4 text-nozu-medium-grey">Most modern drones have a setting in their software that allows you to set a maximum altitude limit. It is a good practice to set this to 120m to ensure you do not accidentally break this rule.</p>
      </>
    ),
  },
  {
    id: 'line-of-sight',
    title: 'Always Fly Within Line of Sight',
    summary: 'The rule that requires the pilot to always have direct visual contact with the drone.',
    icon: 'fa-solid fa-eye',
    color: 'nozu-card-ocean-blue',
    content: (
      <>
        <p className="mb-4 text-nozu-medium-grey">This is one of the most fundamental rules of safe drone flying. As a pilot, you are legally required to keep your drone in your direct line of sight at all times, without the use of binoculars or other visual aids.</p>
        <h3 className="text-xl font-bold text-nozu-dark-grey mt-6 mb-3">What This Means:</h3>
        <ul className="list-disc pl-5 mb-4 space-y-2 text-nozu-medium-grey">
          <li><strong>Unaided Vision:</strong> You must be able to see your drone with your own eyes, not just through the drone's camera feed on your phone or controller screen.</li>
          <li><strong>Maintaining Awareness:</strong> Flying within line of sight allows you to visually monitor your drone's position, avoid obstacles, and react quickly to any potential hazards.</li>
          <li><strong>Maximum Distance:</strong> This rule effectively limits how far away you can fly your drone, as it must remain visible to you.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'airspace-restrictions',
    title: 'Check for airspace restrictions and hazards',
    summary: 'Before flying, you must check for any temporary or permanent flight restrictions.',
    icon: 'fa-solid fa-map-location-dot',
    color: 'nozu-card-golden-yellow',
    content: (
      <>
        <p className="mb-4 text-nozu-medium-grey">Before every flight, it is the pilot's responsibility to check for any local airspace restrictions or potential hazards. Failing to do so can lead to dangerous situations and legal penalties.</p>
        <h3 className="text-xl font-bold text-nozu-dark-grey mt-6 mb-3">Where to Check:</h3>
        <ul className="list-disc pl-5 mb-4 space-y-2 text-nozu-medium-grey">
          <li><strong>CAA Website:</strong> The Civil Aviation Authority website provides information on restricted airspace.</li>
          <li><strong>Drone Apps:</strong> Use a reputable drone flight planning app, which often provides real-time information on temporary and permanent no-fly zones.</li>
          <li><strong>Local Bylaws:</strong> Check with the local council or property owner for any specific bylaws or permissions needed to fly in a particular area.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'dangerous-areas',
    title: 'Don’t Fly in Dangerous Areas',
    summary: 'Specific areas where drone flight is prohibited for safety and security reasons.',
    icon: 'fa-solid fa-radiation',
    color: 'nozu-card-river-blue',
    content: (
      <>
        <p className="mb-4 text-nozu-medium-grey">Certain locations are off-limits for drone flight due to safety, privacy, or security concerns. You must not fly your drone in any of the following dangerous or sensitive areas:</p>
        <h3 className="text-xl font-bold text-nozu-dark-grey mt-6 mb-3">Examples of Dangerous Areas:</h3>
        <ul className="list-disc pl-5 mb-4 space-y-2 text-nozu-medium-grey">
          <li><strong>Near Prisons:</strong> Flying near a prison is strictly prohibited and can result in severe legal consequences.</li>
          <li><strong>Military Bases:</strong> These areas are sensitive for national security reasons.</li>
          <li><strong>Nuclear Facilities:</strong> Flying near power plants or other nuclear sites is illegal.</li>
          <li><strong>Over Public Events:</strong> You should not fly over concerts, sporting events, or large gatherings without specific permissions.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'crowded-areas',
    title: 'Don’t Fly Over Crowded areas',
    summary: 'Why you should never fly a drone directly over a crowd of people.',
    icon: 'fa-solid fa-person-circle-xmark',
    color: 'nozu-card-vivid-red',
    content: (
      <>
        <p className="mb-4 text-nozu-medium-grey">It is a key CAA regulation that you must not fly your drone directly over a crowd of people. This is a crucial safety rule designed to protect the public from potential accidents, such as a drone losing power and falling from the sky.</p>
        <h3 className="text-xl font-bold text-nozu-dark-grey mt-6 mb-3">Key Information:</h3>
        <ul className="list-disc pl-5 mb-4 space-y-2 text-nozu-medium-grey">
          <li><strong>Risk of Injury:</strong> A drone falling from height could cause serious injury to those below.</li>
          <li><strong>Distances:</strong> The rules specify minimum distances you must maintain from people and urban areas, depending on your drone's weight and your pilot certification.</li>
          <li><strong>Emergency Situations:</strong> In an emergency, a pilot needs to be able to safely land their drone without endangering anyone, which is impossible over a crowded area.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'airports-airfields',
    title: 'Stay Away from Aircraft, Airports, and Airfields',
    summary: 'The crucial rule to protect all manned aircraft and prevent collisions.',
    icon: 'fa-solid fa-ban-smoking',
    color: 'nozu-card-rust-orange',
    content: (
      <>
        <p className="mb-4 text-nozu-medium-grey">This is one of the most critical rules in drone safety. All airspace near airports and airfields is highly restricted, and flying a drone in these areas is a serious criminal offense that can endanger lives.</p>
        <h3 className="text-xl font-bold text-nozu-dark-grey mt-6 mb-3">The Rule:</h3>
        <p className="mb-4 text-nozu-medium-grey">You must not fly your drone within the flight restriction zone of an airport or airfield. This zone is typically a 2.5-nautical-mile circle extending from the airport's runway, with additional restrictions in place.</p>
        <p className="mb-4 text-nozu-medium-grey">Before every flight, you must use a flight planning app or check the official CAA website to confirm you are not in a restricted zone. Flying in these areas can cause a catastrophic collision with a manned aircraft.</p>
      </>
    ),
  },
  {
    id: 'faqs',
    title: 'See our FAQs for more detailed information',
    summary: 'Find answers to frequently asked questions about drone laws and safe flying practices.',
    icon: 'fa-solid fa-circle-question',
    color: 'nozu-card-storm-grey',
    content: (
      <>
        <p className="mb-4 text-nozu-medium-grey">Our Frequently Asked Questions section covers a wide range of topics not mentioned here, from legal definitions to insurance, and more. It&apos;s a great resource for expanding your knowledge on drone regulations and best practices.</p>
        <div className="mt-8">
          <NextLink href="/faqs" className="bg-nozu-card-storm-grey text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200">
            Go to FAQs
          </NextLink>
        </div>
      </>
    ),
  },
];

// Dummy data for the hero section's cycling questions
const cyclingQuestions = [
  "Do I need to register my drone?",
  "What's the legal flying height?",
  "Can I fly my drone in a park?",
  "What are the rules for flying near airports?",
  "How close can I fly to people?",
  "Do I need insurance for my drone?",
];

// Card component with dynamic styling
const LawCard = ({ category, onCardClick, isModalOpen }) => {
  const cardRef = useRef(null);
  const colorClass = `bg-${category.color}`;

  const handleClick = (e) => {
    e.preventDefault();
    onCardClick(category);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative flex flex-col items-center justify-center p-6 h-48 rounded-2xl shadow-lg transform transition-transform duration-300 ${colorClass}`}
      whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      aria-expanded={isModalOpen}
      aria-controls={`detail-modal-${category.id}`}
      role="button"
      tabIndex="0"
    >
      <div className="text-white text-4xl mb-2">
        <i className={category.icon}></i>
      </div>
      <h3 className="text-white text-xl font-semibold text-center mb-1">{category.title}</h3>
      <p className="text-nozu-white text-sm text-center">{category.summary}</p>
    </motion.div>
  );
};

// Function to get the washed color class name
const getWashedColorClass = (baseColor) => {
  return `bg-${baseColor}-washed`;
};

export default function LawsPage() {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [modalData, setModalData] = useState({ title: null, content: null, color: null });

  useEffect(() => {
    // Set a timeout to flip the flag after the component has rendered and the first category is visible
    const initialLoadTimeout = setTimeout(() => {
      setIsFirstLoad(false);
    }, 50); // A very short delay to ensure the component mounts

    const interval = setInterval(() => {
      setActiveQuestionIndex((prevIndex) => (prevIndex + 1) % cyclingQuestions.length);
    }, 2000); // Change question every 2 seconds
    
    return () => {
      clearInterval(interval);
      clearTimeout(initialLoadTimeout);
    };
  }, []);

  const handleCardClick = (category) => {
    setModalData({ title: category.title, content: category.content, color: category.color });
  };

  const closeModal = () => {
    setModalData({ title: null, content: null, color: null });
  };

  return (
    <div className="min-h-screen font-sans antialiased bg-nozu-white text-nozu-dark-grey overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative w-full overflow-hidden h-[200px] flex flex-col items-center justify-center">
        {/* The hero image container with fluid aspect ratio */}
        <div className="absolute inset-0">
          <Image
            src="/beech-1920x400.jpg"
            alt="Drone flying over a UK landscape with a beech tree in the foreground"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white bg-nozu-dark-grey bg-opacity-40 w-full h-full px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            UK Drone Laws: A Pilot's Guide
          </h1>
          <AnimatePresence mode="wait">
            <motion.p
              key={activeQuestionIndex}
              className="text-lg md:text-xl lg:text-2xl font-semibold max-w-2xl mx-auto"
              initial={isFirstLoad ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {cyclingQuestions[activeQuestionIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
      {/* Main Content: Card Grid */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-center text-3xl font-extrabold text-nozu-dark-grey mb-12">Explore the Rules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <LawCard
              key={cat.id}
              category={cat}
              onCardClick={handleCardClick}
              isModalOpen={!!modalData.content}
            />
          ))}
        </div>
      </div>
      {/* Hover Modal */}
      <AnimatePresence>
        {modalData.content && (
          <motion.div
            id="detail-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-nozu-dark-grey bg-opacity-70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`relative w-full max-w-4xl max-h-[75vh] ${getWashedColorClass(modalData.color)} rounded-lg shadow-2xl p-6 md:p-8 overflow-y-auto border-l-8 border-${modalData.color}`}
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
            >
              {/* This is the div with the flexbox fix */}
              <div className="flex justify-between items-start w-full">
                <h2 className={`text-3xl font-extrabold text-nozu-dark-grey pb-2 border-b-4 mb-6 border-${modalData.color} pr-8`}>
                  {modalData.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="top-4 right-4 text-nozu-dark-grey hover:text-nozu-electric-blue transition-colors duration-200"
                  aria-label="Close"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2d00/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="prose prose-lg text-nozu-dark-grey max-w-none">
                {modalData.content}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Hidden SEO-friendly content */}
      <div className="sr-only">
        {categories.map((cat) => (
          <div key={cat.id}>
            {cat.content}
          </div>
        ))}
      </div>
    </div>
  );
}