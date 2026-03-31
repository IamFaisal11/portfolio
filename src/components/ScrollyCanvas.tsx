"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

interface ScrollyCanvasProps {
  frameCount: number;
  framePrefix?: string;
}

export default function ScrollyCanvas({
  frameCount,
  framePrefix = "frame_",
}: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Setup Framer Motion scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to frame index
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        // Construct filename format based on sequence (e.g., frame_00_delay-0.066s.png)
        const paddedIndex = i.toString().padStart(2, "0");
        const url = `/Sequence/${framePrefix}${paddedIndex}_delay-0.066s.png`;

        img.src = url;
        img.onload = () => {
          loadedCount++;
          setImagesLoaded(loadedCount);
        };
        img.onerror = () => {
          console.error(`Failed to load image: ${url}`);
          loadedCount++;
          setImagesLoaded(loadedCount);
        };
        loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [frameCount, framePrefix]);


  // Render frames based on scroll
  useEffect(() => {
    const unsubscribe = frameIndex.on("change", (latestVal) => {
        if (!canvasRef.current || images.length !== frameCount) return;

        const context = canvasRef.current.getContext("2d");
        if (!context) return;

        // Current image to draw
        const currentFrameIndex = Math.floor(latestVal);
        const img = images[currentFrameIndex];

        if (img && img.complete) {
            const canvas = canvasRef.current;
            if (canvas.width !== img.width) canvas.width = img.width;
            if (canvas.height !== img.height) canvas.height = img.height;
            
            context.drawImage(img, 0, 0);
        }
    });

    return () => unsubscribe();
  }, [frameIndex, images, frameCount]);

  // Initial draw once images are loaded so the screen isn't blank before scrolling
  useEffect(() => {
      if (images.length === frameCount && images[0].complete && canvasRef.current) {
          const canvas = canvasRef.current;
          const context = canvas.getContext("2d");
          if (context) {
              if (canvas.width !== images[0].width) canvas.width = images[0].width;
              if (canvas.height !== images[0].height) canvas.height = images[0].height;
              context.drawImage(images[0], 0, 0);
          }
      }
  }, [images, frameCount]);




  return (
    // 600vh container for the scrolling area to accommodate 4 sections
    <div ref={containerRef} className="relative h-[600vh] bg-[#121212]">
      {/* Shimmer Loading Skeleton */}
      {imagesLoaded < frameCount && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#121212] p-8 md:p-24 overflow-hidden">
              <div className="w-full max-w-[1400px] h-full flex flex-col gap-12">
                  {/* Hero Shimmer */}
                  <div className="flex flex-col items-center gap-6 mt-[10%]">
                      <div className="w-[300px] sm:w-[500px] h-12 md:h-20 bg-white/5 rounded-lg overflow-hidden relative">
                          <motion.div 
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                              animate={{ x: ["-100%", "200%"] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          />
                      </div>
                      <div className="w-[150px] sm:w-[250px] h-4 md:h-6 bg-white/5 rounded-lg overflow-hidden relative">
                          <motion.div 
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                              animate={{ x: ["-100%", "200%"] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                          />
                      </div>
                  </div>

                  {/* Sidebar/Content Shimmer */}
                  <div className="flex flex-col gap-4 mt-12 w-full max-w-lg">
                      {[1, 2, 3].map((i) => (
                          <div key={i} className="w-full h-8 bg-white/5 rounded-lg overflow-hidden relative">
                              <motion.div 
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                                  animate={{ x: ["-100%", "200%"] }}
                                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                              />
                          </div>
                      ))}
                  </div>

                  {/* Progress Bottom */}
                  <div className="mt-auto flex flex-col items-center gap-4 py-12">
                      <div className="w-64 h-[2px] bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                              className="h-full bg-white/40"
                              style={{ width: `${(imagesLoaded / frameCount) * 100}%` }}
                              transition={{ type: "spring", stiffness: 50 }}
                          />
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* Sticky container that stays in view */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover"
        />
        
        {/* Parallax Overlay Sections */}
        <Overlay scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}


// Inner Overlay Component for Parallax Text
function Overlay({ scrollYProgress }: { scrollYProgress: any }) {

    // Section 1: Intro
    const opacity1 = useTransform(scrollYProgress, [0, 0.12, 0.2, 1], [1, 1, 0, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.2, 1], [0, -100, -100]);

    // Section 2: Statement
    const opacity2 = useTransform(scrollYProgress, [0, 0.19, 0.2, 0.27, 0.33, 0.4, 0.41, 1], [0, 0, 0, 1, 1, 0, 0, 0]);
    const y2 = useTransform(scrollYProgress, [0, 0.19, 0.2, 0.4, 1], [100, 100, 100, -100, -100]);

    // Section 3: Value Prop
    const opacity3 = useTransform(scrollYProgress, [0, 0.39, 0.4, 0.47, 0.53, 0.6, 0.61, 1], [0, 0, 0, 1, 1, 0, 0, 0]);
    const y3 = useTransform(scrollYProgress, [0, 0.39, 0.4, 0.6, 1], [100, 100, 100, -100, -100]);

    // Section 4: Data Stories
    const opacity4 = useTransform(scrollYProgress, [0, 0.59, 0.6, 0.67, 0.73, 0.8, 0.81, 1], [0, 0, 0, 1, 1, 0, 0, 0]);
    const y4 = useTransform(scrollYProgress, [0, 0.59, 0.6, 0.8, 1], [100, 100, 100, -100, -100]);
    
    // Final reveal background darkener (80% to 100%)
    const overlayDarken = useTransform(scrollYProgress, [0, 0.79, 0.8, 1], ["rgba(18, 18, 18, 0)", "rgba(18, 18, 18, 0)", "rgba(18, 18, 18, 0)", "rgba(18, 18, 18, 1)"]);


    return (
        <div className="absolute inset-0 pointer-events-none z-10 text-white flex items-center">
            {/* Darkens at the end before transitioning to the work grid */}
            <motion.div 
               className="absolute inset-0 z-0"
               style={{ backgroundColor: overlayDarken }}
            />

            <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 relative z-10">
                {/* Section 1 */}
                <motion.div 
                    style={{ opacity: opacity1, y: y1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center"
                >
                    <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter mix-blend-difference mb-4">
                        I'm Faisal
                    </h1>
                    <p className="text-xl md:text-3xl font-light tracking-wide text-white/70">
                        Creative Developer
                    </p>
                </motion.div>

                {/* Section 2 */}
                <motion.div 
                    style={{ opacity: opacity2, y: y2 }}
                    className="absolute left-6 md:left-24 lg:left-32 top-[40%]"
                >
                    <h2 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] max-w-2xl drop-shadow-xl text-white">
                        AI Engineer crafting <span className="text-neutral-400 italic font-serif">smart solutions.</span>
                    </h2>
                </motion.div>

                {/* Section 3 */}
                <motion.div 
                    style={{ opacity: opacity3, y: y3 }}
                    className="absolute right-6 md:right-24 lg:right-32 top-[55%] text-right"
                >
                    <h2 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] max-w-2xl drop-shadow-xl text-white">
                        Turning data into <br className="hidden md:block" /> <span className="text-neutral-400 italic font-serif">intelligence.</span>
                    </h2>
                </motion.div>

                {/* Section 4 */}
                <motion.div 
                    style={{ opacity: opacity4, y: y4 }}
                    className="absolute left-6 md:left-24 lg:left-32 top-[45%]"
                >
                    <h2 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] max-w-2xl drop-shadow-xl text-white">
                        I uncover stories in <span className="text-neutral-400 italic font-serif">data.</span>
                    </h2>
                </motion.div>
            </div>
            
            {/* Scroll Indicator */}
            <motion.div 
               style={{ opacity: opacity1 }}
               className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs uppercase tracking-[0.2em] text-white/50">Scroll</span>
                <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
                    <motion.div 
                        className="w-full bg-white absolute top-0"
                        animate={{ top: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        style={{ height: "50%" }}
                    />
                </div>
            </motion.div>
        </div>
    )
}
