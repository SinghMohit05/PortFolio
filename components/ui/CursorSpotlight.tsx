"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function CursorSpotlight() {
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);

      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select');
      setIsHoveringInteractive(!!isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-50 h-[250px] w-[250px] rounded-full bg-primary/40 blur-[100px] mix-blend-screen"
      style={{
        left: cursorX,
        top: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: isVisible ? (isHoveringInteractive ? 0.6 : 0.3) : 0,
        scale: isHoveringInteractive ? 1.2 : 1,
      }}
      transition={{ opacity: { duration: 0.4 }, scale: { duration: 0.3 } }}
    />
  );
}
