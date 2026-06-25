import { createFileRoute } from "@tanstack/react-router";
import { Download, Send, Printer } from "lucide-react";
import { CreateAction } from "@/components/crm/create-action";
import { AppShell, Card, StatusPill } from "@/components/app-shell";
import { useDataset } from "@/lib/crm-store";
import { statusToneMap } from "@/lib/crm-helpers";
import { toast } from "sonner";

export const Route = createFileRoute("/invoices")({
  head: () => ({ meta: [{ title: "Invoices — INEFAI.CRM" }] }),
  component: InvoicesPage,
});

function InvoicesPage() {
  const ds = useDataset();
  const totals = {
    outstanding: ds.invoices.filter((i) => i.pending > 0).reduce((a, b) => a + b.pending, 0),
    paid: ds.invoices.reduce((a, b) => a + b.paid, 0),
    overdue: ds.invoices.filter((i) => i.status === "overdue").reduce((a, b) => a + b.pending, 0),
    drafts: ds.invoices.filter((i) => i.status === "draft").length,
  };

  return (
    <AppShell title="Invoices" subtitle="Generate, track, download PDF & email" actions={<CreateAction entity="invoice" label="Generate Invoice" />}>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { l: "Outstanding", v: `$${totals.outstanding.toLocaleString()}`, t: "amber" as const },
          { l: "Paid (YTD)", v: `$${totals.paid.toLocaleString()}`, t: "green" as const },
          { l: "Overdue", v: `$${totals.overdue.toLocaleString()}`, t: "red" as const },
          { l: "Drafts", v: totals.drafts, t: "neutral" as const },
        ].map((s) => (
          <div key={s.l} className="p-5 border border-border rounded-xl bg-card/80 backdrop-blur-sm">
            <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{s.l}</div>
            <div className="text-2xl font-bold tracking-tight mt-1">{s.v}</div>
            <div className="mt-2"><StatusPill tone={s.t}>{s.t}</StatusPill></div>
          </div>
        ))}
      </div>

      <Card className="p-0 overflow-hidden">
        <table className="w-full">
          <thead className="bg-secondary/40">
            <tr className="text-left">
              {["Invoice", "Client", "Amount", "GST", "Paid", "Pending", "Status", "Due", "Actions"].map((h) => (
                <th key={h} className="px-6 py-3 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {ds.invoices.map((i) => (
              <tr key={i.id} className="group hover:bg-secondary/40 transition-colors">
                <td className="px-6 py-3 text-xs font-mono">{i.number}</td>
                <td className="px-6 py-3 text-xs font-medium">{i.client}</td>
                <td className="px-6 py-3 text-xs font-mono font-semibold">${i.amount.toLocaleString()}</td>
                <td className="px-6 py-3 text-xs font-mono text-muted-foreground">${i.gst.toLocaleString()}</td>
                <td className="px-6 py-3 text-xs font-mono text-emerald-600">${i.paid.toLocaleString()}</td>
                <td className="px-6 py-3 text-xs font-mono text-amber-600">${i.pending.toLocaleString()}</td>
                <td className="px-6 py-3"><StatusPill tone={statusToneMap[i.status] ?? "neutral"}>{i.status}</StatusPill></td>
                <td className="px-6 py-3 text-xs font-mono text-muted-foreground">{i.due}</td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => toast.success("PDF downloaded")} className="size-7 grid place-items-center rounded hover:bg-secondary" title="Download PDF"><Download className="size-3.5" /></button>
                    <button onClick={() => toast.success("Invoice sent")} className="size-7 grid place-items-center rounded hover:bg-secondary" title="Email"><Send className="size-3.5" /></button>
                    <button onClick={() => toast.info("Print dialog opened")} className="size-7 grid place-items-center rounded hover:bg-secondary" title="Print"><Printer className="size-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </AppShell>
  );
}
