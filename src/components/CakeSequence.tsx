"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

export default function CakeSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [loadedFrames, setLoadedFrames] = useState(0);
  const totalFrames = 240;
  
  // We use refs instead of state for high-frequency updates during scroll
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Use framer-motion's useScroll for mapping progress to text animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Load frames
  useEffect(() => {
    let loaded = 0;
    const frames: HTMLImageElement[] = [];
    
    // We prioritize the first few frames
    const loadFrame = (index: number) => {
      const img = new Image();
      // Format 001 to 240
      const indexStr = (index + 1).toString().padStart(3, "0");
      img.src = `/cake-sequence-desktop/ezgif-frame-${indexStr}.jpg`;
      img.onload = () => {
        loaded++;
        setLoadedFrames(loaded);
        frames[index] = img;
      };
      img.onerror = () => {
        console.error(`Failed to load frame ${indexStr}`);
        loaded++; // Increment anyway to prevent hanging
        setLoadedFrames(loaded);
      };
    };

    // Load sequentially batches for smoother loading, but for simplicity, we trigger all
    for (let i = 0; i < totalFrames; i++) {
       loadFrame(i); 
    }
    
    framesRef.current = frames;

    return () => {
      // Cleanup
      framesRef.current = [];
    };
  }, []);

  // Update canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const renderFrame = () => {
      // Smooth interpolation
      currentFrameRef.current += (targetFrameRef.current - currentFrameRef.current) * 0.1;
      let frameIndex = Math.round(currentFrameRef.current);
      
      if (frameIndex < 0) frameIndex = 0;
      if (frameIndex >= totalFrames) frameIndex = totalFrames - 1;
      
      const img = framesRef.current[frameIndex];
      
      if (img && img.complete) {
        // Fit image nicely into canvas (cover)
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let x = 0;
        let y = 0;

        if (canvasRatio > imgRatio) {
          drawHeight = canvas.width / imgRatio;
          y = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgRatio;
          x = (canvas.width - drawWidth) / 2;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Optional: draw soft background to prevent jarring edges if aspect ratios mismatch heavily
        ctx.fillStyle = "#AA8B6B";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img, x, y, drawWidth, drawHeight);
      }

      rafRef.current = requestAnimationFrame(renderFrame);
    };

    // Set canvas dimensions
    const resizeCanvas = () => {
      // High-DPI support
      const dpi = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpi;
      canvas.height = window.innerHeight * dpi;
      ctx.scale(dpi, dpi);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    rafRef.current = requestAnimationFrame(renderFrame);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Sync scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      // Calculate normalized progress within the container's scroll bounds
      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      const scrollPosition = window.scrollY;
      
      // Calculate how far we've scrolled past the top of the container
      const scrolledPast = scrollPosition - containerTop;
      
      let progress = 0;
      if (scrolledPast > 0) {
        progress = scrolledPast / (containerHeight - windowHeight);
      }
      
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;
      
      targetFrameRef.current = progress * (totalFrames - 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLoading = loadedFrames < totalFrames * 0.2;
  const loadPercent = Math.floor((loadedFrames / totalFrames) * 100);

  return (
    <>
      {/* Loading Screen Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#120D0A] text-[#F5EFE7]">
          <div className="text-sm font-sans tracking-[0.3em] font-light uppercase text-[#F5EFE7]/50 mb-8">
            Preparing the experience
          </div>
          <div className="text-3xl font-serif text-[#C6A15B]">{loadPercent}%</div>
          <div className="w-48 h-[1px] bg-white/10 mt-8 relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 bottom-0 bg-[#C6A15B] transition-all duration-300" 
              style={{ width: `${loadPercent}%` }}
            />
          </div>
        </div>
      )}

      <div ref={containerRef} className="relative w-full h-[600vh] bg-[#120D0A]">
        {/* Sticky Canvas */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
          {/* We add a radial gradient overlay over the canvas so it perfectly blends into #120D0A page background */}
          <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,#120D0A_100%)] opacity-80" />
          <div className="absolute left-0 bottom-0 w-full h-32 z-10 pointer-events-none bg-gradient-to-t from-[#120D0A] to-transparent" />
          <div className="absolute left-0 top-0 w-full h-32 z-10 pointer-events-none bg-gradient-to-b from-[#120D0A] to-transparent" />
          
          <canvas ref={canvasRef} className="w-full h-full object-cover" />
          
          {/* Text Overlays linked to useScroll */}
          <TextOverlays progress={scrollYProgress} />
        </div>
      </div>
    </>
  );
}

// Separate component for text animations to avoid re-rendering the canvas parent
function TextOverlays({ progress }: { progress: MotionValue<number> }) {
  const scrollIndicatorOpacity = useTransform(progress, [0, 0.05], [1, 0]);

  // ACT 1: 0% to 15% - The opening
  const act1Opacity = useTransform(progress, [0, 0.05, 0.12, 0.17], [0, 1, 1, 0]);
  const act1Y = useTransform(progress, [0, 0.05, 0.12, 0.17], [20, 0, 0, -20]);

  // ACT 2: 20% to 33% - The moment before
  const act2Opacity = useTransform(progress, [0.18, 0.22, 0.28, 0.32], [0, 1, 1, 0]);
  const act2Y = useTransform(progress, [0.18, 0.22, 0.28, 0.32], [20, 0, 0, -20]);

  // ACT 3: 40% to 60% - The cut (minimal UI)
  const act3Opacity = useTransform(progress, [0.4, 0.45, 0.55, 0.6], [0, 1, 1, 0]);

  // ACT 4: 70% to 85% - Every layer tells a story
  const act4Opacity1 = useTransform(progress, [0.65, 0.70, 0.85, 0.88], [0, 1, 1, 0]);
  const act4Opacity2 = useTransform(progress, [0.75, 0.80, 0.85, 0.88], [0, 1, 1, 0]);
  const act4Y = useTransform(progress, [0.65, 0.75], [30, 0]);

  // ACT 5: 90% to 100% - Hero Slice & CTA
  const act5Opacity = useTransform(progress, [0.9, 0.95, 1], [0, 1, 1]);
  const act5Y = useTransform(progress, [0.9, 0.95], [20, 0]);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
      
      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-[8vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-30 pb-[env(safe-area-inset-bottom,20px)]"
      >
        <div className="text-[9px] md:text-[10px] font-sans tracking-[0.3em] font-light text-[#F5EFE7]/70 uppercase">
          <span className="hidden md:inline">Scroll to explore</span>
          <span className="inline md:hidden">Swipe to explore</span>
        </div>
        <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-[#C6A15B]/50 to-transparent animate-[pulse_3s_ease-in-out_infinite]" />
      </motion.div>

      {/* ACT 1 */}
      <motion.div 
        style={{ opacity: act1Opacity, y: act1Y }} 
        className="absolute flex flex-col items-center text-center px-6 w-full max-w-[90vw] md:max-w-4xl"
      >
        <span className="text-[#C6A15B] font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase mb-4 md:mb-8 font-light">
          A Study in Indulgence
        </span>
        <h2 className="text-[clamp(3.5rem,8vw,8rem)] font-serif leading-[1.05] mb-6 md:mb-8 tracking-tight text-balance">
          Crafted to be<br />remembered.
        </h2>
        <p className="text-white/60 font-sans text-sm md:text-base max-w-[280px] md:max-w-sm mx-auto leading-relaxed font-light">
          A composition of texture, detail, and flavour—made to be discovered slowly.
        </p>
      </motion.div>

      {/* ACT 2 */}
      <motion.div 
        style={{ opacity: act2Opacity, y: act2Y }} 
        className="absolute flex flex-col items-center text-center px-6 bottom-[15%]"
      >
        <span className="text-[#C6A15B] font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase mb-4">
          The Reveal
        </span>
        <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-serif leading-tight mb-4 text-balance">
          Perfection was never meant<br/>to remain untouched.
        </h2>
        <p className="text-white/60 font-sans text-sm md:text-base font-light">
          The first cut changes everything.
        </p>
      </motion.div>

      {/* ACT 3 */}
      <motion.div 
        style={{ opacity: act3Opacity }} 
        className="absolute bottom-[10vh] right-[5vw] md:bottom-24 md:right-24 object-contain"
      >
        <div className="flex items-center gap-4">
          <div className="w-6 md:w-8 h-[1px] bg-[#C6A15B]"></div>
          <span className="text-[10px] md:text-xs font-sans tracking-[0.3em] text-[#C6A15B]/80 font-light">
            01 — THE CUT
          </span>
        </div>
      </motion.div>

      {/* ACT 4 */}
      <div className="absolute flex flex-col items-center text-center w-full px-6 top-[25vh] md:top-auto">
        <motion.h2 
          style={{ opacity: act4Opacity1, y: act4Y }} 
          className="text-[clamp(3rem,8vw,8rem)] font-serif tracking-tight leading-none text-white text-balance"
        >
          Every layer
        </motion.h2>
        <motion.h2 
          style={{ opacity: act4Opacity2, y: act4Y }} 
          className="text-[clamp(3rem,8vw,8rem)] font-serif tracking-tight leading-none text-[#C6A15B] mt-2 italic text-balance"
        >
          tells a story.
        </motion.h2>
      </div>

      {/* ACT 5 CTA */}
      <motion.div 
        style={{ opacity: act5Opacity, y: act5Y }} 
        className="absolute bottom-[5vh] md:bottom-[15%] w-full flex flex-col items-center pointer-events-auto px-6 pb-[env(safe-area-inset-bottom,20px)]"
      >
        <span className="text-[#C6A15B] font-sans text-[10px] tracking-[0.3em] uppercase mb-4 md:mb-6">
          The Inside Matters
        </span>
        <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-serif leading-none mb-4 md:mb-6 text-balance">
          Worth every layer.
        </h2>
        <p className="text-white/60 font-sans text-[12px] md:text-sm max-w-[250px] md:max-w-xs text-center mb-6 md:mb-8 font-light">
          A celebration of texture, balance, and the moments worth sharing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto px-4 sm:px-0">
          <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-white text-[#120D0A] rounded-full text-[10px] md:text-xs font-sans tracking-[0.2em] font-medium hover:bg-[#C6A15B] hover:text-white transition-all duration-300">
            DISCOVER THE COLLECTION
          </button>
          <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border border-white/20 text-white rounded-full text-[10px] md:text-xs font-sans tracking-[0.2em] hover:bg-white/5 transition-all duration-300">
            OUR STORY
          </button>
        </div>
      </motion.div>

    </div>
  );
}
