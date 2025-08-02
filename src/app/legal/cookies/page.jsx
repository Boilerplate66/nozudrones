/* src/app/legal/cookies/page.jsx */

"use client";

import React, { useEffect, useState, useRef, useMemo } from 'react';
import Markdown from 'react-markdown';
import NextLink from 'next/link';

const cookieSettingsContent = `
# Cookie Settings

Last Updated: July 2, 2025

### Introduction

Welcome to NozuDrones.co.uk. This page provides information about our use of cookies and other similar technologies, and how you can manage your preferences. By using our site, you consent to our use of cookies in accordance with this policy.

### What are Cookies?

Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work more efficiently and to provide information to the site owners. Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device after you close your browser, while session cookies are deleted as soon as you close your browser.

### Types of Cookies We Use

We use different types of cookies for various purposes:

* **Essential Cookies:** These cookies are strictly necessary to provide you with the services available through our website and to use some of its features, such as accessing secure areas. Without these cookies, we cannot provide you with the services you have requested.
* **Performance and Functionality Cookies:** These cookies are used to enhance the performance and functionality of our website but are non-essential to its use. Without these cookies, certain functionality may become unavailable.
* **Analytics and Customization Cookies:** These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you. We use Google Analytics for this purpose.
* **Advertising Cookies:** These cookies are used to make advertising messages more relevant to you and your interests. We may use these cookies to deliver targeted advertising based on your Browse habits and for retargeting purposes.

### How We Use Cookies

We use cookies to:
* Ensure our website functions correctly.
* Analyze how visitors use our site to improve its performance and design.
* Remember your preferences and settings, such as language and region.
* Personalize your experience and deliver relevant content, including advertisements.
* Help us measure the effectiveness of our marketing efforts.

### Your Choices Regarding Cookies

You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by adjusting your browser settings. Most browsers allow you to refuse cookies. However, if you choose to refuse cookies, you may not be able to use the full functionality of our website.

You can learn more about how to manage cookies on the following pages:
* [Google Chrome](https://support.google.com/chrome/answer/95647?hl=en)
* [Mozilla Firefox](https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences)
* [Microsoft Edge](https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-4197-937b-8234-2a62806e2e46)
* [Apple Safari](https://support.apple.com/en-gb/guide/safari/sfri11471/mac)

For more information about cookies, including how to see what cookies have been set and how to manage and delete them, visit [www.allaboutcookies.org](https://www.allaboutcookies.org).

### Changes to This Policy

We may update our Cookie Settings page from time to time. We will notify you of any changes by posting the new policy on this page with an updated "Last Updated" date.

### Contact Us

If you have any questions about this Cookie Settings page, please contact us at hello@nozudrones.co.uk.
`;

const sectionTitles = [
    'Cookies',
    'Introduction',
    'What are Cookies?',
    'Types of Cookies We Use',
    'How We Use Cookies',
    'Your Choices Regarding Cookies',
    'Changes to This Policy',
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

export default function CookieSettingsPage() {
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
                id="cookies"
                ref={titleBarRef}
                className="sticky top-[43px] md:top-[92px] w-full z-40 bg-nozu-dark-grey text-white py-4 px-6 md:px-10 lg:px-12 shadow-md"
            >
                <h1 className="text-3xl md:text-4xl font-extrabold text-center">Cookie Settings</h1>
            </div>

            <div className="flex flex-col md:flex-row h-[calc(100vh-137px)] md:h-[calc(100vh-190px)]">
                <aside
                    ref={sidebarRef}
                    className="hidden md:block w-full md:w-1/4 lg:w-1/5 bg-nozu-white border-r border-nozu-light-grey sticky top-0 z-30"
                >
                    <div className="px-6 md:px-10 py-8">
                        <h2 className="text-2xl font-bold text-nozu-dark-grey mt-0 mb-6">Contents</h2>
                        <nav aria-label="Cookie settings contents">
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
                            {cookieSettingsContent}
                        </Markdown>
                        <div id="scroll-end-sentinel" style={{ position: 'absolute', bottom: 0, height: 1, width: '100%' }} />
                    </article>
                </div>
            </div>
        </div>
    );
}