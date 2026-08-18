import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import React, { useRef, useEffect } from "react";

/* ─────────────────────────────────────────────────────────
 *  Props
 * ────────────────────────────────────────────────────────*/
interface HeroAvatarProps {
  image: string;
  className?: string;
  scrollProgress?: MotionValue<number>;
}

/* ─────────────────────────────────────────────────────────
 *  Floating 3D Hero Avatar
 * ────────────────────────────────────────────────────────*/
export default function HeroAvatar({ image, className = "", scrollProgress }: HeroAvatarProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // ── Scroll expansion logic ──
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const noopProgress = useMotionValue(0);
  const progress = scrollProgress ?? noopProgress;
  const hasScrollExpand = !!scrollProgress;

  // Measure offset from avatar center to viewport center for centered expansion
  useEffect(() => {
    if (!hasScrollExpand || !scrollWrapperRef.current) return;
    const measure = () => {
      if (!scrollWrapperRef.current) return;
      // Only measure when not scrolled (transforms are at identity)
      if (scrollProgress && scrollProgress.get() > 0.02) return;
      const rect = scrollWrapperRef.current.getBoundingClientRect();
      offsetRef.current = {
        x: (window.innerWidth / 2) - (rect.left + rect.width / 2),
        y: (window.innerHeight / 2) - (rect.top + rect.height / 2),
      };
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [hasScrollExpand, scrollProgress]);

  // Smooth easing for scroll-driven transforms
  const smoothstep = (edge0: number, edge1: number, xVal: number) => {
    const t = Math.max(0, Math.min(1, (xVal - edge0) / (edge1 - edge0 || 1e-6)));
    return t * t * (3 - 2 * t);
  };

  // Scroll-driven transforms: scale → translate to center → fade
  const scrollScale = useTransform(progress, (p: number) => 1 + 3.5 * smoothstep(0, 0.65, p));
  const scrollX = useTransform(progress, (p: number) => offsetRef.current.x * smoothstep(0, 0.55, p));
  const scrollY = useTransform(progress, (p: number) => offsetRef.current.y * smoothstep(0, 0.55, p));
  const scrollOpacity = useTransform(progress, (p: number) => 1 - smoothstep(0.5, 0.82, p));

  // Motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for mouse tracking
  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  // Max rotation angle
  const MAX_ROTATION = 8;

  // Transform values based on mouse position
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [MAX_ROTATION, -MAX_ROTATION]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-MAX_ROTATION, MAX_ROTATION]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    // Calculate mouse position relative to center of the component (-0.5 to 0.5)
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    // Reset to center smoothly
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={scrollWrapperRef}
      style={hasScrollExpand ? {
        scale: scrollScale,
        x: scrollX,
        y: scrollY,
        opacity: scrollOpacity,
      } : undefined}
      className={hasScrollExpand ? "will-change-transform" : undefined}
    >
    <div
      className={`relative flex items-center justify-center perspective-[1200px] ${className}`}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Soft ambient glow behind the circle that slowly pulses ── */}
      <motion.div
        className="absolute h-[110%] w-[110%] rounded-full bg-[radial-gradient(circle,rgba(224,224,224,0.08)_0%,rgba(136,136,136,0.03)_40%,transparent_70%)] blur-[40px]"
        animate={
          prefersReducedMotion
            ? {}
            : {
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5],
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ── Main circular container with Floating and Tilt ── */}
      <motion.div
        className="
          relative overflow-hidden rounded-full
          flex items-end justify-center
          h-[360px] w-[360px]
          sm:h-[450px] sm:w-[450px]
          lg:h-[520px] lg:w-[520px]
          bg-[radial-gradient(circle_at_50%_40%,#2A2A2A_0%,#181818_40%,#121212_100%)]
          shadow-[0_8px_60px_rgba(136,136,136,0.08),0_2px_20px_rgba(0,0,0,0.04)]
          ring-1 ring-primary/20
          transform-gpu
        "
        style={{
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
        }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                y: [0, -15, 0],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* ── Avatar image ── */}
        <div className="relative z-10 h-[98%] w-[95%] pointer-events-none">
          <Image
            src={image}
            alt="Mohit Singh Chahar"
            fill
            sizes="(max-width: 768px) 360px, (max-width: 1024px) 450px, 520px"
            className="object-contain object-bottom drop-shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
            priority
          />
        </div>
      </motion.div>
    </div>
    </motion.div>
  );
}
