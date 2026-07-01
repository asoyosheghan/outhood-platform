import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Container, SectionHeading } from "@/components/ui/Primitives";
import { portfolioItems } from "@/data/content";

export default function CommunityHighlights() {
  const items = portfolioItems.slice(0, 5);

  return (
    <section className="section-pad">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Community highlights"
            title="Moments from the movement"
            description="A glimpse at the trips, events, and people that make Outhood what it is."
          />
          <Link to="/portfolio" className="btn-ghost shrink-0">
            See full portfolio →
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 grid-rows-2 gap-4 sm:grid-cols-4 sm:[&>*:first-child]:col-span-2 sm:[&>*:first-child]:row-span-2">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-xl2 border border-white/[0.07]"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full min-h-[140px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="h-full min-h-[140px] w-full bg-obsidian-light flex items-center justify-center">
                  <span className="text-ink/20 text-xs">Photo coming soon</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm font-semibold text-ink">{item.title}</p>
                <p className="text-xs text-ink/60">{item.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
