"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, type HTMLMotionProps } from "motion/react";

type GoldButtonProps = HTMLMotionProps<"button"> & {
  children: ReactNode;
  quiet?: boolean;
};

export function GoldButton({
  children,
  className = "",
  quiet = false,
  ...props
}: GoldButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.985 }}
      className={`gold-button ${quiet ? "gold-button--quiet" : ""} ${className}`}
      {...props}
    >
      <span>{children}</span>
      <span className="gold-button__line" aria-hidden="true" />
    </motion.button>
  );
}

export function GoldLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`gold-button ${className}`}>
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.5} />
      <span className="gold-button__line" aria-hidden="true" />
    </Link>
  );
}
