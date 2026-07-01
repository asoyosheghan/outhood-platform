import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import Seo from "@/components/ui/Seo";
import { Container, Eyebrow } from "@/components/ui/Primitives";
import { portfolioItems } from "@/data/content";
import type { PortfolioItem } from "@/types";

const filters: { label: string; value: PortfolioItem["category"] | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Events", value: "EVENTS" },
  { label: "Road Trips", value: "ROAD_TRIPS" },
  { label: "Charity", value: "CHARITY" },
  { label: "Community", value: "COMMUNITY" },
];

export default function Portfolio() {
  const [active, setActive] = useState<PortfolioItem["category"] | "ALL">("ALL");

  const filtered = useMemo(
    () => (active === "ALL" ? portfolioItems : portfolioItems.filter((item) => item.category === active)),
    [active]
  );

  return (
    <>
      <Seo
        title="Portfolio"
        description="Past events, road trips, charity activities, and community projects from Outhood."
        path="/portfolio"
      />

      <section className="section-pad pt-12">
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Eyebrow>Portfolio</Eyebrow>
            <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Proof, not promises.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink/60">
              A look back at the trips, events, and projects the community has shown up for.
            </p>
          </motion.div>

          <div className="mt-10 flex flex-wrap gap-2.5">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
                  active === f.value
                    ? "border-gold/40 bg-gold/10 text-gold"
                    : "border-white/10 text-ink/60 hover:border-white/20 hover:text-ink"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <motion.div layout className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="group overflow-hidden rounded-xl2 border border-white/[0.07]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {item.image ? (
              {item.image ? (
                <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              ) : (
                <div className="h-full w-full min-h-[200px] bg-obsidian-light flex items-center justify-center">
                  <span className="text-ink/20 text-sm">Photo coming soon</span>
                </div>
              )}
            ) : (
              <div className="h-full w-full bg-obsidian-light flex items-center justify-center min-h-[200px]">
                <span className="text-ink/20 text-sm">Photo coming soon</span>
              </div>
            )}
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-sm font-bold text-ink">{item.title}</p>
                      <div className="mt-1.5 flex items-center gap-1.5 text-xs text-ink/55">
                        <MapPin className="h-3.5 w-3.5" />
                        {item.location} · {item.year}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
