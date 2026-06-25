import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download, Printer, Mail, Sparkles, Check, Send } from "lucide-react";
import { AppShell, Card, PrimaryButton, StatusPill } from "@/components/app-shell";
import { useBusiness } from "@/lib/business-context";
import { useDataset } from "@/lib/crm-store";
import { statusToneMap } from "@/lib/crm-helpers";
import { toast } from "sonner";

export const Route = createFileRoute("/proposals")({
  head: () => ({ meta: [{ title: "Proposal Builder — INEFAI.CRM" }] }),
  component: ProposalsPage,
});

function ProposalsPage() {
  const { mode, label } = useBusiness();
  const ds = useDataset();
  const catalog = ds.featureCatalog;

  const [client, setClient] = useState(ds.clients[0]?.companyName ?? "");
  const [title, setTitle] = useState(mode === "it" ? "Cloud Modernization Engagement" : "Q3 Growth Marketing Program");
  const [scope, setScope] = useState(
    mode === "it"
      ? "End-to-end migration of legacy infrastructure to AWS, including DevOps pipelines, observability, and a 30-day post-launch hypercare window."
      : "Full-funnel growth program covering paid social, content, lifecycle email, and weekly performance analytics.",
  );
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [timelineWeeks, setTimelineWeeks] = useState(12);
  const [price, setPrice] = useState(48000);
  const [terms, setTerms] = useState("40% upfront · 30% at midpoint · 30% on delivery");
  const [gstRate] = useState(18);

  const allFeatures = useMemo(() => Object.entries(catalog).flatMap(([cat, feats]) => feats.map((f) => ({ cat, name: f }))), [catalog]);
  const gst = Math.round(price * gstRate / 100);
  const total = price + gst;

  const toggleFeature = (f: string) =>
    setSelectedFeatures((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const handleSend = () => {
    toast.success("Proposal sent!", { description: `Sent to ${client} via email with PDF attachment.` });
  };

  return (
    <AppShell
      title="Proposal Builder"
      subtitle="Select features → auto-generate branded proposal → send in one click"
      actions={
        <>
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-border rounded-md hover:bg-secondary"><Printer className="size-3.5" /> Print</button>
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-border rounded-md hover:bg-secondary"><Download className="size-3.5" /> PDF</button>
          <button onClick={handleSend} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-accent text-accent-foreground rounded-md hover:opacity-90"><Send className="size-3.5" /> Send Proposal</button>
        </>
      }
    >
      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-12 lg:col-span-5">
          <h3 className="text-sm font-bold mb-5">Feature Selection</h3>
          <div className="space-y-4">
            <Field label="Client">
              <select value={client} onChange={(e) => setClient(e.target.value)} className="input">
                {ds.clients.map((c) => <option key={c.id} value={c.companyName}>{c.companyName}</option>)}
              </select>
            </Field>
            <Field label="Project Title">
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="input" />
            </Field>
            <Field label="Scope of Work">
              <textarea value={scope} onChange={(e) => setScope(e.target.value)} rows={3} className="input" />
            </Field>

            {Object.entries(catalog).map(([category, features]) => (
              <div key={category}>
                <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">{category}</p>
                <div className="flex flex-wrap gap-1.5">
                  {features.map((f) => {
                    const on = selectedFeatures.includes(f);
                    return (
                      <button key={f} type="button" onClick={() => toggleFeature(f)} className={"px-2.5 py-1 text-[10px] rounded-md border transition-colors " + (on ? "bg-accent text-accent-foreground border-accent" : "bg-secondary border-border hover:border-accent/50")}>
                        {on && <Check className="size-3 inline -mt-0.5 mr-1" />}{f}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="grid grid-cols-2 gap-3">
              <Field label="Timeline (weeks)"><input type="number" value={timelineWeeks} onChange={(e) => setTimelineWeeks(Number(e.target.value))} className="input" /></Field>
              <Field label="Base Price ($)"><input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="input" /></Field>
            </div>
            <Field label="Payment Terms"><input value={terms} onChange={(e) => setTerms(e.target.value)} className="input" /></Field>

            <div className="p-4 rounded-lg border border-accent/30 bg-accent/5">
              <div className="flex gap-3"><Sparkles className="size-4 text-accent shrink-0" />
                <div className="text-xs space-y-2">
                  <p className="font-semibold text-accent">AI Co-pilot</p>
                  <button type="button" onClick={() => setScope("AI Summary: Client requires scalable cloud infrastructure with CI/CD, monitoring, and post-launch support for 6 months.")} className="block text-left text-muted-foreground hover:text-foreground">✨ Summarize requirement</button>
                  <button type="button" onClick={() => setSelectedFeatures(allFeatures.slice(0, 6).map((f) => f.name))} className="block text-left text-muted-foreground hover:text-foreground">✨ Generate proposal features</button>
                  <button type="button" onClick={() => setPrice(Math.round(price * 1.15))} className="block text-left text-muted-foreground hover:text-foreground">✨ AI cost suggestion (+15%)</button>
                  <button type="button" onClick={() => toast.info("Email drafted", { description: "Professional follow-up email copied to clipboard." })} className="block text-left text-muted-foreground hover:text-foreground">✨ Draft professional email</button>
                </div>
              </div>
            </div>
          </div>
          <style>{`.input{width:100%;background:var(--color-secondary);border:1px solid var(--color-border);border-radius:6px;padding:6px 10px;font-size:12px;outline:none}.input:focus{box-shadow:0 0 0 1px var(--color-accent)}`}</style>
        </Card>

        <Card className="col-span-12 lg:col-span-7 p-0 overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-8 py-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="size-6 bg-primary-foreground/90 rounded-md" />
                <span className="font-bold tracking-tight">{ds.company.name}</span>
              </div>
              <p className="text-[10px] font-mono opacity-60">PROPOSAL · {label} · 2026-0622</p>
            </div>
            <StatusPill tone="blue">DRAFT</StatusPill>
          </div>

          <div className="p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] font-mono uppercase text-muted-foreground">Prepared for</p>
                <h2 className="text-2xl font-bold tracking-tight mt-1">{client}</h2>
                <p className="text-sm text-muted-foreground mt-1">{title}</p>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                <p>{ds.company.name}</p>
                <p>{ds.company.address}</p>
                <p>{ds.company.email} · {ds.company.phone}</p>
                <p className="font-mono">GST: {ds.company.gst}</p>
              </div>
            </div>

            <div className="border-t border-border pt-5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">Project Scope</h4>
              <p className="text-sm leading-relaxed">{scope}</p>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Selected Features ({selectedFeatures.length})</h4>
              {selectedFeatures.length === 0 ? (
                <p className="text-sm text-muted-foreground">Select features from the left panel to include in proposal.</p>
              ) : (
                <ul className="grid grid-cols-2 gap-1.5">
                  {selectedFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm"><Check className="size-4 text-emerald-500 shrink-0" /> {f}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="grid grid-cols-4 gap-4">
              <StatBox label="Timeline" value={`${timelineWeeks} weeks`} />
              <StatBox label="Base Cost" value={`$${price.toLocaleString()}`} />
              <StatBox label="GST (18%)" value={`$${gst.toLocaleString()}`} />
              <StatBox label="Total" value={`$${total.toLocaleString()}`} highlight />
            </div>

            <div className="border-t border-border pt-5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">Payment Terms</h4>
              <p className="text-sm">{terms}</p>
            </div>

            <div className="flex items-end justify-between pt-6 border-t border-border">
              <div>
                <p className="text-[10px] font-mono uppercase text-muted-foreground mb-2">Authorised signatory</p>
                <div className="w-56 h-12 border-b-2 border-dashed border-border" />
                <p className="text-[10px] text-muted-foreground mt-1 font-mono">For {client}</p>
                <p className="text-[10px] mt-4 font-mono text-muted-foreground">{ds.company.signature}</p>
              </div>
              <div className="text-center">
                <div className="p-2 bg-white rounded-md inline-block border border-border">
                  <QRCodeSVG value={`https://inefai.crm/proposals/${client.replace(/\s+/g, "-")}`} size={88} />
                </div>
                <p className="text-[9px] font-mono text-muted-foreground mt-1">Scan to e-sign</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="col-span-12">
          <h3 className="text-sm font-bold mb-4">Existing Proposals</h3>
          <table className="w-full">
            <thead className="bg-secondary/40">
              <tr className="text-left">
                {["ID", "Title", "Client", "Status", "Cost", "Sent", "Expires"].map((h) => (
                  <th key={h} className="px-4 py-2 text-[10px] font-mono text-muted-foreground uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ds.proposals.map((p) => (
                <tr key={p.id} className="hover:bg-secondary/40 text-xs">
                  <td className="px-4 py-2 font-mono">{p.id}</td>
                  <td className="px-4 py-2 font-medium">{p.title}</td>
                  <td className="px-4 py-2">{p.client}</td>
                  <td className="px-4 py-2"><StatusPill tone={statusToneMap[p.status] ?? "neutral"}>{p.status}</StatusPill></td>
                  <td className="px-4 py-2 font-mono">${p.totalCost.toLocaleString()}</td>
                  <td className="px-4 py-2 font-mono text-muted-foreground">{p.sentAt ?? "—"}</td>
                  <td className="px-4 py-2 font-mono text-muted-foreground">{p.expiresAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </AppShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-1.5">{label}</label>{children}</div>;
}

function StatBox({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={"p-4 rounded-lg border " + (highlight ? "bg-accent/10 border-accent/30" : "bg-secondary/40 border-border")}>
      <div className="text-[10px] font-mono uppercase text-muted-foreground">{label}</div>
      <div className={"text-lg font-bold mt-1 " + (highlight ? "text-accent" : "")}>{value}</div>
    </div>
  );
}
