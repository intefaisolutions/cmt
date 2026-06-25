import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MessageSquare, Clock, Video } from "lucide-react";
import { CreateAction } from "@/components/crm/create-action";
import { AppShell, Card, StatusPill } from "@/components/app-shell";
import { useDataset } from "@/lib/crm-store";

export const Route = createFileRoute("/follow-ups")({
  head: () => ({ meta: [{ title: "Follow-ups — INEFAI.CRM" }] }),
  component: FollowUpsPage,
});

const typeIcons = { call: Phone, email: Mail, meeting: Video, whatsapp: MessageSquare, reminder: Clock };

function FollowUpsPage() {
  const ds = useDataset();
  const today = ds.followUps.filter((f) => f.isToday);
  const upcoming = ds.followUps.filter((f) => !f.isToday);

  return (
    <AppShell title="Follow-ups" subtitle="Next call, reminders, meetings & outcomes" actions={<CreateAction entity="follow-up" label="New Follow Up" />}>
      {today.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-bold mb-3 text-amber-600 dark:text-amber-400">Today&apos;s Follow Ups ({today.length})</h3>
          <div className="space-y-3">
            {today.map((it) => <FollowUpCard key={it.id} item={it} />)}
          </div>
        </div>
      )}

      <h3 className="text-sm font-bold mb-3">Upcoming</h3>
      <div className="space-y-3 max-w-4xl">
        {upcoming.map((it) => <FollowUpCard key={it.id} item={it} />)}
      </div>
    </AppShell>
  );
}

function FollowUpCard({ item }: { item: ReturnType<typeof useDataset>["followUps"][0] }) {
  const Icon = typeIcons[item.type] ?? Mail;
  const outcomeTone = item.outcome === "positive" ? "green" : item.outcome === "negative" ? "red" : item.outcome === "converted" ? "green" : item.isToday ? "amber" : "neutral";

  return (
    <Card className="flex items-center gap-4 p-5">
      <div className="size-10 rounded-lg bg-accent/10 text-accent grid place-items-center shrink-0">
        <Icon className="size-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-semibold">{item.name}</p>
          <span className="text-xs text-muted-foreground">· {item.company}</span>
          <StatusPill tone="blue">{item.type}</StatusPill>
          <StatusPill tone={outcomeTone}>{item.outcome}</StatusPill>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{item.remarks}</p>
        <div className="flex gap-4 mt-2 text-[10px] font-mono text-muted-foreground">
          <span>Next: {item.nextCall}</span>
          {item.meeting && <span>Meeting: {item.meeting}</span>}
          <span>Next date: {item.nextDate}</span>
        </div>
      </div>
      <div className="text-right flex flex-col items-end gap-2">
        <div className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
          <Clock className="size-3" /> {item.reminder}
        </div>
        <button className="text-xs px-3 py-1.5 border border-border rounded-md hover:bg-secondary">Mark done</button>
      </div>
    </Card>
  );
}
