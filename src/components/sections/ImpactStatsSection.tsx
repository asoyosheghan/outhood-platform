import { motion } from "framer-motion";
import { Container } from "@/components/ui/Primitives";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { impactStats } from "@/data/content";

export default function ImpactStatsSection() {
  return (
    <section className="border-y border-white/[0.06] bg-obsidian-light/40 section-pad">
      <Container>
        <div className="mb-12 max-w-xl">
          <span className="eyebrow">Our impact, in numbers</span>
          <h2 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">
            Real outcomes behind every road trip and event
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl2 border border-white/[0.07] bg-white/[0.07] lg:grid-cols-4">
          {impactStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-obsidian px-6 py-10"
            >
              <p className="font-display text-3xl font-bold text-gradient-gold sm:text-4xl">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.value % 1 !== 0 ? 1 : 0}
                />
              </p>
              <p className="mt-2 text-sm text-ink/55">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
