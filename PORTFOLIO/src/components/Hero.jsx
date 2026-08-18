import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const [showLoader, setShowLoader] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);

    const [currentFrameIdx, setCurrentFrameIdx] = useState(0);

    const textContainerRef = useRef(null);
    const roleWrapperRef = useRef(null);
    const subtitleWrapperRef = useRef(null);
    const highlightWrapperRef = useRef(null);

    const dattuImageBase = '/Dattu';
    const totalDattuFrames = 41;
    const frameSequence = Array.from(
        { length: totalDattuFrames },
        (_, index) => {
            const frameNum = index + 1;
            const ext = frameNum <= 16 ? '.png' : '.jpeg';
            return `${dattuImageBase}/D${frameNum}${ext}`;
        }
    );
    const frameCount = frameSequence.length;
    const currentFrame = (index) => frameSequence[index % frameSequence.length];

    const imagesRef = useRef([]);
    // We use an object to track the frame so GSAP can animate the value smoothly
    const seqRef = useRef({ frame: 0 });

    useEffect(() => {
        if (!loaded) return;

        const loaderTimer = window.setTimeout(() => {
            setShowLoader(false);
        }, 1800);

        return () => window.clearTimeout(loaderTimer);
    }, [loaded]);

    useEffect(() => {
        let loadedCount = 0;

        frameSequence.forEach((path) => {
            const img = new Image();
            img.src = path;
            img.onload = () => {
                loadedCount++;
                setLoadingProgress(Math.floor((loadedCount / frameSequence.length) * 100));
                if (loadedCount === frameSequence.length) setLoaded(true);
            };
            img.onerror = () => {
                loadedCount++;
                if (loadedCount === frameSequence.length) setLoaded(true);
            };
            imagesRef.current.push(img);
        });
    }, []);

    useEffect(() => {
        if (!loaded || !frameSequence.length) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        canvas.width = 1920;
        canvas.height = 1080;

        const render = () => {
            if (!canvasRef.current || !imagesRef.current.length) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#020202';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            let frameIdx = Math.round(seqRef.current.frame);
            if (frameIdx < 0) frameIdx = 0;
            if (frameIdx >= frameCount) frameIdx = frameCount - 1;

            const img = imagesRef.current[frameIdx];
            if (img && img.complete && img.naturalHeight !== 0) {
                const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
                const drawWidth = img.width * scale;
                const drawHeight = img.height * scale;
                const x = (canvas.width - drawWidth) / 2;
                const y = (canvas.height - drawHeight) / 2;
                ctx.drawImage(img, x, y, drawWidth, drawHeight);
            }

            setCurrentFrameIdx(frameIdx);
        };

        render(); // Draw initial 0th frame

        // --- 0. INITIALIZATION LOADING SEQUENCE (Runs First) ---
        const loaderTl = gsap.timeline();

        // Animate loading progress bar
        loaderTl.to('.loader-progress-bar', {
            width: '100%',
            duration: 1.5,
            ease: "power1.inOut"
        }, 0);

        // Loading text animation
        loaderTl.fromTo('.loader-text', { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "none" }, 0);

        // --- 1. SYSTEM BOOT OPENING EXPERIENCE (Runs on Mount) ---
        const bootTl = gsap.timeline({ delay: 0.8 });

        // Loader exits first, then the push burst fires, then the hero wakes up
        bootTl.set('.loader-container', { display: 'none' }, 0.2);
        bootTl.set(canvas, { opacity: 0, scale: 1 }, 0.3);

        // Strong center push-out burst after the loader starts leaving
        bootTl.fromTo('.push-pulse', {
            scale: 0.25,
            opacity: 0.85,
            filter: 'blur(0px)'
        }, {
            scale: 2.9,
            opacity: 0,
            filter: 'blur(14px)',
            duration: 1.4,
            ease: "power3.out",
            transformOrigin: 'center'
        }, 0.5);

        bootTl.to(canvas, { opacity: 0.2, duration: 0.08, ease: "none" }, 0.9);
        bootTl.to(canvas, { opacity: 1, duration: 0.45, ease: "power2.out" }, 1.1);

        // Navbar slide in
        bootTl.fromTo('nav', { y: -50, opacity: 0, filter: 'blur(10px)' }, { y: 0, opacity: 1, filter: 'blur(0)', duration: 1, ease: "power2.out" }, 0.4);

        gsap.set(seqRef.current, { frame: 0 });

        // Keep the hero overlay visible continuously while the background sequence scrolls underneath
        gsap.set('.portfolio-ui', { opacity: 1, clearProps: 'filter' });
        bootTl.fromTo('.portfolio-ui', { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, 1.4);

        // HUD Elements sequence
        bootTl.fromTo('.hud-element', { opacity: 0 }, { opacity: 1, duration: 0.1, stagger: 0.1, ease: "none" }, 1.2);

        // Robotic Text Sequence
        if (textContainerRef.current) {
            // LEESHARK chars glitch/stagger in
            bootTl.to('.title-char', { opacity: 1, x: 0, duration: 0.05, stagger: 0.05, ease: "none" }, 1.5);

            // Full Stack Developer
            bootTl.fromTo(roleWrapperRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "none" }, 2.0);
            bootTl.fromTo('.role-underline', { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 0.3, ease: "none" }, 2.2);

            // Right Content
            bootTl.fromTo(subtitleWrapperRef.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.3, ease: "none" }, 2.4);
            bootTl.fromTo(highlightWrapperRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.2, ease: "none" }, 2.6);

            // Social Icons Bottom Left
            bootTl.fromTo('.social-icon', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.2, stagger: 0.1, ease: "none" }, 2.8);
        }

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top top',
            end: '+=2200',
            scrub: 0.9,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                const targetFrame = progress * (frameCount - 1);
                seqRef.current.frame = targetFrame;
                render();

                const blurAmount = 0 + progress * 2.2;
                const opacity = 1 - progress * 0.25;
                gsap.set('.portfolio-ui', {
                    filter: `blur(${blurAmount}px)`,
                    opacity: Math.max(0.7, opacity)
                });

                if (canvasRef.current) {
                    canvasRef.current.style.opacity = String(1 - progress * 0.7);
                }
            }
        });

        // Subtle exit blur as the hero transitions into the next scene
        gsap.to('.portfolio-ui', {
            filter: 'blur(2px)',
            opacity: 0.75,
            duration: 0.45,
            ease: 'power2.inOut',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 78%',
                end: 'bottom top',
                scrub: 0.8
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [loaded]);

    const titleText = "NAYAK";

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-[#020202] overflow-hidden flex items-center justify-center font-sans tracking-wide">

            {/* Loading State */}
            {showLoader && (
                <div className="loader-container absolute inset-0 flex flex-col items-center justify-center z-50 bg-[#020202]">
                    <div className="loader-text text-gray-400 font-mono text-xs uppercase tracking-[0.3em] mb-6">&gt; INITIALIZING_CORE_SYSTEM</div>
                    <div className="w-64 h-[2px] bg-white/10 overflow-hidden rounded-full">
                        <div className="loader-progress-bar h-full bg-gradient-to-r from-blue-500 to-blue-400" style={{ width: '0%' }}></div>
                    </div>
                    <div className="loader-text text-gray-600 font-mono text-[10px] uppercase tracking-widest mt-4">Loading Portfolio v2.0</div>
                </div>
            )}

            {/* --- BACKGROUND EFFECTS --- */}
            <div className="absolute inset-0 z-[1] opacity-30" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                backgroundSize: '32px 32px'
            }} />
            <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none">
                <div
                    className="push-pulse w-[420px] h-[420px] md:w-[560px] md:h-[560px] rounded-full border border-blue-400/70 bg-blue-500/15 shadow-[0_0_80px_rgba(59,130,246,0.45)]"
                    style={{ boxShadow: '0 0 90px rgba(59,130,246,0.45)' }}
                />
            </div>

            {/* --- HUD ELEMENTS --- */}
            <div className="portfolio-ui absolute top-28 left-8 md:top-32 md:left-12 z-[60] font-mono text-[10px] text-blue-400 tracking-widest flex flex-col space-y-1.5 pointer-events-none">
                <span className="hud-element opacity-0">&gt; SYSTEM ONLINE</span>
                <span className="hud-element opacity-0">&gt; INITIALIZING PORTFOLIO v2.0</span>
                <span className="hud-element opacity-0">&gt; NEURAL LINK ESTABLISHED</span>
            </div>
            <div className="portfolio-ui absolute bottom-12 right-8 md:bottom-12 md:right-12 z-[60] font-mono text-[10px] text-gray-600 tracking-widest text-right flex flex-col space-y-1.5 pointer-events-none">
                <span className="hud-element opacity-0">SECURE SYS_ID: REACT_GSAP</span>
                <span className="hud-element opacity-0">COORD: 34.0522 N / 118.2437 W</span>
            </div>

            {/* --- SOCIAL LINKS --- */}
            <div className="portfolio-ui absolute bottom-12 left-8 md:left-12 z-[60] flex flex-col space-y-5">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="social-icon opacity-0 text-gray-500 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">
                    {/* GitHub */}
                    <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon opacity-0 text-gray-500 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">
                    {/* LinkedIn */}
                    <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
            </div>

            {/* --- CANVAS --- */}
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full object-cover z-10 opacity-0"
            />

            {/* --- PORTFOLIO TEXT OVERLAY --- */}
            <AnimatePresence>
                {loaded && !showLoader && (
                    <div className="portfolio-ui absolute inset-0 z-[50] pointer-events-none flex items-center justify-between px-5 md:px-10 lg:px-12 xl:px-16 pt-24 pb-16 md:pt-0 md:pb-0 opacity-100">

                        {/* LEFT SIDE: Name and Role */}
                        <div className="w-full md:w-[30%] lg:w-[28%] flex flex-col items-start text-left pl-0 md:pl-3 lg:pl-6 pt-10 md:pt-16 lg:pt-20">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
                                className="mb-3 md:mb-4"
                            >
                                <h1 className="text-[2.2rem] sm:text-[2.8rem] md:text-[3.4rem] lg:text-[4.4rem] xl:text-[5rem] font-sans font-bold text-white tracking-[0.12em] uppercase leading-[0.82]" style={{ textShadow: "0 0 20px rgba(255,255,255,0.2)" }}>
                                    {titleText}
                                </h1>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.85, ease: "easeOut", delay: 0.2 }}
                                className="relative inline-block"
                            >
                                <h2 className="text-[10px] md:text-xs lg:text-sm font-mono text-gray-300 tracking-[0.2em] uppercase pb-2">
                                    SOFTWARE ENGINEER
                                </h2>
                                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/60"></div>
                            </motion.div>
                        </div>

                        {/* RIGHT SIDE: Description and Button */}
                        <div className="w-full md:w-[24%] lg:w-[26%] flex flex-col items-start text-left mt-20 md:mt-24 lg:mt-28 pr-0 md:pr-4 lg:pr-8">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
                                className="mb-8 max-w-[290px] lg:max-w-[320px]"
                            >
                                <p className="text-gray-400 text-[11px] sm:text-[12px] md:text-[12.5px] lg:text-[13px] font-light tracking-[0.12em] leading-relaxed">
                                    Crafting modern, scalable and high-performance web applications with precision engineering and seamless user experience.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.95, ease: "easeOut", delay: 0.3 }}
                                className="pointer-events-auto"
                            >
                                <a
                                    href="#portfolio-showcase"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        const target = document.getElementById('portfolio-showcase');
                                        if (target) {
                                            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }
                                    }}
                                    className="inline-flex items-center px-6 md:px-7 py-2.5 md:py-3 border border-gray-700 bg-black/50 hover:bg-black/80 hover:border-blue-500/50 transition-colors cursor-pointer rounded-sm backdrop-blur-md group"
                                >
                                    <span className="text-gray-300 font-mono tracking-widest uppercase text-[10px] md:text-xs group-hover:text-white transition-colors">Explore Work</span>
                                </a>
                            </motion.div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
