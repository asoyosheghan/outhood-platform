import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Home } from "lucide-react";
import Seo from "@/components/ui/Seo";
import { Container } from "@/components/ui/Primitives";

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" description="The page you're looking for doesn't exist." path="/404" />
      <section className="grid min-h-screen place-items-center bg-route-glow px-5">
        <Container className="text-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="font-display text-7xl font-bold text-gradient-gold sm:text-8xl">404</p>
            <h1 className="mt-4 text-2xl font-bold text-ink sm:text-3xl">This route doesn't exist on our map.</h1>
            <p className="mx-auto mt-3 max-w-sm text-sm text-ink/50">
              The page you're looking for may have moved, or never existed. Let's get you back on track.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/" className="btn-primary">
                <Home className="h-4 w-4" />
                Back home
              </Link>
              <Link to="/services" className="btn-secondary">
                Browse events
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
