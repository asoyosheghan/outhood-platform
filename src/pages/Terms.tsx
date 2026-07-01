import { motion } from "framer-motion";
import Seo from "@/components/ui/Seo";
import { Container, Eyebrow } from "@/components/ui/Primitives";

const sections = [
  {
    title: "1. Acceptance of terms",
    body: "By creating an account or using Outhood's website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.",
  },
  {
    title: "2. Eligibility",
    body: "Outhood is intended for users aged 18 and above. By registering, you confirm that you meet this age requirement and that the information you provide is accurate.",
  },
  {
    title: "3. Events, road trips, and bookings",
    body: "Registering for an event or road trip constitutes a booking subject to availability and full payment where applicable. Outhood reserves the right to modify, postpone, or cancel events due to safety, weather, or logistical concerns, with reasonable notice where possible.",
  },
  {
    title: "4. Payments and refunds",
    body: "Prices for events and trips are listed in Kenyan Shillings (KES) unless stated otherwise. Cancellations made at least 7 days before an event are refunded in full minus a processing fee; cancellations within 7 days are refunded at 50%, except where a specific event states otherwise.",
  },
  {
    title: "5. Donations and campaigns",
    body: "Donations made through Outhood's charity campaigns are directed to the stated cause or partner organization. Donations are generally non-refundable once processed, except in cases of demonstrable error.",
  },
  {
    title: "6. Code of conduct",
    body: "Members and volunteers are expected to treat fellow members, staff, partner organizations, and especially children at partner homes with respect and care. Outhood reserves the right to suspend or terminate accounts that violate this code of conduct.",
  },
  {
    title: "7. Assumption of risk",
    body: "Road trips, hikes, and outdoor events carry inherent risk. By participating, you acknowledge these risks and agree to follow safety guidance provided by Outhood organizers and guides.",
  },
  {
    title: "8. Intellectual property",
    body: "All content on the Outhood platform, including branding, design, and written content, is the property of Outhood unless otherwise credited, and may not be reproduced without permission.",
  },
  {
    title: "9. Limitation of liability",
    body: "Outhood is not liable for indirect, incidental, or consequential damages arising from use of the platform or participation in events, to the maximum extent permitted by Kenyan law.",
  },
  {
    title: "10. Changes to these terms",
    body: "We may revise these terms periodically. Continued use of the platform after changes take effect constitutes acceptance of the revised terms.",
  },
];

export default function Terms() {
  return (
    <>
      <Seo
        title="Terms of Service"
        description="The terms governing your use of the Outhood platform, events, and donations."
        path="/terms"
      />
      <section className="section-pad pt-12">
        <Container className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Eyebrow>Legal</Eyebrow>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-ink sm:text-5xl">Terms of Service</h1>
            <p className="mt-4 text-sm text-ink/40">Last updated: June 1, 2026</p>
            <p className="mt-6 text-base leading-relaxed text-ink/60">
              These Terms of Service govern your access to and use of the Outhood website, mobile experience, events,
              and related services. Please read them carefully.
            </p>
          </motion.div>

          <div className="mt-12 space-y-10">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-lg font-bold text-ink">{s.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink/55">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-xl2 border border-white/[0.07] bg-white/[0.02] p-8 text-sm text-ink/50">
            Questions about these terms? Contact us at{" "}
            <a href="mailto:legal@outhood.africa" className="text-gold hover:underline">
              legal@outhood.africa
            </a>
            .
          </div>
        </Container>
      </section>
    </>
  );
}
