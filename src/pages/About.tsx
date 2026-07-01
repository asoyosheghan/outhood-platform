import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, Eye, ArrowRight } from "lucide-react";
import Seo from "@/components/ui/Seo";
import { Container, SectionHeading, Eyebrow } from "@/components/ui/Primitives";
import { teamMembers } from "@/data/content";

const values = [
  { title: "Community", text: "We build for the group, not just the individual." },
  { title: "Integrity", text: "We do what we say, especially with money and trust." },
  { title: "Adventure", text: "We chase real experiences over comfortable ones." },
  { title: "Innovation", text: "We rebuild how youth platforms in Africa should feel." },
  { title: "Impact", text: "Every event carries a purpose beyond itself." },
  { title: "Excellence", text: "Premium execution, even on a charity budget." },
  { title: "Inclusivity", text: "Every background, every county, one community." },
  { title: "Service", text: "We show up for the people who need it most." },
];

const goals = [
  { year: "2026", text: "Expand road trips and events to 10 counties beyond Nairobi." },
  { year: "2027", text: "Launch the Outhood mentorship program for 500 young people." },
  { year: "2028", text: "Reach 100 children's homes supported annually across East Africa." },
];

export default function About() {
  return (
    <>
      <Seo
        title="About Outhood"
        description="The story, mission, vision, and people behind Outhood — Africa's youth lifestyle and impact community."
        path="/about"
      />

      <section className="section-pad pt-12">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <Eyebrow>Our story</Eyebrow>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-ink sm:text-5xl">
              From a road-trip group chat to a movement of thousands.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink/60">
              Outhood was founded by two friends who believed that adventure and impact should go hand in hand. What started as a simple idea — bring young Kenyans together through unforgettable experiences — quickly grew into something bigger. Today, Outhood is a growing community built around road trips, events, and a charity engine that turns every experience into an opportunity to give back.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-14 overflow-hidden rounded-xl2 border border-white/[0.07]"
          >
            <img
              src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1400&q=80"
              alt="Outhood community gathering"
              className="aspect-[21/9] w-full object-cover"
            />
          </motion.div>
        </Container>
      </section>

      <section className="section-pad border-y border-white/[0.06] bg-obsidian-light/40">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card-surface p-8"
            >
              <Target className="h-6 w-6 text-gold" />
              <h2 className="mt-4 text-xl font-bold text-ink">Mission</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/55">
                To connect people through unforgettable experiences while creating meaningful social impact by
                empowering communities and supporting vulnerable children.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card-surface p-8"
            >
              <Eye className="h-6 w-6 text-glow-soft" />
              <h2 className="mt-4 text-xl font-bold text-ink">Vision</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/55">
                To become Africa's leading youth lifestyle and impact-driven community that transforms entertainment
                into positive social change.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="section-pad">
        <Container>
          <SectionHeading align="center" eyebrow="What we stand for" title="Core values" />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-xl2 border border-white/[0.07] p-5 text-center"
              >
                <p className="font-display text-sm font-bold text-gold">{v.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-ink/45">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-pad border-y border-white/[0.06] bg-obsidian-light/40">
        <Container>
          <SectionHeading eyebrow="Leadership" title="The team behind Outhood" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card-surface p-6 text-center"
              >
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="mx-auto h-20 w-20 rounded-full object-cover ring-2 ring-gold/20"
                />
                <p className="mt-4 text-sm font-bold text-ink">{member.name}</p>
                <p className="text-xs text-gold">{member.role}</p>
                <p className="mt-2 text-xs leading-relaxed text-ink/45">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-pad">
        <Container>
          <SectionHeading eyebrow="Looking ahead" title="Where we're headed" />
          <div className="mt-12 space-y-0">
            {goals.map((goal, i) => (
              <motion.div
                key={goal.year}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6 border-l border-white/10 py-6 pl-7"
                style={{ position: "relative" }}
              >
                <div className="absolute -left-[5px] top-9 h-2.5 w-2.5 rounded-full bg-gold" />
                <span className="font-display text-lg font-bold text-gold">{goal.year}</span>
                <p className="text-sm leading-relaxed text-ink/60">{goal.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10">
            <Link to="/register" className="btn-primary">
              Be part of what's next
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
