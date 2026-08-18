"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { ArrowDown, FileText } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GlitchText } from "@/components/ui/GlitchText";
import HeroAvatar from "@/components/ui/HeroAvatar";
import { Typewriter } from "react-simple-typewriter";

const stats = [
  { value: "5+", label: "Projects Completed" },
  { value: "15+", label: "Technologies" },
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  }),
};

export default function Hero({ scrollProgress }: { scrollProgress?: MotionValue<number> }) {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  // ── Scroll expansion motion values ──
  const noopProgress = useMotionValue(0);
  const progress = scrollProgress ?? noopProgress;
  const isScrollActive = !!scrollProgress;
  const textContentOpacity = useTransform(progress, [0, 0.2], [1, 0]);
  const decorationOpacity = useTransform(progress, [0, 0.15], [1, 0]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className={cn(
        "relative",
        isScrollActive
          ? "h-full flex flex-col justify-center overflow-visible"
          : "py-20 lg:py-32"
      )}
    >
      {/* Background gradient decoration */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={isScrollActive ? { opacity: decorationOpacity } : undefined}
      >
        {/* Cursor Glow Effect has been moved to global CursorSpotlight */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />
        </div>
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4">
          <div className="h-[400px] w-[400px] rounded-full bg-primary/3 blur-[100px]" />
        </div>
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Text Content */}
          <motion.div
            className="order-2 lg:order-1"
            style={isScrollActive ? { opacity: textContentOpacity } : undefined}
          >
            <motion.p
              custom={0}
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
              className="mb-3 text-sm font-medium uppercase tracking-widest text-primary"
            >
              Hi there! I&apos;m
            </motion.p>

            <motion.h1
              custom={1}
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
              className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              <GlitchText speed={0.8} enableOnHover={false}>
                MOHIT SINGH CHAHAR
              </GlitchText>
            </motion.h1>

            <motion.div
              custom={2}
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
              className="mt-3 text-xl font-semibold text-primary sm:text-2xl lg:text-3xl h-[60px] sm:h-[40px] lg:h-[48px] flex items-center"
            >
              <span>
                <Typewriter
                  words={[
                    "Full-Stack Developer",
                    "Cybersecurity Enthusiast",
                    "Secure Web Developer",
                    "Ethical Hacking Learner",
                    "Problem Solver",
                    "Open Source Contributor",
                  ]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={40}
                  delaySpeed={1500}
                />
              </span>
            </motion.div>

            <motion.p
              custom={3}
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
              className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Passionate about building scalable web applications and strengthening digital security. I combine modern full-stack development with cybersecurity principles to create clean, efficient, and secure solutions that make a real impact.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              custom={4}
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="gap-2 bg-primary px-6 text-primary-foreground hover:bg-primary/80"
                onClick={() => {
                  const el = document.querySelector("#projects");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View Projects
                <ArrowDown className="size-4" />
              </Button>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "gap-2 border-border px-6 text-foreground hover:bg-muted"
                )}
              >
                <FileText className="size-4" />
                Download Resume
              </a>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              custom={5}
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
              className="mt-12 flex flex-wrap gap-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl font-bold text-foreground lg:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Avatar */}
          <div className={cn(
            "order-1 flex justify-center lg:order-2 lg:justify-end",
            isScrollActive && "relative z-30"
          )}>
            <HeroAvatar image="/images/mohit_avatar.png" scrollProgress={scrollProgress} />
          </div>
        </div>
      </div>
    </section>
  );
}
