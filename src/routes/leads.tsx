import { createFileRoute } from "@tanstack/react-router";
import { Filter, Download, Search } from "lucide-react";
import { useState, useMemo } from "react";
import { CreateAction } from "@/components/crm/create-action";
import { AppShell, Card, StatusPill } from "@/components/app-shell";
import { LifecycleFlow } from "@/components/crm/lifecycle-flow";
import { useDataset } from "@/lib/crm-store";
import { statusToneMap } from "@/lib/crm-helpers";

export const Route = createFileRoute("/leads")({
  head: () => ({ meta: [{ title: "Leads — INEFAI.CRM" }] }),
  component: LeadsPage,
});

const stages = ["all", "new", "qualified", "negotiating", "won", "lost"];
const sources = ["all", "Website", "LinkedIn", "Referral", "Google Ads", "WhatsApp", "Conference", "Organic", "Outbound"];

function LeadsPage() {
  const ds = useDataset();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [source, setSource] = useState("all");

  const leads = useMemo(() => ds.leads.filter((l) => {
    const matchQ = !q || (l.name + l.company + l.email + l.phone).toLowerCase().includes(q.toLowerCase());
    const matchS = status === "all" || l.status === status;
    const matchSrc = source === "all" || l.source === source;
    return matchQ && matchS && matchSrc;
  }), [ds.leads, q, status, source]);

  return (
    <AppShell title="Leads" subtitle="Lead → Client → Project lifecycle starts here" actions={<CreateAction entity="lead" label="New Lead" />}>
      <Card className="mb-6 p-4">
        <LifecycleFlow activeStage={0} />
      </Card>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-border flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, company, email, phone..." className="w-72 bg-secondary border border-border rounded-md pl-8 pr-3 py-1.5 text-xs focus:ring-1 focus:ring-accent outline-none" />
          </div>
          <div className="flex items-center gap-1 bg-secondary p-0.5 rounded-md border border-border flex-wrap">
            {stages.map((s) => (
              <button key={s} onClick={() => setStatus(s)} className={"px-2.5 py-1 text-[10px] font-mono uppercase rounded transition-colors " + (status === s ? "bg-background border border-black/5 shadow-sm dark:border-white/10" : "text-muted-foreground hover:text-foreground")}>{s}</button>
            ))}
          </div>
          <select value={source} onChange={(e) => setSource(e.target.value)} className="text-xs bg-secondary border border-border rounded-md px-2 py-1.5">
            {sources.map((s) => <option key={s} value={s}>{s === "all" ? "All Sources" : s}</option>)}
          </select>
          <div className="ml-auto flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-border rounded-md hover:bg-secondary"><Filter className="size-3.5" /> Filter</button>
            <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-border rounded-md hover:bg-secondary"><Download className="size-3.5" /> Export</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-secondary/40">
              <tr className="text-left">
                {["ID", "Lead", "Company", "Service", "Source", "Phone", "Status", "Value", "Owner", "Created"].map((h) => (
                  <th key={h} className="px-6 py-3 text-[10px] font-mono text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {leads.map((l) => (
                <tr key={l.id} className="group hover:bg-secondary/40 transition-colors">
                  <td className="px-6 py-3 text-xs font-mono text-muted-foreground whitespace-nowrap">{l.id}</td>
                  <td className="px-6 py-3 min-w-[180px]">
                    <div className="flex items-center gap-3">
                      <div className="size-7 shrink-0 bg-secondary rounded grid place-items-center text-[10px] font-bold">{l.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</div>
                      <div className="text-xs font-medium">{l.name}<span className="text-muted-foreground font-normal block text-[10px]">{l.email}</span></div>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-xs whitespace-nowrap">{l.company}</td>
                  <td className="px-6 py-3 text-xs">{l.service}</td>
                  <td className="px-6 py-3 text-xs font-mono text-muted-foreground whitespace-nowrap">{l.source}</td>
                  <td className="px-6 py-3 text-xs font-mono whitespace-nowrap">{l.phone}</td>
                  <td className="px-6 py-3 whitespace-nowrap"><StatusPill tone={statusToneMap[l.status] ?? "neutral"}>{l.status}</StatusPill></td>
                  <td className="px-6 py-3 text-xs font-mono whitespace-nowrap">${l.value.toLocaleString()}</td>
                  <td className="px-6 py-3"><div className="size-6 rounded-full bg-accent/10 text-accent grid place-items-center text-[10px] font-bold">{l.owner}</div></td>
                  <td className="px-6 py-3 text-xs font-mono text-muted-foreground whitespace-nowrap">{l.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
}
