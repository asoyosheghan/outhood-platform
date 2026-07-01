import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileText, Download } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Primitives";
import { resources } from "@/data/content";

export default function ResourcesTeaser() {
  return (
    <section className="section-pad bg-navy-fade">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Resources"
            title="Guides to help you get started"
            description="Practical, free downloads for members, volunteers, and organizers."
          />
          <Link to="/resources" className="btn-ghost shrink-0">
            Browse all resources →
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {resources.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-surface flex items-center gap-4 p-5"
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold-gradient-soft">
                <FileText className="h-5 w-5 text-gold" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-ink">{r.title}</p>
                <p className="mt-0.5 line-clamp-1 text-xs text-ink/45">{r.description}</p>
              </div>
              <Download className="h-4 w-4 shrink-0 text-ink/30" />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
