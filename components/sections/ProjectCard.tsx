"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Shield, Zap, Database, Globe, Layers, Activity } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type Project = {
  title: string;
  tagline: string;
  description: string;
  detailedOverview: string[];
  keyFeatures: { label: string; icon: React.ElementType }[];
  techStack: string[];
  challenges: string;
  solutions: string;
  architecture?: string;
  learnings: string;
  githubUrl: string;
  image: string;
};

const projects: Project[] = [
  {
    title: "VendorMart",
    tagline: "Streamlined Vendor & Inventory Management",
    description:
      "A modern business management solution designed to simplify vendor and inventory operations from a centralized, secure dashboard.",
    detailedOverview: [
      "VendorMart was conceived to solve the growing complexity of supply chain management for mid-sized retail businesses. The existing solutions were either too expensive or too convoluted for day-to-day operations.",
      "The platform provides a unified interface where managers can track stock levels in real-time, automate purchase orders, and monitor vendor performance metrics. It acts as a single source of truth for the entire procurement lifecycle.",
      "By focusing on user experience, VendorMart reduces the onboarding time for new staff from weeks to days, significantly cutting operational overhead."
    ],
    keyFeatures: [
      { label: "Real-time Inventory Tracking", icon: Activity },
      { label: "Automated Purchase Orders", icon: Zap },
      { label: "Vendor Performance Analytics", icon: Layers },
      { label: "Role-based Access Control", icon: Shield },
    ],
    techStack: ["Python", "FastAPI / Flask", "MySQL", "JWT Auth", "REST APIs"],
    challenges: "The primary challenge was ensuring real-time consistency across multiple concurrent sessions, especially during high-volume inventory updates where race conditions could lead to stock discrepancies.",
    solutions: "Implemented pessimistic locking on critical database rows during stock updates and utilized WebSockets for broadcasting inventory changes to all connected clients instantly.",
    architecture: "Monolithic Flask application serving server-rendered templates, backed by a MySQL database with strict ACID compliance settings.",
    learnings: "Deepened my understanding of database concurrency control and the importance of robust transaction management in financial and inventory systems.",
    githubUrl: "https://github.com/SinghMohit05/VendorMart",
    image: "/images/vendormart-v2.png",
  },
  {
    title: "VulnShop",
    tagline: "A Purpose-Built Vulnerable Web App for Security Training",
    description:
      "A deliberately vulnerable e-commerce platform built for security researchers to practice penetration testing and vulnerability assessment.",
    detailedOverview: [
      "VulnShop is an educational tool designed to provide a safe, legal environment for aspiring ethical hackers to practice their skills. It simulates a modern e-commerce platform but is intentionally riddled with common web vulnerabilities.",
      "The project maps directly to the OWASP Top 10, featuring vulnerabilities like SQL Injection, Cross-Site Scripting (XSS), Insecure Direct Object References (IDOR), and broken authentication mechanisms.",
      "It serves as both a training ground for offensive security and a demonstration platform to teach developers how NOT to write code."
    ],
    keyFeatures: [
      { label: "OWASP Top 10 Vulnerabilities", icon: Shield },
      { label: "Realistic E-commerce Workflows", icon: Globe },
      { label: "Progress Tracking & Flags", icon: CheckCircle2 },
      { label: "Dockerized for Easy Setup", icon: Layers },
    ],
    techStack: ["Python", "Flask", "MySQL", "Jinja2", "OWASP Top 10"],
    challenges: "Creating realistic vulnerabilities without making the entire application completely unstable or susceptible to unintentional external compromise during local usage.",
    solutions: "Isolated vulnerabilities to specific endpoints and heavily containerized the application. Added a 'reset' mechanism to quickly restore the database to its pristine state after destructive exploits.",
    architecture: "MERN stack deployed within isolated Docker containers to ensure the vulnerable environment does not expose the host machine.",
    learnings: "Gained immense practical knowledge of how vulnerabilities manifest in modern frameworks and how to properly mitigate them using secure coding practices.",
    githubUrl: "https://github.com/SinghMohit05/VulnShop",
    image: "/images/VulnShop.png",
  },
];

/* ------------------------------------------------------------------ */
/*  Inline GitHub SVG (brand icon)                                     */
/* ------------------------------------------------------------------ */

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ProjectCard() {
  return (
    <section
      id="projects"
      className="relative py-20 lg:py-32"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        {/* ── Section Header ── */}
        <div className="mb-16 md:mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold sm:text-4xl md:text-5xl tracking-tight text-foreground"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground"
          >
            A selection of projects showcasing my expertise in Full Stack Development and Cybersecurity.
          </motion.p>
        </div>

        {/* ── 2-Column Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                opacity: { duration: 0.5, delay: index * 0.1 },
                y: { duration: 0.5, delay: index * 0.1 },
              }}
              className="group project-card relative flex flex-col cursor-pointer will-change-transform bg-card border border-border/80 rounded-[22px] overflow-hidden"
              style={{
                boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                transition: "box-shadow 300ms ease, border-color 300ms ease, transform 300ms ease",
              }}
              whileHover={{
                y: -6,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                },
              }}
            >
              {/* ── Image Container ── */}
              <div
                className="project-card-image relative w-full overflow-hidden bg-slate-900/80"
                style={{
                  aspectRatio: "16 / 9",
                  borderTopLeftRadius: "22px",
                  borderTopRightRadius: "22px",
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 ease-out"
                />
              </div>

              {/* ── Card Content ── */}
              <div className="flex flex-col flex-grow p-6 sm:p-8">
                {/* Title */}
                <h3
                  className="text-xl sm:text-2xl font-bold text-foreground"
                >
                  {project.title}
                </h3>

                {/* Tagline */}
                <p
                  className="mt-1.5 text-sm font-medium text-primary"
                >
                  {project.tagline}
                </p>

                {/* Description */}
                <p
                  className="mt-3 text-sm leading-relaxed line-clamp-3 flex-grow text-muted-foreground"
                >
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md px-2.5 py-1 text-xs font-medium bg-primary/15 border border-primary/30 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-border/60">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200 text-foreground hover:text-primary"
                  >
                    <GithubIcon className="size-4" />
                    Source Code →
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
