import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { CreateAction } from "@/components/crm/create-action";
import { AppShell, Card, StatusPill } from "@/components/app-shell";
import { useDataset } from "@/lib/crm-store";

export const Route = createFileRoute("/team")({
  head: () => ({ meta: [{ title: "Team — INEFAI.CRM" }] }),
  component: TeamPage,
});

const roleLabels: Record<string, string> = {
  developer: "Developer",
  designer: "Designer",
  tester: "Tester",
  manager: "Manager",
  sales: "Sales",
};

const statusTone: Record<string, "green" | "amber" | "neutral"> = {
  available: "green",
  busy: "amber",
  away: "neutral",
};

function TeamPage() {
  const ds = useDataset();

  return (
    <AppShell title="Team" subtitle="Developers, designers, testers & managers" actions={<CreateAction entity="team" label="Add Member" />}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ds.team.map((m) => (
          <Card key={m.id} className="hover:border-accent/40 transition-colors">
            <div className="flex items-start gap-4">
              <div className="size-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 grid place-items-center text-sm font-bold text-accent">
                {m.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold">{m.name}</h3>
                  <StatusPill tone={statusTone[m.status] ?? "neutral"}>{m.status}</StatusPill>
                </div>
                <p className="text-xs text-muted-foreground">{roleLabels[m.role] ?? m.role}</p>
                <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><Mail className="size-3" />{m.email}</span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><Phone className="size-3" />{m.phone}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex flex-wrap gap-1 mb-3">
                {m.skills.map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded border border-border bg-secondary/60 text-[10px] font-mono">{s}</span>
                ))}
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Active projects</span>
                <span className="font-bold">{m.activeProjects}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
