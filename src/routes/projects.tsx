import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar as CalIcon, CheckCircle2, Circle } from "lucide-react";
import { CreateAction } from "@/components/crm/create-action";
import { AppShell, Card, StatusPill } from "@/components/app-shell";
import { ProjectCard } from "@/components/crm/project-card";
import { useDataset } from "@/lib/crm-store";
import type { Project } from "@/types/crm";
import { statusToneMap } from "@/lib/crm-helpers";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [{ title: "Projects — INEFAI.CRM" }] }),
  component: ProjectsPage,
});

const statusFilters = ["all", "requirement", "planning", "development", "testing", "client_review", "completed", "on_hold"];

function ProjectsPage() {
  const ds = useDataset();
  const [selected, setSelected] = useState<Project | null>(ds.projects[0] ?? null);
  const [statusFilter, setStatusFilter] = useState("all");

  const projects = ds.projects.filter((p) => statusFilter === "all" || p.status === statusFilter);

  return (
    <AppShell title="Projects" subtitle="Scope, milestones, team, cost & payment tracking" actions={<CreateAction entity="project" label="New Project" />}>
      <div className="flex flex-wrap gap-1 mb-6">
        {statusFilters.map((s) => (
          <button key={s} onClick={() => setStatusFilter(s)} className={"px-2.5 py-1 text-[10px] font-mono uppercase rounded-md border transition-colors " + (statusFilter === s ? "bg-accent/10 text-accent border-accent/30" : "border-border text-muted-foreground hover:text-foreground")}>{s.replace("_", " ")}</button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7 space-y-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} selected={selected?.id === p.id} onClick={() => setSelected(p)} />
          ))}
        </div>

        {selected && (
          <div className="col-span-12 lg:col-span-5 space-y-6">
            <Card>
              <h3 className="text-sm font-bold mb-4">Project Details</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <Detail label="Category" value={selected.category} />
                <Detail label="Type" value={selected.projectType === "it" ? "IT Services" : "Digital Marketing"} />
                <Detail label="Priority" value={selected.priority} />
                <Detail label="Status" value={<StatusPill tone={statusToneMap[selected.status] ?? "neutral"}>{selected.status.replace("_", " ")}</StatusPill>} />
                <Detail label="Est. Time" value={`${selected.estimatedDays} days`} />
                <Detail label="Warranty" value={selected.warranty} />
                <Detail label="Support" value={selected.supportPeriod} />
                <Detail label="Start" value={selected.startDate} />
                <Detail label="End" value={selected.endDate} />
                <Detail label="Delivery" value={selected.deliveryDate} />
              </div>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {selected.technologies.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded border border-border bg-secondary/60 text-[10px] font-mono">{t}</span>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-bold mb-4">Cost Breakdown</h3>
              <div className="space-y-2 text-xs">
                <CostRow label="Total Cost" value={selected.cost.total} bold />
                <CostRow label="GST (18%)" value={selected.cost.gst} />
                <CostRow label="Discount" value={-selected.cost.discount} />
                <CostRow label="Advance" value={selected.cost.advance} />
                <CostRow label="Received" value={selected.cost.received} green />
                <CostRow label="Pending" value={selected.cost.pending} amber />
                <CostRow label="Expenses" value={selected.cost.expenses} />
                <div className="pt-2 border-t border-border flex justify-between font-bold">
                  <span>Profit</span>
                  <span className="text-emerald-600">${selected.cost.profit.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-1"><span>Progress</span><span>{selected.progress}%</span></div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden"><div className="h-full bg-accent" style={{ width: `${selected.progress}%` }} /></div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-1"><span>Payment</span><span>{selected.paymentProgress}%</span></div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: `${selected.paymentProgress}%` }} /></div>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-bold mb-4">Milestones</h3>
              <div className="space-y-4 relative">
                <div className="absolute left-[7px] top-1.5 bottom-1.5 w-px bg-border" />
                {selected.milestones.map((m, i) => (
                  <div key={i} className="flex gap-3 relative">
                    {m.done ? <CheckCircle2 className="size-3.5 text-emerald-500 mt-0.5 relative z-10 bg-card" /> : <Circle className="size-3.5 text-muted-foreground mt-0.5 relative z-10 bg-card" />}
                    <div className="flex-1">
                      <p className={"text-xs font-medium " + (m.done ? "line-through text-muted-foreground" : "")}>{m.name}</p>
                      <p className="text-[10px] text-muted-foreground font-mono flex items-center gap-1 mt-0.5"><CalIcon className="size-3" />{m.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-bold mb-4">Assigned Team</h3>
              <div className="space-y-2">
                {selected.team.map((m) => (
                  <div key={m.id} className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-accent/10 text-accent grid place-items-center text-[10px] font-bold">{m.initials}</div>
                    <div><span className="text-xs font-medium">{m.name}</span><span className="text-[10px] text-muted-foreground block">{m.role}</span></div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </AppShell>
  );
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return <div><span className="text-[10px] font-mono uppercase text-muted-foreground block">{label}</span><span className="font-medium">{value}</span></div>;
}

function CostRow({ label, value, bold, green, amber }: { label: string; value: number; bold?: boolean; green?: boolean; amber?: boolean }) {
  return (
    <div className={"flex justify-between " + (bold ? "font-bold text-sm" : "")}>
      <span className="text-muted-foreground">{label}</span>
      <span className={"font-mono " + (green ? "text-emerald-600" : amber ? "text-amber-600" : "")}>
        {value < 0 ? "-" : ""}${Math.abs(value).toLocaleString()}
      </span>
    </div>
  );
}
