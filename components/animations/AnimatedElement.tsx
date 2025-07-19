"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation, Variant } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimatedElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  animation?: "fadeIn" | "fadeUp" | "fadeLeft" | "fadeRight" | "scale" | "none";
  once?: boolean;
  threshold?: number;
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

export default function AnimatedElement({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  animation = "fadeUp",
  once = true,
  threshold = 0.1,
}: AnimatedElementProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold, triggerOnce: once });
  const [isMounted, setIsMounted] = useState(false);
  
  // Handle hydration by only enabling animations on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (inView && isMounted) {
      controls.start("visible");
    } else if (!once && !inView && isMounted) {
      controls.start("hidden");
    }
  }, [controls, inView, once, isMounted]);

  const animationVariants = animations[animation];

  // Return the children without animation until client-side rendered
  if (!isMounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={animationVariants}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
