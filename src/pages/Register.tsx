import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import Seo from "@/components/ui/Seo";
import Logo from "@/components/ui/Logo";
import { Container } from "@/components/ui/Primitives";
import { useAuth } from "@/lib/AuthContext";

const registerSchema = z
  .object({
    firstName: z.string().min(2, "Enter your first name"),
    lastName: z.string().min(2, "Enter your last name"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    agreeToTerms: z.literal(true, { errorMap: () => ({ message: "You must agree to the terms to continue" }) }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  async function onSubmit(data: RegisterForm) {
    setServerError(null);
    try {
      await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setServerError("Couldn't create your account. That email may already be registered.");
    }
  }

  return (
    <>
      <Seo title="Join Outhood" description="Create your free Outhood membership account." path="/register" />

      <section className="grid min-h-screen place-items-center bg-route-glow px-5 py-20">
        <Container className="max-w-md">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/" className="flex justify-center">
              <Logo />
            </Link>

            <div className="card-surface mt-8 p-8">
              <h1 className="text-center text-2xl font-bold text-ink">Join the community</h1>
              <p className="mt-1.5 text-center text-sm text-ink/50">Free membership — no payment required</p>

              {serverError && (
                <div className="mt-5 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-xs text-red-300">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {serverError}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-ink/60">First name</label>
                    <input
                      {...register("firstName")}
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink placeholder:text-ink/30 focus:border-gold/40 focus:outline-none"
                      placeholder="Jane"
                    />
                    {errors.firstName && <p className="mt-1.5 text-xs text-red-400">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-ink/60">Last name</label>
                    <input
                      {...register("lastName")}
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink placeholder:text-ink/30 focus:border-gold/40 focus:outline-none"
                      placeholder="Wanjiku"
                    />
                    {errors.lastName && <p className="mt-1.5 text-xs text-red-400">{errors.lastName.message}</p>}
                  </div>
                </div>

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

                <div>
                  <label className="text-xs font-semibold text-ink/60">Password</label>
                  <div className="relative mt-1.5">
                    <input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 pr-11 text-sm text-ink placeholder:text-ink/30 focus:border-gold/40 focus:outline-none"
                      placeholder="At least 8 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/35"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1.5 text-xs text-red-400">{errors.password.message}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink/60">Confirm password</label>
                  <input
                    {...register("confirmPassword")}
                    type={showPassword ? "text" : "password"}
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink placeholder:text-ink/30 focus:border-gold/40 focus:outline-none"
                    placeholder="Re-enter your password"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.confirmPassword.message}</p>
                  )}
                </div>

                <label className="flex items-start gap-2.5 pt-1 text-xs text-ink/55">
                  <input type="checkbox" {...register("agreeToTerms")} className="mt-0.5 accent-gold" />
                  <span>
                    I agree to the{" "}
                    <Link to="/terms" className="text-gold hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-gold hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.agreeToTerms && <p className="text-xs text-red-400">{errors.agreeToTerms.message}</p>}

                <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
                  {isSubmitting ? "Creating account..." : "Create free account"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>

            <p className="mt-6 text-center text-sm text-ink/50">
              Already a member?{" "}
              <Link to="/login" className="font-semibold text-gold hover:underline">
                Sign in
              </Link>
            </p>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
