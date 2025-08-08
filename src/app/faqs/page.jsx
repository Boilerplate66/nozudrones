// src/app/faqs/page.jsx (v6.9)
// This file implements automatic lazy loading for FAQ content after the initial page render, ensuring a fast Time to Interactive.

"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import mockSanityClient from '../../utils/sanityClient';

// Category configuration with icons and colors
const categoryConfig = {
  'UK Drone Law & Regulation': {
    icon: 'fa-solid fa-balance-scale',
    color: 'nozu-card-coral',
    summary: 'UK laws, regulations, licensing, and legal requirements for drone flying.'
  },
  'Flight Operations & Safety': {
    icon: 'fa-solid fa-shield-alt',
    color: 'nozu-card-forest-green',
    summary: 'Safe flying practices, operational guidelines, and safety procedures.'
  },
  'Commercial Drone Use': {
    icon: 'fa-solid fa-briefcase',
    color: 'nozu-card-ocean-blue',
    summary: 'Business use, commercial operations, and professional requirements.'
  },
  'Privacy & Ethics': {
    icon: 'fa-solid fa-user-shield',
    color: 'nozu-card-golden-yellow',
    summary: 'Privacy laws, ethical considerations, and data protection guidelines.'
  },
  'Buying Advice': {
    icon: 'fa-solid fa-shopping-cart',
    color: 'nozu-card-river-blue',
    summary: 'Purchasing guidance, features to consider, and equipment recommendations.'
  },
  'General Drone Info': {
    icon: 'fa-solid fa-info-circle',
    color: 'nozu-card-vivid-red',
    summary: 'Basic drone information, terminology, and general knowledge.'
  },
  'Drone Technology': {
    icon: 'fa-solid fa-cogs',
    color: 'nozu-card-rust-orange',
    summary: 'Technical specifications, hardware components, and technology explanations.'
  },
  'Maintenance & Care': {
    icon: 'fa-solid fa-tools',
    color: 'nozu-card-storm-grey',
    summary: 'Maintenance tips, care instructions, and troubleshooting guidance.'
  },
  'Troubleshooting': {
    icon: 'fa-solid fa-wrench',
    color: 'nozu-card-coral',
    summary: 'Problem solving, common issues, and technical support.'
  },
  'Drone Photography & Videography': {
    icon: 'fa-solid fa-camera',
    color: 'nozu-card-forest-green',
    summary: 'Camera settings, photography techniques, and video production tips.'
  }
};

// Dummy data for the hero section's cycling questions
const cyclingQuestions = [
  "Do I need to register my drone?",
  "What's the legal flying height?",
  "How long does a drone battery last?",
  "What are intelligent flight modes?",
  "Do I need insurance for my drone?",
  "What accessories should I buy?",
];

// FAQ Card component with dynamic styling
const FaqCard = ({ category, onCardClick, isModalOpen }) => {
  const cardRef = useRef(null);
  const config = categoryConfig[category] || {
    icon: 'fa-solid fa-question',
    color: 'nozu-card-storm-grey',
    summary: 'Frequently asked questions and answers.'
  };

  const colorClass = `bg-${config.color}`;

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
      aria-controls={`faq-modal-${category.replace(/\s+/g, '-').toLowerCase()}`}
      role="button"
      tabIndex="0"
    >
      <div className="text-white text-4xl mb-2">
        <i className={config.icon}></i>
      </div>
      <h3 className="text-white text-xl font-semibold text-center mb-2">{category}</h3>
      <p className="text-nozu-white text-sm text-center mb-2">{config.summary}</p>
    </motion.div>
  );
};

// Function to get the washed color class name
const getWashedColorClass = (baseColor) => {
  return `bg-${baseColor}-washed`;
};

export default function FAQsPage() {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [modalData, setModalData] = useState({ category: null, color: null });
  const [faqs, setFaqs] = useState({});
  const [openFaqItems, setOpenFaqItems] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Derive categories from the static config object
  const categories = Object.keys(categoryConfig);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuestionIndex((prevIndex) => (prevIndex + 1) % cyclingQuestions.length);
    }, 4000); // Change question every 4 seconds
    return () => clearInterval(interval);
  }, []);

  // Use a single useEffect to fetch all FAQs and then group them by category.
  // This is a more robust approach that doesn't rely on the mock client's filtering.
  useEffect(() => {
    const fetchAllAndGroupFaqs = async () => {
      try {
        const allFaqs = await mockSanityClient.fetch(`*[_type == "faq"]{
          question,
          shortAnswer,
          detailedAnswer,
          "category": category->title,
          keywords,
          publishedAt
        }`);
        
        const groupedFaqs = allFaqs.reduce((acc, faq) => {
          const categoryTitle = faq.category;
          if (!acc[categoryTitle]) {
            acc[categoryTitle] = [];
          }
          acc[categoryTitle].push(faq);
          return acc;
        }, {});

        setFaqs(groupedFaqs);
      } catch (err) {
        console.error("Failed to fetch or group FAQs:", err);
      }
    };
    fetchAllAndGroupFaqs();
  }, []); // Empty dependency array ensures this runs only once on mount.

  const handleCardClick = (category) => {
    const config = categoryConfig[category] || { color: 'nozu-card-storm-grey' };
    
    setModalData({
      category: category,
      color: config.color
    });
    setOpenFaqItems({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalData({ category: null, color: null });
    setOpenFaqItems({});
    setIsModalOpen(false);
  };

  const toggleFaqItem = (faqIndex) => {
    setOpenFaqItems(prevState => ({
      ...prevState,
      [faqIndex]: !prevState[faqIndex]
    }));
  };
  
  const selectedFaqs = faqs[modalData.category];

  // The component now renders the full page structure immediately
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
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
        </div>
        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white bg-nozu-dark-grey bg-opacity-40 w-full h-full px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            Frequently Asked Questions
          </h1>
          <AnimatePresence mode="wait">
            <motion.p
              key={activeQuestionIndex}
              className="text-lg md:text-xl lg:text-2xl font-semibold max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {cyclingQuestions[activeQuestionIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content: Category Card Grid */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-center text-3xl font-extrabold text-nozu-dark-grey mb-12">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category) => (
            <FaqCard
              key={category}
              category={category}
              onCardClick={handleCardClick}
              isModalOpen={modalData.category === category}
            />
          ))}
        </div>
      </div>

      {/* FAQ Modal with Accordion */}
      <AnimatePresence>
        {isModalOpen && modalData.category && (
          <motion.div
            id="faq-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-nozu-dark-grey bg-opacity-70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`relative w-full max-w-5xl min-h-[80vh] max-h-[80vh] ${getWashedColorClass(modalData.color)} rounded-lg shadow-2xl border-l-8 border-${modalData.color} flex flex-col p-4 md:p-8`}
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
            >
              {/* Modal Header (Sticky) */}
              <div className={`p-4 md:p-6 border-b border-nozu-light-grey flex-shrink-0`}>
                <div className="flex justify-between items-center w-full">
                  <h2 className={`text-2xl md:text-3xl font-extrabold text-nozu-dark-grey pr-4`}>
                    {modalData.category}
                    {selectedFaqs && <span className="text-xl text-nozu-medium-grey ml-2">({selectedFaqs.length})</span>}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-nozu-dark-grey hover:text-nozu-electric-blue transition-colors duration-200"
                    aria-label="Close"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>

              {/* FAQ Accordion (Scrollable Content) */}
              <div className="mt-4 flex-grow overflow-y-auto hide-scrollbar">
                {!selectedFaqs ? (
                  <div className="flex items-center justify-center h-40">
                    <motion.p
                      className="text-nozu-dark-grey text-lg font-semibold"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      Loading FAQs...
                    </motion.p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedFaqs.map((faq, faqIndex) => {
                      const isFaqOpen = openFaqItems[faqIndex];
                      return (
                        <div
                          key={faqIndex}
                          className="border border-nozu-light-grey rounded-lg overflow-hidden bg-white"
                        >
                          {/* FAQ Question Header */}
                          <motion.button
                            className={`flex justify-between items-center w-full px-5 py-4 text-left transition-all duration-200 ease-in-out
                              ${isFaqOpen ? 'bg-nozu-off-white text-nozu-electric-blue font-semibold' : 'bg-white text-nozu-dark-grey hover:bg-nozu-light-grey'}`}
                            onClick={() => toggleFaqItem(faqIndex)}
                            aria-expanded={isFaqOpen}
                            aria-controls={`faq-answer-${faqIndex}`}
                            initial={false}
                          >
                            <span className="text-lg font-medium">{faq.question}</span>
                            <motion.svg
                              className={`w-5 h-5 transition-transform duration-200 ${isFaqOpen ? 'rotate-180 text-nozu-electric-blue' : 'text-nozu-medium-grey'}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              animate={{ rotate: isFaqOpen ? 180 : 0 }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </motion.svg>
                          </motion.button>

                          {/* FAQ Answer Content */}
                          <AnimatePresence initial={false}>
                            {isFaqOpen && (
                              <motion.div
                                id={`faq-answer-${faqIndex}`}
                                initial="collapsed"
                                animate="open"
                                exit="collapsed"
                                variants={{
                                  open: { opacity: 1, height: "auto" },
                                  collapsed: { opacity: 0, height: 0 }
                                }}
                                transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                className="px-5 pb-5 pt-2 text-nozu-medium-grey bg-nozu-off-white"
                                style={{ overflow: 'hidden' }}
                              >
                                {faq.shortAnswer && (
                                  <div className="mb-3 p-3 bg-nozu-light-grey rounded-lg">
                                    <p className="text-sm font-semibold text-nozu-dark-grey mb-1">Quick Answer:</p>
                                    <p className="text-sm text-nozu-dark-grey">{faq.shortAnswer}</p>
                                  </div>
                                )}
                                <p className="text-base leading-relaxed">{faq.detailedAnswer}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-6 border-t border-nozu-light-grey text-center flex-shrink-0">
                <p className="text-nozu-medium-grey text-sm mb-4">
                  Can't find your answer?
                </p>
                <NextLink
                  href="/about/contact"
                  className={`bg-${modalData.color} text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity duration-200`}
                  onClick={closeModal}
                >
                  Contact Us
                </NextLink>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden SEO-friendly content */}
      <div className="sr-only">
        {Object.entries(faqs).map(([category, categoryFaqs]) => (
          <div key={category}>
            <h3>{category}</h3>
            {categoryFaqs.map((faq, index) => (
              <div key={index}>
                <h4>{faq.question}</h4>
                <p>{faq.detailedAnswer}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}