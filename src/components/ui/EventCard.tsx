import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Users } from "lucide-react";
import type { OuthoodEvent } from "@/types";
import { formatDateShort, formatKes } from "@/lib/utils";
import { Badge } from "@/components/ui/Primitives";

const categoryLabel: Record<OuthoodEvent["category"], string> = {
  ROAD_TRIP: "Road Trip",
  SOCIAL: "Social",
  CORPORATE: "Corporate",
  COMMUNITY: "Community",
  CHARITY: "Charity",
};

const categoryTone: Record<OuthoodEvent["category"], "gold" | "blue" | "neutral"> = {
  ROAD_TRIP: "gold",
  SOCIAL: "blue",
  CORPORATE: "neutral",
  COMMUNITY: "blue",
  CHARITY: "gold",
};

export default function EventCard({ event, index = 0 }: { event: OuthoodEvent; index?: number }) {
  const { day, month } = formatDateShort(event.startDate);
  const spotsLeft = event.capacity - event.registered;
  const isFull = spotsLeft <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <Link
        to={`/services#${event.slug}`}
        className="group card-surface block overflow-hidden transition-colors hover:border-gold/25"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          {event.coverImage ? (
            <img
              src={event.coverImage}
              alt={event.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-obsidian-light flex flex-col items-center justify-center gap-2">
              <span className="text-gold text-2xl">🏔️</span>
              <span className="text-ink/30 text-xs">Photo coming soon</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
          <div className="absolute left-3.5 top-3.5 rounded-lg bg-obsidian/85 px-2.5 py-1.5 text-center backdrop-blur">
            <p className="font-display text-sm font-bold leading-none text-gold">{day}</p>
            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink/60">{month}</p>
          </div>
          <div className="absolute right-3.5 top-3.5">
            <Badge tone={categoryTone[event.category]}>{categoryLabel[event.category]}</Badge>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-base font-bold leading-snug text-ink transition-colors group-hover:text-gold">
            {event.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink/50">{event.summary}</p>

          <div className="mt-4 flex items-center gap-1.5 text-xs text-ink/45">
            <MapPin className="h-3.5 w-3.5" />
            {event.location}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4">
            <span className="text-sm font-bold text-ink">
              {event.priceKes ? formatKes(event.priceKes) : "Free"}
            </span>
            <span className={`flex items-center gap-1.5 text-xs ${isFull ? "text-red-400" : "text-ink/45"}`}>
              <Users className="h-3.5 w-3.5" />
              {isFull ? "Fully booked" : `${spotsLeft} spots left`}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
