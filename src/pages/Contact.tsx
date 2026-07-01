import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import Seo from "@/components/ui/Seo";
import { Container, Eyebrow } from "@/components/ui/Primitives";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email address"),
  subject: z.string().min(3, "Add a short subject"),
  message: z.string().min(20, "Tell us a bit more — at least 20 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactForm) {
    await new Promise((r) => setTimeout(r, 900));
    console.log("Contact form submission", data);
    setSubmitted(true);
    reset();
  }

  return (
    <>
      <Seo
        title="Contact"
        description="Get in touch with the Outhood team — partnerships, membership questions, or general inquiries."
        path="/contact"
      />

      <section className="section-pad pt-12">
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Eyebrow>Get in touch</Eyebrow>
            <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Let's talk — trip, partnership, or otherwise.
            </h1>
          </motion.div>

          <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div className="space-y-5">
              <div className="card-surface flex items-start gap-4 p-6">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-sm font-bold text-ink">Email us</p>
                  <p className="mt-1 text-sm text-ink/55">outhoodafrica@gmail.com</p>
                </div>
              </div>
              <div className="card-surface flex items-start gap-4 p-6">
                <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-sm font-bold text-ink">WhatsApp</p>
                  <p className="mt-1 text-sm text-ink/55">+254 7XX XXX XXX</p>
                </div>
              </div>
              <div className="card-surface flex items-start gap-4 p-6">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-sm font-bold text-ink">Visit us</p>
                  <p className="mt-1 text-sm text-ink/55">Westlands, Nairobi, Kenya</p>
                </div>
              </div>

              <div className="card-surface flex aspect-[4/3] items-center justify-center overflow-hidden">
                <div className="text-center text-ink/30">
                  <MapPin className="mx-auto h-8 w-8" />
                  <p className="mt-2 text-xs">Interactive map placeholder</p>
                </div>
              </div>
            </div>

            <div className="card-surface p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle2 className="h-10 w-10 text-gold" />
                  <p className="mt-4 text-lg font-bold text-ink">Message sent</p>
                  <p className="mt-2 max-w-xs text-sm text-ink/50">
                    Thanks for reaching out — our team replies within 1–2 business days.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-ghost mt-6">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold text-ink/60">Full name</label>
                      <input
                        {...register("name")}
                        className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink placeholder:text-ink/30 focus:border-gold/40 focus:outline-none"
                        placeholder="Jane Wanjiku"
                      />
                      {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-ink/60">Email</label>
                      <input
                        {...register("email")}
                        className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink placeholder:text-ink/30 focus:border-gold/40 focus:outline-none"
                        placeholder="you@example.com"
                      />
                      {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-ink/60">Subject</label>
                    <input
                      {...register("subject")}
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink placeholder:text-ink/30 focus:border-gold/40 focus:outline-none"
                      placeholder="Partnership inquiry"
                    />
                    {errors.subject && <p className="mt-1.5 text-xs text-red-400">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-ink/60">Message</label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink placeholder:text-ink/30 focus:border-gold/40 focus:outline-none"
                      placeholder="Tell us a bit about what you're reaching out for..."
                    />
                    {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message.message}</p>}
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
                    {isSubmitting ? "Sending..." : "Send message"}
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
