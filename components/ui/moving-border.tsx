"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MovingBorderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  containerClassName?: string;
  borderRadius?: string;
}

export function MovingBorderButton({
  children,
  className,
  containerClassName,
  borderRadius = "0.5rem",
  ...props
}: MovingBorderButtonProps) {
  return (
    <button
      className={cn(
        "relative overflow-hidden p-[1px] group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg-primary",
        containerClassName
      )}
      style={{ borderRadius }}
      {...props}
    >
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,var(--color-primary)_50%,transparent_100%)]" />
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center bg-bg-primary transition-colors group-hover:bg-bg-primary/90",
          className
        )}
        style={{ borderRadius: `calc(${borderRadius} - 1px)` }}
      >
        {children}
      </div>
    </button>
  );
}
