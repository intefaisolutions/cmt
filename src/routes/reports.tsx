import { createFileRoute } from "@tanstack/react-router";
import {
  Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { AppShell, Card } from "@/components/app-shell";
import { useBusiness } from "@/lib/business-context";
import {
  revenueSeries, pipelineSeries, conversionSeries, paymentCollectionSeries,
  projectStatusSeries,
} from "@/lib/crm-data";
import { useDataset } from "@/lib/crm-store";
import { getDashboardStats } from "@/lib/crm-helpers";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports — INEFAI.CRM" }] }),
  component: ReportsPage,
});

const colors = ["var(--color-accent)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)"];

function ReportsPage() {
  const { mode } = useBusiness();
  const ds = useDataset();
  const stats = getDashboardStats(ds);
  const revenue = [...revenueSeries[mode]];
  const pipeline = [...pipelineSeries[mode]];
  const conversion = [...conversionSeries[mode]];
  const paymentCol = [...paymentCollectionSeries[mode]];
  const projectStatus = [...projectStatusSeries[mode]];

  const sourceData = Object.entries(
    ds.leads.reduce<Record<string, number>>((acc, l) => {
      acc[l.source] = (acc[l.source] ?? 0) + 1;
      return acc;
    }, {}),
  ).map(([name, value]) => ({ name, value }));

  const proposalSuccess = [
    { status: "Accepted", count: ds.proposals.filter((p) => p.status === "accepted").length },
    { status: "Sent", count: ds.proposals.filter((p) => p.status === "sent").length },
    { status: "Viewed", count: ds.proposals.filter((p) => p.status === "viewed").length },
    { status: "Rejected", count: ds.proposals.filter((p) => p.status === "rejected").length },
    { status: "Draft", count: ds.proposals.filter((p) => p.status === "draft").length },
  ];

  return (
    <AppShell title="Reports" subtitle="Revenue, projects, payments, leads & proposal analytics">
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { l: "Revenue YTD", v: `$${stats.yearlyRevenue.toLocaleString()}` },
          { l: "Pending Payments", v: `$${stats.pendingPayments.toLocaleString()}` },
          { l: "Lead Conversion", v: `${conversion[conversion.length - 1]?.rate ?? 0}%` },
          { l: "Proposal Success", v: `${Math.round((ds.proposals.filter((p) => p.status === "accepted").length / ds.proposals.length) * 100)}%` },
        ].map((s) => (
          <div key={s.l} className="p-5 border border-border rounded-xl bg-card/80">
            <div className="text-[10px] font-mono uppercase text-muted-foreground">{s.l}</div>
            <div className="text-2xl font-bold mt-1">{s.v}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-12 lg:col-span-8">
          <h3 className="text-sm font-bold mb-4">Monthly Revenue vs Forecast</h3>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <BarChart data={revenue}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: "var(--font-mono)" }} />
                <YAxis tick={{ fontSize: 11, fontFamily: "var(--font-mono)" }} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="projected" fill="var(--color-border)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="col-span-12 lg:col-span-4">
          <h3 className="text-sm font-bold mb-4">Lead Sources</h3>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={sourceData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={2}>
                  {sourceData.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="col-span-12 lg:col-span-6">
          <h3 className="text-sm font-bold mb-4">Payment Collection</h3>
          <div className="h-[260px]">
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

        <Card className="col-span-12 lg:col-span-6">
          <h3 className="text-sm font-bold mb-4">Proposal Success Rate</h3>
          <div className="h-[260px]">
            <ResponsiveContainer>
              <BarChart data={proposalSuccess}>
                <CartesianGrid stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="status" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="count" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="col-span-12 lg:col-span-6">
          <h3 className="text-sm font-bold mb-4">Pipeline by Stage</h3>
          <div className="h-[260px]">
            <ResponsiveContainer>
              <BarChart data={pipeline} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid stroke="var(--color-border)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis type="category" dataKey="stage" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="value" fill="var(--color-accent)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="col-span-12 lg:col-span-6">
          <h3 className="text-sm font-bold mb-4">Projects by Status</h3>
          <div className="h-[260px]">
            <ResponsiveContainer>
              <BarChart data={projectStatus}>
                <CartesianGrid stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="status" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="count" fill="var(--color-chart-3)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="col-span-12">
          <h3 className="text-sm font-bold mb-4">Lead Conversion Trend</h3>
          <div className="h-[220px]">
            <ResponsiveContainer>
              <BarChart data={conversion}>
                <CartesianGrid stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} unit="%" />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="rate" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
