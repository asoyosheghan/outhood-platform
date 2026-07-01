import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Primitives";
import { upcomingEvents } from "@/data/content";
import { formatDate, formatKes } from "@/lib/utils";

export default function FeaturedRoadTrips() {
  const trips = upcomingEvents.filter((e) => e.category === "ROAD_TRIP").slice(0, 2);

  return (
    <section className="section-pad bg-navy-fade">
      <Container>
        <SectionHeading
          eyebrow="Featured road trips"
          title="Get out of the city. Get into the moment."
          description="Curated trips, fully planned — transport, stays, and a crew of new friends included."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {trips.map((trip, i) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <Link
                to={`/services#${trip.slug}`}
                className="group relative block overflow-hidden rounded-xl2 border border-white/[0.08]"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  {trip.coverImage ? (
                    <img
                      src={trip.coverImage}
                      alt={trip.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="h-full w-full bg-obsidian-light flex items-center justify-center">
                      <span className="text-ink/20 text-sm">Photo coming soon</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                    {formatDate(trip.startDate)}
                  </p>
                  <h3 className="mt-2 flex items-center gap-2 text-2xl font-bold text-ink">
                    {trip.title}
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-ink/50 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-gold" />
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/60">{trip.summary}</p>
                  <p className="mt-4 text-sm font-bold text-gold">
                    {trip.priceKes ? formatKes(trip.priceKes) : "Free"} · {trip.location}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
