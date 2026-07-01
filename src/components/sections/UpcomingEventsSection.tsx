import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Primitives";
import EventCard from "@/components/ui/EventCard";
import { upcomingEvents } from "@/data/content";

export default function UpcomingEventsSection() {
  const events = upcomingEvents.slice(0, 4);

  return (
    <section className="section-pad">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="What's on"
            title="Upcoming events & road trips"
            description="From sunrise hikes to charity galas — find your next Outhood experience."
          />
          <Link to="/services" className="btn-ghost shrink-0">
            View all events
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
