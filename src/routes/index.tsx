import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart,
  Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend,
} from "recharts";
import { ArrowUpRight, Sparkles, Clock } from "lucide-react";
import { CreateAction } from "@/components/crm/create-action";
import { AppShell, Card, GradientCard, StatusPill } from "@/components/app-shell";
import { LifecycleFlow } from "@/components/crm/lifecycle-flow";
import { useBusiness } from "@/lib/business-context";
import {
  revenueSeries, conversionSeries, paymentCollectionSeries,
  projectStatusSeries, projectCategorySeries,
} from "@/lib/crm-data";
import { useDataset } from "@/lib/crm-store";
import { useDashboardStats, formatCurrency, statusToneMap } from "@/lib/crm-helpers";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — INEFAI.CRM" },
      { name: "description", content: "Operations overview for an IT agency CRM." },
    ],
  }),
  component: Dashboard,
});

const chartColors = ["var(--color-accent)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)"];

function Dashboard() {
  const { mode } = useBusiness();
  const ds = useDataset();
  const stats = useDashboardStats(mode);
  const revenue = [...revenueSeries[mode]];
  const conversion = [...conversionSeries[mode]];
  const paymentCol = [...paymentCollectionSeries[mode]];
  const projectStatus = [...projectStatusSeries[mode]];
  const projectCategory = [...projectCategorySeries[mode]];

  const kpis = [
    { label: "Total Leads", value: stats.totalLeads, delta: "+12.4%", highlight: false },
    { label: "Total Clients", value: stats.totalClients, delta: "+2 new", highlight: false },
    { label: "Running Projects", value: stats.runningProjects, delta: "Active", highlight: false },
    { label: "Completed", value: stats.completedProjects, delta: "+1", highlight: false },
    { label: "Pending Projects", value: stats.pendingProjects, delta: "Action", highlight: false, accent: true },
    { label: "Today's Follow Up", value: stats.todayFollowUps, delta: "Due today", highlight: false, accent: true },
    { label: "Pending Payments", value: formatCurrency(stats.pendingPayments), delta: "Outstanding", highlight: false, accent: true },
    { label: "Received Payments", value: formatCurrency(stats.receivedPayments), delta: "YTD", highlight: false },
    { label: "Monthly Revenue", value: formatCurrency(stats.monthlyRevenue), delta: "Jun 2026", highlight: true },
    { label: "Yearly Revenue", value: formatCurrency(stats.yearlyRevenue), delta: "+18% YoY", highlight: true },
  ];

  const activityIcons: Record<string, string> = {
    project_created: "🚀",
    proposal_sent: "📄",
    payment_received: "💰",
    project_completed: "✅",
    invoice_generated: "🧾",
    follow_up: "📞",
    task_assigned: "📋",
    document_uploaded: "📎",
    lead_created: "👤",
  };

  return (
    <AppShell
      title="Operations Overview"
      subtitle={`Full lifecycle CRM · ${mode === "it" ? "IT Services" : "Digital Marketing"}`}
      actions={<CreateAction entity="lead" label="New Lead" />}
    >
      <Card className="mb-6 p-4">
        <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-3">Client Lifecycle Flow</p>
        <LifecycleFlow activeStage={7} />
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            {k.highlight ? (
              <GradientCard className={k.highlight ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-primary/20" : ""}>
                <div className="text-[10px] font-mono uppercase tracking-wider mb-1 opacity-70">{k.label}</div>
                <div className="text-xl font-bold tracking-tight">{k.value}</div>
                <div className="mt-1 text-[10px] font-mono opacity-60 flex items-center gap-1">
                  <ArrowUpRight className="size-3" /> {k.delta}
                </div>
              </GradientCard>
            ) : (
              <div className={"p-4 border border-border rounded-xl bg-card/80 backdrop-blur-sm " + (k.accent ? "border-amber-500/30" : "")}>
                <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">{k.label}</div>
                <div className={"text-xl font-bold tracking-tight " + (k.accent ? "text-amber-600 dark:text-amber-400" : "")}>{k.value}</div>
                <div className="mt-1 text-[10px] font-mono text-muted-foreground">{k.delta}</div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6 mb-8">
        <Card className="col-span-12 lg:col-span-6">
          <h3 className="text-sm font-bold mb-1">Monthly Revenue</h3>
          <p className="text-xs text-muted-foreground mb-4">Actual vs projected ($k)</p>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenue} margin={{ left: -20 }}>
                <defs>
                  <linearGradient id="gradRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fontFamily: "var(--font-mono)" }} />
                <YAxis tick={{ fontSize: 10, fontFamily: "var(--font-mono)" }} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Area dataKey="actual" stroke="var(--color-accent)" fill="url(#gradRev)" strokeWidth={2} />
                <Area dataKey="projected" stroke="var(--color-muted-foreground)" strokeDasharray="4 4" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="col-span-12 lg:col-span-3">
          <h3 className="text-sm font-bold mb-4">Projects by Status</h3>
          <div className="h-[240px]">
            <ResponsiveContainer>
              <BarChart data={projectStatus} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid stroke="var(--color-border)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 9 }} />
                <YAxis type="category" dataKey="status" tick={{ fontSize: 9 }} width={80} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="count" fill="var(--color-accent)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="col-span-12 lg:col-span-3">
          <h3 className="text-sm font-bold mb-4">Lead Conversion Rate</h3>
          <div className="h-[240px]">
            <ResponsiveContainer>
              <LineChart data={conversion}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} unit="%" />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Line dataKey="rate" stroke="var(--color-accent)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="col-span-12 lg:col-span-4">
          <h3 className="text-sm font-bold mb-4">Payment Collection</h3>
          <div className="h-[220px]">
            <ResponsiveContainer>
              <BarChart data={paymentCol}>
                <CartesianGrid stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="collected" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="var(--color-border)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="col-span-12 lg:col-span-4">
          <h3 className="text-sm font-bold mb-4">Project Category</h3>
          <div className="h-[220px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={projectCategory} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  {projectCategory.map((_, i) => <Cell key={i} fill={chartColors[i % chartColors.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="col-span-12 lg:col-span-4">
          <h3 className="text-sm font-bold mb-4">Client Sources</h3>
          <div className="h-[220px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={Object.entries(ds.leads.reduce<Record<string, number>>((a, l) => { a[l.source] = (a[l.source] ?? 0) + 1; return a; }, {})).map(([name, value]) => ({ name, value }))}
                  dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}
                >
                  {projectCategory.map((_, i) => <Cell key={i} fill={chartColors[i % chartColors.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 9 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-12 lg:col-span-7">
          <h3 className="text-sm font-bold mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {ds.activities.map((a) => (
              <div key={a.id} className="flex gap-3 text-xs">
                <div className="size-8 rounded-full bg-secondary grid place-items-center text-sm shrink-0">
                  {activityIcons[a.type] ?? "•"}
                </div>
                <div className="flex-1">
                  <p>
                    <span className="font-semibold">{a.who}</span>{" "}
                    <span className="text-muted-foreground">{a.message}</span>{" "}
                    <span className="font-medium">{a.detail}</span>
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 font-mono">{a.time} ago</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="col-span-12 lg:col-span-5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold">Upcoming Reminders</h3>
            <Sparkles className="size-4 text-accent" />
          </div>
          <div className="space-y-3">
            {ds.followUps.slice(0, 5).map((r) => (
              <div key={r.id} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/60 transition-colors">
                <div className="size-10 rounded-lg bg-card border border-border flex flex-col items-center justify-center shrink-0">
                  <span className="text-[8px] font-bold uppercase text-muted-foreground">{r.isToday ? "TODAY" : "NEXT"}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate">{r.name} · {r.company}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{r.remarks}</p>
                </div>
                <Clock className="size-3.5 text-muted-foreground shrink-0" />
              </div>
            ))}
          </div>

          <h3 className="text-sm font-bold mt-8 mb-4">Recent Leads</h3>
          <div className="space-y-2">
            {ds.leads.slice(0, 4).map((l) => (
              <div key={l.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/40">
                <div className="text-xs font-medium">{l.name} <span className="text-muted-foreground">· {l.company}</span></div>
                <StatusPill tone={statusToneMap[l.status] ?? "neutral"}>{l.status}</StatusPill>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
