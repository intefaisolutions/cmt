import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CreateAction } from "@/components/crm/create-action";
import { AppShell, Card, StatusPill } from "@/components/app-shell";
import { useDataset } from "@/lib/crm-store";

export const Route = createFileRoute("/calendar")({
  head: () => ({ meta: [{ title: "Calendar — INEFAI.CRM" }] }),
  component: CalendarPage,
});

const typeTone: Record<string, "blue" | "amber" | "green" | "red" | "neutral"> = {
  meeting: "blue",
  deadline: "amber",
  follow_up: "neutral",
  payment_due: "red",
  delivery: "green",
};

function CalendarPage() {
  const ds = useDataset();

  const eventsByDay = ds.calendarEvents.reduce<Record<number, typeof ds.calendarEvents>>((acc, e) => {
    (acc[e.day] ??= []).push(e);
    return acc;
  }, {});

  const cells: (number | null)[] = [];
  for (let i = 1; i <= 30; i++) cells.push(i);
  while (cells.length < 35) cells.push(null);
  const dows = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <AppShell title="Calendar" subtitle="Meetings, deadlines, follow-ups, payments & deliveries" actions={<CreateAction entity="calendar" label="New Event" />}>
      <div className="flex flex-wrap gap-2 mb-4">
        {["Meeting", "Deadline", "Follow Up", "Payment Due", "Delivery"].map((t) => (
          <StatusPill key={t} tone={typeTone[t.toLowerCase().replace(" ", "_")] ?? "neutral"}>{t}</StatusPill>
        ))}
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <button className="size-7 grid place-items-center rounded hover:bg-secondary"><ChevronLeft className="size-4" /></button>
            <h2 className="text-base font-bold tracking-tight">June 2026</h2>
            <button className="size-7 grid place-items-center rounded hover:bg-secondary"><ChevronRight className="size-4" /></button>
          </div>
        </div>
        <div className="grid grid-cols-7 border-b border-border bg-secondary/30">
          {dows.map((d) => (
            <div key={d} className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {cells.map((d, i) => (
            <div key={i} className="min-h-[110px] border-r border-b border-border p-2 last:border-r-0">
              {d && (
                <>
                  <div className={"text-xs font-mono mb-1 " + (d === 22 ? "size-6 grid place-items-center bg-accent text-accent-foreground rounded-full" : "text-muted-foreground")}>{d}</div>
                  <div className="space-y-1">
                    {(eventsByDay[d] ?? []).map((e) => (
                      <div key={e.id} title={e.client ?? e.project}>
                        <StatusPill tone={typeTone[e.type] ?? "neutral"}>{e.title.length > 22 ? e.title.slice(0, 22) + "…" : e.title}</StatusPill>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}
