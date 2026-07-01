import { MapPin, Download } from "lucide-react";
import Seo from "@/components/ui/Seo";
import { Badge } from "@/components/ui/Primitives";
import { upcomingEvents } from "@/data/content";
import { formatDate } from "@/lib/utils";

export default function DashboardEvents() {
  const registrations = upcomingEvents.slice(0, 3);

  return (
    <>
      <Seo title="My Events" description="Your event and road trip registrations." path="/dashboard/events" />

      <h1 className="text-2xl font-bold text-ink">My Events</h1>
      <p className="mt-1.5 text-sm text-ink/50">Everything you've registered for, in one place.</p>

      <div className="mt-8 space-y-4">
        {registrations.map((event) => (
          <div key={event.id} className="card-surface flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <img src={event.coverImage} alt="" className="h-14 w-14 rounded-xl object-cover" />
              <div>
                <p className="text-sm font-bold text-ink">{event.title}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-ink/45">
                  <MapPin className="h-3.5 w-3.5" />
                  {event.location} · {formatDate(event.startDate)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge tone="gold">Confirmed</Badge>
              <button className="btn-secondary !px-4 !py-2 text-xs">
                <Download className="h-3.5 w-3.5" />
                Ticket
              </button>
            </div>
          </div>
        ))}

        {registrations.length === 0 && (
          <div className="card-surface p-10 text-center text-sm text-ink/40">
            You haven't registered for any events yet.
          </div>
        )}
      </div>
    </>
  );
}
