import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={cn("container-app", className)}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 text-3xl font-bold leading-[1.1] text-ink sm:text-4xl lg:text-[2.75rem]">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-ink/60 sm:text-lg">{description}</p>}
    </motion.div>
  );
}

export function Badge({ children, tone = "gold" }: { children: ReactNode; tone?: "gold" | "blue" | "neutral" }) {
  const tones = {
    gold: "bg-gold/10 text-gold border-gold/25",
    blue: "bg-glow/10 text-glow-soft border-glow/25",
    neutral: "bg-white/5 text-ink/70 border-white/10",
  };
  return (
    <span className={cn("inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold", tones[tone])}>
      {children}
    </span>
  );
}
