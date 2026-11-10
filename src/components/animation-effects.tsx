"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";

const entranceVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.52, delay, ease: "easeOut" as const } }),
};

const rootVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.08, staggerChildren: 0.2 } },
};

const nestedVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.06, staggerChildren: 0.12 } },
};

export function HeroStagger({ children, className }: Readonly<{ children: React.ReactNode; className: string }>) {
  const reduceMotion = useReducedMotion();
  return <motion.div animate="visible" className={className} initial={reduceMotion ? false : "hidden"} variants={rootVariants}>{children}</motion.div>;
}

export function HeroStaggerItem({ children, className, delay = 0 }: Readonly<{ children: React.ReactNode; className: string; delay?: number }>) {
  const reduceMotion = useReducedMotion();
  return <motion.div className={className} custom={reduceMotion ? 0 : delay} variants={entranceVariants}>{children}</motion.div>;
}

export function HeroNestedStagger({ children, className }: Readonly<{ children: React.ReactNode; className: string }>) {
  const reduceMotion = useReducedMotion();
  return <motion.div animate="visible" className={className} initial={reduceMotion ? false : "hidden"} variants={nestedVariants}>{children}</motion.div>;
}

export function HeroNestedItem({ children, className }: Readonly<{ children: React.ReactNode; className?: string }>) {
  const reduceMotion = useReducedMotion();
  return <motion.div className={className} variants={entranceVariants} custom={reduceMotion ? 0 : 0}>{children}</motion.div>;
}

export function PortraitParallax({ children, className }: Readonly<{ children: React.ReactNode; className: string }>) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 650], [0, -20]);
  const reduceMotion = useReducedMotion();
  return <motion.div className={className} style={{ y: reduceMotion ? 0 : y }}>{children}</motion.div>;
}

function countText(value: string, progress: number): string {
  if (progress >= 1) return value;
  return value.replace(/\d[\d,]*(?:\.\d+)?/g, (token) => {
    const target = Number(token.replaceAll(",", ""));
    const decimals = token.split(".")[1]?.length ?? 0;
    const current = target * progress;
    return new Intl.NumberFormat("en-IN", {
      useGrouping: token.includes(","),
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(current);
  });
}

export function CountUp({ value }: Readonly<{ value: string }>) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) return;

    const duration = 1050;
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const linear = Math.min((now - started) / duration, 1);
      setProgress(1 - Math.pow(1 - linear, 3));
      if (linear < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduceMotion]);

  return (
    <span aria-label={value} className="count-up" ref={ref}>
      <span aria-hidden="true" className="count-up-reservation">{value}</span>
      <span aria-hidden="true" className="count-up-visible">{countText(value, progress)}</span>
    </span>
  );
}
