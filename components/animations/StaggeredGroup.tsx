"use client";

import React, { Children, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface StaggeredGroupProps {
  children: React.ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
  className?: string;
  animation?: "fadeIn" | "fadeUp" | "fadeLeft" | "fadeRight" | "scale" | "none";
}

const animations = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  none: {
    hidden: {},
    visible: {},
  },
};

export default function StaggeredGroup({
  children,
  staggerDelay = 0.1,
  initialDelay = 0.1,
  className = "",
  animation = "fadeUp"
}: StaggeredGroupProps) {
  const [isMounted, setIsMounted] = useState(false);
  const childrenArray = Children.toArray(children);
  
  // Handle hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      }
    }
  };
  
  // Return the children without animation until client-side rendered
  if (!isMounted) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {childrenArray.map((child, index) => (
        <motion.div key={index} variants={animations[animation]} transition={{ ease: "easeOut" }}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
