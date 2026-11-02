"use client";

import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

// Oldest first; the timeline reads left to right.
const projects = [
  {
    title: "AMR Prediction",
    category: "Bioinformatics / ML",
    description: "Identifying antimicrobial resistance markers in DNA sequences using CNN and SVM classifiers.",
    tags: ["CNN", "SVM", "Python"],
    year: "2023",
    accent: "from-emerald-500/40 via-teal-500/10",
  },
  {
    title: "Twitter Clone",
    category: "Fullstack / Laravel",
    description: "Dynamic social platform features and optimized MySQL database schemas for user interactions.",
    tags: ["Laravel", "MySQL", "PHP"],
    year: "2023",
    accent: "from-sky-500/40 via-blue-500/10",
  },
  {
    title: "Seed Classification",
    category: "Deep Learning / CNN",
    description: "Automated maize species classification using CNN-based models and custom RGB image datasets.",
    tags: ["CNN", "TensorFlow", "Keras"],
    year: "2024",
    accent: "from-purple-500/40 via-fuchsia-500/10",
  },
  {
    title: "AI Traffic Adviser",
    category: "Computer Vision / Flask",
    description: "Real-time traffic management using YOLOv8 and Detectron2 for object detection and road damage analysis.",
    tags: ["YOLOv8", "Detectron2", "Flask"],
    year: "2024",
    accent: "from-orange-500/40 via-red-500/10",
  },
];

const last = projects.length - 1;
const years = [...new Set(projects.map((p) => p.year))].sort();

function ProjectCard({
  project,
  index,
  progress,
}: {
  project: (typeof projects)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  // 1 when this card is the focused one, falling to 0 a full step away
  const focus = useTransform(progress, (p) => Math.max(0, 1 - Math.abs(p * last - index)));
  const opacity = useTransform(focus, [0, 1], [0.4, 1]);
  const scale = useTransform(focus, [0, 1], [0.95, 1]);

  return (
    <motion.div style={{ opacity, scale }} className="w-[80vw] sm:w-[420px] lg:w-[500px] shrink-0">
      <CardContainer containerClassName="py-0" className="w-full">
        <CardBody className="h-auto w-full rounded-3xl border border-white/10 bg-gradient-to-b from-[#1a1a1a] to-[#111] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] transition-all duration-300 hover:border-white/25 hover:shadow-[0_30px_90px_-30px_rgba(168,85,247,0.35)]">
          {/* Visual panel: self-contained so it never depends on remote images */}
          <CardItem translateZ={50} className="w-full">
            <div className={`relative h-[24vh] min-h-[130px] max-h-[240px] rounded-t-3xl bg-gradient-to-br ${project.accent} to-transparent overflow-hidden`}>
              <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:32px_32px]" />
              <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[11px] tracking-[0.2em] text-white/80 backdrop-blur">
                {project.year}
              </span>
              <span className="absolute right-5 top-5 w-9 h-9 rounded-full flex items-center justify-center text-white/70 bg-black/40 border border-white/15 backdrop-blur">
                <ArrowUpRight className="w-4 h-4" />
              </span>
              <span className="absolute -bottom-6 right-4 text-[8rem] leading-none font-serif italic text-white/10 select-none">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="absolute left-5 bottom-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs text-white/80 bg-black/40 border border-white/15 backdrop-blur"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </CardItem>

          <div className="p-5">
            <CardItem translateZ={30} className="w-full">
              <span className="block mb-2 text-[11px] uppercase tracking-[0.2em] text-white/40">{project.category}</span>
            </CardItem>
            <CardItem translateZ={60} className="w-full">
              <h4 className="text-2xl font-medium text-white mb-2">{project.title}</h4>
            </CardItem>
            <CardItem as="p" translateZ={40} className="text-sm font-light leading-relaxed text-white/60">
              {project.description}
            </CardItem>
            <CardItem translateZ={20} className="mt-4 flex w-full items-center justify-between border-t border-white/10 pt-4">
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/40">Case study</span>
              <span className="flex items-center gap-1 text-xs text-white/70">
                Explore <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
}

// Compact timeline pinned under the cards: glowing year nodes on a short rail that fills as you scroll
function CompactTimeline({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="mx-auto w-full max-w-5xl px-6">
      <div className="relative h-24">
        <div className="absolute left-0 right-0 top-5 h-[2px] rounded-full bg-neutral-800" />
        <motion.div
          style={{ scaleX: progress }}
          className="absolute left-0 right-0 top-5 h-[2px] origin-left rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
        />
        <motion.div
          style={{ scaleX: progress }}
          className="absolute left-0 right-0 top-5 h-[2px] origin-left rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-[6px]"
        />
        {years.map((year) => (
          <YearNode key={year} year={year} progress={progress} />
        ))}
      </div>
    </div>
  );
}

// Node sits where its first project starts along the rail; the year fades in once reached
function YearNode({ year, progress }: { year: string; progress: MotionValue<number> }) {
  const firstIndex = projects.findIndex((p) => p.year === year);
  const count = projects.filter((p) => p.year === year).length;
  const reached = useTransform(progress, (p) => Math.min(1, Math.max(0, (p * last - firstIndex + 0.5) / 0.5)));
  return (
    <div className="absolute top-0" style={{ left: `${(firstIndex / last) * 100}%` }}>
      <div className="relative -translate-x-1/2">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#0f0f0f] ring-1 ring-white/10">
          <motion.span style={{ opacity: reached }} className="absolute inset-0 animate-ping rounded-full bg-purple-500/25" />
          <div className="relative h-4 w-4 rounded-full bg-gradient-to-br from-orange-400 via-purple-500 to-blue-500 shadow-[0_0_18px_rgba(168,85,247,0.8)]" />
        </div>
        <motion.div style={{ opacity: reached }} className="mt-3 text-center">
          <h3 className="bg-gradient-to-b from-white to-white/25 bg-clip-text text-2xl font-semibold leading-none tracking-tight text-transparent">
            {year}
          </h3>
          <span className="mt-1.5 block whitespace-nowrap text-[10px] uppercase tracking-[0.25em] text-white/35">
            {count} {count === 1 ? "project" : "projects"}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

export default function ProjectsGrid() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Vertical page scroll (down or up) drives the sideways movement
  const { scrollYProgress: rawProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  // Spring-smoothed so the cards, line and fades glide instead of following every wheel tick
  const scrollYProgress = useSpring(rawProgress, { stiffness: 90, damping: 28, mass: 0.6, restDelta: 0.0005 });
  const x = useTransform(scrollYProgress, (p) => {
    const track = trackRef.current;
    if (!track || !track.parentElement) return 0;
    return -p * Math.max(0, track.scrollWidth - track.parentElement.clientWidth);
  });
  useMotionValueEvent(scrollYProgress, "change", (p) => setActive(Math.round(p * last)));

  return (
    <section className="bg-[#0f0f0f] relative z-20 w-full">
      <div ref={wrapRef} className="relative h-[350vh]">
        <div className="sticky top-0 h-screen overflow-hidden isolate flex flex-col justify-center gap-6 md:gap-8">
          {/* Ambient colour behind the timeline */}
          <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-[420px] w-[420px] rounded-full bg-purple-600/15 blur-[140px]" />
          <div className="pointer-events-none absolute -right-40 bottom-10 -z-10 h-[420px] w-[420px] rounded-full bg-orange-500/10 blur-[140px]" />

          <div className="max-w-7xl w-full mx-auto px-6 lg:px-12 flex justify-between items-end">
            <div>
              <span className="block mb-3 text-xs uppercase tracking-[0.3em] text-white/40">Selected Work</span>
              <h2 className="text-4xl md:text-6xl font-light tracking-tight text-white m-0">
                Recent <span className="font-serif italic text-[#c4c4c4]">Projects</span>
              </h2>
            </div>
            <div className="flex flex-col items-end gap-3 font-mono text-sm text-white/40 tabular-nums">
              <span>
                <span className="text-white text-3xl">{String(active + 1).padStart(2, "0")}</span> /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>
              <span className="block h-px w-24 bg-white/10 overflow-hidden">
                <motion.span style={{ scaleX: scrollYProgress }} className="block h-full origin-left bg-white/70" />
              </span>
            </div>
          </div>

          <div className="[mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="relative flex w-max items-start will-change-transform px-6 pb-2 pr-[20vw] lg:px-12 xl:pl-[max(3rem,calc((100vw-1280px)/2+3rem))]"
            >
              <div className="flex items-start gap-6">
                {projects.map((project, index) => (
                  <ProjectCard key={project.title} project={project} index={index} progress={scrollYProgress} />
                ))}
              </div>
            </motion.div>
          </div>

          <CompactTimeline progress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}
