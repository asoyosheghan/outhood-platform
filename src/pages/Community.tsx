import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, MessageSquare, Calendar, HandHeart, Lock } from "lucide-react";
import Seo from "@/components/ui/Seo";
import { Container, SectionHeading, Eyebrow } from "@/components/ui/Primitives";
import { upcomingEvents } from "@/data/content";
import { formatDate } from "@/lib/utils";

const groups = [
  { name: "Road Trip Crew", members: 1840, description: "Trip planning, carpooling, and route recommendations." },
  { name: "Volunteers Network", members: 920, description: "Coordination for charity activations and home visits." },
  { name: "Founders & Creatives", members: 610, description: "Networking for young entrepreneurs and creators." },
  { name: "Photography & Content", members: 340, description: "Capturing and sharing the Outhood story." },
];

const volunteerRoles = [
  { title: "Event Day Crew", commitment: "1 day per event", description: "Help run registration, logistics, and crowd flow at our events." },
  { title: "Children's Home Visitor", commitment: "Monthly", description: "Spend structured time with kids at our partner homes." },
  { title: "Campaign Coordinator", commitment: "Ongoing", description: "Help plan and run fundraising campaigns from start to finish." },
];

export default function Community() {
  const meetups = upcomingEvents.filter((e) => e.category === "SOCIAL" || e.category === "COMMUNITY").slice(0, 3);

  return (
    <>
      <Seo
        title="Community"
        description="Member groups, meetups, and volunteer opportunities inside the Outhood community."
        path="/community"
      />

      <section className="section-pad pt-12">
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Eyebrow>Community</Eyebrow>
            <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
              4,200+ people. One growing network.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink/60">
              Groups, meetups, and volunteer roles built around shared interests — not just shared events.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Member directory placeholder */}
      <section className="border-y border-white/[0.06] bg-obsidian-light/40 py-16">
        <Container>
          <div className="card-surface flex flex-col items-center gap-4 p-10 text-center">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gold-gradient-soft">
              <Lock className="h-6 w-6 text-gold" />
            </div>
            <h2 className="text-xl font-bold text-ink">Member directory</h2>
            <p className="max-w-md text-sm text-ink/50">
              A searchable member directory is rolling out to verified members soon — find people by location,
              interest, or skill. Sign in to be notified when it's live for you.
            </p>
            <Link to="/login" className="btn-secondary">
              Sign in to preview
            </Link>
          </div>
        </Container>
      </section>

      {/* Groups */}
      <section className="section-pad">
        <Container>
          <SectionHeading eyebrow="Community groups" title="Find your people" />
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {groups.map((g, i) => (
              <motion.div
                key={g.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="card-surface flex items-start gap-4 p-6"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-glow/10">
                  <Users className="h-5 w-5 text-glow-soft" />
                </div>
                <div>
                  <p className="text-sm font-bold text-ink">{g.name}</p>
                  <p className="text-xs text-ink/40">{g.members.toLocaleString()} members</p>
                  <p className="mt-2 text-xs leading-relaxed text-ink/50">{g.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Meetups */}
      <section className="section-pad border-y border-white/[0.06] bg-obsidian-light/40">
        <Container>
          <SectionHeading eyebrow="Upcoming meetups" title="Where to show up next" />
          <div className="mt-12 space-y-4">
            {meetups.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card-surface flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-gradient-soft">
                    <Calendar className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink">{event.title}</p>
                    <p className="text-xs text-ink/45">{formatDate(event.startDate)} · {event.location}</p>
                  </div>
                </div>
                <Link to={`/services#${event.slug}`} className="btn-secondary !px-5 !py-2.5 text-xs">
                  View details
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Volunteer opportunities */}
      <section className="section-pad">
        <Container>
          <SectionHeading eyebrow="Give back" title="Volunteer opportunities" />
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {volunteerRoles.map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card-surface p-6"
              >
                <HandHeart className="h-5 w-5 text-gold" />
                <p className="mt-3 text-sm font-bold text-ink">{role.title}</p>
                <p className="text-xs text-ink/40">{role.commitment}</p>
                <p className="mt-2 text-xs leading-relaxed text-ink/50">{role.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/register" className="btn-primary">
              Apply to volunteer
            </Link>
            <a href="#discussion" className="btn-secondary">
              <MessageSquare className="h-4 w-4" />
              Preview discussions
            </a>
          </div>
        </Container>
      </section>

      {/* Discussion preview */}
      <section id="discussion" className="section-pad border-t border-white/[0.06] bg-obsidian-light/40">
        <Container>
          <div className="card-surface p-8 text-center">
            <MessageSquare className="mx-auto h-7 w-7 text-glow-soft" />
            <h2 className="mt-4 text-lg font-bold text-ink">Member discussions</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink/50">
              Threaded discussions and trip planning chats are coming to member accounts. This space is reserved
              for that upcoming feature.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
