import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  HeartHandshake,
  UserCircle,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import { useAuth } from "@/lib/AuthContext";
import { cn } from "@/lib/utils";

const memberLinks = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/dashboard/events", label: "My Events", icon: CalendarCheck },
  { to: "/dashboard/donations", label: "My Donations", icon: HeartHandshake },
  { to: "/dashboard/profile", label: "Profile", icon: UserCircle },
];

const ADMIN_ROLES = ["ADMIN", "SUPER_ADMIN"];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = !!user && ADMIN_ROLES.includes(user.role);

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="flex min-h-screen bg-obsidian">
      <aside className="hidden w-64 shrink-0 border-r border-white/[0.06] bg-obsidian-light/30 lg:flex lg:flex-col">
        <div className="px-6 py-6">
          <Logo />
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {memberLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                  isActive ? "bg-gold/10 text-gold" : "text-ink/60 hover:bg-white/5 hover:text-ink"
                )
              }
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </NavLink>
          ))}

          {isAdmin && (
            <>
              <p className="px-3.5 pb-1.5 pt-5 text-[11px] font-semibold uppercase tracking-wider text-ink/30">
                Admin
              </p>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                    isActive ? "bg-glow/10 text-glow-soft" : "text-ink/60 hover:bg-white/5 hover:text-ink"
                  )
                }
              >
                <ShieldCheck className="h-4 w-4" />
                Admin Panel
              </NavLink>
            </>
          )}
        </nav>

        <div className="border-t border-white/[0.06] p-4">
          <div className="flex items-center gap-3 rounded-xl px-2 py-2">
            <img
              src={user?.avatarUrl || `https://i.pravatar.cc/64?u=${user?.email}`}
              alt=""
              className="h-9 w-9 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="truncate text-xs text-ink/40">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-2 flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink/55 transition-colors hover:bg-white/5 hover:text-red-300"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <Outlet />
      </main>
    </div>
  );
}
