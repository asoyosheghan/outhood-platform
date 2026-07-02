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