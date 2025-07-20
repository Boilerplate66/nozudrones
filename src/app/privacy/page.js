"use client"; // This directive marks the component as a Client Component

import React from 'react';
import Markdown from 'react-markdown'; // Import a Markdown renderer
import remarkGfm from 'remark-gfm'; // Plugin for GitHub Flavored Markdown (tables, task lists, etc.)

// Import your Privacy Policy content directly as a string
// In a real Next.js app, you might fetch this from a CMS or a local .md file
// For this example, we'll inline it for simplicity.
const privacyPolicyContent = `
# Privacy Policy for NozuDrones

**Last Updated: July 20, 2025**

NozuDrones ("we," "our," or "us") is committed to protecting the privacy of our users. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website [www.nozudrones.co.uk](https://www.nozudrones.co.uk) (the "Site"). Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Site.

We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates. You will be deemed to have been made aware of, will be subject to, and will be deemed to have accepted the changes in any revised Privacy Policy by your continued use of the Site after the date such revised Privacy Policy is posted.

## 1. Collection of Your Information

We may collect information about you in a limited number of ways:

### Personal Data
Personally identifiable information, such as your name and email address, that you voluntarily give to us when you subscribe to our newsletter, request price updates, or otherwise choose to provide contact information for communications.

### Derivative Data
Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site. This data is primarily used for analytical purposes to understand website traffic and user behavior.

## 2. Use of Your Information

Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
* Email you with newsletters, price updates, or other information you have requested.
* Increase the efficiency and operation of the Site.
* Monitor and analyze usage and trends to improve your experience with the Site.
* Notify you of updates to the Site.
* Perform other business activities as needed.
* Respond to customer service requests or inquiries.
* Solicit support for the Site.

## 3. Disclosure of Your Information

We may share information we have collected about you in certain situations. Your information may be disclosed as follows:

### By Law or to Protect Rights
If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, or safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.

### Third-Party Service Providers
We may share your information with third parties that perform services for us or on our behalf, including website hosting, data analysis, and email delivery services. These third parties are obligated to protect your information and use it only for the purposes for which it was provided.

## 4. Security of Your Information

We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse. Any information disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot guarantee complete security if you provide personal information.

## 5. Policy for Children

We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.

## 6. Controls for Do-Not-Track Features

Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track (“DNT”) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. No uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Policy.

## 7. Contact Us

If you have questions or comments about this Privacy Policy, please contact us at:

Website: [www.nozudrones.co.uk](https://www.nozudrones.co.uk)
Email: hello@nozudrones.co.uk
`;

// Define the sections for the left-hand index
const sections = [
  { id: 'privacy-policy-for-nozudrones', title: 'Privacy Policy for NozuDrones' },
  { id: '1-collection-of-your-information', title: '1. Collection of Your Information' },
  { id: 'personal-data', title: 'Personal Data' },
  { id: 'derivative-data', title: 'Derivative Data' },
  { id: '2-use-of-your-information', title: '2. Use of Your Information' },
  { id: '3-disclosure-of-your-information', title: '3. Disclosure of Your Information' },
  { id: 'by-law-or-to-protect-rights', title: 'By Law or to Protect Rights' },
  { id: 'third-party-service-providers', title: 'Third-Party Service Providers' },
  { id: '4-security-of-your-information', title: '4. Security of Your Information' },
  { id: '5-policy-for-children', title: '5. Policy for Children' },
  { id: '6-controls-for-do-not-track-features', title: '6. Controls for Do-Not-Track Features' },
  { id: '7-contact-us', title: '7. Contact Us' },
];

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen font-sans antialiased bg-nozu-sky-blue text-nozu-dark-grey">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Left Sidebar for Navigation */}
        <aside className="w-full md:w-1/4 lg:w-1/5 bg-nozu-white p-6 md:p-8 border-r border-nozu-light-grey sticky top-0 md:h-screen overflow-y-auto">
          <h2 className="text-2xl font-bold text-nozu-dark-grey mb-6">Contents</h2>
          <nav>
            <ul className="space-y-3">
              {sections.map(section => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200 text-lg"
                    // Add padding to sub-sections for hierarchy
                    style={{ paddingLeft: section.title.startsWith('###') ? '1.5rem' : section.title.startsWith('##') ? '0.75rem' : '0' }}
                  >
                    {/* Remove numbering and extra spaces for cleaner display in index */}
                    {section.title.replace(/^\d+\.\s*/, '').replace(/^#+\s*/, '')}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content Area for Privacy Policy */}
        <article className="flex-grow p-6 md:p-10 lg:p-12 max-w-4xl mx-auto md:mx-0 bg-nozu-sky-blue">
          <div className="prose prose-lg max-w-none text-nozu-dark-grey">
            {/* Render Markdown content */}
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => <h1 id="privacy-policy-for-nozudrones" className="text-4xl md:text-5xl font-bold text-nozu-dark-grey mb-6 mt-10" {...props} />,
                h2: ({ node, ...props }) => <h2 id={props.children[0].toLowerCase().replace(/\s/g, '-').replace(/[^\w-]/g, '')} className="text-3xl md:text-4xl font-bold text-nozu-dark-grey mb-4 mt-8" {...props} />,
                h3: ({ node, ...props }) => <h3 id={props.children[0].toLowerCase().replace(/\s/g, '-').replace(/[^\w-]/g, '')} className="text-2xl md:text-3xl font-semibold text-nozu-dark-grey mb-3 mt-6" {...props} />,
                p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc list-inside ml-4 mb-4 space-y-1" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal list-inside ml-4 mb-4 space-y-1" {...props} />,
                a: ({ node, ...props }) => <a className="text-nozu-electric-blue hover:underline" {...props} />,
                strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
              }}
            >
              {privacyPolicyContent}
            </Markdown>
          </div>
        </article>
      </div>
    </div>
  );
}
