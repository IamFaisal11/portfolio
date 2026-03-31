import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function ProjectsGrid() {
  const projects = [
    {
      title: "Neon Genesis",
      category: "Web App / E-Commerce",
      description: "A dark-mode specialized marketplace with real-time bidding.",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
      year: "2024",
    },
    {
      title: "Flow State",
      category: "SaaS Dashboard",
      description: "Complex data visualization interface for remote teams.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      year: "2023",
    },
    {
      title: "Aura",
      category: "Mobile Application",
      description: "Mindfulness and meditation app featuring generative soundscapes.",
      image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=2070&auto=format&fit=crop",
      year: "2023",
    },
    {
      title: "The Vertex",
      category: "Marketing Site",
      description: "High-performance WebGL landing page for an architecture firm.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
      year: "2022",
    },
  ];

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
          {projects.map((project, index) => (
            <div 
               key={index} 
               className="group relative flex flex-col gap-6 cursor-pointer"
            >
              <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-[#1a1a1a] border border-white/5">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                />
                 {/* Glassmorphism Hover Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                 
                 <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:translate-y-4 group-hover:translate-y-0">
                    <span className="text-xs font-mono text-white/80">{project.year}</span>
                 </div>
              </div>

              <div className="flex justify-between items-start">
                  <div>
                      <h4 className="text-2xl font-medium text-white mb-2">{project.title}</h4>
                      <p className="text-[#a3a3a3] text-sm max-w-sm font-light">
                          {project.description}
                      </p>
                  </div>
                  <div className="text-right">
                      <span className="text-xs uppercase tracking-widest text-[#666666]">
                          {project.category}
                      </span>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
