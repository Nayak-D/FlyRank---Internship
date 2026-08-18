import React, { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio-showcase' },
  { name: 'Contact', href: '#contactme' }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHireMeClick = () => {
    setIsMobileMenuOpen(false);
    const target = document.getElementById('contactme');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[200] transition-all duration-500 ease-in-out border-b ${isScrolled
          ? 'py-3 bg-black/80 backdrop-blur-lg border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
          : 'py-6 bg-transparent border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-12">
          <div className="flex items-center space-x-4 group cursor-pointer" onClick={() => (window.location.href = '#')}>
            <img
              src="/favicon.svg"
              alt="NAYAK logo"
              className="h-8 w-8 rounded-md object-contain shadow-[0_0_20px_rgba(103,80,255,0.5)]"
            />
            <div className="flex flex-col">
              <span className="text-white text-xl font-black tracking-[0.2em] uppercase leading-none">
                NAYAK<span className="text-blue-500 animate-pulse ml-0.5">.</span>
              </span>
              <span className="text-[8px] font-mono text-blue-400 mt-1 opacity-60 tracking-[0.3em] uppercase">SYSTEM ONLINE</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            <ul className="flex space-x-8 items-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault();
                      setActiveLink(link.name);

                      if (link.name === 'Home') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        return;
                      }

                      const target = document.querySelector(link.href);
                      if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className={`relative text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 pb-1 group ${activeLink === link.name ? 'text-white' : 'text-white/40 hover:text-white'
                      }`}
                  >
                    {link.name}
                    <span
                      className={`absolute left-0 bottom-0 h-[1px] bg-blue-500 transition-all duration-300 origin-left ${activeLink === link.name ? 'w-full scale-x-100 opacity-100' : 'w-full scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                        }`}
                    ></span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center space-x-6 border-l border-white/10 pl-10 h-6">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`transition-all duration-300 group ${isDarkMode
                  ? 'text-white/40 hover:text-white hover:scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]'
                  : 'text-cyan-700 hover:text-cyan-900 hover:scale-110 drop-shadow-[0_0_14px_rgba(34,211,238,0.7)]'
                  }`}
              >
                {isDarkMode ? <FiSun size={14} className="group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" /> : <FiMoon size={14} />}
              </button>

              <button
                onClick={handleHireMeClick}
                className={`px-5 py-1.5 border font-mono text-[9px] uppercase tracking-[0.3em] transition-all duration-500 rounded-sm ${isDarkMode
                  ? 'border-white/20 text-white hover:bg-white hover:text-black shadow-none'
                  : 'border-cyan-400/80 text-cyan-900 bg-cyan-200/95 shadow-[0_0_18px_rgba(34,211,238,0.9),0_0_32px_rgba(14,165,233,0.6)] hover:bg-cyan-100 hover:text-cyan-950'
                  }`}
              >
                Hire Me
              </button>
            </div>
          </div>

          <button
            className="md:hidden text-white/60 hover:text-white transition-colors z-[110]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black z-[90] flex flex-col items-center justify-center transition-all duration-500 ease-in-out md:hidden ${isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-full'
          }`}
      >
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <ul className="relative z-10 flex flex-col space-y-10 text-center">
          {navLinks.map((link, index) => (
            <li
              key={link.name}
              className={`transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <a
                href={link.href}
                onClick={(event) => {
                  event.preventDefault();
                  setActiveLink(link.name);
                  setIsMobileMenuOpen(false);

                  if (link.name === 'Home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                  }

                  const target = document.querySelector(link.href);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`text-sm tracking-[0.4em] uppercase font-mono transition-all duration-300 ${activeLink === link.name ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'text-white/40 hover:text-white'
                  }`}
              >
                {link.name}
              </a>
            </li>
          ))}
          <li className={`pt-6 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${navLinks.length * 100}ms` }}>
            <button
              onClick={handleHireMeClick}
              className="px-12 py-3 border border-white/20 text-white font-mono text-[10px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all rounded-sm"
            >
              Hire Me
            </button>
          </li>
        </ul>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-[8px] text-gray-700 tracking-[0.5em] uppercase">Navigation_Module_Active</div>
      </div>

    </>
  );
}
