import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Compass, Users, HeartHandshake } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Primitives";

const pillars = [
  { icon: Compass, title: "Adventure", text: "Road trips and experiences that get you out of the city and into real moments." },
  { icon: Users, title: "Community", text: "A network of young people building friendships, skills, and opportunity together." },
  { icon: HeartHandshake, title: "Impact", text: "Every trip and event feeds a charity fund supporting children's homes across Kenya." },
];

export default function AboutSnapshot() {
  return (
    <section className="section-pad">
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="overflow-hidden rounded-xl2 border border-white/[0.07]"
            >
              <img
                src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=900&q=80"
                alt="Outhood members on a road trip"
                className="aspect-[4/3] w-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card-surface absolute -bottom-8 -right-4 hidden w-56 p-5 shadow-card sm:block lg:-right-10"
            >
              <p className="text-3xl font-bold text-gradient-gold">20+</p>
              <p className="mt-1 text-sm text-ink/55">Members and growing across Kenya</p>
            </motion.div>
          </div>

          <div>
            <SectionHeading
              eyebrow="About Outhood"
              title="Not a charity. Not just a travel club. A movement."
              description="Outhood was founded by two friends who believed adventure and impact should go hand in hand. We're a growing youth community where road trips, events, and charity move as one — every experience we run contributes to our community fund supporting those who need it most."
            />

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="card-surface p-5"
                >
                  <p.icon className="h-5 w-5 text-gold" />
                  <p className="mt-3 text-sm font-semibold text-ink">{p.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink/50">{p.text}</p>
                </motion.div>
              ))}
            </div>

            <Link to="/about" className="btn-ghost mt-8">
              Read our full story →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
