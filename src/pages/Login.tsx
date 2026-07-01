import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import Seo from "@/components/ui/Seo";
import Logo from "@/components/ui/Logo";
import { Container } from "@/components/ui/Primitives";
import { useAuth } from "@/lib/AuthContext";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(data: LoginForm) {
    setServerError(null);
    try {
      await login(data.email, data.password);
      const redirectTo = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? "/dashboard";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setServerError("Couldn't sign you in. Check your email and password and try again.");
    }
  }

  return (
    <>
      <Seo title="Sign In" description="Sign in to your Outhood account." path="/login" />

      <section className="grid min-h-screen place-items-center bg-route-glow px-5 py-20">
        <Container className="max-w-md">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/" className="flex justify-center">
              <Logo />
            </Link>

            <div className="card-surface mt-8 p-8">
              <h1 className="text-center text-2xl font-bold text-ink">Welcome back</h1>
              <p className="mt-1.5 text-center text-sm text-ink/50">Sign in to continue to your dashboard</p>

              {serverError && (
                <div className="mt-5 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-xs text-red-300">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {serverError}
                </div>
              )}

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

                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-ink/60">Password</label>
                    <Link to="/forgot-password" className="text-xs text-gold hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative mt-1.5">
                    <input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 pr-11 text-sm text-ink placeholder:text-ink/30 focus:border-gold/40 focus:outline-none"
                      placeholder="••••••••"
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

                <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
                  {isSubmitting ? "Signing in..." : "Sign in"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>

            <p className="mt-6 text-center text-sm text-ink/50">
              New to Outhood?{" "}
              <Link to="/register" className="font-semibold text-gold hover:underline">
                Create an account
              </Link>
            </p>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
