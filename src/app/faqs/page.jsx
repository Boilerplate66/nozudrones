// src/app/faqs/page.jsx
"use client"; // This component contains client-side interactivity

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import framer-motion for animations
import mockSanityClient from '../../utils/sanityClient'; // Adjust path based on your actual file structure
import Link from 'next/link';

// Define the color palette for categories, inspired by UK Laws page
const categoryColors = [
  'nozu-card-coral',
  'nozu-card-forest-green',
  'nozu-card-ocean-blue',
  'nozu-card-golden-yellow',
  'nozu-card-river-blue',
  'nozu-card-vivid-red',
  'nozu-card-rust-orange',
  'nozu-card-storm-grey',
];

const FAQsPage = () => {
  const [faqs, setFaqs] = useState({}); // Changed from [] to {} to match groupedFaqs structure
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // State for open categories (top level)
  const [openCategories, setOpenCategories] = useState({});
  // State for open FAQ items within categories (second level)
  const [openFaqItems, setOpenFaqItems] = useState({});

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        // Simulate fetching data from Sanity.io.
        // This section is kept EXACTLY as it was in your working version.
        const data = await mockSanityClient.fetch(`*[_type == "faq"]{
          question,
          shortAnswer,
          detailedAnswer,
          "category": category->title, // Get category title from reference
          keywords,
          publishedAt
        }`);

        // Group FAQs by category
        const groupedFaqs = data.reduce((acc, faq) => {
          const categoryTitle = faq.category || "Uncategorized"; // Handle cases where category might be missing
          if (!acc[categoryTitle]) {
            acc[categoryTitle] = [];
          }
          acc[categoryTitle].push(faq);
          return acc;
        }, {});

        setFaqs(groupedFaqs);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch FAQs:", err);
        setError("Failed to load FAQs. Please try again later.");
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []); // Empty dependency array means this runs once on mount

  // Function to toggle a category's open/closed state
  const toggleCategory = (categoryTitle) => {
    setOpenCategories(prevState => ({
      ...prevState,
      [categoryTitle]: !prevState[categoryTitle]
    }));
  };

  // Function to toggle an individual FAQ item's open/closed state
  const toggleFaqItem = (categoryTitle, faqIndex) => {
    const key = `${categoryTitle}-${faqIndex}`;
    setOpenFaqItems(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  // Function to collapse all open categories and FAQ items
  const collapseAll = () => {
    setOpenCategories({});
    setOpenFaqItems({});
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nozu-light-grey">
        <p className="text-nozu-dark-grey text-xl font-semibold">Loading FAQs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100">
        <p className="text-red-700 text-xl font-semibold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-nozu-light-grey to-nozu-white py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-10 lg:p-12"> {/* Removed shadow-2xl */}
        <h1 className="text-5xl font-extrabold text-nozu-dark-grey text-center mb-10 leading-tight">
          Frequently Asked Questions
        </h1>

        <p className="text-center text-nozu-medium-grey text-lg mb-8 max-w-2xl mx-auto">
          Find quick answers to your most common questions about drones, UK laws, safety, and our website.
        </p>

        {Object.keys(faqs).length > 0 && (
          <div className="text-right mb-6">
            <button
              onClick={collapseAll}
              className="bg-nozu-light-grey text-nozu-dark-grey px-4 py-2 rounded-lg hover:bg-nozu-medium-grey hover:text-white transition-colors duration-200 text-sm font-semibold" // Removed shadow-md
            >
              Collapse All
            </button>
          </div>
        )}

        {Object.keys(faqs).length > 0 ? (
          <div className="space-y-6">
            {Object.keys(faqs).map((categoryTitle, categoryIndex) => {
              const isCategoryOpen = openCategories[categoryTitle];
              const categoryColorClass = categoryColors[categoryIndex % categoryColors.length]; // Cycle through defined colors

              return (
                <div
                  key={categoryTitle}
                  className={`rounded-xl overflow-hidden transition-all duration-300 ease-in-out border border-nozu-light-grey`} // Removed shadow-xl
                >
                  {/* Category Header */}
                  <motion.button
                    className={`flex justify-between items-center w-full px-6 py-5 text-left font-bold text-2xl transition-all duration-300 ease-in-out
                      ${isCategoryOpen ? `bg-${categoryColorClass} text-white` : `bg-nozu-white text-nozu-dark-grey hover:bg-nozu-off-white`}`}
                    onClick={() => toggleCategory(categoryTitle)}
                    aria-expanded={isCategoryOpen}
                    aria-controls={`category-content-${categoryIndex}`}
                    initial={false} // Prevents initial animation on mount
                  >
                    <span>{categoryTitle}</span>
                    <motion.svg
                      className={`w-8 h-8 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180 text-white' : 'text-nozu-medium-grey'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      animate={{ rotate: isCategoryOpen ? 180 : 0 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </motion.svg>
                  </motion.button>

                  {/* Category Content (FAQs within this category) */}
                  <AnimatePresence initial={false}>
                    {isCategoryOpen && (
                      <motion.div
                        id={`category-content-${categoryIndex}`}
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { opacity: 1, height: "auto" },
                          collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="bg-nozu-off-white p-4 space-y-3"
                      >
                        {faqs[categoryTitle].map((faq, faqIndex) => {
                          const faqKey = `${categoryTitle}-${faqIndex}`;
                          const isFaqOpen = openFaqItems[faqKey];
                          return (
                            <div
                              key={faqIndex}
                              className="border border-nozu-light-grey rounded-lg overflow-hidden" // Removed shadow-sm
                            >
                              {/* FAQ Question Header */}
                              <motion.button
                                className={`flex justify-between items-center w-full px-5 py-3 text-left transition-all duration-200 ease-in-out
                                  ${isFaqOpen ? 'bg-nozu-white text-nozu-electric-blue font-semibold' : 'bg-nozu-white text-nozu-dark-grey hover:bg-nozu-light-grey'}`}
                                onClick={() => toggleFaqItem(categoryTitle, faqIndex)}
                                aria-expanded={isFaqOpen}
                                aria-controls={`faq-answer-${faqKey}`}
                                initial={false}
                              >
                                <span className="text-lg">{faq.question}</span>
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
                                    id={`faq-answer-${faqKey}`}
                                    initial="collapsed"
                                    animate="open"
                                    exit="collapsed"
                                    variants={{
                                      open: { opacity: 1, height: "auto" },
                                      collapsed: { opacity: 0, height: 0 }
                                    }}
                                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                    className="px-5 pb-4 pt-2 text-nozu-medium-grey"
                                    style={{ overflow: 'hidden' }}
                                  >
                                    <p className="text-base leading-relaxed">{faq.detailedAnswer}</p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-nozu-medium-grey text-lg">No FAQs found.</p>
        )}

        <div className="mt-12 text-center text-nozu-medium-grey text-md">
          <p>Can't find your answer? <Link href="/contact" className="text-nozu-electric-blue hover:underline font-medium">Contact us</Link> directly!</p>
        </div>
      </div>
    </div>
  );
};

export default FAQsPage;