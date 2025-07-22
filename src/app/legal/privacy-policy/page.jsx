// src/app/legal/privacy-policy/page.jsx
"use client"; // This directive marks the component as a Client Component

import React, { useState, useEffect, useRef } from 'react'; // Import useState, useEffect, useRef
import Markdown from 'react-markdown'; // Import a Markdown renderer
import remarkGfm from 'remark-gfm'; // Plugin for GitHub Flavored Markdown (tables, task lists, etc.)
import Link from 'next/link'; // Import Link for internal navigation

// Removed export const metadata as it's not allowed in a "use client" component.
// Metadata for this page will be handled by the parent layout.jsx or a dedicated legal layout.

// Import your Privacy Policy content directly as a string
// IMPORTANT: Changed the first heading from # to ## to avoid redundancy with the sticky title bar
const privacyPolicyContent = `
## Privacy Policy for NozuDrones.co.uk

**Last Updated: July 22, 2025**

NozuDrones.co.uk ("we," "our," or "us") is committed to protecting your privacy and handling your data in an open and transparent manner. This Privacy Policy outlines our practices concerning the collection, use, disclosure, and safeguarding of your information when you visit our website at [www.nozudrones.co.uk](https://www.nozudrones.co.uk) (the "Site"). We urge you to review this Privacy Policy thoroughly. Your continued access or use of the Site signifies your agreement to the terms herein.

We reserve the right to modify this Privacy Policy at any time, with or without prior notice. Any revisions will be effective immediately upon posting the updated Privacy Policy on this page, indicated by a revised "Last Updated" date. We encourage you to periodically review this Privacy Policy to remain informed of any changes. Your continued use of the Site subsequent to the posting of any revised Privacy Policy will constitute your acceptance of those changes.

### Information We Collect

Our data collection practices are designed to be minimal and focused on improving your experience.

#### Non-Personal Data

We automatically collect certain non-personally identifiable information when you access the Site. This includes, but is not limited to:
* **Browser and Device Information:** Type of browser (e.e.g., Chrome, Firefox), operating system (e.e.g., Windows, macOS, Android, iOS), device type (e.e.g., desktop, mobile, tablet), screen resolution, and language settings.
* **Usage Data:** Pages viewed, time spent on pages, clickstream data, referral sources (the website you came from), exit pages, and navigation paths within the Site.
* **IP Address:** Your Internet Protocol (IP) address is collected, but it is primarily used for broad geographical analysis (e.g., country-level) and security purposes, not for individual identification.
* **Technical Information:** Data related to how you interact with our Site's features, suchs as video playback events (play, pause, completion) and button clicks.

This non-personal data is collected through standard web server logs and analytics tools, primarily Google Analytics 4 (GA4). This data is anonymized where possible and aggregated to understand overall user behavior, identify trends, and enhance the performance, content, and user experience of our website. We do not use this data to identify individual users.

#### Personal Data

Currently, NozuDrones.co.uk **does not directly collect personal identifiable information (PII)** from users. This means we do not ask for, store, or process information such as:
* Names
* Email addresses
* Physical addresses
* Telephone numbers
* Payment details
* User account credentials

As we do not offer direct purchases, user accounts, newsletter subscriptions, or interactive forms that require personal input, your direct personal data is not collected by us.

### How We Use Information

The limited non-personal data we collect is utilized exclusively for the following purposes:

* **Website Analytics:** To analyze website traffic patterns, user engagement metrics (e.g., bounce rate, session duration), and popular content to understand how our Site is being used.
* **Website Improvement:** To continuously enhance the design, functionality, and content of our website based on user behavior and preferences.
* **Performance Monitoring:** To identify and troubleshoot technical issues, monitor server performance, and ensure the stability and security of the Site.
* **Affiliate Link Monitoring:** To track the effectiveness of our affiliate links and understand which products or categories are most engaging for our audience. This data is aggregated and does not involve tracking individual user purchases back to their identity on our site.
* **Content Optimization:** To tailor our content strategy and ensure we are providing relevant and valuable information to our target audience.
* **Security:** To detect and prevent fraudulent activity, unauthorized access, and other malicious actions.

### Disclosure of Your Information

We are committed to maintaining the confidentiality of your information. We do not sell, trade, rent, or otherwise transfer your non-personal information to outside parties for their independent marketing purposes. Your information may be disclosed in the following limited circumstances:

* **Service Providers:** We may share aggregated, non-personal data with trusted third-party service providers who assist us in operating our website, conducting our business, or serving our users. These services include web hosting, analytics (e.g., Google Analytics), and potentially future email delivery services (should we introduce them). These third parties are contractually obligated to protect your information and use it solely for the purposes for which it is provided, in compliance with data protection laws.
* **Legal Requirements:** We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court order or government agency request). This includes situations where such disclosure is necessary to comply with legal processes, enforce our site policies, or protect our rights, property, or safety, or the rights, property, or safety of others.
* **Business Transfers:** In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction. We will notify you via a prominent notice on our Site of any such change in ownership or control of your personal information.

### Security of Your Information

We prioritize the security of your information and employ a range of administrative, technical, and physical security measures to protect the non-personal data we collect. These measures include:
* **HTTPS Encryption:** Our website uses Secure Socket Layer (SSL) technology (HTTPS) to encrypt data transmitted between your browser and our servers, ensuring secure communication.
* **Regular Security Audits:** We periodically review our security practices to identify and mitigate potential vulnerabilities.
* **Access Controls:** Access to our analytics data and server logs is restricted to authorized personnel only.

While we strive to use commercially acceptable means to protect your information, it's important to acknowledge that no method of transmission over the Internet or method of electronic storage is 100% secure. Therefore, we cannot guarantee the absolute security of your information. Any information you disclose online is inherently vulnerable to interception and misuse by unauthorized parties.

### Third-Party Links & Affiliate Disclosure

Our Site contains links to external websites that are not operated by us. These include links to major e-commerce retailers such as Amazon UK, DJI Direct, John Lewis, and Argos, as part of our participation in various affiliate marketing programs (including the Amazon Associates program).

When you click on these third-party links, you will be directed to their respective websites. These external sites have their own independent privacy policies, terms of service, and data collection practices. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.

Please be aware that when you click on an affiliate link and subsequently make a purchase on a third-party website, we may earn a commission. This process involves the use of tracking technologies (e.e.g., cookies placed by the affiliate network) to attribute the sale to our Site. This tracking is managed by the affiliate networks and the retailers, not directly by NozuDrones.co.uk, and does not involve us collecting your personal purchase details.

### Cookies and Tracking Technologies

NozuDrones.co.uk does not directly use first-party cookies for tracking or personalization purposes. However, certain third-party services integrated into our Site may use cookies and similar tracking technologies (e.e.g., pixels, web beacons) to collect information. These include:

* **Google Analytics 4 (GA4):** GA4 uses cookies to collect anonymized data about website usage, suchs as session duration, pages viewed, and user demographics (if available). This helps us understand how users interact with our Site.
* **Affiliate Networks:** As mentioned in Section 5, affiliate networks may use cookies to track referrals from our Site to their merchant partners, enabling us to earn commissions.

You have the ability to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. Please note that if you choose to decline cookies, it.e.g., may affect the functionality of some parts of our Site or third-party sites you visit via our links. For more detailed information on how we use cookies and how you can manage your preferences, please visit our dedicated <Link href="/legal/cookie-settings" className="text-nozu-electric-blue hover:underline">Cookie Settings</Link> page.

### Data Retention

We retain non-personal data collected for analytical purposes for a period necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Since we do not collect personal data, there is no personal data to retain beyond the anonymized and aggregated analytics data.

### International Data Transfers

As NozuDrones.co.uk primarily targets users within the UK, our primary data processing and storage are intended to remain within the UK or European Economic Area (EEA). However, some of our third-party service providers (e.e.g., Google Analytics) may operate globally. By using our Site, you acknowledge that your non-personal information may be transferred to, stored in, and processed in countries outside of your country of residence, including the United States, where data protection laws may differ from those in your jurisdiction. We ensure that any such transfers comply with applicable data protection laws and that adequate safeguards are in place (e.e.g., Standard Contractual Clauses).

### Children's Privacy

Our website is not intended for, nor does it knowingly target or collect information from, children under the age of 13. We are in compliance with the requirements of COPPA (Children's Online Privacy Protection Act) and the GDPR's provisions regarding children's data. If you are a parent or guardian and you believe that your child has provided us with personal data without your consent, please contact us immediately at [privacy@nozudrones.co.uk](mailto:privacy@nozudrones.co.uk), and we will take steps to remove such information from our records.

### Your Rights (GDPR and UK Data Protection Act)

As a website operating within the UK and adhering to the General Data Protection Regulation (GDPR) and the UK Data Protection Act 2018, you have certain rights concerning your data, even if we collect minimal personal data. These rights include:

* **The Right to Be Informed:** To be informed about how your data is collected and used (as per this policy).
* **The Right of Access:** To request a copy of the non-personal data we hold about you.
* **The Right to Rectification:** To request correction of any inaccurate or incomplete data.
* **The Right to Erasure ("Right to Be Forgotten"):** To request the deletion of your data, under certain conditions.
* **The Right to Restrict Processing:** To request that we limit the way we use your data, under certain conditions.
* **The Right to Data Portability:** To request that we transfer the data we have collected to another organization, or directly to you, under certain conditions.
* **The Right to Object:** To object to our processing of your data, under certain conditions.
* **Rights in Relation to Automated Decision Making and Profiling:** We do not engage in automated decision-making or profiling that produces legal effects concerning you.

To exercise any of these rights, please contact us at [privacy@nozudrones.co.uk](mailto:privacy@nozudrones.co.uk). We will respond to your request within one month.

### Changes to This Privacy Policy

We may update our Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any significant changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.

### Contact Us

If you have any questions or concerns about this Privacy Policy or our data practices, please do not hesitate to contact us:

* **By Email:** [hello@nozudrones.co.uk](mailto://hello@nozudrones.co.uk)
* **By Visiting this page on our website:** [Contact Us](https://www.nozudrones.co.uk/contact)
`;

// Define the sections for the left-hand index - **CRITICALLY UPDATED IDs for link functionality**
const sections = [
  { id: 'privacy-policy-for-nozudronescouk', title: 'Privacy Policy for NozuDrones.co.uk' }, // Corrected ID
  { id: 'information-we-collect', title: 'Information We Collect' },
  { id: 'non-personal-data', title: 'Non-Personal Data' },
  { id: 'personal-data', title: 'Personal Data' },
  { id: 'how-we-use-information', title: 'How We Use Information' },
  { id: 'disclosure-of-your-information', title: 'Disclosure of Your Information' },
  { id: 'security-of-your-information', title: 'Security of Your Information' },
  { id: 'third-party-links--affiliate-disclosure', title: 'Third-Party Links & Affiliate Disclosure' },
  { id: 'cookies-and-tracking-technologies', title: 'Cookies and Tracking Technologies' },
  { id: 'data-retention', title: 'Data Retention' },
  { id: 'international-data-transfers', title: 'International Data Transfers' },
  { id: 'childrens-privacy', title: 'Children\'s Privacy' },
  { id: 'your-rights-gdpr-and-uk-data-protection-act', title: 'Your Rights (GDPR and UK Data Protection Act)' },
  { id: 'changes-to-this-privacy-policy', title: 'Changes to This Privacy Policy' },
  { id: 'contact-us', title: 'Contact Us' },
];

export default function PrivacyPolicyPage() {
  const [activeSectionId, setActiveSectionId] = useState(''); // State to track the currently active section
  const articleRef = useRef(null); // Ref for the main article content area

  // Define responsive top values for the sticky header (from HeaderWrapper)
  const headerHeightMobile = 43;
  const headerHeightDesktop = 92;

  // Sticky title bar height
  const titleBarActualHeight = 68;

  // Combined sticky heights for positioning
  // These are now raw pixel values for direct use in calc()
  const totalStickyHeightMobilePx = headerHeightMobile + titleBarActualHeight; // 111
  const totalStickyHeightDesktopPx = headerHeightDesktop + titleBarActualHeight; // 160

  // Function to handle scroll and determine active section
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;

      // Get the scroll position relative to the top of the document
      const scrollY = window.scrollY;

      // Calculate the effective scroll position relative to the start of the article content
      // We also account for the height of the sticky elements, so the "active" section
      // is considered based on when it comes into view *below* the sticky bar.
      const offsetForActiveDetection = headerHeightDesktop + titleBarActualHeight; // Use exact sticky height for detection
      // console.log(`offsetForActiveDetection: ${offsetForActiveDetection}`); // Debugging

      let currentActive = '';

      // Iterate through sections to find the one in view
      // Iterate in reverse to prioritize sections higher up when multiple are partially visible
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section.id);

        if (element) {
          // Get the top position of the element relative to the document
          // Use offsetTop for more reliable document-relative position
          const elementTop = element.offsetTop;
          // console.log(`Checking ID: ${section.id}, elementTop: ${elementTop}, scrollY + offsetForActiveDetection: ${scrollY + offsetForActiveDetection}`); // Debugging

          // Check if the element's top is within the effective scroll area
          // It should be considered active if its top is above or at the effectiveScrollTop
          if (elementTop <= scrollY + offsetForActiveDetection) {
            currentActive = section.id;
            break; // Found the highest section in view, stop
          }
        }
      }
      setActiveSectionId(currentActive);
      console.log(`Scroll Debug: scrollY: ${scrollY}, effectiveScrollTop: ${scrollY + offsetForActiveDetection}, Active: ${currentActive}`); // Debugging log
    };

    // Attach scroll listener
    window.addEventListener('scroll', handleScroll);
    // Call once on mount to set initial active section
    handleScroll();

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headerHeightDesktop, titleBarActualHeight]); // Re-run if sticky heights change

  // Custom scroll function to handle anchor links with sticky header offset
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      console.log(`ScrollTo Debug: Element found for ID: ${id}`);
      console.log(`Element Tag: ${element.tagName}, Element ID: ${element.id}`);

      const offset = headerHeightDesktop + titleBarActualHeight; // 160px for desktop

      // Calculate the target scroll position: element's position relative to viewport + current scroll position - sticky offset
      const targetScrollPosition = element.getBoundingClientRect().top + window.scrollY - offset;

      // Directly set scrollTop on the document's root element (<html>)
      document.documentElement.scrollTop = targetScrollPosition;

      console.log(`ScrollTo Debug: document.documentElement.scrollTop set for ID: ${id} to position: ${targetScrollPosition}`);
    } else {
      console.error(`ScrollTo Error: Element with ID "${id}" not found.`);
    }
  };

  return (
    <div className="font-sans antialiased bg-nozu-white text-nozu-dark-grey">
      {/* Sticky Title Bar - Full width, sticks below HeaderWrapper */}
      <div className={`sticky top-[${headerHeightMobile}px] md:top-[${headerHeightDesktop}px] w-full z-40 bg-nozu-dark-grey text-white py-4 px-6 md:px-10 lg:px-12 shadow-md`}>
        <h1 className="text-3xl md:text-4xl font-extrabold text-center">Privacy Policy</h1>
      </div>

      {/* Main content area (sidebar + article) */}
      {/* Removed h-[calc()] from this div. It should not be a scrolling container. */}
      <div className="flex flex-col md:flex-row">
        {/* Left Sidebar for Navigation */}
        <aside className={`w-full md:w-1/4 lg:w-1/5 bg-nozu-white border-r border-nozu-light-grey sticky top-[${totalStickyHeightMobilePx}px] md:top-[${totalStickyHeightDesktopPx}px] md:max-h-[calc(100vh-${totalStickyHeightDesktopPx}px)] overflow-y-auto hide-scrollbar z-30`}>
          {/* Inner div for padding */}
          <div className="px-6 md:px-10 py-8">
            <h2 className="text-2xl font-bold text-nozu-dark-grey mt-0 mb-6">Contents</h2>
            <nav>
              <ul className="space-y-3">
                {sections.map(section => {
                  console.log(`Menu Item Rendered: ID: ${section.id}, Title: ${section.title}`); // Debugging log for menu items
                  return (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`} // Keep href for fallback/SEO
                        onClick={(e) => {
                          e.preventDefault(); // Prevent default anchor link behavior
                          scrollToSection(section.id);
                        }}
                        className={`block text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200 text-lg contents-menu-item ${activeSectionId === section.id ? 'active text-nozu-electric-blue font-semibold' : ''}`}
                        style={{ paddingLeft: section.title.startsWith('###') ? '1.5rem' : section.title.startsWith('##') ? '0.75rem' : '0' }}
                      >
                        {section.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Content Area for Privacy Policy */}
        {/* Removed mt-[...] from article. The content will now flow naturally. */}
        <article ref={articleRef} className={`flex-grow max-w-4xl mx-auto md:mx-0 bg-nozu-white`}>
          {/* Inner div for padding and prose styling */}
          {/* Added pt-[...] to this inner div to push content below sticky elements */}
          <div className={`prose prose-lg max-w-none text-nozu-dark-grey px-6 md:px-10 py-8 pt-[${totalStickyHeightMobilePx}px] md:pt-[${totalStickyHeightDesktopPx}px]`}>
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ node, ...props }) => {
                  // Robust ID generation: Join all children to get full text, then process
                  const textContent = React.Children.toArray(props.children).map(child =>
                    typeof child === 'string' ? child : ''
                  ).join('');

                  const id = textContent.toLowerCase()
                    .replace(/^\d+\.\s*/, '') // Remove leading numbers
                    .replace(/\s/g, '-')      // Replace spaces with hyphens
                    .replace(/\.co\.uk/g, 'couk') // Specific replacement for .co.uk
                    .replace(/[^\w-]/g, '');  // Remove any other non-word/non-hyphen chars
                  console.log(`Generated H2 ID: ${id} for text: "${textContent}"`); // Debugging log
                  return <h2 id={id} className="text-2xl font-bold text-nozu-dark-grey mb-4" {...props} />;
                },
                h3: ({ node, ...props }) => {
                  const textContent = React.Children.toArray(props.children).map(child =>
                    typeof child === 'string' ? child : ''
                  ).join('');
                  const id = textContent.toLowerCase()
                    .replace(/^\d+\.\s*/, '')
                    .replace(/\s/g, '-')
                    .replace(/\.co\.uk/g, 'couk')
                    .replace(/[^\w-]/g, '');
                  console.log(`Generated H3 ID: ${id} for text: "${textContent}"`); // Debugging log
                  return <h3 id={id} className="text-xl font-semibold text-nozu-dark-grey mb-3 mt-6" {...props} />;
                },
                h4: ({ node, ...props }) => {
                  const textContent = React.Children.toArray(props.children).map(child =>
                    typeof child === 'string' ? child : ''
                  ).join('');
                  const id = textContent.toLowerCase()
                    .replace(/^\d+\.\s*/, '')
                    .replace(/\s/g, '-')
                    .replace(/\.co\.uk/g, 'couk')
                    .replace(/[^\w-]/g, '');
                  console.log(`Generated H4 ID: ${id} for text: "${textContent}"`); // Debugging log
                  return <h4 id={id} className="text-lg font-semibold text-nozu-dark-grey mb-2 mt-4" {...props} />;
                },
                p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc mb-4 space-y-1" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal mb-4 space-y-1" {...props} />,
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
