import React from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";

const projectData = [
  {
    image: "/WORKS/TASK%20MANAGER.mp4",
    title: "Task Manager",
    tags: ["Productivity", "Workflow", "UI"],
    link: "https://task-manager-beta-nine-90.vercel.app/login",
    github: "https://github.com/Nayak-D/Task-Manager",
  },
  {
    image: "/WORKS/NOVAPAY.mp4",
    title: "NovaPay",
    tags: ["Fintech", "UX", "Payments"],
    link: "https://novapay-blue.vercel.app/",
    github: "https://github.com/Nayak-D/DevOps-CloudEngineer--ZeTheta-",
  },
  {
    image: "/WORKS/AI AGENT.mp4",
    title: "VISION AI AGENT",
    tags: ["Automation", "AI", "Workflow"],
    link: "https://visual-ai-agent-server.onrender.com/",
    github: "https://github.com/Nayak-D/Visual_AI_Agent-Chrome_Extension",
  },
  {
    image: "/WORKS/HEARTBEAT.mp4",
    title: "Heartbeat",
    tags: ["Health", "UX", "Motion"],
    link: "https://heartbeat-beta-ruddy.vercel.app/",
    github: "https://github.com/Nayak-D/HeartBeat---FeelLove",
  },
  {
    image: "/WORKS/hms.png",
    title: "HOSPITAL MANAGEMENT SYSTEM",
    tags: ["SaaS", "Data Records", "Healthcare"],
    link: "#",
    github: "https://github.com/Nayak-D/HOSPITAL-MANAGEMENT-SYSTEM",
  },
  {
    image: "/WORKS/BEACH.mp4",
    title: "PLASTICYCLE",
    tags: ["Bio", "Green Life", "Plastic Recycling"],
    link: "https://plasticycle-web.vercel.app/",
    github: "https://github.com/Nayak-D/plasticycle-web",
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio-showcase" className="relative bg-[#020202] py-24 px-6 md:px-12 lg:px-24 pb-32 mb-8 scroll-mt-24">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-blue-500 font-mono tracking-[0.4em] uppercase text-[10px] mb-4"
        >
          Project Showcase
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-white mb-8 uppercase tracking-tighter"
        >
          Selected Works<span className="text-blue-500">.</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-6">
        {projectData.map((project, index) => {
          const isVideo = project.image.toLowerCase().endsWith(".mp4");

          return (
            <motion.div
              key={`${project.title}-${index}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-[2rem] bg-white/5 border border-white/10"
            >
              <div className="relative overflow-hidden aspect-[4/3] rounded-[1.5rem] m-2">
                {isVideo ? (
                  <video
                    src={project.image}
                    muted
                    loop
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-black text-white mb-4 tracking-tight uppercase">{project.title}</h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[9px] uppercase tracking-widest font-mono px-3 py-1 bg-white/10 text-blue-300 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="Github Repository" className="p-3 bg-white/5 text-white rounded-xl hover:bg-blue-600 transition-all border border-white/10">
                    <FiGithub size={20} />
                  </a>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label="Live Demo" className="p-3 bg-white/5 text-white rounded-xl hover:bg-blue-600 transition-all border border-white/10">
                    <FiExternalLink size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Portfolio;
