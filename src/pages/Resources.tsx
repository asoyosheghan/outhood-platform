import { motion } from "framer-motion";
import { FileText, Download, BookOpen, LayoutTemplate } from "lucide-react";
import Seo from "@/components/ui/Seo";
import { Container, Eyebrow, Badge } from "@/components/ui/Primitives";
import { resources } from "@/data/content";

const typeIcon = { PDF: FileText, GUIDE: BookOpen, TEMPLATE: LayoutTemplate };

export default function Resources() {
  return (
    <>
      <Seo
        title="Resources"
        description="Free guides, checklists, and templates for Outhood members, volunteers, and event organizers."
        path="/resources"
      />

      <section className="section-pad pt-12">
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Eyebrow>Resources</Eyebrow>
            <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Everything you need, before you need it.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink/60">
              Practical guides for trips, volunteering, fundraising, and organizing — free for every member.
            </p>
          </motion.div>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {resources.map((r, i) => {
              const Icon = typeIcon[r.type];
              return (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="card-surface flex items-start gap-4 p-6"
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold-gradient-soft">
                    <Icon className="h-5 w-5 text-gold" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge tone="neutral">{r.category}</Badge>
                      <span className="text-xs text-ink/35">{(r.fileSizeKb / 1024).toFixed(1)} MB</span>
                    </div>
                    <p className="mt-2 text-sm font-bold text-ink">{r.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink/50">{r.description}</p>
                    <button className="btn-ghost mt-4 !text-gold">
                      <Download className="h-3.5 w-3.5" />
                      Download {r.type === "PDF" ? "PDF" : "file"}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-14 rounded-xl2 border border-white/[0.07] bg-white/[0.02] p-8 text-center">
            <p className="text-sm text-ink/50">
              Looking for something specific? Members can request a resource directly from their dashboard, or
              reach out via our <a href="/contact" className="text-gold hover:underline">contact page</a>.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
