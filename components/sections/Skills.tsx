"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Globe,
  Braces,
  FileCode,
  Wind,
  LayoutTemplate,
  Palette,
  Server,
  Layers,
  Terminal,
  Database,
  DatabaseZap,
  Cloud,
  GitBranch,
  Container,
  TerminalSquare,
  MonitorSmartphone,
  Triangle,
  PenTool,
  Flame,
  Key,
  Network,
  Activity,
  Bug,
  Radar,
  Crosshair,
  ShieldCheck,
  Search,
  X,
  LayoutGrid,
  Repeat,
  Sparkles,
  Shield,
  Cpu,
  Boxes,
  Lock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { LogoLoop } from "@/components/ui/LogoLoop";
import { ElectricBorder } from "@/components/ui/ElectricBorder";
import { cn } from "@/lib/utils";

// Custom GitHub SVG Icon
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export type SkillCategory =
  | "All"
  | "Frontend"
  | "Backend"
  | "Cybersecurity"
  | "Database & DevOps"
  | "Programming & Tools";

export type SkillLevel = "Advanced" | "Intermediate" | "Proficient";

export type Skill = {
  name: string;
  icon: React.ElementType;
  category: SkillCategory;
  level: SkillLevel;
  description: string;
  color: string; // Accent hex or rgba for spotlight glow
};

const allSkills: Skill[] = [
  // Core Fundamentals & Primary Languages (Shown First)
  { name: "JavaScript (ES6+)", icon: FileCode, category: "Programming & Tools", level: "Advanced", description: "Core language for dynamic web scripting and asynchronous logic.", color: "#F7DF1E" },
  { name: "Python", icon: Terminal, category: "Programming & Tools", level: "Advanced", description: "Versatile language for backend services, automation, and security scripting.", color: "#3776AB" },
  { name: "React", icon: Code2, category: "Frontend", level: "Advanced", description: "Building modern interactive component-driven user interfaces.", color: "#61DAFB" },
  { name: "Node.js", icon: Server, category: "Backend", level: "Advanced", description: "Scalable event-driven backend JavaScript runtime.", color: "#5FA04E" },
  { name: "HTML5 / CSS3", icon: LayoutTemplate, category: "Frontend", level: "Advanced", description: "Semantic markup, modern styling, and responsive web structure.", color: "#E34F26" },
  { name: "Git & GitHub", icon: GithubIcon, category: "Database & DevOps", level: "Advanced", description: "Distributed version control, branching workflows, and collaboration.", color: "#F05032" },
  { name: "TypeScript", icon: Braces, category: "Programming & Tools", level: "Intermediate", description: "Typed JavaScript for scalable and maintainable codebases.", color: "#3178C6" },
  { name: "Next.js 16", icon: Globe, category: "Frontend", level: "Intermediate", description: "Production React framework with App Router, SSR, and API routes.", color: "#E0E0E0" },

  // Secondary Stack & Databases
  { name: "Express.js", icon: Layers, category: "Backend", level: "Intermediate", description: "Fast, minimal REST API middleware framework for Node.js.", color: "#CCCCCC" },
  { name: "Tailwind CSS", icon: Wind, category: "Frontend", level: "Advanced", description: "Utility-first CSS framework for rapid UI styling.", color: "#38BDF8" },
  { name: "MongoDB", icon: Database, category: "Database & DevOps", level: "Intermediate", description: "Flexible NoSQL document database for modern applications.", color: "#47A248" },
  { name: "MySQL", icon: Database, category: "Database & DevOps", level: "Intermediate", description: "Relational database querying and structured data storage.", color: "#00758F" },
  { name: "PostgreSQL", icon: DatabaseZap, category: "Database & DevOps", level: "Intermediate", description: "Advanced open-source relational database system.", color: "#4169E1" },
  { name: "REST APIs", icon: Cloud, category: "Backend", level: "Advanced", description: "Architecting and consuming RESTful web services.", color: "#38BDF8" },
  { name: "Docker", icon: Container, category: "Database & DevOps", level: "Intermediate", description: "Containerizing microservices and managing environment consistency.", color: "#2496ED" },
  { name: "Linux Administration", icon: TerminalSquare, category: "Database & DevOps", level: "Intermediate", description: "Command-line navigation, shell scripting, and environment config.", color: "#FCC624" },

  // Security & Backend Systems
  { name: "JWT Auth", icon: Key, category: "Backend", level: "Intermediate", description: "Stateless token-based authentication and role-based access control.", color: "#F59E0B" },
  { name: "Flask", icon: Flame, category: "Backend", level: "Intermediate", description: "Lightweight Python micro-framework for web APIs.", color: "#FFFFFF" },
  { name: "Kali Linux", icon: Terminal, category: "Cybersecurity", level: "Intermediate", description: "Penetration testing environment and security toolkit.", color: "#557C93" },
  { name: "OWASP Top 10", icon: ShieldCheck, category: "Cybersecurity", level: "Intermediate", description: "Web application vulnerability identification and remediation.", color: "#10B981" },
  { name: "Burp Suite", icon: Bug, category: "Cybersecurity", level: "Intermediate", description: "Web security testing, HTTP proxy analysis, and audit.", color: "#FF6600" },
  { name: "Nmap", icon: Radar, category: "Cybersecurity", level: "Intermediate", description: "Network port scanning, service discovery, and auditing.", color: "#38BDF8" },
  { name: "Wireshark", icon: Activity, category: "Cybersecurity", level: "Proficient", description: "Network packet capture and protocol analysis.", color: "#1679A7" },
  { name: "Metasploit", icon: Crosshair, category: "Cybersecurity", level: "Proficient", description: "Vulnerability validation and security research framework.", color: "#EF4444" },

  // Libraries & Workflow Tools
  { name: "Redux Toolkit", icon: Network, category: "Frontend", level: "Proficient", description: "Centralized state management for complex React apps.", color: "#764ABC" },
  { name: "Framer Motion", icon: Activity, category: "Frontend", level: "Intermediate", description: "Declarative animations and interactive UI transitions.", color: "#F012BE" },
  { name: "Firebase", icon: Flame, category: "Backend", level: "Proficient", description: "Real-time backend database and authentication services.", color: "#FFCA28" },
  { name: "Vercel", icon: Triangle, category: "Database & DevOps", level: "Intermediate", description: "Edge deployment and serverless hosting platform.", color: "#FFFFFF" },
  { name: "VS Code", icon: MonitorSmartphone, category: "Programming & Tools", level: "Advanced", description: "Primary IDE configured for productive full-stack workflow.", color: "#007ACC" },
  { name: "Figma", icon: PenTool, category: "Programming & Tools", level: "Proficient", description: "UI wireframing and design handoff comprehension.", color: "#F24E1E" },
];

const categories: SkillCategory[] = [
  "All",
  "Frontend",
  "Backend",
  "Cybersecurity",
  "Database & DevOps",
  "Programming & Tools",
];

// Marquee rows splitting
const marqueeRow1 = allSkills.slice(0, 15);
const marqueeRow2 = allSkills.slice(15);

/* ------------------------------------------------------------------ */
/*  Interactive Skill Card with Mouse Spotlight Effect                */
/* ------------------------------------------------------------------ */
function SpotlightSkillCard({ skill }: { skill: Skill }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 16 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-300",
        "bg-card/90 border border-border/80 hover:border-primary/50",
        "hover:shadow-2xl hover:-translate-y-1.5 overflow-hidden"
      )}
    >
      {/* Radial Mouse Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${skill.color}15, transparent 80%)`,
        }}
      />

      {/* Subtle border glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 border border-primary/30"
        style={{
          boxShadow: `inset 0 0 20px ${skill.color}10`,
        }}
      />

      {/* Top Header: Icon & Badges */}
      <div className="relative z-10 flex items-start justify-between">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
          style={{
            backgroundColor: `${skill.color}18`,
            color: skill.color,
            boxShadow: isHovered ? `0 0 20px ${skill.color}35` : "none",
          }}
        >
          <skill.icon className="size-6" strokeWidth={1.8} />
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="rounded-full bg-secondary/80 border border-border px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
            {skill.category}
          </span>
          <span
            className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full"
            style={{
              color: skill.color,
              backgroundColor: `${skill.color}12`,
            }}
          >
            {skill.level}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-5">
        <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary flex items-center gap-2">
          {skill.name}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
          {skill.description}
        </p>
      </div>

      {/* Bottom glowing accent bar */}
      <div className="relative z-10 mt-5 pt-3 border-t border-border/40 flex items-center justify-between">
        <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 group-hover:w-full"
            style={{
              width: isHovered ? "100%" : "30%",
              backgroundColor: skill.color,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Marquee Skill Card Wrapper (uses ElectricBorder)                  */
/* ------------------------------------------------------------------ */
function MarqueeSkillCard({ skill }: { skill: Skill }) {
  return (
    <div
      className={cn(
        "group relative",
        "w-[260px] sm:w-[290px]",
        "h-[190px]",
        "transition-all duration-300 ease-out",
        "hover:scale-[1.02] hover:-translate-y-1 rounded-[20px]"
      )}
    >
      <ElectricBorder
        color={skill.color}
        speed={0.8}
        chaos={0.08}
        borderRadius={20}
        borderWidth={1.5}
        className="w-full h-full"
      >
        <div className="flex h-full w-full flex-col justify-between p-5 bg-card/95 backdrop-blur-md rounded-[20px]">
          <div className="flex items-start justify-between">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{
                backgroundColor: `${skill.color}20`,
                color: skill.color,
              }}
            >
              <skill.icon className="size-6" strokeWidth={1.8} />
            </div>
            <span className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[11px] font-medium text-primary">
              {skill.category}
            </span>
          </div>

          <div className="mt-3">
            <h3 className="text-base font-bold text-foreground">
              {skill.name}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
              {skill.description}
            </p>
          </div>
        </div>
      </ElectricBorder>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Skills Component                                              */
/* ------------------------------------------------------------------ */
export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "marquee">("grid");
  const [isExpanded, setIsExpanded] = useState(false);

  const INITIAL_SKILLS_COUNT = 8;

  // Filter skills based on Category & Search Query
  const filteredSkills = useMemo(() => {
    return allSkills.filter((skill) => {
      const matchesCategory =
        selectedCategory === "All" || skill.category === selectedCategory;
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const shouldShowExpandToggle =
    selectedCategory === "All" && !searchQuery && filteredSkills.length > INITIAL_SKILLS_COUNT;

  const visibleSkills =
    shouldShowExpandToggle && !isExpanded
      ? filteredSkills.slice(0, INITIAL_SKILLS_COUNT)
      : filteredSkills;

  return (
    <section id="skills" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background ambient glowing orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/4 translate-x-1/3 -translate-y-1/2">
          <div className="h-[500px] w-[500px] rounded-full bg-primary/5 blur-[150px]" />
        </div>
        <div className="absolute left-0 bottom-1/4 -translate-x-1/3 translate-y-1/2">
          <div className="h-[450px] w-[450px] rounded-full bg-primary/4 blur-[130px]" />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-primary mb-4"
          >
            <Sparkles className="size-3.5" />
            Technical Arsenal
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Skills & Tech Stack
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            A curated breakdown of tools, frameworks, and security suites I leverage to build production applications and conduct vulnerability assessments.
          </motion.p>
        </div>

        {/* ── Control Bar: Search, Category Tabs & View Switcher ── */}
        <div className="mt-12 flex flex-col gap-6">
          {/* Top Row: Search & View Switcher */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tech stack (e.g. React, Docker...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl bg-card border border-border/80 pl-10 pr-9 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* View Mode Toggle Button */}
            <div className="flex items-center gap-1 rounded-xl bg-card border border-border/80 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200",
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <LayoutGrid className="size-3.5" />
                Grid View
              </button>
              <button
                onClick={() => setViewMode("marquee")}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200",
                  viewMode === "marquee"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Repeat className="size-3.5" />
                Infinite Stream
              </button>
            </div>
          </div>

          {/* Category Filter Tabs (Visible in Grid View) */}
          {viewMode === "grid" && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((category) => {
                const count =
                  category === "All"
                    ? allSkills.length
                    : allSkills.filter((s) => s.category === category).length;
                const isActive = selectedCategory === category;

                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "relative flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-200 border",
                      isActive
                        ? "border-primary text-foreground bg-primary/10"
                        : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground bg-card/50"
                    )}
                  >
                    {category}
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px]",
                        isActive
                          ? "bg-primary text-primary-foreground font-bold"
                          : "bg-secondary text-muted-foreground"
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Content View ── */}
        <div className="mt-8">
          {viewMode === "grid" ? (
            <>
              {/* Skill Cards Grid */}
              {filteredSkills.length > 0 ? (
                <>
                  <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
                  >
                    <AnimatePresence mode="popLayout">
                      {visibleSkills.map((skill) => (
                        <SpotlightSkillCard key={skill.name} skill={skill} />
                      ))}
                    </AnimatePresence>
                  </motion.div>

                  {/* Expand / Collapse Control */}
                  {shouldShowExpandToggle && (
                    <div className="relative mt-8 flex flex-col items-center justify-center">
                      {!isExpanded && (
                        <div className="pointer-events-none absolute -top-32 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-background/60 to-background z-10" />
                      )}

                      <button
                        onClick={() => {
                          if (isExpanded) {
                            setIsExpanded(false);
                            const el = document.getElementById("skills");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                          } else {
                            setIsExpanded(true);
                          }
                        }}
                        className="group relative z-20 inline-flex items-center gap-2 rounded-xl bg-card border border-border/80 hover:border-primary/50 px-6 py-3 text-sm font-semibold text-foreground shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                      >
                        <Sparkles className="size-4 text-primary group-hover:rotate-12 transition-transform" />
                        <span>
                          {isExpanded
                            ? "Show Less"
                            : `Show All Skills (${allSkills.length})`}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="size-4 text-muted-foreground group-hover:-translate-y-0.5 transition-transform" />
                        ) : (
                          <ChevronDown className="size-4 text-muted-foreground group-hover:translate-y-0.5 transition-transform" />
                        )}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-16 text-center rounded-2xl border border-dashed border-border/80 bg-card/40">
                  <Search className="mx-auto size-8 text-muted-foreground" />
                  <h3 className="mt-3 text-base font-semibold text-foreground">
                    No matching skills found
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try adjusting your search query or filter settings.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All");
                    }}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Marquee Stream View */
            <div className="flex flex-col gap-6 py-4 overflow-hidden">
              <LogoLoop direction="right" speed={60} className="w-full">
                {marqueeRow1.map((skill) => (
                  <MarqueeSkillCard key={skill.name} skill={skill} />
                ))}
              </LogoLoop>

              <LogoLoop direction="left" speed={65} className="w-full">
                {marqueeRow2.map((skill) => (
                  <MarqueeSkillCard key={skill.name} skill={skill} />
                ))}
              </LogoLoop>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

