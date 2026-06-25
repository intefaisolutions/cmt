import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MessageCircle, Globe, Linkedin, MapPin, FileText } from "lucide-react";
import { CreateAction } from "@/components/crm/create-action";
import { AppShell, Card, StatusPill } from "@/components/app-shell";
import { ClientTimeline } from "@/components/crm/client-timeline";
import { useDataset } from "@/lib/crm-store";
import type { Client } from "@/types/crm";
import { statusToneMap } from "@/lib/crm-helpers";

export const Route = createFileRoute("/clients")({
  head: () => ({ meta: [{ title: "Clients — INEFAI.CRM" }] }),
  component: ClientsPage,
});

const clientStatuses = ["all", "new", "interested", "follow_up", "proposal_sent", "negotiation", "converted", "rejected", "active", "prospect"];

function ClientsPage() {
  const ds = useDataset();
  const [selected, setSelected] = useState<Client | null>(ds.clients[0] ?? null);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = ds.clients.filter((c) => {
    const matchQ = !q || (c.companyName + c.clientName + c.email).toLowerCase().includes(q.toLowerCase());
    const matchS = statusFilter === "all" || c.status === statusFilter;
    return matchQ && matchS;
  });

  return (
    <AppShell title="Clients" subtitle="Complete profiles, timeline, and conversion tracking" actions={<CreateAction entity="client" label="New Client" />}>
      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-12 lg:col-span-4 p-0 overflow-hidden">
          <div className="p-4 border-b border-border space-y-2">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search clients..." className="w-full bg-secondary border border-border rounded-md px-3 py-1.5 text-xs focus:ring-1 focus:ring-accent outline-none" />
            <div className="flex flex-wrap gap-1">
              {clientStatuses.slice(0, 6).map((s) => (
                <button key={s} onClick={() => setStatusFilter(s)} className={"px-2 py-0.5 text-[9px] font-mono uppercase rounded border transition-colors " + (statusFilter === s ? "bg-accent/10 text-accent border-accent/30" : "border-border text-muted-foreground")}>{s.replace("_", " ")}</button>
              ))}
            </div>
          </div>
          <div className="divide-y divide-border max-h-[680px] overflow-y-auto">
            {filtered.map((c) => (
              <button key={c.id} onClick={() => setSelected(c)} className={"w-full text-left px-5 py-4 flex items-center gap-3 hover:bg-secondary/40 transition-colors " + (selected?.id === c.id ? "bg-accent/5 border-l-2 border-l-accent" : "")}>
                <div className="size-9 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 grid place-items-center text-xs font-bold">{c.companyName.split(" ").map((s) => s[0]).slice(0, 2).join("")}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{c.companyName}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">{c.industry} · {c.priority}</p>
                </div>
                <StatusPill tone={statusToneMap[c.status] ?? "neutral"}>{c.status.replace("_", " ")}</StatusPill>
              </button>
            ))}
          </div>
        </Card>

        {selected && (
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <Card>
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="size-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 grid place-items-center text-lg font-bold">{selected.companyName.split(" ").map((s) => s[0]).slice(0, 2).join("")}</div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight">{selected.companyName}</h2>
                    <p className="text-sm text-muted-foreground">{selected.clientName} · {selected.industry}</p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      <StatusPill tone={statusToneMap[selected.status] ?? "neutral"}>{selected.status.replace("_", " ")}</StatusPill>
                      <StatusPill tone="neutral">Source: {selected.source}</StatusPill>
                      <StatusPill tone={selected.priority === "urgent" ? "red" : selected.priority === "high" ? "amber" : "blue"}>{selected.priority}</StatusPill>
                    </div>
                  </div>
                </div>
                <button className="text-xs px-3 py-1.5 border border-border rounded-md hover:bg-secondary">Edit Profile</button>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-lg bg-secondary/40 border border-border"><div className="text-[10px] font-mono uppercase text-muted-foreground">Revenue</div><div className="text-lg font-bold mt-1">${selected.revenue.toLocaleString()}</div></div>
                <div className="p-4 rounded-lg bg-secondary/40 border border-border"><div className="text-[10px] font-mono uppercase text-muted-foreground">Projects</div><div className="text-lg font-bold mt-1">{selected.projects}</div></div>
                <div className="p-4 rounded-lg bg-secondary/40 border border-border"><div className="text-[10px] font-mono uppercase text-muted-foreground">Since</div><div className="text-lg font-bold mt-1">{selected.since}</div></div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-6">
              <Card>
                <h3 className="text-sm font-bold mb-4">Contact Information</h3>
                <div className="grid gap-3 text-sm">
                  <Row icon={Mail} label="Email" value={selected.email} />
                  <Row icon={Phone} label="Phone" value={selected.phone} />
                  <Row icon={MessageCircle} label="WhatsApp" value={selected.whatsapp} />
                  <Row icon={MapPin} label="Address" value={`${selected.address}, ${selected.city}, ${selected.state}, ${selected.country}`} />
                  <Row icon={Globe} label="Website" value={selected.website} />
                  <Row icon={Linkedin} label="LinkedIn" value={selected.linkedin} />
                </div>
                <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-3 text-xs">
                  <div><span className="text-muted-foreground">GST: </span><span className="font-mono">{selected.gst}</span></div>
                  <div><span className="text-muted-foreground">Industry: </span>{selected.industry}</div>
                </div>
                {selected.notes && <p className="mt-4 text-xs text-muted-foreground border-t border-border pt-4">{selected.notes}</p>}
              </Card>

              <Card>
                <h3 className="text-sm font-bold mb-4">Documents</h3>
                {selected.documents.length === 0 ? (
                  <p className="text-xs text-muted-foreground">No documents uploaded yet.</p>
                ) : (
                  <div className="space-y-2">
                    {selected.documents.map((d) => (
                      <div key={d} className="flex items-center gap-2 p-2 rounded-lg border border-border hover:bg-secondary/40 text-xs">
                        <FileText className="size-4 text-accent" /> {d}
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>

            <Card>
              <h3 className="text-sm font-bold mb-6">Client Timeline — Full Lifecycle</h3>
              <ClientTimeline events={selected.timeline} />
            </Card>
          </div>
        )}
      </div>
    </AppShell>
  );
}

function Row({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="size-4 text-muted-foreground mt-0.5 shrink-0" />
      <div><span className="text-[10px] font-mono uppercase text-muted-foreground block">{label}</span>{value}</div>
    </div>
  );
}
