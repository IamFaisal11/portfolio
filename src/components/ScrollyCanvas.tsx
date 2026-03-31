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
            // object-fit: cover logic for canvas
            const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
            const x = (canvas.width / 2) - (img.width / 2) * scale;
            const y = (canvas.height / 2) - (img.height / 2) * scale;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, x, y, img.width * scale, img.height * scale);
        }
    });

    return () => unsubscribe();
  }, [frameIndex, images, frameCount]);

  // Handle Canvas Resizing
  useEffect(() => {
      const handleResize = () => {
          if (canvasRef.current) {
               // Update internal canvas dimensions to match display size
              canvasRef.current.width = window.innerWidth;
              canvasRef.current.height = window.innerHeight;
              
              // Force a redraw of the current frame on resize
               const currentFrameIndex = Math.floor(frameIndex.get());
               const img = images[currentFrameIndex];
               const context = canvasRef.current.getContext("2d");
               
               if (context && img && img.complete) {
                   const canvas = canvasRef.current;
                   const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                   const x = (canvas.width / 2) - (img.width / 2) * scale;
                   const y = (canvas.height / 2) - (img.height / 2) * scale;
                   
                   context.clearRect(0, 0, canvas.width, canvas.height);
                   context.drawImage(img, x, y, img.width * scale, img.height * scale);
               }
          }
      };

      // Initial size
      handleResize();

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
  }, [images, frameIndex]);


  return (
    // 600vh container for the scrolling area to accommodate 4 sections
    <div ref={containerRef} className="relative h-[600vh] bg-[#121212]">
      {/* Loading State Overlay */}
      {imagesLoaded < frameCount && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#121212] text-white">
              <div className="text-xl tracking-widest font-light mb-4 text-white/80">LOADING ASSETS</div>
              <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                      className="h-full bg-white transition-all duration-300 ease-out"
                      style={{ width: `${(imagesLoaded / frameCount) * 100}%` }}
                  />
              </div>
          </div>
      )}

      {/* Sticky container that stays in view */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
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
