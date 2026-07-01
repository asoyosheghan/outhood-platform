import Seo from "@/components/ui/Seo";
import { campaigns } from "@/data/content";
import { formatKes, formatDate } from "@/lib/utils";

const myDonations = [
  { id: "d1", campaign: campaigns[0]?.title ?? "Community Fund", amount: 2500, date: "2026-05-12", method: "M-Pesa" },
  { id: "d2", campaign: campaigns[0]?.title ?? "Community Fund", amount: 2000, date: "2026-06-02", method: "Card" },
];

export default function DashboardDonations() {
  const total = myDonations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <>
      <Seo title="My Donations" description="Your donation history across Outhood campaigns." path="/dashboard/donations" />

      <h1 className="text-2xl font-bold text-ink">My Donations</h1>
      <p className="mt-1.5 text-sm text-ink/50">Thank you for funding real impact. Total given: {formatKes(total)}.</p>

      <div className="mt-8 overflow-hidden rounded-xl2 border border-white/[0.07]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/[0.07] bg-white/[0.02] text-xs uppercase tracking-wide text-ink/40">
              <th className="px-5 py-3.5 font-semibold">Campaign</th>
              <th className="px-5 py-3.5 font-semibold">Amount</th>
              <th className="px-5 py-3.5 font-semibold">Method</th>
              <th className="px-5 py-3.5 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {myDonations.map((d) => (
              <tr key={d.id} className="border-b border-white/[0.05] last:border-0">
                <td className="px-5 py-4 font-medium text-ink">{d.campaign}</td>
                <td className="px-5 py-4 text-gold">{formatKes(d.amount)}</td>
                <td className="px-5 py-4 text-ink/55">{d.method}</td>
                <td className="px-5 py-4 text-ink/45">{formatDate(d.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
