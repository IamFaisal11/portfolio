"use client";

import { motion } from "framer-motion";
import { 
  Code2, 
  Cpu, 
  Database, 
  Globe, 
  Layers, 
  Layout, 
  MessageSquare, 
  Sparkles, 
  Terminal,
  Zap
} from "lucide-react";

const skillCategories = [
  {
    title: "AI & Machine Learning",
    icon: <Sparkles className="w-6 h-6" />,
    skills: ["PyTorch", "TensorFlow", "LLMs", "RAG", "NLP", "OpenAI API"],
    color: "from-purple-500/20 to-blue-500/20"
  },
  {
    title: "Frontend Engineering",
    icon: <Layout className="w-6 h-6" />,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "Backend & Systems",
    icon: <Terminal className="w-6 h-6" />,
    skills: ["Node.js", "Python", "Go", "PostgreSQL", "Redis", "Docker"],
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    title: "Creative Tools",
    icon: <Zap className="w-6 h-6" />,
    skills: ["Figma", "Blender", "After Effects", "Motion Graphics", "UX Design"],
    color: "from-orange-500/20 to-red-500/20"
  }
];

export default function SkillsSection() {
  return (
    <section className="bg-[#0f0f0f] py-32 px-6 lg:px-12 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col mb-20">
          <h2 className="text-sm uppercase tracking-[0.3em] text-white/40 mb-4">Capabilities</h2>
          <h3 className="text-5xl md:text-7xl font-light tracking-tight text-white m-0">
            Tech <span className="font-serif italic text-white/60">Arsenal</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className={`p-8 rounded-2xl bg-white/[0.03] border border-white/10 relative group overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-500 border border-white/10">
                  {category.icon}
                </div>
                
                <h4 className="text-xl font-medium text-white mb-6 tracking-wide">
                  {category.title}
                </h4>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-white/60 group-hover:text-white/90 group-hover:border-white/20 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Marquee or Additional Info */}
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-wrap justify-between items-center gap-8">
            <div className="flex items-center gap-4 text-white/40">
                <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-white/10 border border-[#0f0f0f] flex items-center justify-center">
                            <Layers className="w-3 h-3" />
                        </div>
                    ))}
                </div>
                <p className="text-sm font-light">Continuously expanding my toolset</p>
            </div>
            
            <div className="flex gap-12">
                <div className="flex flex-col">
                    <span className="text-3xl font-light text-white leading-none">50+</span>
                    <span className="text-[10px] uppercase tracking-widest text-white/30 mt-2">Projects Completed</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-3xl font-light text-white leading-none">~4y</span>
                    <span className="text-[10px] uppercase tracking-widest text-white/30 mt-2">Engineering Experience</span>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
