"use client";
import React from "react";

interface GlitchTextProps {
  children: string; // Restricting to string since we use data-text attribute
  speed?: number;
  enableOnHover?: boolean;
  className?: string;
  as?: React.ElementType;
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  children,
  speed = 0.8,
  enableOnHover = true,
  className = "",
  as: Component = "span",
}) => {
  const inlineStyles = {
    "--glitch-speed": `${speed}s`,
  } as React.CSSProperties;

  const classes = `glitch-text ${enableOnHover ? "glitch-hover" : ""} ${className}`;

  return (
    <Component className={classes} style={inlineStyles} data-text={children}>
      {children}
    </Component>
  );
};
