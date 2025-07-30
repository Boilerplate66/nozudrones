// src/app/legal/privacy-policy/page.jsx
"use client"; // This directive marks the component as a Client Component

import React, { useEffect, useState, useRef } from 'react';
import Markdown from 'react-markdown';
import { Link as ScrollLink, Element, Events, scroller } from 'react-scroll';
import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';

// Import your Privacy Policy content directly as a string
const privacyPolicyContent = `
### Privacy Policy for NozuDrones.co.uk

NozuDrones.co.uk ("we," "our," or "us") is committed to protecting your privacy and handling your data in an open and transparent manner. This Privacy Policy outlines our practices concerning the collection, use, disclosure, and safeguarding of your information when you visit our website at [www.nozudrones.co.uk](https://www.nozudrones.co.uk) (the "Site"). We urge you to review this Privacy Policy thoroughly. Your continued access or use of the Site signifies your agreement to the terms herein.

We reserve the right to modify this Privacy Policy at any time, with or without prior notice. Any revisions will be effective immediately upon posting the updated Privacy Policy on this page, indicated by a revised "Last Updated" date. We encourage you to periodically review this Privacy Policy to remain informed of any changes. Your continued use of the Site subsequent to the posting of any revised Privacy Policy will constitute your acceptance of those changes.

### Information We Collect

Our data collection practices are designed to be minimal and focused on improving your experience.

#### Non-Personal Data

We automatically collect certain non-personally identifiable information when you access the Site. This includes, but is not limited to:
* **Browser and Device Information:** Type of browser (e.g., Chrome, Firefox), operating system (e.g., Windows, macOS, Android, iOS), device type (e.g., desktop, mobile, tablet), screen resolution, and language settings.
* **Usage Data:** Pages viewed, time spent on pages, clickstream data, referral sources (the website you came from), exit pages, and navigation paths within the Site.
* **IP Address:** Your Internet Protocol (IP address) is collected, but it is primarily used for broad geographical analysis (e.g., country-level) and security purposes, not for individual identification.
* **Technical Information:** Data related to how you interact with our Site's features, such as video playback events (play, pause, completion) and button clicks.

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

Please be aware that when you click on an affiliate link and subsequently make a purchase on a third-party website, we may earn a commission. This process involves the use of tracking technologies (e.g., cookies placed by the affiliate network) to attribute the sale to our Site. This tracking is managed by the affiliate networks and the retailers, not directly by NozuDrones.co.uk, and does not involve us collecting your personal purchase details.

### Cookies and Tracking Technologies

NozuDrones.co.uk does not directly use first-party cookies for tracking or personalization purposes. However, certain third-party services integrated into our Site may use cookies and similar tracking technologies (e.g., pixels, web beacons) to collect information. These include:

* **Google Analytics 4 (GA4):** GA4 uses cookies to collect anonymized data about website usage, suchs as session duration, pages viewed, and user demographics (if available). This helps us understand how users interact with our Site.
* **Affiliate Networks:** As mentioned in Section 5, affiliate networks may use cookies to track referrals from our Site to their merchant partners, enabling us to earn commissions.

You have the ability to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. Please note that if you choose to decline cookies, it.e.g., may affect the functionality of some parts of our Site or third-party sites you visit via our links. For more detailed information on how we use cookies and how you can manage your preferences, please visit our dedicated <NextLink href="/legal/cookie-settings" className="text-nozu-electric-blue hover:underline">Cookie Settings</NextLink> page.

### Data Retention

We retain non-personal data collected for analytical purposes for a period necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Since we do not collect personal data, there is no personal data to retain beyond the anonymized and aggregated analytics data.

### International Data Transfers

As NozuDrones.co.uk primarily targets users within the UK, our primary data processing and storage are intended to remain within the UK or European Economic Area (EEA). However, some of our third-party service providers (e.g., Google Analytics) may operate globally. By using our Site, you acknowledge that your non-personal information may be transferred to, stored in, and processed in countries outside of your country of residence, including the United States, where data protection laws may differ from those in your jurisdiction. We ensure that any such transfers comply with applicable data protection laws and that adequate safeguards are in place (e.g., Standard contractual Clauses).

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

* **By Email:** [hello@nozudrones.co.uk](mailto://hello.nozudrones.co.uk)
* **By Visiting this page on our website:** [Contact Us](https://www.nozudrones.co.uk/contact)

**Last Updated: July 22, 2025**
`;

// Define the sections for the left-hand index - IDs must match generated markdown IDs
const sections = [
    { id: 'privacy-policy-for-nozudronescouk', title: 'Privacy Policy for NozuDrones.co.uk' },
    { id: 'information-we-collect', title: 'Information We Collect' },
    { id: 'how-we-use-information', title: 'How We Use Information' },
    { id: 'disclosure-of-your-information', title: 'Disclosure of Your Information' },
    { id: 'security-of-your-information', title: 'Security of Your Information' },
    { id: 'third-party-links-affiliate-disclosure', title: 'Third-Party Links & Affiliate Disclosure' },
    { id: 'cookies-and-tracking-technologies', title: 'Cookies and Tracking Technologies' },
    { id: 'data-retention', title: 'Data Retention' },
    { id: 'international-data-transfers', title: 'International Data Transfers' },
    { id: 'childrens-privacy', title: 'Children\'s Privacy' },
    { id: 'your-rights-gdpr-and-uk-data-protection-act', title: 'Your Rights (GDPR and UK Data Protection Act)' },
    { id: 'changes-to-this-privacy-policy', title: 'Changes to This Privacy Policy' },
    { id: 'contact-us', title: 'Contact Us' },
];

// Helper function to slugify text for IDs - crucial for consistent ID generation
const slugify = (text) => {
    return text
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

export default function PrivacyPolicyPage() {
    const headerHeightMobile = 43; // Your defined mobile header height
    const headerHeightDesktop = 92; // Your defined desktop header height
    const titleBarActualHeight = 68; // Your defined title bar height

    // Calculated heights for sticky elements
    const combinedStickyHeightMobile = headerHeightMobile + titleBarActualHeight; // 43 + 68 = 111px
    const combinedStickyHeightDesktop = headerHeightDesktop + titleBarActualHeight; // 92 + 68 = 160px

    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
    const searchParams = useSearchParams();

    // Ref for the new scrollable container
    const mainContentRef = useRef(null);

    // Diagnostic Log: Current offset calculation - now logged on every click as well
    // Note: This offset is for window scrolling, but we are now using a dedicated container.
    // So, it's logged but not actively used for the new container scrolling.
    const currentOffset = -(windowWidth < 768 ? combinedStickyHeightMobile : combinedStickyHeightDesktop);
    console.log(`[PrivacyPolicyPage] currentOffset calculated as: ${currentOffset}px for windowWidth: ${windowWidth}px`);


    useEffect(() => {
        console.log(`[PrivacyPolicyPage] Component Mounted. Initial window width: ${windowWidth}px`);

        // Register custom scroll container with react-scroll
        if (mainContentRef.current) {
            // Register 'begin' event for container-based scrolling
            Events.scrollEvent.register('begin', function (to, element) {
                console.log(`[react-scroll] Scroll Begin (in container): target='${to}' element=`, element);
            });
            Events.scrollEvent.register('end', function (to, element) {
                console.log(`[react-scroll] Scroll End (in container): target='${to}' element=`, element);
            });
            console.log('[PrivacyPolicyPage] react-scroll events (begin/end) registered for container.');
        } else {
            console.warn('[PrivacyPolicyPage] mainContentRef.current is null. Scroll events for container not registered.');
        }

        const hash = window.location.hash;
        if (hash) {
            const targetId = hash.substring(1);
            console.log(`[PrivacyPolicyPage] Initial hash detected: #${targetId}`);

            // Diagnostic Log: Scheduling initial scroll
            const timer = setTimeout(() => {
                const offset = 0; // No offset when scrolling within a dedicated container
                console.log(`[PrivacyPolicyPage] Executing initial scroll to #${targetId} with offset: ${offset} in container.`);
                if (mainContentRef.current) {
                    scroller.scrollTo(targetId, {
                        duration: 0,
                        smooth: false,
                        offset: offset,
                        containerId: 'main-content-scroll-area', // Target the new scroll container
                    });
                } else {
                    console.warn('[PrivacyPolicyPage] mainContentRef.current is null for initial scroll. Cannot scroll.');
                }
            }, 300);

            return () => clearTimeout(timer);
        }

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            console.log(`[PrivacyPolicyPage] Window resized to: ${window.innerWidth}px`);
        };
        window.addEventListener('resize', handleResize);


        return () => {
            window.removeEventListener('resize', handleResize);
            Events.scrollEvent.remove('begin');
            Events.scrollEvent.remove('end');
            console.log('[PrivacyPolicyPage] Cleanup: Event listeners removed.');
        };
    }, [windowWidth, searchParams]); // Dependencies for useEffect.

    return (
        <div className="font-sans antialiased bg-nozu-white text-nozu-dark-grey">
            {/* Sticky Title Bar - Full width, sticks below HeaderWrapper */}
            <div className={`sticky top-[${headerHeightMobile}px] md:top-[${headerHeightDesktop}px] w-full z-40 bg-nozu-dark-grey text-white py-4 px-6 md:px-10 lg:px-12 shadow-md`}>
                <h1 className="text-3xl md:text-4xl font-extrabold text-center">Privacy Policy</h1>
            </div>

            {/* Main content area (sidebar + article) */}
            {/* Added fixed height using actual pixel values for h-[calc(...)] for direct copy/paste */}
            <div className={`flex flex-col md:flex-row mt-4 h-[calc(100vh-16px-43px-68px)] md:h-[calc(100vh-16px-92px-68px)]`}>
                {/* Left Sidebar for Navigation */}
                <aside className={`w-full md:w-1/4 lg:w-1/5 bg-nozu-white border-r border-nozu-light-grey sticky top-[${combinedStickyHeightMobile}px] md:top-[${combinedStickyHeightDesktop}px] overflow-y-auto z-30`}>
                    <div className="px-6 md:px-10 py-8">
                        <h2 className="text-2xl font-bold text-nozu-dark-grey mt-0 mb-6">Contents</h2>
                        <nav>
                            <ul className="space-y-3">
                                {sections.map(section => (
                                    <li key={section.id}>
                                        <ScrollLink
                                            to={section.id}
                                            spy={true}
                                            smooth={true}
                                            duration={500}
                                            // offset={0} // No offset when scrolling within a dedicated container
                                            containerId="main-content-scroll-area" // IMPORTANT: Target the new scroll container
                                            activeClass="active-section-link"
                                            className="block text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200 text-lg contents-menu-item cursor-pointer"
                                            onSetActive={(to) => console.log(`[ScrollLink] Active: ${to} in container`)}
                                            onSetInactive={(to) => console.log(`[ScrollLink] Inactive: ${to} in container`)}
                                            onClick={() => console.log(`[ScrollLink] Clicked: ${section.id}, targeting container: main-content-scroll-area`)}
                                        >
                                            {section.title}
                                        </ScrollLink>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </aside>

                {/* Main Content Area for Privacy Policy - NOW THE SCROLL CONTAINER */}
                <div id="main-content-scroll-area" ref={mainContentRef} className={`flex-grow md:mx-0 bg-nozu-white overflow-y-auto`}>
                    <article className={`max-w-4xl mx-auto prose prose-lg text-nozu-dark-grey px-6 md:px-10 py-8 pt-0`}>
                        <Markdown
                            components={{
                                h2: ({ node, children, ...props }) => {
                                    const textContent = Array.isArray(children) ? children.map(c => typeof c === 'string' ? c : c?.props?.value || c?.props?.children).join('') : (typeof children === 'string' ? children : '');
                                    const id = slugify(textContent);
                                    console.log(`[Markdown Render] Processing h2: text='${textContent}', id='${id}'`);
                                    return (
                                        <Element name={id} key={id} className="element" style={{ paddingTop: '0px', marginTop: '0' }}>
                                            <h2 id={id} className={`text-2xl font-bold text-nozu-dark-grey mb-4`} {...props}>{children}</h2>
                                        </Element>
                                    );
                                },
                                h3: ({ node, children, ...props }) => {
                                    const textContent = Array.isArray(children) ? children.map(c => typeof c === 'string' ? c : c?.props?.value || c?.props?.children).join('') : (typeof children === 'string' ? children : '');
                                    const id = slugify(textContent);
                                    console.log(`[Markdown Render] Processing h3: text='${textContent}', id='${id}'`);
                                    return (
                                        <Element name={id} key={id} className="element" style={{ paddingTop: '0px', marginTop: '0' }}>
                                            <h3 id={id} className={`text-xl font-semibold text-nozu-dark-grey mb-3`} {...props}>{children}</h3>
                                        </Element>
                                    );
                                },
                                h4: ({ node, children, ...props }) => {
                                    const textContent = Array.isArray(children) ? children.map(c => typeof c === 'string' ? c : c?.props?.value || c?.props?.children).join('') : (typeof children === 'string' ? children : '');
                                    const id = slugify(textContent);
                                    console.log(`[Markdown Render] Processing h4: text='${textContent}', id='${id}'`);
                                    return (
                                        <Element name={id} key={id} className="element" style={{ paddingTop: '0px', marginTop: '0' }}>
                                            <h4 id={id} className={`text-lg font-semibold text-nozu-dark-grey mb-2`} {...props}>{children}</h4>
                                        </Element>
                                    );
                                },
                                p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                                ul: ({ node, ...props }) => <ul className="list-disc mb-4 space-y-1" {...props} />,
                                ol: ({ node, ...props }) => <ol className="list-decimal mb-4 space-y-1" {...props} />,
                                a: ({ node, ...props }) => {
                                    if (props.href && (props.href.startsWith('http') || props.href.startsWith('mailto:'))) {
                                        return <a className="text-nozu-electric-blue hover:underline" {...props} target="_blank" rel="noopener noreferrer" />;
                                    }
                                    if (props.href && props.href.startsWith('#')) {
                                        const targetId = props.href.substring(1);
                                        console.log(`[Markdown Render] Internal link: href='${props.href}', targetId='${targetId}'`);
                                        return (
                                            <ScrollLink
                                                to={targetId}
                                                spy={true}
                                                smooth={true}
                                                duration={500}
                                                // offset={0} // No offset when scrolling within a dedicated container
                                                containerId="main-content-scroll-area" // IMPORTANT: Target the new container
                                                className="text-nozu-electric-blue hover:underline cursor-pointer"
                                            >
                                                {props.children}
                                            </ScrollLink>
                                        );
                                    }
                                    return <NextLink className="text-nozu-electric-blue hover:underline" {...props} />;
                                },
                                strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                            }}
                        >
                            {privacyPolicyContent}
                        </Markdown>
                    </article> {/* Corrected closing for article */}
                </div> {/* Corrected closing for main-content-scroll-area div */}
            </div>
        </div>
    );
}