import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { CreateAction } from "@/components/crm/create-action";
import { AppShell, StatusPill } from "@/components/app-shell";
import { useDataset } from "@/lib/crm-store";

export const Route = createFileRoute("/tasks")({
  head: () => ({ meta: [{ title: "Tasks — INEFAI.CRM" }] }),
  component: TasksPage,
});

const columns: { id: "backlog" | "todo" | "doing" | "review" | "done"; label: string }[] = [
  { id: "backlog", label: "Backlog" },
  { id: "todo", label: "To Do" },
  { id: "doing", label: "In Progress" },
  { id: "review", label: "Review" },
  { id: "done", label: "Completed" },
];

const typeLabels: Record<string, string> = {
  design: "Design",
  development: "Development",
  testing: "Testing",
  deployment: "Deployment",
  bug_fix: "Bug Fix",
  support: "Support",
};

function priorityTone(p: string) {
  return p === "high" ? "red" : p === "medium" ? "amber" : "neutral";
}

function TasksPage() {
  const ds = useDataset();

  return (
    <AppShell title="Tasks" subtitle="Kanban board — Design, Development, Testing, Deployment" actions={<CreateAction entity="task" label="New Task" />}>
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-4 min-h-[600px]" style={{ minWidth: "max(100%, 900px)" }}>
          {columns.map((col) => {
            const tasks = ds.tasks.filter((t) => t.status === col.id);
            return (
              <div key={col.id} className="flex-1 min-w-[220px] bg-secondary/40 border border-border rounded-xl p-3 flex flex-col backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider">{col.label}</h3>
                    <span className="text-[10px] font-mono text-muted-foreground">{tasks.length}</span>
                  </div>
                  <button className="size-5 grid place-items-center rounded hover:bg-background text-muted-foreground hover:text-foreground"><Plus className="size-3" /></button>
                </div>
                <div className="space-y-2 flex-1">
                  {tasks.map((t) => (
                    <div key={t.id} className="p-3 rounded-lg bg-card border border-border hover:border-accent/40 transition-colors cursor-grab active:cursor-grabbing shadow-sm">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <StatusPill tone="blue">{typeLabels[t.type] ?? t.type}</StatusPill>
                        <StatusPill tone={priorityTone(t.priority)}>{t.priority}</StatusPill>
                      </div>
                      <p className="text-xs font-semibold mb-2">{t.title}</p>
                      <p className="text-[10px] text-muted-foreground font-mono mb-3">{t.project}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-muted-foreground">Due {t.due.slice(5)}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-muted-foreground">{t.assignee}</span>
                          <div className="size-5 rounded-full bg-accent/10 text-accent grid place-items-center text-[9px] font-bold">{t.assignee}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
