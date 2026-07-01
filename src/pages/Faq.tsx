import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Seo from "@/components/ui/Seo";
import { Container, Eyebrow } from "@/components/ui/Primitives";
import { faqs } from "@/data/content";

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);
  const categories = Array.from(new Set(faqs.map((f) => f.category)));

  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        description="Answers to common questions about Outhood membership, events, volunteering, and donations."
        path="/faq"
      />

      <section className="section-pad pt-12">
        <Container className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Eyebrow>FAQ</Eyebrow>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-ink sm:text-5xl">Common questions</h1>
          </motion.div>

          <div className="mt-12 space-y-10">
            {categories.map((category) => (
              <div key={category}>
                <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">{category}</h2>
                <div className="mt-4 space-y-3">
                  {faqs
                    .filter((f) => f.category === category)
                    .map((faq) => {
                      const isOpen = openId === faq.id;
                      return (
                        <div key={faq.id} className="card-surface overflow-hidden">
                          <button
                            onClick={() => setOpenId(isOpen ? null : faq.id)}
                            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                          >
                            <span className="text-sm font-semibold text-ink">{faq.question}</span>
                            <ChevronDown
                              className={`h-4 w-4 shrink-0 text-ink/40 transition-transform ${isOpen ? "rotate-180" : ""}`}
                            />
                          </button>
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                              >
                                <p className="px-6 pb-5 text-sm leading-relaxed text-ink/55">{faq.answer}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-xl2 border border-white/[0.07] bg-white/[0.02] p-8 text-center">
            <p className="text-sm text-ink/50">
              Still have questions?{" "}
              <a href="/contact" className="text-gold hover:underline">
                Reach out to our team
              </a>
              .
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
