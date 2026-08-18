"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle, AlertCircle, Phone } from "lucide-react";
import { MovingBorderButton } from "@/components/ui/moving-border";

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    try {
      // Send real email directly to singhmohit150207@gmail.com via FormSubmit AJAX service
      const res = await fetch("https://formsubmit.co/ajax/singhmohit150207@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          _subject: `Portfolio Message from ${name}: ${subject}`,
        }),
      });

      if (res.ok) {
        setSubmitStatus("success");
        form.reset();
      } else {
        // Fallback: Trigger direct mailto client if form service fails
        window.location.href = `mailto:singhmohit150207@gmail.com?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        setSubmitStatus("success");
      }
    } catch {
      // Direct mailto fallback on network error
      window.location.href = `mailto:singhmohit150207@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      setSubmitStatus("success");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 6000);
    }
  };

  return (
    <section id="contact" className="relative py-20 lg:py-32">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Contact Info */}
          <div>
            <motion.p
              custom={0}
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="mb-3 text-sm font-medium uppercase tracking-widest text-primary"
            >
              Get In Touch
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Let&apos;s Build Something Awesome Together.
            </motion.h2>
            <motion.p
              custom={2}
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Whether you have a project in mind, want to discuss a potential
              collaboration, or just want to say hi, my inbox is always open.
            </motion.p>

            {/* Direct Contact Links */}
            <motion.div
              custom={3}
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="mt-10 flex flex-col gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Email
                  </p>
                  <a
                    href="mailto:singhmohit150207@gmail.com"
                    className="text-base font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    singhmohit150207@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Phone
                  </p>
                  <a
                    href="tel:+918279365569"
                    className="text-base font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    +91 8279365569
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Contact Form */}
          <motion.div
            custom={4}
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl bg-card/50 border border-border/60 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-2xl shadow-black/30">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-foreground"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Enter your name"
                      className="rounded-lg border border-border/80 bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary shadow-inner shadow-black/20"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-foreground"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="your.email@gmail.com"
                      className="rounded-lg border border-border/80 bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary shadow-inner shadow-black/20"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-foreground"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    placeholder="Project Inquiry"
                    className="rounded-lg border border-border/80 bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary shadow-inner shadow-black/20"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell me about your project..."
                    className="resize-none rounded-lg border border-border/80 bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary shadow-inner shadow-black/20"
                  />
                </div>

                {/* Form Status Messages */}
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex items-center gap-2 rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-500"
                  >
                    <CheckCircle className="size-4" />
                    Message sent successfully! I&apos;ll get back to you soon.
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-500"
                  >
                    <AlertCircle className="size-4" />
                    Something went wrong. Please try again later.
                  </motion.div>
                )}

                {/* Submit Button with Moving Border */}
                <MovingBorderButton
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 font-semibold text-foreground"
                  containerClassName="w-full sm:w-auto self-start mt-2"
                >
                  <span className="flex items-center gap-2">
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="size-4" />
                      </>
                    )}
                  </span>
                </MovingBorderButton>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
