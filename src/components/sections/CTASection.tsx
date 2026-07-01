import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Primitives";

export default function CTASection() {
  return (
    <section className="section-pad">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-xl2 border border-white/[0.08] bg-obsidian-light px-8 py-16 text-center sm:px-16"
        >
          <div className="pointer-events-none absolute inset-0 bg-route-glow" />
          <h2 className="relative font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
            Your next road trip funds <br className="hidden sm:block" />
            <span className="text-gradient-gold">someone else's next chapter.</span>
          </h2>
          <p className="relative mx-auto mt-5 max-w-lg text-ink/55">
            Join thousands of young people turning adventure into impact, one trip and one campaign at a time.
          </p>
          <div className="relative mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <Link to="/register" className="btn-primary">
              Join Community
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-secondary">
              Partner with us
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
