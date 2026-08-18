import React, { useState } from 'react';
import { FiAward, FiBookOpen, FiCode, FiDownload, FiX } from "react-icons/fi";
import {
    SiReact,
    SiTailwindcss,
    SiMongodb,
    SiFastapi,
    SiGit
} from "react-icons/si";

export default function About() {
    const [showResumePreview, setShowResumePreview] = useState(false);
    const resumeUrl = '/RESUME/Dattu Nayak Paltya Resume.pdf';

    const Aboutdata = [
        {
            icon: <FiCode size={20} />,
            title: "Languages",
            desc: "HTML, CSS, JS, React, FastAPI, MongoDB",
        },
        {
            icon: <FiBookOpen size={20} />,
            title: "Education",
            desc: "B.TECH Computer Science",
        },
        {
            icon: <FiAward size={20} />,
            title: "Projects",
            desc: "Built 5+ modern web projects",
        },
    ];

    const Tools = [
        { icon: <SiReact size={24} />, title: "React js" },
        { icon: <SiTailwindcss size={24} />, title: "Tailwind css" },
        { icon: <SiMongodb size={24} />, title: "MongoDB" },
        { icon: <SiFastapi size={24} />, title: "FastAPI" },
        { icon: <SiGit size={24} />, title: "Git" },
    ];

    return (
        <div id="about" className="relative w-full min-h-screen bg-[#020202] overflow-hidden flex items-center justify-center font-sans tracking-wide py-20 px-6 md:px-12">

            {/* --- BG EFFECTS --- */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
            <div className="absolute inset-0 z-[15] pointer-events-none" style={{ background: "radial-gradient(circle at 30% 50%, transparent 20%, rgba(0,0,0,0.9) 100%)" }}></div>

            {/* --- STATIC FRAME IMAGE (LEFT 45%) --- */}
            <div className="absolute inset-y-0 left-0 w-[45%] z-10 pointer-events-none overflow-hidden hidden lg:block" style={{ WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)', maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)' }}>
                <img
                    src="/Dattu/D9.png"
                    alt="About Profile"
                    className="w-full h-full object-cover opacity-50 grayscale"
                />
            </div>

            {/* --- CONTENT (RIGHT 55%) --- */}
            <div className="relative z-[50] w-full lg:w-[80%] flex flex-col md:flex-row items-center justify-end">

                {/* Visual Gap for the face mask area */}
                <div className="hidden lg:block w-[35%] h-full"></div>

                {/* Main Content Pane */}
                <div className="w-full lg:w-[65%] flex flex-col space-y-10 pointer-events-auto bg-black/40 backdrop-blur-sm p-8 md:p-12 border border-white/5 rounded-2xl">
                    {/* Header */}
                    <div className="space-y-2">
                        <p className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.5em]">SYSTEM INFO</p>
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase">
                            About Me<span className="text-blue-500">.</span>
                        </h2>
                    </div>

                    {/* Bio Paragraph */}
                    <div className="robotic-section">
                        <p className="text-gray-400 text-sm md:text-md lg:text-xl font-light leading-relaxed max-w-2xl">
                            I am a passionate <span className="text-white font-medium">Full Stack Web Developer</span> specializing in the
                            modern web ecosystem. My expertise lies in crafting high-performance,
                            scalable applications with precision and clean architecture.
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Aboutdata.map((item) => (
                            <div key={item.title} className="group p-6 bg-white/5 border border-white/10 hover:border-blue-500/40 transition-all duration-300 rounded-xl">
                                <div className="text-blue-500 mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                                    {item.icon}
                                </div>
                                <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-1">{item.title}</h4>
                                <p className="text-gray-500 text-[11px] leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Tech Dock */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-mono text-gray-500 tracking-[0.3em] uppercase">Core Tech Stack</h4>
                        <div className="flex flex-wrap gap-5">
                            {Tools.map((tool) => (
                                <div key={tool.title} className="group relative p-4 bg-black/50 border border-white/5 hover:border-blue-500/50 transition-all rounded-xl flex items-center justify-center cursor-help">
                                    <div className="text-gray-500 group-hover:text-blue-400 transition-colors">
                                        {tool.icon}
                                    </div>
                                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[9px] font-mono py-1.5 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-[70] whitespace-nowrap shadow-xl">
                                        {tool.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="pt-6">
                        <button
                            type="button"
                            onClick={() => setShowResumePreview(true)}
                            className="inline-flex items-center space-x-6 px-12 py-4 bg-blue-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all duration-300 rounded-full shadow-lg shadow-blue-900/20"
                        >
                            <span>View Resume</span>
                            <FiDownload size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {showResumePreview && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={() => setShowResumePreview(false)}
                >
                    <div
                        className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.4em] text-blue-400 font-mono">Resume Preview</p>
                                <h3 className="text-xl font-bold uppercase tracking-tight text-white mt-2">Dattu Nayak</h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowResumePreview(false)}
                                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                                aria-label="Close resume preview"
                            >
                                <FiX size={18} />
                            </button>
                        </div>

                        <div className="h-[70vh] bg-white/5">
                            <iframe
                                src={resumeUrl}
                                title="Dattu Nayak Resume Preview"
                                className="w-full h-full"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 px-5 py-4 bg-black/20">
                            <button
                                type="button"
                                onClick={() => setShowResumePreview(false)}
                                className="px-5 py-2.5 border border-white/15 text-white/80 hover:text-white hover:border-white/30 rounded-full text-[10px] uppercase tracking-[0.3em] transition-all"
                            >
                                Back
                            </button>

                            <a
                                href={resumeUrl}
                                download="Dattu Nayak Paltya Resume.pdf"
                                className="px-5 py-2.5 bg-blue-600 text-white rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-blue-700 transition-all"
                            >
                                Proceed to Download
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
