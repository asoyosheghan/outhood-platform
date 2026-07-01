import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { useAuth } from "@/lib/AuthContext";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  {
    label: "Explore",
    children: [
      { label: "Portfolio", to: "/portfolio" },
      { label: "Blog", to: "/blog" },
      { label: "Resources", to: "/resources" },
      { label: "Community", to: "/community" },
    ],
  },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-white/[0.06] bg-obsidian/85 backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <div className="container-app flex h-[72px] items-center justify-between">
        <Link to="/" aria-label="Outhood home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setExploreOpen(true)}
                onMouseLeave={() => setExploreOpen(false)}
              >
                <button className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-ink/75 transition-colors hover:text-ink">
                  {link.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                <AnimatePresence>
                  {exploreOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full w-48 rounded-2xl border border-white/10 bg-obsidian-light/95 p-1.5 shadow-card backdrop-blur-xl"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className="block rounded-xl px-3.5 py-2.5 text-sm text-ink/75 transition-colors hover:bg-white/5 hover:text-gold"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive ? "text-gold" : "text-ink/75 hover:text-ink"
                  )
                }
              >
                {link.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <Link to="/dashboard" className="btn-secondary !px-5 !py-2.5 text-xs">
              {user?.firstName ?? "Dashboard"}
            </Link>
          ) : (
            <Link to="/login" className="btn-ghost">
              Sign in
            </Link>
          )}
          <Link to={isAuthenticated ? "/dashboard" : "/register"} className="btn-primary !px-5 !py-2.5 text-xs">
            Join Community
          </Link>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-ink lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/[0.06] bg-obsidian/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container-app flex flex-col gap-1 py-4">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="py-1">
                    <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-ink/40">
                      {link.label}
                    </p>
                    {link.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className="block rounded-xl px-3 py-2.5 text-sm text-ink/80 hover:bg-white/5"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink/80 hover:bg-white/5"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="mt-3 flex flex-col gap-2 border-t border-white/[0.06] pt-4">
                {isAuthenticated ? (
                  <Link to="/dashboard" className="btn-secondary w-full">
                    Go to dashboard
                  </Link>
                ) : (
                  <Link to="/login" className="btn-secondary w-full">
                    Sign in
                  </Link>
                )}
                <Link to={isAuthenticated ? "/dashboard" : "/register"} className="btn-primary w-full">
                  Join Community
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
