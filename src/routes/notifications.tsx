import { createFileRoute } from "@tanstack/react-router";
import { Bell, DollarSign, FileText, Clock, CheckSquare, Sparkles } from "lucide-react";
import { AppShell, Card, StatusPill } from "@/components/app-shell";
import { useDataset } from "@/lib/crm-store";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — INEFAI.CRM" }] }),
  component: NotificationsPage,
});

const typeConfig: Record<string, { icon: React.ElementType; color: string }> = {
  payment_due: { icon: DollarSign, color: "text-amber-500" },
  proposal_pending: { icon: FileText, color: "text-accent" },
  follow_up: { icon: Bell, color: "text-blue-500" },
  deadline: { icon: Clock, color: "text-red-500" },
  invoice: { icon: FileText, color: "text-emerald-500" },
  task: { icon: CheckSquare, color: "text-purple-500" },
};

function NotificationsPage() {
  const ds = useDataset();
  const unread = ds.notifications.filter((n) => !n.read);
  const read = ds.notifications.filter((n) => n.read);

  return (
    <AppShell title="Notification Center" subtitle="Payment due, proposals, follow-ups, deadlines & tasks">
      {unread.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
            Unread <StatusPill tone="red">{unread.length}</StatusPill>
          </h3>
          <div className="max-w-3xl space-y-2">
            {unread.map((n) => <NotificationCard key={n.id} item={n} />)}
          </div>
        </div>
      )}

      <h3 className="text-sm font-bold mb-3">Earlier</h3>
      <div className="max-w-3xl space-y-2">
        {read.map((n) => <NotificationCard key={n.id} item={n} />)}
      </div>

      <Card className="mt-8 max-w-3xl p-4 border-accent/30 bg-accent/5">
        <div className="flex gap-3">
          <Sparkles className="size-4 text-accent shrink-0" />
          <p className="text-xs text-muted-foreground">AI suggests: Draft follow-up email for Jordan Davies — lead inactive 6 days. <button className="text-accent hover:underline ml-1">Generate</button></p>
        </div>
      </Card>
    </AppShell>
  );
}

function NotificationCard({ item }: { item: ReturnType<typeof useDataset>["notifications"][0] }) {
  const cfg = typeConfig[item.type] ?? { icon: Bell, color: "text-muted-foreground" };
  const Icon = cfg.icon;

  return (
    <Card className={"flex items-start gap-4 p-5 " + (!item.read ? "border-accent/30 bg-accent/5" : "")}>
      <div className={"size-9 rounded-lg bg-secondary grid place-items-center shrink-0 " + cfg.color}>
        <Icon className="size-4" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold">{item.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
      </div>
      <span className="text-[10px] font-mono text-muted-foreground shrink-0">{item.time} ago</span>
    </Card>
  );
}
