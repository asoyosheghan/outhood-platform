import { motion } from "framer-motion";
import Seo from "@/components/ui/Seo";
import { Container, Eyebrow } from "@/components/ui/Primitives";

const sections = [
  {
    title: "1. Information we collect",
    body: "When you create an Outhood account, register for an event, or make a donation, we collect information such as your name, email address, phone number, payment details (processed securely through Stripe or M-Pesa), and any information you choose to share in your profile.",
  },
  {
    title: "2. How we use your information",
    body: "We use your information to process event registrations and donations, communicate updates about trips and campaigns, personalize your experience on the platform, and improve our services. We do not sell your personal data to third parties.",
  },
  {
    title: "3. Payment processing",
    body: "Payments are processed through PCI-compliant third-party providers, including Stripe and M-Pesa. Outhood does not store full payment card numbers on our servers.",
  },
  {
    title: "4. Data sharing",
    body: "We may share limited information with trusted partners who help us operate the platform (such as payment processors and email delivery services), and with partner organizations (such as children's homes) only where necessary to coordinate an event or donation you've opted into.",
  },
  {
    title: "5. Data retention",
    body: "We retain account information for as long as your account is active, and donation/event records as required for financial and legal compliance. You may request deletion of your account at any time, subject to legal retention requirements.",
  },
  {
    title: "6. Your rights",
    body: "You have the right to access, correct, or request deletion of your personal data. You can manage most of this directly from your account dashboard, or by contacting our team.",
  },
  {
    title: "7. Cookies and analytics",
    body: "We use cookies and analytics tools (such as Google Analytics) to understand how the platform is used and to improve the member experience. You can control cookie preferences through your browser settings.",
  },
  {
    title: "8. Changes to this policy",
    body: "We may update this policy from time to time. Material changes will be communicated via email or a notice on the platform before they take effect.",
  },
];

export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="How Outhood collects, uses, and protects your personal information."
        path="/privacy"
      />
      <section className="section-pad pt-12">
        <Container className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Eyebrow>Legal</Eyebrow>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-ink sm:text-5xl">Privacy Policy</h1>
            <p className="mt-4 text-sm text-ink/40">Last updated: June 1, 2026</p>
            <p className="mt-6 text-base leading-relaxed text-ink/60">
              This Privacy Policy explains how Outhood ("we," "us," "our") collects, uses, and protects your
              information when you use our website, mobile experience, and related services.
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
            Questions about this policy? Contact us at{" "}
            <a href="mailto:privacy@outhood.africa" className="text-gold hover:underline">
              privacy@outhood.africa
            </a>
            .
          </div>
        </Container>
      </section>
    </>
  );
}
