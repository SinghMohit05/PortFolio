"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";



const quickLinks = [
  { label: "Home", href: "#hero" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
];

const socialLinks = [
  { icon: GithubIcon, href: "https://github.com/SinghMohit05", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/mohit-singh-chahar-b79038355/", label: "LinkedIn" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="footer" className="relative border-t border-border/80 bg-background/50 backdrop-blur-md pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">

          {/* Brand/About */}
          <div className="lg:col-span-2">
            <motion.a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-80"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Image
                src="/images/M logo.jpg"
                alt="Mohit Logo"
                width={40}
                height={40}
                className="size-10 rounded-full object-cover ring-2 ring-primary/20"
              />
            </motion.a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Building scalable, performant, and beautifully designed web experiences. Always learning, always creating.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Connect
            </h3>
            <div className="mt-4 flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-card/80 border border-border/80 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/15 hover:text-primary"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="size-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 flex flex-col items-center justify-between border-t border-border/40 pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Mohit Singh Chahar. All rights reserved.
          </p>
          <p className="mt-2 text-sm text-muted-foreground sm:mt-0">
            Designed & Built with <span className="text-primary">Next.js</span> and <span className="text-primary">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
