import { useState } from "react";
import { Save } from "lucide-react";
import Seo from "@/components/ui/Seo";
import { useAuth } from "@/lib/AuthContext";

export default function DashboardProfile() {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <>
      <Seo title="Profile Settings" description="Manage your Outhood profile and account settings." path="/dashboard/profile" />

      <h1 className="text-2xl font-bold text-ink">Profile Settings</h1>
      <p className="mt-1.5 text-sm text-ink/50">Update your personal information.</p>

      <form onSubmit={handleSave} className="card-surface mt-8 max-w-xl space-y-5 p-7">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatarUrl || `https://i.pravatar.cc/100?u=${user?.email}`}
            alt=""
            className="h-16 w-16 rounded-full object-cover"
          />
          <button type="button" className="btn-secondary !px-4 !py-2 text-xs">
            Change photo
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-ink/60">First name</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink focus:border-gold/40 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-ink/60">Last name</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink focus:border-gold/40 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-ink/60">Email</label>
          <input
            value={user?.email ?? ""}
            disabled
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-ink/50"
          />
        </div>

        <button type="submit" className="btn-primary">
          {saved ? "Saved!" : "Save changes"}
          <Save className="h-4 w-4" />
        </button>
      </form>
    </>
  );
}
