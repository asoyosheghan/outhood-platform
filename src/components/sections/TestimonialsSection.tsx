import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Primitives";
import { testimonials } from "@/data/content";

export default function TestimonialsSection() {
  return (
    <section className="section-pad border-y border-white/[0.06] bg-obsidian-light/40">
      <Container>
        <SectionHeading align="center" eyebrow="From the community" title="What members are saying" />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-surface p-7"
            >
              <Quote className="h-6 w-6 text-gold/40" />
              <p className="mt-4 text-sm leading-relaxed text-ink/70">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                {t.avatarUrl ? (
                  <img src={t.avatarUrl} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-ink/45">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
