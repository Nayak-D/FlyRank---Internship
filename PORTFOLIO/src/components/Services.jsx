import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiLayout,
  FiServer,
  FiCloud,
  FiZap,
  FiBriefcase,
  FiArrowRight,
  FiX,
  FiSearch
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const blinkingStyle = `
  @keyframes blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0.4; }
  }
  .blink-animation {
    animation: blink 1s infinite;
  }
  @keyframes flip {
    from {
      transform: rotateY(0deg) scaleX(1);
    }
    to {
      transform: rotateY(180deg) scaleX(-1);
    }
  }
  @keyframes flipBack {
    from {
      transform: rotateY(180deg) scaleX(-1);
    }
    to {
      transform: rotateY(0deg) scaleX(1);
    }
  }
  @keyframes skyDrop {
    from {
      opacity: 0;
      transform: translateY(-100px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes cardFan {
    from {
      opacity: 0;
      transform: translateY(20px) rotateZ(0deg);
    }
    to {
      opacity: 1;
      transform: translateY(0) rotateZ(var(--rotation, 0deg));
    }
  }
  .flip-container {
    perspective: 1000px;
    transform-style: preserve-3d;
  }
  .flipped {
    animation: flip 0.6s ease-in-out forwards;
  }
  .unflipped {
    animation: flipBack 0.6s ease-in-out forwards;
  }
  .skydrop {
    animation: skyDrop 0.8s ease-out;
  }
  .card-fan {
    animation: cardFan 0.8s ease-out;
  }
  .research-card {
    transition: transform 0.3s ease, filter 0.3s ease;
  }
  .research-card:hover {
    transform: translateY(-10px) scale(1.05) rotateZ(5deg);
    filter: drop-shadow(0 10px 30px rgba(59, 130, 246, 0.4));
  }
`;

if (!document.getElementById('blink-style')) {
  const style = document.createElement('style');
  style.id = 'blink-style';
  style.textContent = blinkingStyle;
  document.head.appendChild(style);
}

export default function Services() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [researchViewed, setResearchViewed] = useState(false);
  const [showResearch, setShowResearch] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const sidebarRef = useRef(null);

  const certifications = {
    'Zetetha Algorithms': { image: '/CERTIFICATIONS/ZETETHA.png', alt: 'Zetetha Algorithms Certification' },
    'TheSmartBridge': { image: '/CERTIFICATIONS/APSCHE.png', alt: 'TheSmartBridge Certification' },
  };

  const experienceEntries = [
    { title: 'ML Intern', subtitle: 'FlyRank AI', period: '2026 — July - September', details: 'Built AI-assisted product workflows and explored modern recommendation and automation patterns.' },
    { title: 'Cloud Engineer Intern', subtitle: 'Zetetha Algorithms', period: '2026 — July - Aug', details: 'Worked on deployment pipelines, cloud infrastructure, and backend integrations for production-ready systems.' },
    { title: 'AI/ML Intern', subtitle: 'TheSmartBridge', period: '2026 — May - July', details: 'Developed AI-driven features and learned applied machine learning workflows with real-world use cases.' },
  ];

  const mainServices = [
    {
      icon: <FiLayout size={24} />,
      title: 'Full-Stack Product Development',
      p: 'Building responsive web applications, dashboards, and business workflows for startups and digital-first brands.',
      details: 'From product strategy to implementation, I design clean interfaces and scalable application architecture using React, Tailwind, and modern JavaScript tooling.',
    },
    {
      icon: <FiServer size={24} />,
      title: 'AI & Automation Solutions',
      p: 'Turning repetitive tasks and ideas into automated, intelligent systems powered by APIs, ML, and workflow logic.',
      details: 'I build automation layers and AI-assisted experiences that help teams move faster, reduce manual effort, and improve user decision-making.',
    },
    {
      icon: <FiCloud size={24} />,
      title: 'Cloud & Deployment Engineering',
      p: 'Deploying production-grade services with reliable hosting, environment setup, CI/CD, and operational stability.',
      details: 'My cloud work focuses on making apps launch-ready, secure, and maintainable across live environments with smooth release workflows.',
    },
    {
      icon: <FiZap size={24} />,
      title: 'UX Optimization & Performance',
      p: 'Improving user experience, engagement, and speed through thoughtful interface design and efficient implementation.',
      details: 'I pair practical UX decisions with performance-oriented development so the product feels polished and behaves reliably under load.',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // 1. Header Animation
      tl.fromTo(headerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "none", stagger: 0.1 }
      );

      // 2. Main Services Grid Stagger
      tl.fromTo(".service-card",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.3, ease: "none", stagger: 0.1 },
        "-=0.2"
      );

      // 3. Experience Sidebar Slide
      tl.fromTo(sidebarRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5, ease: "none" },
        "-=0.3"
      );

      // UI corner lines animation for sidebar
      tl.fromTo(".corner-line",
        { scale: 0 },
        { scale: 1, duration: 0.3, ease: "none", stagger: 0.05 },
        "-=0.2"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);



  return (
    <section
      id="services"
      ref={containerRef}
      className="relative py-24 px-6 md:px-12 lg:px-24 bg-[#000] text-white overflow-hidden scroll-mt-24"
    >
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      {/* Noise Texture */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto text-center mb-24 relative z-10">
        <div className="inline-block px-3 py-1 border border-blue-500/30 bg-blue-500/5 rounded-sm mb-4">
          <p className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.5em]">SERVICES MODULE</p>
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">
          My Services<span className="text-blue-500">.</span>
        </h2>
        <div className="w-24 h-[1px] bg-blue-500/40 mx-auto mb-8"></div>
        <p className="max-w-3xl mx-auto text-gray-500 font-light text-base leading-relaxed">
          Leveraging my experience from production-level applications and real-time startup incubation projects to build scalable digital solutions.
        </p>
      </div>

      <div className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10 flip-container ${showResearch ? 'flipped' : 'unflipped'}`}>

        {/* FRONT: Main Services Grid */}
        {!showResearch && (
          <>
            {/* Main Services Grid */}
            <div ref={gridRef} className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {mainServices.map((service) => (
                <div
                  key={service.title}
                  className="service-card group p-10 bg-[#0a0a0a] border border-white/[0.05] hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.05)] transition-all duration-300 rounded-sm cursor-default flex flex-col items-start"
                >
                  <div className="mb-8 p-4 bg-white/5 border border-white/10 rounded-sm text-gray-300 group-hover:text-blue-400 group-hover:border-blue-500/20 transition-all">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight uppercase">{service.title}</h3>
                  <p className="text-gray-500 font-light text-sm leading-relaxed mb-10">
                    {service.p}
                  </p>
                  <button
                    onClick={() => setSelectedService(service)}
                    className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.3em] text-gray-400 hover:text-white group/btn transition-colors"
                  >
                    <span>View Details</span>
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>

            {/* Featured Experience Card (Sidebar) */}
            <div ref={sidebarRef} className="lg:col-span-4 h-full relative flip-container">
              <div className={`sticky top-32 p-10 bg-[#0c0c0c] border border-white/[0.08] rounded-sm group overflow-hidden ${showResearch ? 'flipped' : 'unflipped'}`}>

                {/* HUD Corner Lines */}
                <div className="corner-line absolute top-2 left-2 w-4 h-4 border-t border-l border-blue-500/50"></div>
                <div className="corner-line absolute top-2 right-2 w-4 h-4 border-t border-r border-blue-500/50"></div>
                <div className="corner-line absolute bottom-2 left-2 w-4 h-4 border-b border-l border-blue-500/50"></div>
                <div className="corner-line absolute bottom-2 right-2 w-4 h-4 border-b border-r border-blue-500/50"></div>

                <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/5 blur-[80px] group-hover:bg-blue-500/10 transition-all duration-1000" />

                {/* Experience Front Side */}
                {!showResearch && (
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between gap-4 mb-8">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-sm text-blue-400">
                          <FiBriefcase size={22} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold tracking-widest uppercase">Experience</h3>
                          <span className="text-[8px] font-mono text-gray-600 block tracking-[0.4em] mt-1">BRIEF PROFILE</span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setResearchViewed(true);
                          setShowResearch(!showResearch);
                        }}
                        className={`p-2 bg-blue-500/10 border border-blue-500/30 rounded-sm text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all ${!researchViewed ? 'blink-animation' : ''}`}
                        aria-label="Research experience"
                        title="View research"
                      >
                        <FiSearch size={16} />
                      </button>
                    </div>

                    <div className="space-y-4 mb-5">
                      {experienceEntries.map((item) => (
                        <div key={item.title} className="border border-white/10 bg-white/[0.02] rounded-sm p-3">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-[10px] uppercase tracking-[0.25em] text-blue-400 font-mono mb-2">{item.period}</p>
                              <h4 className="text-sm font-semibold text-white uppercase tracking-tight">{item.title}</h4>
                              <p className="text-xs text-gray-400 mt-1">{item.subtitle}</p>
                              <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">{item.details}</p>
                            </div>
                            {certifications[item.subtitle] && (
                              <button
                                onClick={() => setSelectedCert(item.subtitle)}
                                className="inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.25em] text-gray-300 hover:text-blue-400 transition-colors font-mono border border-white/10 hover:border-blue-400/30 px-2 py-1 rounded-sm whitespace-nowrap"
                                aria-label={`View ${item.subtitle} certification`}
                              >
                                View
                              </button>
                            )}
                            {!certifications[item.subtitle] && (
                              <span className="text-[9px] uppercase tracking-[0.25em] text-gray-600 font-mono border border-white/10 px-2 py-1 rounded-sm whitespace-nowrap opacity-50">
                                Coming Soon
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="relative overflow-hidden rounded-sm group/img h-40 mt-auto border border-white/10">
                      <div className="absolute inset-0 bg-blue-500/5 z-10 mix-blend-overlay"></div>
                      <img
                        className="w-full h-full object-cover opacity-65 grayscale group-hover/img:grayscale-0 group-hover/img:opacity-100 transition-all duration-700 scale-100 group-hover/img:scale-105"
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
                        alt="Certification showcase"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                      <div className="absolute bottom-3 left-3 font-mono text-[8px] text-gray-300 tracking-[0.3em] uppercase">Certification Showcase</div>
                    </div>
                  </div>
                )}

                {/* Research Back Side */}
                {showResearch && (
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between gap-4 mb-8">
                      <div>
                        <h3 className="text-lg font-bold tracking-widest uppercase">Research</h3>
                        <span className="text-[8px] font-mono text-gray-600 block tracking-[0.4em] mt-1">PORTFOLIO & PROJECTS</span>
                      </div>
                      <button
                        onClick={() => setShowResearch(false)}
                        className="p-2 bg-blue-500/10 border border-blue-500/30 rounded-sm text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all"
                        aria-label="Back to experience"
                      >
                        <FiArrowRight size={16} className="transform rotate-180" />
                      </button>
                    </div>

                    <div className="space-y-4 flex-1 overflow-y-auto">
                      {/* PDF */}
                      <a
                        href="/RESEARCH/SkyDrop.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="skydrop block p-4 bg-blue-500/10 border border-blue-500/30 hover:border-blue-500/60 rounded-sm group/pdf transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-red-500/20 border border-red-500/40 rounded-sm flex items-center justify-center">
                            <span className="text-red-400 font-bold text-sm">PDF</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white uppercase tracking-tight">SkyDrop.pdf</p>
                            <p className="text-xs text-gray-400 mt-1">Research & Analysis</p>
                          </div>
                        </div>
                      </a>

                      {/* Images */}
                      {[
                        { name: '11.jpg', label: 'Research 01' },
                        { name: '22.jpg', label: 'Research 02' },
                        { name: '33.jpg', label: 'Research 03' },
                      ].map((img, idx) => (
                        <a
                          key={img.name}
                          href={`/RESEARCH/${img.name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="skydrop block relative overflow-hidden rounded-sm border border-white/10 hover:border-blue-500/60 group/img transition-all"
                          style={{ animation: `skyDrop 0.8s ease-out ${0.2 + idx * 0.15}s both` }}
                        >
                          <img
                            src={`/RESEARCH/${img.name}`}
                            alt={img.label}
                            className="w-full h-32 object-cover opacity-65 grayscale group-hover/img:grayscale-0 group-hover/img:opacity-100 transition-all"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                            <p className="text-xs font-mono text-gray-300 uppercase tracking-tight">{img.label}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Micro HUD Footer */}
              <div className="mt-6 flex justify-between items-center font-mono text-[9px] text-gray-700 tracking-[0.2em] px-2 opacity-50">
                <span>&gt; SYSTEM DATA LOADED</span>
                <span>0x034FB</span>
              </div>
            </div>
          </>
        )}

        {/* BACK: Research Showcase */}
        {showResearch && (
          <>
            {/* Research Images - Playing Cards (Left) */}
            <div className="lg:col-span-6 flex items-center justify-center min-h-96 relative py-8">
              <div className="relative w-full h-80 flex items-center justify-center">
                {[
                  { name: '33.jpg', label: 'Research 03', position: 'bottom' },
                  { name: '22.jpg', label: 'Research 02', position: 'middle' },
                  { name: '11.jpg', label: 'Research 01', position: 'top' },
                ].map((img, idx) => {
                  const baseRotation = (idx - 1) * -20;
                  const baseOffsetX = (idx - 1) * 40;

                  let transform = `rotateZ(${baseRotation}deg) translateX(${baseOffsetX}px)`;
                  let zIndex = idx;

                  if (hoveredCardIndex !== null && hoveredCardIndex !== idx) {
                    // Calculate clockwise sliding effect for non-hovered cards
                    const angle = (idx - hoveredCardIndex) * 120; // 120 degrees for 3 cards
                    const distance = 80; // Distance cards slide
                    const moveX = Math.cos((angle * Math.PI) / 180) * distance;
                    const moveY = Math.sin((angle * Math.PI) / 180) * distance;
                    const rotationAdjust = (idx - hoveredCardIndex) * -25;

                    transform = `rotateZ(${baseRotation + rotationAdjust}deg) translateX(${baseOffsetX + moveX}px) translateY(${moveY}px)`;
                    zIndex = 1;
                  }

                  return (
                    <button
                      key={img.name}
                      onClick={() => setSelectedImage(img)}
                      className="research-card card-fan absolute w-80 h-56 rounded-lg overflow-hidden border-2 border-blue-500/60 bg-[#0a0a0a] cursor-pointer transition-all duration-300"
                      style={{
                        transform: hoveredCardIndex === idx ? `rotateZ(${baseRotation}deg) translateX(${baseOffsetX}px) scale(1.15)` : transform,
                        zIndex: hoveredCardIndex === idx ? 100 : zIndex,
                        filter: hoveredCardIndex === idx ? 'drop-shadow(0 20px 50px rgba(59, 130, 246, 0.8))' : 'drop-shadow(0 0px 0px rgba(0, 0, 0, 0))',
                      }}
                      onMouseEnter={() => setHoveredCardIndex(idx)}
                      onMouseLeave={() => setHoveredCardIndex(null)}
                    >
                      <img
                        src={`/RESEARCH/${img.name}`}
                        alt={img.label}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-white font-mono text-sm tracking-widest uppercase font-bold">{img.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Image Viewer Modal */}
              {selectedImage && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                  onClick={() => setSelectedImage(null)}
                >
                  <div
                    className="relative max-w-4xl w-full bg-[#0a0a0a] border border-white/20 rounded-sm overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-4 right-4 z-10 p-2 bg-white/5 hover:bg-white/10 rounded-sm text-white transition-colors"
                      aria-label="Close modal"
                    >
                      <FiX size={24} />
                    </button>

                    <img
                      src={`/RESEARCH/${selectedImage.name}`}
                      alt={selectedImage.label}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Research PDF Preview (Right) */}
            <div className="lg:col-span-6 flex flex-col h-96 relative">
              <div className="flex-1 bg-[#0c0c0c] border border-white/[0.08] rounded-sm p-6 overflow-hidden flex flex-col">
                <h3 className="text-lg font-bold tracking-widest uppercase mb-4 text-white">Research Document</h3>

                <div className="flex-1 bg-white/5 border border-white/10 rounded-sm overflow-hidden relative">
                  <iframe
                    src="/RESEARCH/SkyDrop.pdf#toolbar=0&navpanes=0&scrollbar=0"
                    className="w-full h-full"
                    title="SkyDrop PDF Preview"
                  />
                </div>

                <a
                  href="/RESEARCH/SkyDrop.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 px-4 py-2 bg-blue-500/20 border border-blue-500/40 hover:border-blue-500/60 rounded-sm text-blue-300 hover:text-blue-200 transition-colors text-center text-sm font-mono uppercase tracking-widest"
                >
                  Download Full PDF
                </a>
              </div>

              {/* Back Button */}
              <button
                onClick={() => setShowResearch(false)}
                className="mt-4 w-full py-3 bg-blue-500/10 border border-blue-500/30 hover:border-blue-500/60 rounded-sm text-blue-300 hover:text-blue-200 transition-colors font-mono uppercase tracking-widest text-sm"
              >
                Back to Services
              </button>
            </div>
          </>
        )}

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="relative max-w-xl w-full bg-[#0a0a0a] border border-blue-500/30 rounded-sm overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/5 hover:bg-white/10 rounded-sm text-white transition-colors"
              aria-label="Close service details"
            >
              <FiX size={20} />
            </button>

            <div className="p-6">
              <div className="mb-5 flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-sm text-blue-400">
                  {selectedService.icon}
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-blue-400 font-mono">Service</p>
                  <h3 className="text-2xl font-bold uppercase tracking-tight text-white mt-2">{selectedService.title}</h3>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">
                {selectedService.details}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Certification Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#0a0a0a] border border-white/20 rounded-sm overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/5 hover:bg-white/10 rounded-sm text-white transition-colors"
              aria-label="Close modal"
            >
              <FiX size={20} />
            </button>

            <div className="p-6">
              <h3 className="text-2xl font-bold uppercase tracking-widest mb-6 text-white">{selectedCert}</h3>

              {certifications[selectedCert] && (
                <img
                  src={certifications[selectedCert].image}
                  alt={certifications[selectedCert].alt}
                  className="w-full rounded-sm object-cover"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Grid Lines Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/[0.03] z-10"></div>
      <div className="absolute top-0 right-1/2 w-[1px] h-full bg-white/[0.03] z-10"></div>
    </section>
  );
}
