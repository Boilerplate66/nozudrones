/* src/app/about/contact/page.jsx */

import React from 'react';
import ContactForm from '../../../components/ContactForm';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen font-sans antialiased text-gray-800">
      {/* Sticky Banner - consistent with other pages */}
      <div className="sticky top-[43px] md:top-[92px] w-full z-40 bg-nozu-dark-grey text-white py-4 px-6 md:px-10 lg:px-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center">Contact Us</h1>
      </div>

      {/* Main Content Area - Corrected padding to account for the sticky header */}
      <main className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Left Column: Text Content and FAQs */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900">Get in Touch</h2>
              <p className="mt-2 text-gray-600">
                The easiest way to reach us is by using the form to the right. We aim to respond to all inquiries within 24-48 hours.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900">Other Ways to Contact Us</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-900">Email</h3>
                  <p className="mt-1 text-gray-600">
                    For direct inquiries, you can reach the Nozu Team at: <br />
                    <a href="mailto:hello@nozudrones.co.uk" className="text-gray-700 hover:text-black font-semibold transition-colors duration-200">hello@nozudrones.co.uk</a>
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900">Connect on Social Media</h3>
                  <p className="mt-1 text-gray-600">
                    Follow us and stay up to date with the latest news, reviews, and community discussions.
                  </p>
                  <ul className="flex space-x-4 mt-2">
                    <li>
                      <a href="https://x.com/nozudrones" target="_blank" rel="noopener noreferrer" aria-label="Follow us on X" className="text-gray-700 hover:text-black transition-colors duration-200">X (formerly Twitter)</a>
                    </li>
                    <li>
                      <a href="https://www.youtube.com/@nozudrones" target="_blank" rel="noopener noreferrer" aria-label="Subscribe to our YouTube channel" className="text-gray-700 hover:text-black transition-colors duration-200">YouTube</a>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900">Frequently Asked Questions</h2>
              <div className="mt-4 space-y-4 text-gray-600">
                <div>
                  <h3 className="font-semibold">Q: What is the Nozu Team?</h3>
                  <p className="mt-1">A: The Nozu Team is a collective of remote technology enthusiasts based in the UK. We are passionate about drones and committed to providing in-depth, well-researched content to help you make informed purchasing decisions.</p>
                </div>
                <div>
                  <h3 className="font-semibold">Q: How do you perform your product reviews without physical experience?</h3>
                  <p className="mt-1">A: Our reviews are based on extensive, synthesized research of public information, including manufacturer specifications, expert reviews from reputable industry sources, and user feedback from trusted e-commerce and community forums. We focus on transparently presenting and analyzing this data to provide a comprehensive view of each product.</p>
                </div>
                <div>
                  <h3 className="font-semibold">Q: Is your website affiliated with any drone manufacturers?</h3>
                  <p className="mt-1">A: NozuDrones.co.uk is an independent publication. We are not owned by or directly affiliated with any drone manufacturer. Our content is driven by a commitment to unbiased, accurate information. We may use affiliate links to support our work, but this never influences our reviews or recommendations.</p>
                </div>
              </div>
            </section>
          </div>
          
          {/* Right Column: The Contact Form */}
          <div>
            <h2 className="sr-only">Contact Form</h2> {/* Screen-reader-only heading */}
            <ContactForm />
          </div>

        </div>
      </main>
    </div>
  );
}
