import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";
import { Container } from "@/components/ui/Primitives";

const stops = [
  { label: "Road Trips", x: 60, y: 210 },
  { label: "Events", x: 260, y: 90 },
  { label: "Community", x: 460, y: 230 },
  { label: "Charity Impact", x: 660, y: 100 },
];

const pathD = "M 60 210 C 140 130, 190 70, 260 90 S 400 280, 460 230 S 600 60, 660 100";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-route-glow pb-20 pt-16 sm:pb-28 sm:pt-24 lg:pt-28">
      <Container className="relative grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-soft" />
            Africa's youth impact community
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-[2.75rem] font-bold leading-[1.05] text-ink sm:text-6xl lg:text-[4rem]"
          >
            Where Adventure
            <br />
            Meets <span className="text-gradient-gold">Impact</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-ink/60"
          >
            Join a thriving youth community creating unforgettable experiences while transforming lives —
            road trips, events, and real change for kids who need it most.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-col gap-3.5 sm:flex-row"
          >
            <Link to="/register" className="btn-primary">
              Join Community
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/services#charity" className="btn-secondary">
              <Heart className="h-4 w-4" />
              Support a Cause
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex items-center gap-6 border-t border-white/[0.06] pt-6"
          >
            <div className="flex -space-x-3">
              {[12, 32, 45, 51].map((id) => (
                <img
                  key={id}
                  src={`https://i.pravatar.cc/64?img=${id}`}
                  alt=""
                  className="h-9 w-9 rounded-full border-2 border-obsidian object-cover"
                />
              ))}
            </div>
            <p className="text-sm text-ink/50">
              <span className="font-semibold text-ink">20+</span> members already in the movement
            </p>
          </motion.div>
        </div>

        {/* Signature element: animated route connecting the four hero pillars */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto w-full max-w-[720px]"
        >
          <svg viewBox="0 0 720 320" className="w-full" aria-hidden="true">
            <defs>
              <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="55%" stopColor="#F2D879" />
                <stop offset="100%" stopColor="#60A5FA" />
              </linearGradient>
            </defs>
            <path d={pathD} fill="none" stroke="#FFFFFF" strokeOpacity="0.06" strokeWidth="10" strokeLinecap="round" />
            <motion.path
              d={pathD}
              fill="none"
              stroke="url(#route-gradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="900"
              initial={{ strokeDashoffset: 900 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 2.2, delay: 0.6, ease: "easeInOut" }}
            />
            {stops.map((stop, i) => (
              <g key={stop.label}>
                <motion.circle
                  cx={stop.x}
                  cy={stop.y}
                  r="7"
                  fill="#0A0A0A"
                  stroke="#D4AF37"
                  strokeWidth="2.5"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.4 }}
                />
                <motion.circle
                  cx={stop.x}
                  cy={stop.y}
                  r="3"
                  fill="#F2D879"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.4 }}
                />
              </g>
            ))}
          </svg>

          {stops.map((stop, i) => (
            <motion.div
              key={stop.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + i * 0.4 }}
              className="absolute -translate-x-1/2 rounded-full border border-white/10 bg-obsidian-light/90 px-3.5 py-1.5 text-xs font-semibold text-ink/80 shadow-card backdrop-blur"
              style={{
                left: `${(stop.x / 720) * 100}%`,
                top: `${(stop.y / 320) * 100}%`,
                marginTop: i % 2 === 0 ? "18px" : "-44px",
              }}
            >
              {stop.label}
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
