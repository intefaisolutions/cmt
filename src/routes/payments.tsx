import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Banknote, Wallet, ArrowDownToLine, Download } from "lucide-react";
import { AppShell, Card, StatusPill } from "@/components/app-shell";
import { CreateAction } from "@/components/crm/create-action";
import { useDataset } from "@/lib/crm-store";
import { toast } from "sonner";

export const Route = createFileRoute("/payments")({
  head: () => ({ meta: [{ title: "Payments — INEFAI.CRM" }] }),
  component: PaymentsPage,
});

function PaymentsPage() {
  const ds = useDataset();
  const totalReceived = ds.payments.reduce((a, b) => a + b.amount, 0);
  const thisMonth = ds.payments.filter((p) => p.date.startsWith("2026-06")).reduce((a, b) => a + b.amount, 0);

  return (
    <AppShell title="Payments" subtitle="Payment records, receipts & reconciliation" actions={<CreateAction entity="payment" label="+ Record Payment" />}>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <SummaryCard icon={Banknote} label="Received this month" value={`$${thisMonth.toLocaleString()}`} />
        <SummaryCard icon={CreditCard} label="Total received" value={`$${totalReceived.toLocaleString()}`} />
        <SummaryCard icon={Wallet} label="Avg Days to Pay" value="14d" />
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-bold">Payment Records</h3>
          <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-border rounded-md hover:bg-secondary"><ArrowDownToLine className="size-3.5" /> Export CSV</button>
        </div>
        <table className="w-full">
          <thead className="bg-secondary/40">
            <tr className="text-left">
              {["Receipt", "Invoice", "Client", "Amount", "Date", "Mode", "Transaction ID", "Remarks", "Receipt"].map((h) => (
                <th key={h} className="px-4 py-3 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {ds.payments.map((p) => (
              <tr key={p.id} className="hover:bg-secondary/40 text-xs">
                <td className="px-4 py-3 font-mono">{p.id}</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">{p.invoiceNumber}</td>
                <td className="px-4 py-3 font-medium">{p.client}</td>
                <td className="px-4 py-3 font-mono font-semibold">${p.amount.toLocaleString()}</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">{p.date}</td>
                <td className="px-4 py-3"><StatusPill tone="blue">{p.mode}</StatusPill></td>
                <td className="px-4 py-3 font-mono text-muted-foreground">{p.transactionId}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.remarks}</td>
                <td className="px-4 py-3">
                  {p.receiptGenerated && (
                    <button onClick={() => toast.success("Receipt PDF downloaded")} className="inline-flex items-center gap-1 text-accent hover:underline">
                      <Download className="size-3" /> PDF
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </AppShell>
  );
}

function SummaryCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="p-5 border border-border rounded-xl bg-card/80 backdrop-blur-sm flex items-start justify-between">
      <div>
        <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="text-2xl font-bold tracking-tight mt-1">{value}</div>
      </div>
      <div className="size-9 rounded-lg bg-accent/10 text-accent grid place-items-center"><Icon className="size-4" /></div>
    </div>
  );
}
