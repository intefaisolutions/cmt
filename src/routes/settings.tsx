import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { User, Building2, Bell, KeyRound, Palette, Sparkles } from "lucide-react";
import { AppShell, Card, PrimaryButton } from "@/components/app-shell";
import { useDataset } from "@/lib/crm-store";
import { useTheme } from "@/lib/theme-context";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — INEFAI.CRM" }] }),
  component: SettingsPage,
});

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "company", label: "Company", icon: Building2 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "api", label: "API Keys", icon: KeyRound },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "ai", label: "AI Assistant", icon: Sparkles },
] as const;

function SettingsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("company");
  const ds = useDataset();
  const co = ds.company;
  const { theme, setTheme } = useTheme();

  return (
    <AppShell title="Settings" subtitle="Company branding, bank details, AI & appearance">
      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-12 lg:col-span-3 p-3">
          <nav className="space-y-0.5">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={"w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-colors " + (tab === t.id ? "bg-accent/5 text-accent" : "hover:bg-secondary text-muted-foreground hover:text-foreground")}>
                <t.icon className="size-3.5" /> {t.label}
              </button>
            ))}
          </nav>
        </Card>

        <Card className="col-span-12 lg:col-span-9">
          {tab === "profile" && (
            <div className="space-y-5 max-w-xl">
              <h3 className="text-sm font-bold">Profile</h3>
              <Field label="Full name"><input className="input" defaultValue="Marcus Vane" /></Field>
              <Field label="Email"><input className="input" defaultValue="marcus@inefai.it" /></Field>
              <Field label="Role"><input className="input" defaultValue="Founder & Principal Engineer" /></Field>
              <PrimaryButton onClick={() => toast.success("Profile saved")}>Save changes</PrimaryButton>
            </div>
          )}
          {tab === "company" && (
            <div className="space-y-5 max-w-2xl">
              <h3 className="text-sm font-bold">Company Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Company name"><input className="input" defaultValue={co.name} /></Field>
                <Field label="Tagline"><input className="input" defaultValue={co.tagline} /></Field>
                <Field label="GST Number"><input className="input" defaultValue={co.gst} /></Field>
                <Field label="Website"><input className="input" defaultValue={co.website} /></Field>
                <Field label="Email"><input className="input" defaultValue={co.email} /></Field>
                <Field label="Phone"><input className="input" defaultValue={co.phone} /></Field>
              </div>
              <Field label="Address"><input className="input" defaultValue={`${co.address}, ${co.city}, ${co.state}, ${co.country}`} /></Field>
              <h4 className="text-xs font-bold pt-2 border-t border-border">Bank Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Bank Name"><input className="input" defaultValue={co.bankName} /></Field>
                <Field label="Account Number"><input className="input" defaultValue={co.accountNumber} /></Field>
                <Field label="IFSC / SWIFT"><input className="input" defaultValue={co.ifsc} /></Field>
                <Field label="UPI ID"><input className="input" defaultValue={co.upiId} /></Field>
              </div>
              <Field label="Signature"><input className="input" defaultValue={co.signature} /></Field>
              <div className="p-4 rounded-lg border border-border bg-secondary/40 text-center">
                <p className="text-[10px] font-mono uppercase text-muted-foreground mb-2">UPI QR Code</p>
                <div className="size-24 mx-auto bg-white rounded-lg border border-border grid place-items-center text-xs text-muted-foreground">QR</div>
                <p className="text-[10px] font-mono mt-2">{co.upiId}</p>
              </div>
              <PrimaryButton onClick={() => toast.success("Company settings saved")}>Update branding</PrimaryButton>
            </div>
          )}
          {tab === "notifications" && (
            <div className="space-y-4 max-w-xl">
              <h3 className="text-sm font-bold">Notification Preferences</h3>
              {["Payment due reminders", "Proposal pending alerts", "Client follow-up reminders", "Project deadline alerts", "Invoice generated", "Task assigned", "Weekly digest"].map((n) => (
                <label key={n} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <span className="text-sm">{n}</span>
                  <input type="checkbox" defaultChecked className="accent-accent size-4" />
                </label>
              ))}
            </div>
          )}
          {tab === "api" && (
            <div className="space-y-4 max-w-xl">
              <h3 className="text-sm font-bold">API Keys</h3>
              <div className="p-4 rounded-lg border border-border bg-secondary/40">
                <p className="text-[10px] font-mono uppercase text-muted-foreground">Production key</p>
                <p className="font-mono text-xs mt-1">inefai_sk_live_••••••••••••a4f2</p>
              </div>
              <PrimaryButton onClick={() => toast.success("New API key generated")}>Generate new key</PrimaryButton>
            </div>
          )}
          {tab === "appearance" && (
            <div className="space-y-5 max-w-xl">
              <h3 className="text-sm font-bold">Appearance</h3>
              <div className="grid grid-cols-2 gap-3">
                {(["light", "dark"] as const).map((m) => (
                  <button key={m} onClick={() => setTheme(m)} className={"p-4 rounded-lg border cursor-pointer transition-colors " + (theme === m ? "border-accent ring-1 ring-accent" : "border-border hover:border-accent/50")}>
                    <div className={"h-16 rounded mb-3 " + (m === "light" ? "bg-white border border-border" : "bg-zinc-900")} />
                    <p className="text-xs font-semibold capitalize">{m} Mode</p>
                  </button>
                ))}
              </div>
            </div>
          )}
          {tab === "ai" && (
            <div className="space-y-5 max-w-xl">
              <h3 className="text-sm font-bold">AI Assistant</h3>
              <div className="p-4 rounded-lg border border-accent/30 bg-accent/5">
                <div className="flex gap-3"><Sparkles className="size-4 text-accent shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-semibold text-accent">AI Features Ready</p>
                    <p className="text-muted-foreground mt-0.5">Requirement summarization, proposal generation, cost estimation, and email drafting across the app.</p>
                  </div>
                </div>
              </div>
              {["AI Summary — summarize client requirements", "AI Proposal — auto-generate proposals", "AI Estimate — timeline & cost suggestions", "AI Email — professional email drafts"].map((n) => (
                <label key={n} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <span className="text-sm">{n}</span>
                  <input type="checkbox" defaultChecked className="accent-accent size-4" />
                </label>
              ))}
            </div>
          )}
          <style>{`.input{width:100%;background:var(--color-secondary);border:1px solid var(--color-border);border-radius:6px;padding:8px 10px;font-size:13px;outline:none}.input:focus{box-shadow:0 0 0 1px var(--color-accent)}`}</style>
        </Card>
      </div>
    </AppShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-1.5">{label}</label>{children}</div>;
}
