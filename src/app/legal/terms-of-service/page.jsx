/* src/app/legal/terms-of-service/page.jsx */

"use client";

import React, { useEffect, useState, useRef, useMemo } from 'react';
import Markdown from 'react-markdown';
import NextLink from 'next/link';

const termsOfServiceContent = `
# Terms of Service

Last Updated: July 2, 2025

### Introduction

Welcome to NozuDrones.co.uk ("we," "us," or "our"). These Terms of Service ("Terms") govern your use of our website, located at [www.nozudrones.co.uk](https://www.nozudrones.co.uk) (the "Site"). By accessing or using the Site, you agree to be bound by these Terms and our Privacy Policy. If you do not agree with any part of these Terms, you must not use the Site.

### Nature of Our Service

NozuDrones.co.uk is a content-based website that provides information, reviews, and guides on drones and related accessories. Our primary purpose is to offer educational and informational content. We are not a retailer or e-commerce platform.

### Affiliate Disclaimer

We participate in various affiliate marketing programs, which means we may earn commissions on editorially chosen products purchased through our links to retailer sites. This includes, but is not limited to, the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.co.uk.

* Our content and recommendations are based on our own research and editorial judgment.
* The price you pay for a product is not affected by our commission.
* We have no direct control over the products, shipping, returns, or customer service of third-party retailers. Any issues must be addressed directly with the retailer.

### Intellectual Property

All content on the Site, including text, graphics, logos, images, and software, is the property of NozuDrones.co.uk or its content suppliers and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works from any content without our express written permission.

### Your Responsibilities

By using the Site, you agree not to:
* Use the Site for any illegal purpose or in violation of any local, national, or international law.
* Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Site.
* Attempt to gain unauthorized access to any portion of the Site, other accounts, computer systems, or networks connected to our server.

### Disclaimer of Warranties

The Site and its content are provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. We do not warrant that the Site will be uninterrupted, error-free, or free from viruses or other harmful components. Your use of the Site is at your own risk.

### Limitation of Liability

To the fullest extent permitted by law, NozuDrones.co.uk shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages, including but not limited to, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
* Your access to or use of, or inability to access or use, the Site.
* Any conduct or content of any third party on the Site.
* Any content obtained from the Site.

### Indemnification

You agree to indemnify, defend, and hold harmless NozuDrones.co.uk and its employees, agents, and affiliates from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including but not limited to attorney's fees), arising from your use of and access to the Site or your violation of these Terms.

### Governing Law

These Terms shall be governed by and construed in accordance with the laws of England and Wales, without regard to its conflict of law provisions. Any legal action or proceeding related to the Site shall be brought exclusively in the courts located in England.

### Changes to These Terms

We reserve the right to modify these Terms at any time. We will provide notice of any significant changes by posting the new Terms on this page with an updated "Last Updated" date. Your continued use of the Site after such changes constitutes your acceptance of the new Terms.

### General Provisions

If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect and enforceable. The failure of either party to exercise any right provided for herein shall not be deemed a waiver of any further rights hereunder.

You agree that these Terms and the Privacy Policy constitute the entire and exclusive agreement between you and NozuDrones.co.uk concerning your use of the Site, and they supersede and replace any prior agreements, oral or otherwise, between you and us.

We may, without notice to you, assign our rights and obligations under these Terms to any other entity. These Terms are personal to you and may not be assigned, transferred, or sublicensed by you without our prior written consent. No joint venture, partnership, employment, or agency relationship exists between you and us as a result of these Terms or your use of the Site.

All notices under these Terms must be in writing and will be deemed given when delivered personally, when sent by confirmed email, or when sent by certified or registered mail, return receipt requested, to the party's last-known address.

### Contact Us

If you have any questions about these Terms, please contact us at hello@nozudrones.co.uk.
`;

const sectionTitles = [
    'Terms of Service',
    'Introduction',
    'Nature of Our Service',
    'Affiliate Disclaimer',
    'Intellectual Property',
    'Your Responsibilities',
    'Disclaimer of Warranties',
    'Limitation of Liability',
    'Indemnification',
    'Governing Law',
    'Changes to These Terms',
    'General Provisions',
    'Contact Us',
];

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

const sections = sectionTitles.map(title => ({ title, id: slugify(title) }));

export default function TermsOfServicePage() {
    const titleBarRef = useRef(null);
    const mainContentRef = useRef(null);
    const sidebarRef = useRef(null);
    const [headerOffset, setHeaderOffset] = useState(0);
    const [sidebarContentOffset, setSidebarContentOffset] = useState(0);
    const [activeSection, setActiveSection] = useState(sections[0].id);
    const observer = useRef(null);
    const hashHandledRef = useRef(false);

    if (typeof window !== 'undefined' && window.location.hash) {
        document.documentElement.style.scrollBehavior = 'auto';
    }

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

                const sidebarPadding = 32;
                const contentsTitle = sidebarRef.current.querySelector('h2');
                const contentsTitleHeight = contentsTitle ? contentsTitle.offsetHeight + 24 : 56;
                setSidebarContentOffset(sidebarPadding + contentsTitleHeight);

                mainContentRef.current.style.setProperty('--header-offset', `${titleBarHeight + 4}px`);
            }
        };

        updateOffsets();
        window.addEventListener('resize', updateOffsets);
        return () => window.removeEventListener('resize', updateOffsets);
    }, []);

    useEffect(() => {
        if (headerOffset === 0 || sidebarContentOffset === 0 || hashHandledRef.current) return;
        if (!mainContentRef.current) return;

        const hash = typeof window !== 'undefined' ? window.location.hash : '';
        if (hash) {
            const targetId = hash.substring(1);
            const el = document.getElementById(targetId);
            if (el) {
                const scrollPosition = el.offsetTop - sidebarContentOffset;
                mainContentRef.current.scrollTo({ top: scrollPosition, behavior: 'auto' });
                setActiveSection(targetId);
            }
        }
        document.documentElement.style.removeProperty('scroll-behavior');
        hashHandledRef.current = true;
    }, [headerOffset, sidebarContentOffset]);

    useEffect(() => {
        if (!mainContentRef.current || headerOffset === 0 || sidebarContentOffset === 0) return;

        if (observer.current) {
            observer.current.disconnect();
            observer.current = null;
        }

        const visibleEntries = new Map();

        const callback = (entries) => {
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
            const scrollPosition = element.offsetTop - sidebarContentOffset;
            mainContentRef.current.scrollTo({
                top: scrollPosition,
                behavior: 'smooth',
            });
            if (typeof history !== 'undefined') {
                history.replaceState(null, '', `#${id}`);
            }
        }
    };

    return (
        <div className="font-sans antialiased bg-nozu-white text-nozu-dark-grey">
            <div
                id="terms-of-service"
                ref={titleBarRef}
                className="sticky top-[43px] md:top-[92px] w-full z-40 bg-nozu-dark-grey text-white py-4 px-6 md:px-10 lg:px-12 shadow-md"
            >
                <h1 className="text-3xl md:text-4xl font-extrabold text-center">Terms of Service</h1>
            </div>

            <div className="flex flex-col md:flex-row h-[calc(100vh-137px)] md:h-[calc(100vh-190px)]">
                <aside
                    ref={sidebarRef}
                    className="hidden md:block w-full md:w-1/4 lg:w-1/5 bg-nozu-white border-r border-nozu-light-grey sticky top-0 z-30"
                >
                    <div className="px-6 md:px-10 py-8">
                        <h2 className="text-2xl font-bold text-nozu-dark-grey mt-0 mb-6">Contents</h2>
                        <nav aria-label="Terms of service contents">
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
                                        ? children.map(c => typeof c === 'string' ? c : c?.props?.value || c?.props?.children).join('')
                                        : typeof children === 'string' ? children : '';
                                    const id = slugify(textContent);
                                    return (
                                        <h2 id={id} className="text-2xl font-bold text-nozu-dark-grey mb-4" {...props}>
                                            {children}
                                        </h2>
                                    );
                                },
                                h3: ({ node, children, ...props }) => {
                                    const textContent = Array.isArray(children)
                                        ? children.map(c => typeof c === 'string' ? c : c?.props?.value || c?.props?.children).join('')
                                        : typeof children === 'string' ? children : '';
                                    const id = slugify(textContent);
                                    return (
                                        <h3 id={id} className="text-xl font-semibold text-nozu-dark-grey mb-3" {...props}>
                                            {children}
                                        </h3>
                                    );
                                },
                                h4: ({ node, children, ...props }) => {
                                    const textContent = Array.isArray(children)
                                        ? children.map(c => typeof c === 'string' ? c : c?.props?.value || c?.props?.children).join('')
                                        : typeof children === 'string' ? children : '';
                                    const id = slugify(textContent);
                                    return (
                                        <h4 id={id} className="text-lg font-semibold text-nozu-dark-grey mb-2" {...props}>
                                            {children}
                                        </h4>
                                    );
                                },
                                p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                                ul: ({ node, ...props }) => <ul className="list-disc mb-4 space-y-1" {...props} />,
                                ol: ({ node, ...props }) => <ol className="list-decimal mb-4 space-y-1" {...props} />,
                                a: ({ node, children, ...props }) => {
                                    if (props.href && (props.href.startsWith('http') || props.href.startsWith('mailto:'))) {
                                        return (
                                            <a className="text-nozu-electric-blue hover:underline" {...props} target="_blank" rel="noopener noreferrer">
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
                            {termsOfServiceContent}
                        </Markdown>
                        <div id="scroll-end-sentinel" style={{ position: 'absolute', bottom: 0, height: 1, width: '100%' }} />
                    </article>
                </div>
            </div>
        </div>
    );
}