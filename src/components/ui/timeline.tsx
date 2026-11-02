"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({
  data,
  title = "Changelog from my journey",
  description = "I've been working on Aceternity for the past 2 years. Here's a timeline of my journey.",
}: {
  data: TimelineEntry[];
  title?: React.ReactNode;
  description?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="relative w-full overflow-hidden bg-[#0f0f0f] font-sans md:px-10"
      ref={containerRef}
    >
      {/* Ambient colour behind the timeline */}
      <div className="pointer-events-none absolute -left-40 top-40 h-[420px] w-[420px] rounded-full bg-purple-600/15 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 top-[60%] h-[420px] w-[420px] rounded-full bg-orange-500/10 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto pt-28 pb-12 px-4 md:px-8 lg:px-10">
        <span className="block mb-4 text-xs uppercase tracking-[0.3em] text-white/40">Selected Work</span>
        <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-6 text-white max-w-4xl">
          {title}
        </h2>
        <p className="text-neutral-400 text-sm md:text-lg font-light max-w-md leading-relaxed">
          {description}
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-28 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-[#0f0f0f] ring-1 ring-white/10 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-gradient-to-br from-orange-400 via-purple-500 to-blue-500 shadow-[0_0_18px_rgba(168,85,247,0.8)]" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-6xl font-semibold tracking-tight bg-gradient-to-b from-white to-white/25 bg-clip-text text-transparent ">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-3xl mb-4 text-left font-semibold tracking-tight bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
