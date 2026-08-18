"use client";

import React, { Children, ReactNode, cloneElement, isValidElement } from "react";
import { cn } from "@/lib/utils";

interface LogoLoopProps {
  children: ReactNode;
  direction?: "left" | "right";
  speed?: number; // duration in seconds for one complete loop
  pauseOnHover?: boolean;
  className?: string;
  innerClassName?: string;
}

export function LogoLoop({
  children,
  direction = "left",
  speed = 70,
  pauseOnHover = true,
  className,
  innerClassName,
}: LogoLoopProps) {
  // To ensure a seamless loop, we duplicate the children.
  // We use two exact copies of the content. The CSS animation will translate
  // them horizontally by 100% of their combined width (or 50% depending on implementation).
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden w-full",
        // CSS mask for fade-out on edges
        "[mask-image:_linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex w-max min-w-full shrink-0 gap-4 sm:gap-6",
          direction === "left"
            ? "animate-marquee-left"
            : "animate-marquee-right",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
          innerClassName
        )}
        style={{
          // Pass the dynamic speed to CSS via a custom property
          animationDuration: `${speed}s`,
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
