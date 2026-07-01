import { Link } from "react-router-dom";
import { Instagram, Twitter, Youtube, MessageCircle, ArrowUpRight } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { Container } from "@/components/ui/Primitives";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "About Outhood", to: "/about" },
      { label: "Services", to: "/services" },
      { label: "Portfolio", to: "/portfolio" },
      { label: "Community", to: "/community" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", to: "/blog" },
      { label: "Guides & Downloads", to: "/resources" },
      { label: "FAQ", to: "/faq" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-obsidian-light">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full bg-gold/5 blur-[120px]" />

      <Container className="relative py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink/55">
              Africa's youth lifestyle and impact community — road trips, events, and a network built to turn
              unforgettable experiences into real change.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Instagram, Twitter, Youtube, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-ink/60 transition-colors hover:border-gold/40 hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-ink/65 transition-colors hover:text-gold">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-ink/40">© {new Date().getFullYear()} Outhood. All rights reserved. Nairobi, Kenya.</p>
          <a href="mailto:outhoodafrica@gmail.com" className="group flex items-center gap-1.5 text-xs text-ink/50 hover:text-gold">
            outhoodafrica@gmail.com
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
