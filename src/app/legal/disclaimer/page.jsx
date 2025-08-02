/* src/app/legal/disclaimer/page.jsx */

"use client";

import React, { useEffect, useState, useRef, useMemo } from 'react';
import Markdown from 'react-markdown';
import NextLink from 'next/link';

const disclaimerContent = `
# Website Disclaimer

Last Updated: August 2, 2025

### General Information and Content Disclaimer

The information provided by NozuDrones.co.uk ("we," "us," or "our") on [www.nozudrones.co.uk](https://www.nozudrones.co.uk) (the "Site") is for general informational purposes only. All information on the Site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.

Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk. The content on this Site is not intended to be a substitute for professional legal, financial, or technical advice. The information is not guaranteed to be correct, complete, or up-to-date. You should not act or refrain from acting on the basis of any content included in this Site without seeking legal or other professional advice on the particular facts and circumstances at issue.

### Affiliate and Amazon Associate Disclaimer

This Site contains links to third-party websites, including links that are part of affiliate marketing programs. We are a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for us to earn advertising fees by linking to Amazon.co.uk and affiliated sites.

When you click on an affiliate link and make a purchase, we may earn a commission from that retailer. This does not result in any additional cost to you. The affiliate relationship does not influence our editorial content, reviews, or recommendations. We only recommend products or services that we genuinely believe are of high quality and value. We are not responsible for the products or services provided by these third-party websites, nor are we responsible for their terms of service, privacy policies, or any other content on their sites. You should perform your own due diligence before making any purchases.

### External Links and Third-Party Websites Disclaimer

The Site may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the Site or any website or feature linked in any banner or other advertising. We will not be a party to or in any way be responsible for monitoring any transaction between you and third-party providers of products or services. The inclusion of any link does not imply a recommendation or endorsement of the linked site.

### Errors, Omissions, and Outdated Content Disclaimer

The content of this Site is subject to change at any time without notice. While we make every effort to ensure that the information on the Site is accurate and current, we do not guarantee the completeness, accuracy, or timeliness of the information. The information and other content on this Site may contain technical inaccuracies or typographical errors. We expressly disclaim all liability for any errors or omissions, or for the results obtained from the use of this information. We are under no obligation to update any content on this Site.

### Fair Use and Copyright Disclaimer

The Site may contain copyrighted material, the use of which may not have been specifically authorized by the copyright owner. We are making such material available for educational and informational purposes. We believe this constitutes a "fair use" of any such copyrighted material as provided for in section 107 of the U.S. Copyright Law. If you wish to use copyrighted material from this Site for purposes of your own that go beyond fair use, you must obtain permission from the copyright owner.

### Views Expressed Disclaimer

The views and opinions expressed on the Site are those of the authors and do not necessarily reflect the official policy or position of any other agency, organization, employer, or company. The views of the authors do not reflect the views of the Site's owners or operators unless explicitly stated.

### No Professional Advice Disclaimer

The information provided on this Site is for general informational purposes only and is not a substitute for professional advice. It is not intended as legal, financial, or technical advice. Before making any decisions based on information from this Site, you should consult with a qualified professional. You should not rely on any information on this site as professional advice.

### "As Is" and "As Available" Disclaimer

The Site is provided "as is" and "as available" with all faults and without warranty of any kind. To the maximum extent permitted under applicable law, we expressly disclaim all warranties, whether express, implied, statutory, or otherwise, with respect to the Site, including all implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement.
`;

const sectionTitles = [
    'Website Disclaimer',
    'General Information and Content Disclaimer',
    'Affiliate and Amazon Associate Disclaimer',
    'External Links and Third-Party Websites Disclaimer',
    'Errors, Omissions, and Outdated Content Disclaimer',
    'Fair Use and Copyright Disclaimer',
    'Views Expressed Disclaimer',
    'No Professional Advice Disclaimer',
    `"As Is" and "As Available" Disclaimer`,
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

export default function DisclaimerPage() {
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
                id="website-disclaimer"
                ref={titleBarRef}
                className="sticky top-[43px] md:top-[92px] w-full z-40 bg-nozu-dark-grey text-white py-4 px-6 md:px-10 lg:px-12 shadow-md"
            >
                <h1 className="text-3xl md:text-4xl font-extrabold text-center">Website Disclaimer</h1>
            </div>

            <div className="flex flex-col md:flex-row h-[calc(100vh-137px)] md:h-[calc(100vh-190px)]">
                <aside
                    ref={sidebarRef}
                    className="hidden md:block w-full md:w-1/4 lg:w-1/5 bg-nozu-white border-r border-nozu-light-grey sticky top-0 z-30"
                >
                    <div className="px-6 md:px-10 py-8">
                        <h2 className="text-2xl font-bold text-nozu-dark-grey mt-0 mb-6">Contents</h2>
                        <nav aria-label="Disclaimer contents">
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
                            {disclaimerContent}
                        </Markdown>
                        <div id="scroll-end-sentinel" style={{ position: 'absolute', bottom: 0, height: 1, width: '100%' }} />
                    </article>
                </div>
            </div>
        </div>
    );
}