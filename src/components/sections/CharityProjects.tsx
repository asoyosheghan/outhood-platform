import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Container, SectionHeading, Badge } from "@/components/ui/Primitives";
import { campaigns } from "@/data/content";
import { formatKes, progressPercent } from "@/lib/utils";

export default function CharityProjects() {
  return (
    <section id="charity" className="section-pad border-y border-white/[0.06] bg-obsidian-light/40">
      <Container>
        <SectionHeading
          eyebrow="Charity in motion"
          title="Active campaigns you can fund today"
          description="100% of campaign-tagged contributions go straight to the partner home or project listed."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {campaigns.map((campaign, i) => {
            const pct = progressPercent(campaign.raisedKes, campaign.goalKes);
            return (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-surface overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {campaign.coverImage ? (
                    <img src={campaign.coverImage} alt={campaign.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full bg-obsidian-light flex items-center justify-center">
                      <span className="text-ink/20 text-sm">Photo coming soon</span>
                    </div>
                  )}
                  <div className="absolute left-3.5 top-3.5">
                    <Badge tone={campaign.status === "COMPLETED" ? "blue" : "gold"}>
                      {campaign.status === "COMPLETED" ? "Funded" : "Active"}
                    </Badge>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">{campaign.beneficiary}</p>
                  <h3 className="mt-1.5 text-base font-bold text-ink">{campaign.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-ink/50">{campaign.summary}</p>

                  <div className="mt-5">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full rounded-full bg-gold-gradient"
                      />
                    </div>
                    <div className="mt-2.5 flex items-center justify-between text-xs">
                      <span className="font-semibold text-ink">{formatKes(campaign.raisedKes)}</span>
                      <span className="text-ink/40">of {formatKes(campaign.goalKes)}</span>
                    </div>
                  </div>

                  <Link to="/services#charity" className="btn-primary mt-5 w-full !py-3">
                    {campaign.status === "COMPLETED" ? "View impact report" : "Donate now"}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
