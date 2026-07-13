"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navigation() {
  const [hidden, setHidden] = useState(false);
  const [blur, setBlur] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    // Show background blur after scrolling a bit
    if (latest > 50) {
      setBlur(true);
    } else {
      setBlur(false);
    }

    // Hide nav strictly on prominent scroll down, show on scroll up
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 transition-colors duration-500 ${blur ? "bg-[#120D0A]/40 backdrop-blur-md border-b border-white/5" : "bg-transparent"
        }`}
    >
      <div className="text-lg font-serif tracking-widest uppercase">
        Atelier <span className="text-[#C6A15B]">V</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-xs font-sans tracking-[0.2em] text-[#F5EFE7]/60">
        <a href="#cake" className="hover:text-white transition-colors">The Cake</a>
        <a href="#craft" className="hover:text-white transition-colors">The Craft</a>
        <a href="#layers" className="hover:text-white transition-colors">The Layers</a>
        <a href="#menu" className="hover:text-white transition-colors">Menu</a>
        <a href="#experience" className="hover:text-white transition-colors">Process</a>
        <a href="#visit" className="hover:text-white transition-colors">Visit</a>
      </div>

      <div>
        <button className="text-xs font-sans tracking-[0.2em] border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-[#120D0A] transition-all duration-300">
          DISCOVER
        </button>
      </div>
    </motion.nav>
  );
}
