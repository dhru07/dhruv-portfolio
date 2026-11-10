"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";
import { usePathname } from "next/navigation";
import type { HTMLMotionProps } from "framer-motion";

type RevealProps = HTMLMotionProps<"div"> & { delay?: number };

/** Fade content into view while keeping it visible for reduced-motion preferences. */
export function Reveal({ children, delay = 0, ...props }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : delay, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.15 }}
      whileInView={{ opacity: 1, y: 0 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function ScrollProgressIndicator() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`scroll-progress${reduceMotion ? " is-static" : ""}`}
      style={reduceMotion ? undefined : { scaleX: scrollYProgress }}
    />
  );
}

/** A restrained route fade that turns off when reduced motion is requested. */
export function PageTransition({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={reduceMotion ? false : { opacity: 0, y: 7 }}
      key={pathname}
      transition={{ duration: reduceMotion ? 0 : 0.24, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
