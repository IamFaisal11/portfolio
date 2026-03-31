"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CometCard } from "./ui/CometCard";

export default function ProjectsGrid() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects = [
    {
      title: "AI Traffic Adviser",
      category: "Computer Vision / Flask",
      description: "Real-time traffic management using YOLOv8 and Detectron2 for object detection and road damage analysis.",
      image: "https://images.unsplash.com/photo-1545147986-a9d6f210df77?q=80&w=2070&auto=format&fit=crop",
      year: "2024",
    },
    {
      title: "Seed Classification",
      category: "Deep Learning / CNN",
      description: "Automated maize species classification using CNN-based models and custom RGB image datasets.",
      image: "https://images.unsplash.com/photo-1530513173752-16d47519b5d3?q=80&w=2070&auto=format&fit=crop",
      year: "2024",
    },
    {
      title: "AMR Prediction",
      category: "Bioinformatics / ML",
      description: "Identifying antimicrobial resistance markers in DNA sequences using CNN and SVM classifiers.",
      image: "https://images.unsplash.com/photo-1532187863486-abf8581ad7d7?q=80&w=2070&auto=format&fit=crop",
      year: "2023",
    },
    {
      title: "Twitter Clone",
      category: "Fullstack / Laravel",
      description: "Dynamic social platform features and optimized MySQL database schemas for user interactions.",
      image: "https://images.unsplash.com/photo-1611606063065-ee79462e7377?q=80&w=2070&auto=format&fit=crop",
      year: "2023",
    },
  ];

  if (!mounted) return null;

  return (
    <section className="bg-[#0f0f0f] py-32 px-6 lg:px-12 relative z-20 w-full min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/10 pb-8">
          <div>
             <h2 className="text-sm uppercase tracking-widest text-[#a3a3a3] mb-4">Selected Work</h2>
             <h3 className="text-5xl md:text-7xl font-light tracking-tight text-white m-0">
               Recent <span className="font-serif italic text-[#c4c4c4]">Projects</span>
             </h3>
          </div>
          <button className="hidden md:flex items-center gap-2 text-sm uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-300 group">
             View All 
             <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>

        <div className="relative w-full">
          <div 
             className="flex overflow-x-auto gap-8 pb-12 pt-4 px-2 no-scrollbar snap-x snap-mandatory"
             style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none'
             }}
          >
            {projects.map((project, index) => (
              <div key={index} className="min-w-[85vw] md:min-w-[45vw] lg:min-w-[35vw] snap-center first:pl-2">
                <CometCard rotateDepth={12} translateDepth={15} className="w-full h-full">
                  <div className="group relative flex flex-col gap-8 cursor-pointer w-full">
                    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#1a1a1a] border border-white/5 shadow-2xl">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                      />
                       <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                       
                       <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                          <span className="text-xs font-mono text-white/90">{project.year}</span>
                       </div>
                    </div>

                    <div className="flex justify-between items-start px-2">
                        <div>
                            <h4 className="text-3xl font-medium text-white mb-3">{project.title}</h4>
                            <p className="text-[#a3a3a3] text-lg max-w-sm font-light leading-relaxed">
                                {project.description}
                            </p>
                        </div>
                        <div className="text-right">
                            <span className="text-xs uppercase tracking-[0.2em] text-[#666666] font-medium">
                                {project.category}
                            </span>
                        </div>
                    </div>
                  </div>
                </CometCard>
              </div>
            ))}
            <div className="min-w-[5vw] h-full pointer-events-none" />
          </div>
          
          <div className="mt-8 flex items-center gap-4 text-white/20 px-2 animate-pulse">
             <div className="w-12 h-[1px] bg-white/20" />
             <span className="text-[10px] uppercase tracking-[0.4em]">Scroll to Explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
