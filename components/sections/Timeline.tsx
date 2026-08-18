"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  FileText,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type TimelineEntry = {
  type: "work" | "education";
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  techStack?: string[];
};

const timelineEntries: TimelineEntry[] = [
  {
    type: "work",
    title: "Python Full Stack Developer Intern",
    organization: "EduSkills Academy | AICTE Virtual Internship",
    location: "Remote (India)",
    period: "April 2026 — June 2026",
    description:
      "Engineered full-stack web applications and scalable REST APIs using FastAPI/Flask and React within fast-paced sprint cycles.",
    highlights: [
      "Engineered a full-stack e-commerce platform integrating secure REST APIs with a React frontend.",
      "Developed scalable REST APIs using FastAPI, enforcing data integrity via Pydantic schemas to cut input validation errors.",
      "Architected responsive React components, streamlining user experience and optimizing client-server data flow.",
      "Implemented secure authentication and state management, successfully deploying a full-stack capstone project.",
    ],
    techStack: ["Python", "FastAPI", "React", "REST APIs", "Pydantic", "Git"],
  },
  {
    type: "work",
    title: "Cybersecurity & Ethical Hacking Intern",
    organization: "Tamizhan Skills (RISE Program)",
    location: "Remote (India)",
    period: "Mar 2026 — Mar 2026",
    description:
      "Executed vulnerability assessments, network traffic audits, and penetration testing on simulated target environments.",
    highlights: [
      "Executed vulnerability assessments on simulated network environments using Nmap and Burp Suite, identifying 3+ critical security misconfigurations.",
      "Analyzed network traffic using Wireshark to detect anomalous patterns, isolating potential security threats in controlled settings.",
      "Applied ethical hacking frameworks to simulate real-world attack vectors, strengthening defensive posture against common exploits.",
    ],
    techStack: ["Nmap", "Burp Suite", "Wireshark", "Network Security", "Ethical Hacking"],
  },
  {
    type: "education",
    title: "B.Tech in Computer Science and Engineering",
    organization: "SRM Institute of Science and Technology (SRMIST)",
    location: "Chennai, India",
    period: "2024 — 2028",
    description:
      "Currently pursuing B.Tech in CSE with an outstanding academic record (CGPA: 8.7/10), specializing in software development and cybersecurity.",
    highlights: [
      "Current Academic Score: CGPA 8.7 / 10",
      "Core Coursework: Data Structures & Algorithms (DSA), DBMS, Operating Systems, Computer Networks, Cryptography & Network Security (CNS).",
      "Building production-grade web applications & conducting penetration testing research.",
    ],
  },
  {
    type: "education",
    title: "Senior Secondary (CBSE Class XII)",
    organization: "PM SHRI Kendriya Vidyalaya",
    location: "Agra, India",
    period: "2023 — 2024",
    description:
      "Completed Senior Secondary education under CBSE curriculum with distinction.",
    highlights: [
      "Achieved 83.4% in CBSE Senior Secondary Board Examination.",
      "Focused on Physics, Chemistry, and Mathematics (PCM) with Computer Science.",
    ],
  },
  {
    type: "education",
    title: "Secondary (CBSE Class X)",
    organization: "PM SHRI Kendriya Vidyalaya",
    location: "Agra, India",
    period: "2021 — 2022",
    description:
      "Completed Secondary education under CBSE curriculum with high academic standing.",
    highlights: [
      "Achieved 80.4% in CBSE Secondary Board Examination.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 60%"],
  });

  return (
    <section
      id="experience"
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/3 translate-x-1/4">
          <div className="h-[500px] w-[500px] rounded-full bg-primary/4 blur-[140px]" />
        </div>
        <div className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/4">
          <div className="h-[400px] w-[400px] rounded-full bg-primary/3 blur-[120px]" />
        </div>
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            My Journey
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Experience & Education
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            A timeline of my professional career and academic background — the
            milestones that shaped me as a developer.
          </p>
        </motion.div>

        {/* Download Resume CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-8 flex justify-center"
        >
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "gap-2 border-border px-5 text-foreground hover:bg-muted"
            )}
          >
            <FileText className="size-4" />
            Download Resume
          </a>
        </motion.div>

        {/* Timeline Container */}
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="relative mt-14"
        >
          {/* Static Background Track Line */}
          <div className="absolute left-[19px] sm:left-[27px] top-0 bottom-0 w-[2px] bg-border/40 rounded-full" />

          {/* Active 1:1 Instant Real-Time Glowing Line Beam */}
          <motion.div
            className="absolute left-[19px] sm:left-[27px] top-0 bottom-0 w-[2px] rounded-full origin-top z-10 will-change-transform"
            style={{
              scaleY: scrollYProgress,
              background: "linear-gradient(to bottom, #3B82F6, #8B5CF6, #06B6D4, #10B981)",
            }}
          />

          {/* Laser Head moving down instantly in 1:1 sync with scroll */}
          <motion.div
            className="absolute left-[14px] sm:left-[22px] z-20 pointer-events-none -translate-y-1/2 will-change-transform"
            style={{
              top: useTransform(scrollYProgress, (v) => `${v * 100}%`),
              opacity: useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]),
            }}
          >
            <div className="h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#06B6D4]" />
          </motion.div>

          <div className="flex flex-col gap-8 sm:gap-10">
            {timelineEntries.map((entry) => {
              const isEducation = entry.type === "education";
              const Icon = isEducation ? GraduationCap : Briefcase;

              return (
                <motion.div
                  key={`${entry.organization}-${entry.period}`}
                  variants={itemVariants}
                  className="group relative pl-14 sm:pl-18"
                >
                  {/* Instant Hardware-Accelerated Node Icon */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0.6 }}
                    whileInView={{ scale: 1.1, opacity: 1 }}
                    viewport={{ margin: "-15% 0px -25% 0px" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={cn(
                      "absolute left-0 top-1 flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full z-20",
                      "bg-card border border-primary/50 text-primary shadow-[0_0_15px_rgba(59,130,246,0.3)]",
                      "transition-all duration-300 group-hover:scale-120 group-hover:border-primary group-hover:shadow-[0_0_22px_rgba(59,130,246,0.7)]"
                    )}
                  >
                    <div className="absolute inset-0 rounded-full bg-primary/10" />

                    <Icon
                      className="relative z-10 size-4 sm:size-6 text-primary transition-transform duration-300 group-hover:scale-110"
                      strokeWidth={1.8}
                    />
                  </motion.div>

                  {/* High Performance Sleek Card */}
                  <div className="group/card relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 backdrop-blur-md p-5 sm:p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
                    {/* Period + Location badges */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 font-medium text-primary">
                        <Calendar className="size-3" />
                        {entry.period}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-3" />
                        {entry.location}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-3 text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover/card:text-primary transition-colors">
                      {entry.title}
                    </h3>

                    {/* Organization */}
                    <p className="mt-1 text-sm font-semibold text-primary/80">
                      {entry.organization}
                    </p>

                    {/* Description */}
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {entry.description}
                    </p>

                    {/* Highlights */}
                    <ul className="mt-4 space-y-2">
                      {entry.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack Badges */}
                    {entry.techStack && entry.techStack.length > 0 && (
                      <div className="mt-5 pt-3 border-t border-border/40 flex flex-wrap gap-2">
                        {entry.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-lg bg-secondary/80 border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
