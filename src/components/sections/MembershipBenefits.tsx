import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Compass, Ticket, Users2, GraduationCap, BadgeCheck, Gift } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Primitives";

const benefits = [
  { icon: Ticket, title: "Early access to trips", text: "Members get first booking access before public release, every time." },
  { icon: Compass, title: "Member-only experiences", text: "Exclusive meetups, hikes, and socials open only to verified members." },
  { icon: Users2, title: "A real network", text: "Mentorship, collaboration, and friendships with 4,200+ driven young people." },
  { icon: GraduationCap, title: "Skill-building sessions", text: "Workshops on careers, finance, and entrepreneurship from community leaders." },
  { icon: BadgeCheck, title: "Volunteer pathways", text: "Structured ways to give back, from a single shift to ongoing roles." },
  { icon: Gift, title: "Partner discounts", text: "Deals with gear, travel, and lifestyle brands that back the community." },
];

export default function MembershipBenefits() {
  return (
    <section className="section-pad">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Membership"
          title="Free to join. Built for people who show up."
          description="Outhood membership costs nothing — what it asks for is participation."
        />

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl2 border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-obsidian p-7"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gold-gradient-soft">
                <b.icon className="h-5 w-5 text-gold" />
              </div>
              <p className="mt-4 text-base font-bold text-ink">{b.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/50">{b.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/register" className="btn-primary">
            Become a member
          </Link>
        </div>
      </Container>
    </section>
  );
}
