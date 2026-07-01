import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";
import Seo from "@/components/ui/Seo";
import Logo from "@/components/ui/Logo";
import { Container } from "@/components/ui/Primitives";
import { api } from "@/lib/api";

const schema = z.object({ email: z.string().email("Enter a valid email address") });
type ForgotForm = z.infer<typeof schema>;

export default function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotForm>({ resolver: zodResolver(schema) });

  async function onSubmit(data: ForgotForm) {
    try {
      await api.post("/auth/forgot-password", data);
    } catch {
      // Intentionally swallow errors here — avoid leaking which emails are registered
    } finally {
      setSubmitted(true);
    }
  }

  return (
    <>
      <Seo title="Reset Password" description="Reset your Outhood account password." path="/forgot-password" />

      <section className="grid min-h-screen place-items-center bg-route-glow px-5 py-20">
        <Container className="max-w-md">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/" className="flex justify-center">
              <Logo />
            </Link>

            <div className="card-surface mt-8 p-8">
              {submitted ? (
                <div className="flex flex-col items-center py-4 text-center">
                  <CheckCircle2 className="h-10 w-10 text-gold" />
                  <h1 className="mt-4 text-xl font-bold text-ink">Check your email</h1>
                  <p className="mt-2 text-sm leading-relaxed text-ink/50">
                    If an account exists for that email, we've sent a link to reset your password. It's valid for
                    30 minutes.
                  </p>
                </div>
              ) : (
                <>
                  <h1 className="text-center text-2xl font-bold text-ink">Reset your password</h1>
                  <p className="mt-1.5 text-center text-sm text-ink/50">
                    Enter your email and we'll send you a reset link
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-ink/60">Email</label>
                      <input
                        {...register("email")}
                        type="email"
                        className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink placeholder:text-ink/30 focus:border-gold/40 focus:outline-none"
                        placeholder="you@example.com"
                      />
                      {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>}
                    </div>

                    <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
                      {isSubmitting ? "Sending..." : "Send reset link"}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                </>
              )}
            </div>

            <Link to="/login" className="btn-ghost mx-auto mt-6 w-fit">
              <ArrowLeft className="h-4 w-4" />
              Back to sign in
            </Link>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
