import type { BusinessMode } from "./business-context";
import { useDataset } from "@/lib/crm-store";
import type { CrmDataset } from "@/types/crm";

export function getDashboardStats(ds: CrmDataset) {
  const running = ds.projects.filter((p) =>
    ["development", "testing", "design", "planning", "client_review", "in_progress", "review"].includes(p.status),
  ).length;
  const completed = ds.projects.filter((p) => p.status === "completed").length;
  const pending = ds.projects.filter((p) =>
    ["requirement", "on_hold"].includes(p.status),
  ).length;
  const todayFollowUps = ds.followUps.filter((f) => f.isToday).length;
  const receivedPayments = ds.payments.reduce((a, b) => a + b.amount, 0);
  const pendingPayments = ds.invoices.reduce((a, b) => a + b.pending, 0);
  const monthlyRevenue = ds.payments
    .filter((p) => p.date.startsWith("2026-06"))
    .reduce((a, b) => a + b.amount, 0);
  const yearlyRevenue = ds.payments.reduce((a, b) => a + b.amount, 0);

  return {
    totalLeads: ds.leads.length,
    totalClients: ds.clients.length,
    runningProjects: running,
    completedProjects: completed,
    pendingProjects: pending,
    todayFollowUps,
    pendingPayments,
    receivedPayments,
    monthlyRevenue,
    yearlyRevenue,
  };
}

export function useDashboardStats(mode: BusinessMode) {
  // mode kept for API compat; dataset comes from live store for current business mode
  void mode;
  return getDashboardStats(useDataset());
}

export function formatCurrency(n: number) {
  if (n >= 1000) return `$${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;
  return `$${n.toLocaleString()}`;
}

export function searchAll(ds: CrmDataset, q: string) {
  const query = q.toLowerCase().trim();
  if (!query) return [];

  const results: { type: string; label: string; sub: string; href: string }[] = [];

  ds.clients.forEach((c) => {
    if (
      c.companyName.toLowerCase().includes(query) ||
      c.clientName.toLowerCase().includes(query) ||
      c.email.toLowerCase().includes(query) ||
      c.phone.includes(query)
    ) {
      results.push({ type: "Client", label: c.companyName, sub: c.clientName, href: "/clients" });
    }
  });

  ds.projects.forEach((p) => {
    if (p.name.toLowerCase().includes(query) || p.client.toLowerCase().includes(query)) {
      results.push({ type: "Project", label: p.name, sub: p.client, href: "/projects" });
    }
  });

  ds.invoices.forEach((i) => {
    if (i.number.toLowerCase().includes(query) || i.client.toLowerCase().includes(query)) {
      results.push({ type: "Invoice", label: i.number, sub: i.client, href: "/invoices" });
    }
  });

  ds.proposals.forEach((p) => {
    if (p.title.toLowerCase().includes(query) || p.client.toLowerCase().includes(query)) {
      results.push({ type: "Proposal", label: p.title, sub: p.client, href: "/proposals" });
    }
  });

  ds.payments.forEach((p) => {
    if (p.client.toLowerCase().includes(query) || p.transactionId.toLowerCase().includes(query)) {
      results.push({ type: "Payment", label: p.transactionId, sub: p.client, href: "/payments" });
    }
  });

  ds.team.forEach((m) => {
    if (m.name.toLowerCase().includes(query) || m.email.toLowerCase().includes(query)) {
      results.push({ type: "Team", label: m.name, sub: m.role, href: "/team" });
    }
  });

  ds.leads.forEach((l) => {
    if (l.name.toLowerCase().includes(query) || l.company.toLowerCase().includes(query) || l.email.toLowerCase().includes(query)) {
      results.push({ type: "Lead", label: l.name, sub: l.company, href: "/leads" });
    }
  });

  return results.slice(0, 8);
}

export const statusToneMap: Record<string, "neutral" | "blue" | "amber" | "green" | "red"> = {
  new: "neutral",
  qualified: "blue",
  negotiating: "amber",
  won: "green",
  lost: "red",
  draft: "neutral",
  sent: "blue",
  viewed: "amber",
  accepted: "green",
  rejected: "red",
  expired: "red",
  paid: "green",
  overdue: "red",
  partial: "amber",
  development: "blue",
  testing: "amber",
  completed: "green",
  on_hold: "red",
  requirement: "neutral",
  planning: "blue",
  design: "amber",
  client_review: "amber",
  cancelled: "red",
  converted: "green",
  active: "green",
  prospect: "blue",
  proposal_sent: "blue",
  follow_up: "amber",
  negotiation: "amber",
  interested: "blue",
};
