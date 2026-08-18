"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface ElectricBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  speed?: number;
  chaos?: number;
  borderRadius?: number;
  borderWidth?: number;
}

export function ElectricBorder({
  children,
  color = "#4F7CFF",
  speed = 0.8,
  chaos = 0.08, // Not directly used in this simplified but premium CSS approach, could be used for SVG displacement.
  borderRadius = 20,
  borderWidth = 2,
  className,
  ...props
}: ElectricBorderProps) {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      // Speed multiplier
      setAngle((prev) => (prev + speed * 2) % 360);
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [speed]);

  return (
    <div
      className={cn("relative group overflow-hidden w-full h-full", className)}
      style={{ borderRadius }}
      {...props}
    >
      {/* Outer Glow & Animated Gradient Border */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-300"
        style={{
          // We use a conic gradient that rotates.
          // In React Bits ElectricBorder, it often has a sharp electric feel.
          background: `conic-gradient(from ${angle}deg at 50% 50%, transparent 40%, ${color} 80%, transparent 100%)`,
          opacity: 0.6,
        }}
      />
      
      {/* The inner background mask that hollows it out, creating the 'border' */}
      <div
        className="absolute transition-colors duration-300 pointer-events-none bg-card group-hover:bg-accent/10"
        style={{
          top: borderWidth,
          left: borderWidth,
          right: borderWidth,
          bottom: borderWidth,
          borderRadius: Math.max(0, borderRadius - borderWidth),
        }}
      />

      {/* Hover Glow Enhancement */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-xl"
        style={{
          background: `conic-gradient(from ${angle}deg at 50% 50%, transparent 20%, ${color} 80%, transparent 100%)`,
        }}
      />

      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
