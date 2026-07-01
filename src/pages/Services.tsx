import { useState } from "react";
import { motion } from "framer-motion";
import { Compass, CalendarDays, HeartHandshake, Users2, Check } from "lucide-react";
import Seo from "@/components/ui/Seo";
import { Container, SectionHeading, Eyebrow } from "@/components/ui/Primitives";
import EventCard from "@/components/ui/EventCard";
import { upcomingEvents, campaigns } from "@/data/content";
import { formatKes, progressPercent } from "@/lib/utils";

const serviceCategories = [
  {
    id: "road-trips",
    icon: Compass,
    title: "Road Trips",
    description: "Fully planned adventures across Kenya's most scenic routes — built for groups, not solo travelers.",
    items: ["Local weekend adventures", "Multi-day group expeditions", "Custom corporate retreats", "Hiking & camping trips"],
  },
  {
    id: "events",
    icon: CalendarDays,
    title: "Event Organization",
    description: "End-to-end planning for events that need both polish and energy.",
    items: ["Corporate events & retreats", "Social mixers & launches", "Community gatherings", "Galas & fundraising dinners"],
  },
  {
    id: "charity",
    icon: HeartHandshake,
    title: "Charity Activities",
    description: "Structured, transparent giving that channels real funds to children's homes and communities.",
    items: ["Children's home support programs", "Fundraising campaigns", "Volunteer activations", "Corporate CSR partnerships"],
  },
  {
    id: "community",
    icon: Users2,
    title: "Community Programs",
    description: "The connective tissue between every trip and event — built for the long term.",
    items: ["Professional networking", "Youth development workshops", "Structured mentorship", "Peer support groups"],
  },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("road-trips");

  return (
    <>
      <Seo
        title="Services"
        description="Road trips, event organization, charity activities, and community programs — explore everything Outhood offers."
        path="/services"
      />

      <section className="section-pad pt-12">
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Eyebrow>What we do</Eyebrow>
            <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Four ways to experience Outhood
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink/60">
              Whether you're chasing a sunrise, planning a corporate offsite, or looking to give back, there's a lane
              built for you.
            </p>
          </motion.div>

          <div className="mt-10 flex flex-wrap gap-2.5">
            {serviceCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
                  activeCategory === cat.id
                    ? "border-gold/40 bg-gold/10 text-gold"
                    : "border-white/10 text-ink/60 hover:border-white/20 hover:text-ink"
                }`}
              >
                <cat.icon className="h-4 w-4" />
                {cat.title}
              </button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {serviceCategories
              .filter((c) => c.id === activeCategory)
              .map((cat) => (
                <motion.div
                  key={cat.id}
                  id={cat.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="card-surface scroll-mt-24 p-8 lg:col-span-2"
                >
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
                    <div>
                      <div className="grid h-12 w-12 place-items-center rounded-xl bg-gold-gradient-soft">
                        <cat.icon className="h-6 w-6 text-gold" />
                      </div>
                      <h2 className="mt-4 text-2xl font-bold text-ink">{cat.title}</h2>
                      <p className="mt-3 text-sm leading-relaxed text-ink/55">{cat.description}</p>
                    </div>
                    <ul className="space-y-3">
                      {cat.items.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm text-ink/70">
                          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/15">
                            <Check className="h-3 w-3 text-gold" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
          </div>
        </Container>
      </section>

      <section className="section-pad border-y border-white/[0.06] bg-obsidian-light/40">
        <Container>
          <SectionHeading eyebrow="All upcoming" title="Every event currently open" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event, i) => (
              <div key={event.id} id={event.slug} className="scroll-mt-24">
                <EventCard event={event} index={i} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="charity-campaigns" className="section-pad">
        <Container>
          <SectionHeading eyebrow="Charity activities" title="Campaigns currently raising funds" />
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {campaigns.map((c, i) => {
              const pct = progressPercent(c.raisedKes, c.goalKes);
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="card-surface p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">{c.beneficiary}</p>
                  <h3 className="mt-1.5 text-base font-bold text-ink">{c.title}</h3>
                  <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]">
                    <div className="h-full rounded-full bg-gold-gradient" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-ink/45">
                    {formatKes(c.raisedKes)} raised of {formatKes(c.goalKes)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
