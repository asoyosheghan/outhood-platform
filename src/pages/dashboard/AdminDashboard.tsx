import { useState } from "react";
import {
  Users,
  CalendarDays,
  HeartHandshake,
  FileText,
  Mail,
  TrendingUp,
  MoreVertical,
} from "lucide-react";
import Seo from "@/components/ui/Seo";
import { Badge } from "@/components/ui/Primitives";
import { upcomingEvents, campaigns, blogPosts } from "@/data/content";
import { formatKes, formatDate, progressPercent } from "@/lib/utils";

const tabs = [
  { id: "overview", label: "Overview", icon: TrendingUp },
  { id: "users", label: "Users", icon: Users },
  { id: "events", label: "Events", icon: CalendarDays },
  { id: "donations", label: "Donations", icon: HeartHandshake },
  { id: "content", label: "Content", icon: FileText },
  { id: "inbox", label: "Inbox", icon: Mail },
] as const;

type TabId = (typeof tabs)[number]["id"];

const mockUsers = [
  { id: "u1", name: "Cynthia Achieng", email: "cynthia@example.com", role: "MEMBER", status: "ACTIVE" },
  { id: "u2", name: "Brian Mutiso", email: "brian@example.com", role: "VOLUNTEER", status: "ACTIVE" },
  { id: "u3", name: "Naomi Chebet", email: "naomi@example.com", role: "MEMBER", status: "ACTIVE" },
  { id: "u4", name: "Faith Wanjiru", email: "faith@example.com", role: "ORGANIZER", status: "ACTIVE" },
  { id: "u5", name: "Kevin Otieno", email: "kevin@example.com", role: "MEMBER", status: "PENDING" },
];

const mockMessages = [
  { id: "m1", name: "James Karanja", subject: "Corporate partnership inquiry", date: "2026-06-18", read: false },
  { id: "m2", name: "Lucy Njeri", subject: "Question about volunteer roles", date: "2026-06-17", read: true },
  { id: "m3", name: "Peter Mwangi", subject: "Sponsorship for Impact Gala", date: "2026-06-15", read: true },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <>
      <Seo title="Admin Panel" description="Outhood platform administration." path="/admin" />

      <h1 className="text-2xl font-bold text-ink">Admin Panel</h1>
      <p className="mt-1.5 text-sm text-ink/50">Manage users, events, donations, and platform content.</p>

      <div className="mt-7 flex flex-wrap gap-2 border-b border-white/[0.07] pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
              activeTab === tab.id
                ? "border-gold/40 bg-gold/10 text-gold"
                : "border-white/10 text-ink/55 hover:text-ink"
            }`}
          >
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total members", value: "4,200+", icon: Users },
            { label: "Live events", value: upcomingEvents.length.toString(), icon: CalendarDays },
            { label: "Active campaigns", value: campaigns.filter((c) => c.status === "ACTIVE").length.toString(), icon: HeartHandshake },
            { label: "Unread messages", value: mockMessages.filter((m) => !m.read).length.toString(), icon: Mail },
          ].map((stat) => (
            <div key={stat.label} className="card-surface p-6">
              <stat.icon className="h-5 w-5 text-gold" />
              <p className="mt-3 text-2xl font-bold text-ink">{stat.value}</p>
              <p className="mt-1 text-xs text-ink/45">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "users" && (
        <div className="mt-8 overflow-hidden rounded-xl2 border border-white/[0.07]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.07] bg-white/[0.02] text-xs uppercase tracking-wide text-ink/40">
                <th className="px-5 py-3.5 font-semibold">Name</th>
                <th className="px-5 py-3.5 font-semibold">Email</th>
                <th className="px-5 py-3.5 font-semibold">Role</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5"></th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((u) => (
                <tr key={u.id} className="border-b border-white/[0.05] last:border-0">
                  <td className="px-5 py-4 font-medium text-ink">{u.name}</td>
                  <td className="px-5 py-4 text-ink/55">{u.email}</td>
                  <td className="px-5 py-4">
                    <Badge tone="neutral">{u.role}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <Badge tone={u.status === "ACTIVE" ? "gold" : "blue"}>{u.status}</Badge>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <MoreVertical className="ml-auto h-4 w-4 cursor-pointer text-ink/30" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "events" && (
        <div className="mt-8 overflow-hidden rounded-xl2 border border-white/[0.07]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.07] bg-white/[0.02] text-xs uppercase tracking-wide text-ink/40">
                <th className="px-5 py-3.5 font-semibold">Event</th>
                <th className="px-5 py-3.5 font-semibold">Date</th>
                <th className="px-5 py-3.5 font-semibold">Registrations</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {upcomingEvents.map((e) => (
                <tr key={e.id} className="border-b border-white/[0.05] last:border-0">
                  <td className="px-5 py-4 font-medium text-ink">{e.title}</td>
                  <td className="px-5 py-4 text-ink/55">{formatDate(e.startDate)}</td>
                  <td className="px-5 py-4 text-ink/55">
                    {e.registered}/{e.capacity}
                  </td>
                  <td className="px-5 py-4">
                    <Badge tone={e.registered >= e.capacity ? "neutral" : "gold"}>
                      {e.registered >= e.capacity ? "Full" : "Open"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "donations" && (
        <div className="mt-8 space-y-4">
          {campaigns.map((c) => {
            const pct = progressPercent(c.raisedKes, c.goalKes);
            return (
              <div key={c.id} className="card-surface flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-bold text-ink">{c.title}</p>
                  <p className="mt-1 text-xs text-ink/45">{c.beneficiary}</p>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-40">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]">
                      <div className="h-full rounded-full bg-gold-gradient" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="mt-1.5 text-xs text-ink/45">{formatKes(c.raisedKes)} / {formatKes(c.goalKes)}</p>
                  </div>
                  <Badge tone={c.status === "COMPLETED" ? "blue" : "gold"}>{c.status}</Badge>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === "content" && (
        <div className="mt-8 overflow-hidden rounded-xl2 border border-white/[0.07]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.07] bg-white/[0.02] text-xs uppercase tracking-wide text-ink/40">
                <th className="px-5 py-3.5 font-semibold">Title</th>
                <th className="px-5 py-3.5 font-semibold">Category</th>
                <th className="px-5 py-3.5 font-semibold">Author</th>
                <th className="px-5 py-3.5 font-semibold">Published</th>
              </tr>
            </thead>
            <tbody>
              {blogPosts.map((p) => (
                <tr key={p.id} className="border-b border-white/[0.05] last:border-0">
                  <td className="px-5 py-4 font-medium text-ink">{p.title}</td>
                  <td className="px-5 py-4">
                    <Badge tone="neutral">{p.category}</Badge>
                  </td>
                  <td className="px-5 py-4 text-ink/55">{p.author.name}</td>
                  <td className="px-5 py-4 text-ink/45">{formatDate(p.publishedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "inbox" && (
        <div className="mt-8 space-y-3">
          {mockMessages.map((m) => (
            <div
              key={m.id}
              className={`card-surface flex items-center justify-between gap-4 p-5 ${!m.read ? "border-gold/20" : ""}`}
            >
              <div className="flex items-center gap-3">
                {!m.read && <span className="h-2 w-2 shrink-0 rounded-full bg-gold" />}
                <div>
                  <p className="text-sm font-bold text-ink">{m.subject}</p>
                  <p className="text-xs text-ink/45">{m.name}</p>
                </div>
              </div>
              <p className="text-xs text-ink/40">{formatDate(m.date)}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
