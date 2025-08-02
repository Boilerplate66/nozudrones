/* src/app/legal/privacy-policy/page.jsx */

"use client";

import React, { useEffect, useState, useRef, useMemo } from 'react';
import Markdown from 'react-markdown';
import NextLink from 'next/link';

// Privacy Policy content (unchanged)
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
* **The Right to Restrict Processing:** To request that you limit the way we use your data, under certain conditions.
* **The Right to Data Portability:** To request that you transfer the data we have collected to another organization, or directly to you, under certain conditions.
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

// Titles in canonical order; IDs are generated via slugify to keep in sync
const sectionTitles = [
    'Privacy Policy for NozuDrones.co.uk',
    'Information We Collect',
    'How We Use Information',
    'Disclosure of Your Information',
    'Security of Your Information',
    'Third-Party Links & Affiliate Disclosure',
    'Cookies and Tracking Technologies',
    'Data Retention',
    'International Data Transfers',
    "Children's Privacy",
    'Your Rights (GDPR and UK Data Protection Act)',
    'Changes to This Privacy Policy',
    'Contact Us',
];

// Slugify helper (same logic as headings)
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

// Build sections array programmatically so sidebar and observed IDs can't drift
const sections = sectionTitles.map(title => ({ title, id: slugify(title) }));

export default function PrivacyPolicyPage() {
    const titleBarRef = useRef(null);
    const mainContentRef = useRef(null);
    const sidebarRef = useRef(null);
    const [headerOffset, setHeaderOffset] = useState(0);
    const [sidebarContentOffset, setSidebarContentOffset] = useState(0);
    const [activeSection, setActiveSection] = useState(sections[0].id);
    const observer = useRef(null);
    const hashHandledRef = useRef(false);

    // Prevent native jump flicker if there's a hash (suppress smooth temporarily)
    if (typeof window !== 'undefined' && window.location.hash) {
        document.documentElement.style.scrollBehavior = 'auto';
    }

    // Setup scroll restoration override + header offset + initial reset
    useEffect(() => {
        if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        if (mainContentRef.current) {
            mainContentRef.current.scrollTo(0, 0);
        }

        const updateOffsets = () => {
            if (titleBarRef.current && mainContentRef.current && sidebarRef.current) {
                const titleBarHeight = titleBarRef.current.offsetHeight;
                setHeaderOffset(titleBarHeight + 16);
                
                // Calculate the offset from the top of the sidebar to the "Contents" title
                // This accounts for the sidebar padding and the "Contents" title position
                const sidebarPadding = 32; // py-8 = 2rem = 32px
                const contentsTitle = sidebarRef.current.querySelector('h2');
                const contentsTitleHeight = contentsTitle ? contentsTitle.offsetHeight + 24 : 56; // mb-6 = 24px
                setSidebarContentOffset(sidebarPadding + contentsTitleHeight);
                
                mainContentRef.current.style.setProperty('--header-offset', `${titleBarHeight + 4}px`);
            }
        };

        updateOffsets();
        window.addEventListener('resize', updateOffsets);
        return () => window.removeEventListener('resize', updateOffsets);
    }, []);

    // Handle incoming hash once offsets are known
    useEffect(() => {
        if (headerOffset === 0 || sidebarContentOffset === 0 || hashHandledRef.current) return;
        if (!mainContentRef.current) return;

        const hash = typeof window !== 'undefined' ? window.location.hash : '';
        if (hash) {
            const targetId = hash.substring(1);
            const el = document.getElementById(targetId);
            if (el) {
                // Use the sidebar content offset to align with the "Contents" title level
                const scrollPosition = el.offsetTop - sidebarContentOffset;
                mainContentRef.current.scrollTo({ top: scrollPosition, behavior: 'auto' });
                setActiveSection(targetId);
            }
        }
        // restore default behavior styling (optional)
        document.documentElement.style.removeProperty('scroll-behavior');
        hashHandledRef.current = true;
    }, [headerOffset, sidebarContentOffset]);

    // Scrollspy logic with sentinel override and closest-to-header selection
    useEffect(() => {
        if (!mainContentRef.current || headerOffset === 0 || sidebarContentOffset === 0) return;

        if (observer.current) {
            observer.current.disconnect();
            observer.current = null;
        }

        const visibleEntries = new Map();

        const callback = (entries) => {
            // 1. Bottom sentinel override
            const sentinel = mainContentRef.current.querySelector('#scroll-end-sentinel');
            if (sentinel) {
                const sentinelRect = sentinel.getBoundingClientRect();
                const containerRect = mainContentRef.current.getBoundingClientRect();
                if (sentinelRect.top >= containerRect.top && sentinelRect.bottom <= containerRect.bottom + 1) {
                    const lastSectionId = sections[sections.length - 1].id;
                    if (lastSectionId !== activeSection) {
                        setActiveSection(lastSectionId);
                    }
                    return;
                }
            }

            // 2. Normal intersection logic
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    visibleEntries.set(entry.target.id, entry);
                } else {
                    visibleEntries.delete(entry.target.id);
                }
            });

            if (visibleEntries.size === 0) return;

            let bestId = null;
            let smallestDistance = Infinity;
            visibleEntries.forEach((entry, id) => {
                const distance = Math.abs(entry.boundingClientRect.top - sidebarContentOffset);
                if (distance < smallestDistance) {
                    smallestDistance = distance;
                    bestId = id;
                }
            });

            if (bestId && bestId !== activeSection) {
                setActiveSection(bestId);
            }
        };

        observer.current = new IntersectionObserver(callback, {
            root: mainContentRef.current,
            rootMargin: `-${sidebarContentOffset}px 0px -50% 0px`,
            threshold: [0, 0.1, 0.5],
        });

        sections.forEach(({ id }) => {
            const el = mainContentRef.current.querySelector(`#${id}`);
            if (el) {
                observer.current.observe(el);
            } else if (process.env.NODE_ENV !== 'production') {
                console.warn(`Scrollspy: expected section with id "${id}" not found in DOM`);
            }
        });

        // Also observe the sentinel if present (so callback gets triggered when it enters)
        const sentinelEl = mainContentRef.current.querySelector('#scroll-end-sentinel');
        if (sentinelEl && observer.current) {
            observer.current.observe(sentinelEl);
        }

        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, [headerOffset, sidebarContentOffset, activeSection]);

    const scrollToSection = (id) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element && mainContentRef.current) {
            // Use the sidebar content offset to align consistently
            const scrollPosition = element.offsetTop - sidebarContentOffset;
            mainContentRef.current.scrollTo({
                top: scrollPosition,
                behavior: 'smooth',
            });
            // update URL without triggering native jump
            if (typeof history !== 'undefined') {
                history.replaceState(null, '', `#${id}`);
            }
        }
    };

    return (
        <div className="font-sans antialiased bg-nozu-white text-nozu-dark-grey">
            {/* Sticky Title Bar */}
            <div
                ref={titleBarRef}
                className="sticky top-[43px] md:top-[92px] w-full z-40 bg-nozu-dark-grey text-white py-4 px-6 md:px-10 lg:px-12 shadow-md"
            >
                <h1 className="text-3xl md:text-4xl font-extrabold text-center">Privacy Policy</h1>
            </div>

            <div className="flex flex-col md:flex-row h-[calc(100vh-137px)] md:h-[calc(100vh-190px)]">
                {/* Hide the sidebar on mobile, show on medium and up */}
                <aside 
                    ref={sidebarRef}
                    className="hidden md:block w-full md:w-1/4 lg:w-1/5 bg-nozu-white border-r border-nozu-light-grey sticky top-0 z-30"
                >
                    <div className="px-6 md:px-10 py-8">
                        <h2 className="text-2xl font-bold text-nozu-dark-grey mt-0 mb-6">Contents</h2>
                        <nav aria-label="Privacy policy contents">
                            <ul className="space-y-3">
                                {sections.map(section => (
                                    <li key={section.id}>
                                        <a
                                            onClick={(e) => {
                                                e.preventDefault();
                                                scrollToSection(section.id);
                                            }}
                                            aria-current={activeSection === section.id ? 'location' : undefined}
                                            className={`block text-nozu-medium-grey hover:text-nozu-electric-blue transition-colors duration-200 text-lg contents-menu-item cursor-pointer ${
                                                activeSection === section.id ? 'active-section-link' : ''
                                            }`}
                                        >
                                            {section.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </aside>

                <div
                    id="main-content-scroll-area"
                    ref={mainContentRef}
                    className="flex-grow md:mx-0 bg-nozu-white overflow-y-auto"
                >
                    <article className="relative max-w-4xl mx-auto prose prose-lg text-nozu-dark-grey px-6 md:px-10 py-8">
                        <Markdown
                            components={{
                                h2: ({ node, children, ...props }) => {
                                    const textContent = Array.isArray(children)
                                        ? children
                                              .map(c =>
                                                  typeof c === 'string'
                                                      ? c
                                                      : c?.props?.value || c?.props?.children
                                              )
                                              .join('')
                                        : typeof children === 'string'
                                        ? children
                                        : '';
                                    const id = slugify(textContent);
                                    return (
                                        <h2
                                            id={id}
                                            className="text-2xl font-bold text-nozu-dark-grey mb-4"
                                            {...props}
                                        >
                                            {children}
                                        </h2>
                                    );
                                },
                                h3: ({ node, children, ...props }) => {
                                    const textContent = Array.isArray(children)
                                        ? children
                                              .map(c =>
                                                  typeof c === 'string'
                                                      ? c
                                                      : c?.props?.value || c?.props?.children
                                              )
                                              .join('')
                                        : typeof children === 'string'
                                        ? children
                                        : '';
                                    const id = slugify(textContent);
                                    return (
                                        <h3
                                            id={id}
                                            className="text-xl font-semibold text-nozu-dark-grey mb-3"
                                            {...props}
                                        >
                                            {children}
                                        </h3>
                                    );
                                },
                                h4: ({ node, children, ...props }) => {
                                    const textContent = Array.isArray(children)
                                        ? children
                                              .map(c =>
                                                  typeof c === 'string'
                                                      ? c
                                                      : c?.props?.value || c?.props?.children
                                              )
                                              .join('')
                                        : typeof children === 'string'
                                        ? children
                                        : '';
                                    const id = slugify(textContent);
                                    return (
                                        <h4
                                            id={id}
                                            className="text-lg font-semibold text-nozu-dark-grey mb-2"
                                            {...props}
                                        >
                                            {children}
                                        </h4>
                                    );
                                },
                                p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                                ul: ({ node, ...props }) => (
                                    <ul className="list-disc mb-4 space-y-1" {...props} />
                                ),
                                ol: ({ node, ...props }) => (
                                    <ol className="list-decimal mb-4 space-y-1" {...props} />
                                ),
                                a: ({ node, children, ...props }) => {
                                    if (props.href && (props.href.startsWith('http') || props.href.startsWith('mailto:'))) {
                                        return (
                                            <a
                                                className="text-nozu-electric-blue hover:underline"
                                                {...props}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {children}
                                            </a>
                                        );
                                    }
                                    if (props.href && props.href.startsWith('#')) {
                                        const targetId = props.href.substring(1);
                                        return (
                                            <a
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    scrollToSection(targetId);
                                                }}
                                                className="text-nozu-electric-blue hover:underline cursor-pointer"
                                            >
                                                {children}
                                            </a>
                                        );
                                    }
                                    return (
                                        <NextLink className="text-nozu-electric-blue hover:underline" {...props}>
                                            {children}
                                        </NextLink>
                                    );
                                },
                                strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                            }}
                        >
                            {privacyPolicyContent}
                        </Markdown>

                        {/* sentinel to detect bottom-of-scroll for last section */}
                        <div id="scroll-end-sentinel" style={{ position: 'absolute', bottom: 0, height: 1, width: '100%' }} />
                    </article>
                </div>
            </div>
        </div>
    );
}