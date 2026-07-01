import { Link } from "react-router-dom";
import { CalendarCheck, HeartHandshake, Award, ArrowRight } from "lucide-react";
import Seo from "@/components/ui/Seo";
import { useAuth } from "@/lib/AuthContext";
import { upcomingEvents } from "@/data/content";
import { formatDate } from "@/lib/utils";

export default function DashboardHome() {
  const { user } = useAuth();
  const myEvents = upcomingEvents.slice(0, 2);

  return (
    <>
      <Seo title="Dashboard" description="Your Outhood member dashboard." path="/dashboard" />

      <h1 className="text-2xl font-bold text-ink">Welcome back, {user?.firstName ?? "there"} 👋</h1>
      <p className="mt-1.5 text-sm text-ink/50">Here's what's happening with your Outhood account.</p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="card-surface p-6">
          <CalendarCheck className="h-5 w-5 text-gold" />
          <p className="mt-3 text-2xl font-bold text-ink">2</p>
          <p className="mt-1 text-xs text-ink/45">Upcoming event registrations</p>
        </div>
        <div className="card-surface p-6">
          <HeartHandshake className="h-5 w-5 text-glow-soft" />
          <p className="mt-3 text-2xl font-bold text-ink">KES 4,500</p>
          <p className="mt-1 text-xs text-ink/45">Total donated to campaigns</p>
        </div>
        <div className="card-surface p-6">
          <Award className="h-5 w-5 text-gold" />
          <p className="mt-3 text-2xl font-bold capitalize text-ink">
            {user?.membershipStatus?.toLowerCase() ?? "active"}
          </p>
          <p className="mt-1 text-xs text-ink/45">Membership status</p>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-ink">Your upcoming events</h2>
          <Link to="/dashboard/events" className="btn-ghost text-xs">
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-5 space-y-3">
          {myEvents.map((event) => (
            <div key={event.id} className="card-surface flex items-center justify-between gap-4 p-5">
              <div className="flex items-center gap-4">
                <img src={event.coverImage} alt="" className="h-12 w-12 rounded-lg object-cover" />
                <div>
                  <p className="text-sm font-bold text-ink">{event.title}</p>
                  <p className="text-xs text-ink/45">{formatDate(event.startDate)} · {event.location}</p>
                </div>
              </div>
              <span className="rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
                Confirmed
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Link to="/services" className="card-surface flex items-center justify-between p-6 transition-colors hover:border-gold/25">
          <div>
            <p className="text-sm font-bold text-ink">Browse upcoming events</p>
            <p className="mt-1 text-xs text-ink/45">Find your next road trip or gathering</p>
          </div>
          <ArrowRight className="h-4 w-4 text-ink/30" />
        </Link>
        <Link to="/services#charity" className="card-surface flex items-center justify-between p-6 transition-colors hover:border-gold/25">
          <div>
            <p className="text-sm font-bold text-ink">Support a campaign</p>
            <p className="mt-1 text-xs text-ink/45">Fund an active charity project</p>
          </div>
          <ArrowRight className="h-4 w-4 text-ink/30" />
        </Link>
      </div>
    </>
  );
}
