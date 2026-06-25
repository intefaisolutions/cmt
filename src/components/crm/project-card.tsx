import { motion } from "framer-motion";
import { Calendar, DollarSign } from "lucide-react";
import type { Project } from "@/types/crm";
import { StatusPill } from "@/components/app-shell";
import { statusToneMap } from "@/lib/crm-helpers";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  selected,
  onClick,
}: {
  project: Project;
  selected?: boolean;
  onClick?: () => void;
}) {
  const lead = project.team[0];
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      className={cn(
        "w-full text-left p-5 rounded-2xl border bg-card/80 backdrop-blur-sm transition-all",
        selected ? "border-accent ring-1 ring-accent shadow-lg shadow-accent/10" : "border-border hover:border-accent/40",
      )}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="size-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 grid place-items-center text-xs font-bold text-accent">
          {project.client.split(" ").map((s) => s[0]).slice(0, 2).join("")}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold truncate">{project.name}</h3>
          <p className="text-[10px] text-muted-foreground font-mono truncate">{project.client}</p>
        </div>
        <StatusPill tone={statusToneMap[project.status] ?? "neutral"}>
          {project.status.replace("_", " ")}
        </StatusPill>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {project.technologies.slice(0, 4).map((t) => (
          <span key={t} className="px-1.5 py-0.5 rounded border border-border bg-secondary/60 text-[9px] font-mono">
            {t}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-accent rounded-full" style={{ width: `${project.progress}%` }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-1">
            <span>Payment</span>
            <span>{project.paymentProgress}%</span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${project.paymentProgress}%` }} />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px]">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Calendar className="size-3" />
          <span className="font-mono">{project.deliveryDate}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <DollarSign className="size-3 text-muted-foreground" />
          <span className="font-mono font-semibold">${project.cost.pending.toLocaleString()} pending</span>
        </div>
        {lead && (
          <div className="flex items-center gap-1.5">
            <div className="size-5 rounded-full bg-accent/10 text-accent grid place-items-center text-[8px] font-bold">
              {lead.initials}
            </div>
            <StatusPill tone={project.priority === "urgent" ? "red" : project.priority === "high" ? "amber" : "neutral"}>
              {project.priority}
            </StatusPill>
          </div>
        )}
      </div>
    </motion.button>
  );
}
