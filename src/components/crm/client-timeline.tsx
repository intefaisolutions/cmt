import { CheckCircle2, Circle } from "lucide-react";
import type { TimelineEvent } from "@/types/crm";
import { cn } from "@/lib/utils";

const typeLabels: Record<TimelineEvent["type"], string> = {
  inquiry: "Inquiry",
  meeting: "Meeting",
  proposal_sent: "Proposal",
  follow_up: "Follow Up",
  negotiation: "Negotiation",
  payment: "Payment",
  project_started: "Project",
  project_delivered: "Delivery",
  support: "Support",
};

export function ClientTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="space-y-0 relative">
      <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />
      {events.map((e) => (
        <div key={e.id} className="flex gap-4 pb-6 relative">
          {e.done ? (
            <CheckCircle2 className="size-[22px] text-emerald-500 shrink-0 relative z-10 bg-card" />
          ) : (
            <Circle className="size-[22px] text-muted-foreground shrink-0 relative z-10 bg-card" />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={cn("text-xs font-semibold", e.done && "text-muted-foreground")}>{e.title}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                {typeLabels[e.type]}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{e.description}</p>
            <p className="text-[10px] font-mono text-muted-foreground mt-1">{e.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
