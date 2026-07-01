import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Primitives";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="section-pad">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-xl2 border border-gold/15 bg-gold-gradient-soft px-8 py-14 text-center sm:px-16"
        >
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/10 blur-[100px]" />
          <h2 className="relative text-2xl font-bold text-ink sm:text-3xl">Never miss a trip or campaign</h2>
          <p className="relative mx-auto mt-3 max-w-md text-sm text-ink/55">
            Monthly updates on new road trips, events, and the campaigns your community is funding.
          </p>

          {submitted ? (
            <div className="relative mx-auto mt-7 flex max-w-md items-center justify-center gap-2 text-sm font-semibold text-gold">
              <CheckCircle2 className="h-5 w-5" />
              You're subscribed — welcome to the list.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-full border border-white/15 bg-obsidian/60 px-5 py-3.5 text-sm text-ink placeholder:text-ink/35 focus:border-gold/40 focus:outline-none"
              />
              <button type="submit" className="btn-primary shrink-0">
                Subscribe
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
