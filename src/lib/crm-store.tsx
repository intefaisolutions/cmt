import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { BusinessMode } from "./business-context";
import { useBusiness } from "./business-context";
import { getInitialDatasets } from "./crm-data";
import type {
  Activity,
  CalendarEvent,
  Client,
  ClientStatus,
  CrmDataset,
  Document,
  FollowUp,
  FollowUpOutcome,
  Invoice,
  InvoiceStatus,
  Lead,
  LeadStatus,
  Payment,
  PaymentMode,
  Project,
  ProjectCategory,
  ProjectPriority,
  ProjectStatus,
  Task,
  TaskPriority,
  TaskStatus,
  TaskType,
  TeamMember,
} from "@/types/crm";

type CrmStoreValue = {
  dataset: CrmDataset;
  addLead: (lead: {
    name: string;
    email: string;
    phone: string;
    company: string;
    service: string;
    source: Lead["source"];
    status: LeadStatus;
    value: number;
    owner: string;
    notes: string;
  }) => Lead;
  addClient: (client: {
    companyName: string;
    clientName: string;
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    country: string;
    state: string;
    city: string;
    gst: string;
    website: string;
    linkedin: string;
    industry: string;
    source: Client["source"];
    priority: Client["priority"];
    status: ClientStatus;
    notes: string;
    documents: string[];
  }) => Client;
  addProject: (project: {
    name: string;
    clientId: string;
    category: ProjectCategory;
    projectType: BusinessMode;
    technologies: string[];
    priority: ProjectPriority;
    status: ProjectStatus;
    progress: number;
    paymentProgress: number;
    estimatedDays: number;
    startDate: string;
    endDate: string;
    deliveryDate: string;
    warranty: string;
    supportPeriod: string;
    cost: {
      total: number;
      gst: number;
      discount: number;
      advance: number;
      received: number;
      expenses: number;
    };
  }) => Project;
  addProposal: (proposal: {
    title: string;
    clientId: string;
    client: string;
    features: string[];
    scope: string;
    timelineWeeks: number;
    technologies: string[];
    totalCost: number;
    gst: number;
    paymentTerms: string;
    expiresAt: string;
    leadId?: string;
  }) => import("@/types/crm").Proposal;
  addFollowUp: (fu: {
    leadId?: string;
    clientId?: string;
    name: string;
    company: string;
    type: FollowUp["type"];
    nextCall: string;
    reminder: string;
    meeting?: string;
    remarks: string;
    outcome: FollowUpOutcome;
    nextDate: string;
  }) => FollowUp;
  addInvoice: (inv: {
    clientId: string;
    projectId?: string;
    number?: string;
    amount: number;
    gst: number;
    paid: number;
    status: InvoiceStatus;
    issued: string;
    due: string;
  }) => Invoice;
  addPayment: (p: {
    invoiceId: string;
    clientId: string;
    projectId?: string;
    amount: number;
    date: string;
    mode: PaymentMode;
    transactionId: string;
    remarks: string;
    receiptGenerated: boolean;
  }) => Payment;
  addTeamMember: (m: {
    name: string;
    email: string;
    phone: string;
    role: TeamMember["role"];
    skills: string[];
    status: TeamMember["status"];
  }) => TeamMember;
  addTask: (t: {
    title: string;
    projectId: string;
    type: TaskType;
    assigneeId: string;
    assignee: string;
    priority: TaskPriority;
    status: TaskStatus;
    due: string;
  }) => Task;
  addCalendarEvent: (e: {
    title: string;
    date: string;
    time?: string;
    type: CalendarEvent["type"];
    client?: string;
    project?: string;
    notes?: string;
  }) => CalendarEvent;
  addDocument: (d: {
    name: string;
    folder: string;
    type: Document["type"];
    projectId?: string;
    clientId?: string;
    size: string;
    fileName?: string;
  }) => Document;
};

const CrmStoreContext = createContext<CrmStoreValue | undefined>(undefined);

function uid(prefix: string) {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}`;
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function pushActivity(ds: CrmDataset, activity: Omit<Activity, "id">) {
  ds.activities.unshift({ ...activity, id: uid("A") });
}

import { useEffect } from "react";
import { crmService } from "@/services/crm.service";

export function CrmStoreProvider({ children }: { children: ReactNode }) {
  const { mode } = useBusiness();
  const [datasets, setDatasets] = useState(getInitialDatasets);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const [clients, projects, proposals, invoices, payments] = await Promise.all([
          crmService.getClients(mode).catch(() => []),
          crmService.getProjects(mode).catch(() => []),
          crmService.getProposals(mode).catch(() => []),
          crmService.getInvoices(mode).catch(() => []),
          crmService.getPayments(mode).catch(() => []),
        ]);
        
        if (mounted) {
          setDatasets((prev) => {
            const next = JSON.parse(JSON.stringify(prev)) as Record<BusinessMode, CrmDataset>;
            const ds = next[mode];
            if (clients.length) ds.clients = clients;
            if (projects.length) ds.projects = projects;
            if (proposals.length) ds.proposals = proposals;
            if (invoices.length) ds.invoices = invoices;
            if (payments.length) ds.payments = payments;
            return next;
          });
        }
      } catch (err) {
        console.error("Failed to load dynamic data", err);
      }
    }
    load();
    return () => { mounted = false; };
  }, [mode]);

  const updateMode = useCallback((fn: (ds: CrmDataset) => void) => {
    setDatasets((prev) => {
      const next = JSON.parse(JSON.stringify(prev)) as Record<BusinessMode, CrmDataset>;
      fn(next[mode]);
      return next;
    });
  }, [mode]);

  const addLead = useCallback<CrmStoreValue["addLead"]>((input) => {
    const lead: Lead = {
      id: uid("L"),
      ...input,
      createdAt: todayStr(),
    };
    updateMode((ds) => {
      ds.leads.unshift(lead);
      pushActivity(ds, {
        type: "lead_created",
        who: "Marcus Vane",
        whoInitials: "MV",
        message: "created lead",
        detail: `${lead.name} · ${lead.company}`,
        time: "just now",
        timestamp: 0,
      });
    });
    return lead;
  }, [updateMode]);

  const addClient = useCallback<CrmStoreValue["addClient"]>((input) => {
    const client: Client = {
      ...input,
      id: uid("C"),
      revenue: 0,
      projects: 0,
      since: todayStr(),
      timeline: [
        {
          id: uid("t"),
          type: "inquiry",
          title: "New Client Added",
          description: `Inquiry from ${input.companyName}`,
          date: todayStr(),
          done: true,
        },
      ],
    };
    crmService.createClient({ ...client, businessMode: mode }).catch(console.error);
    updateMode((ds) => {
      ds.clients.unshift(client);
    });
    return client;
  }, [updateMode, mode]);

  const addProject = useCallback<CrmStoreValue["addProject"]>((input) => {
    let project!: Project;
    updateMode((ds) => {
      const client = ds.clients.find((c) => c.id === input.clientId);
      const pending = Math.max(0, input.cost.total - input.cost.received);
      const profit = input.cost.total - input.cost.expenses - input.cost.discount;
      project = {
        id: uid("P"),
        name: input.name,
        clientId: input.clientId,
        client: client?.companyName ?? "Unknown",
        category: input.category,
        projectType: input.projectType,
        technologies: input.technologies,
        priority: input.priority,
        status: input.status,
        progress: input.progress,
        paymentProgress: input.paymentProgress,
        estimatedDays: input.estimatedDays,
        startDate: input.startDate,
        endDate: input.endDate,
        deliveryDate: input.deliveryDate,
        warranty: input.warranty,
        supportPeriod: input.supportPeriod,
        cost: { ...input.cost, pending, profit },
        team: [{ id: "TM-1", name: "Marcus Vane", initials: "MV", role: "Lead" }],
        milestones: [{ name: "Requirements", done: false, date: input.startDate }],
      };
      ds.projects.unshift(project);
      if (client) client.projects += 1;
      pushActivity(ds, {
        type: "project_created",
        who: "Marcus Vane",
        whoInitials: "MV",
        message: "created project",
        detail: project.name,
        time: "just now",
        timestamp: 0,
      });
    });
    crmService.createProject({ ...project, businessMode: mode }).catch(console.error);
    return project;
  }, [updateMode, mode]);

  const addProposal = useCallback<CrmStoreValue["addProposal"]>((input) => {
    let proposal!: import("@/types/crm").Proposal;
    updateMode((ds) => {
      proposal = {
        ...input,
        id: uid("PRP"),
        status: "draft",
        createdAt: todayStr(),
      };
      ds.proposals.unshift(proposal);
      pushActivity(ds, {
        type: "proposal_sent",
        who: "Marcus Vane",
        whoInitials: "MV",
        message: "created proposal",
        detail: proposal.title,
        time: "just now",
        timestamp: 0,
      });
    });
    crmService.createProposal({ ...proposal, businessMode: mode }).catch(console.error);
    return proposal;
  }, [updateMode, mode]);

  const addFollowUp = useCallback<CrmStoreValue["addFollowUp"]>((input) => {
    const isToday = input.nextDate === todayStr();
    const fu: FollowUp = { id: uid("FU"), ...input, isToday };
    updateMode((ds) => {
      ds.followUps.unshift(fu);
    });
    return fu;
  }, [updateMode]);

  const addInvoice = useCallback<CrmStoreValue["addInvoice"]>((input) => {
    let invoice!: Invoice;
    updateMode((ds) => {
      const client = ds.clients.find((c) => c.id === input.clientId);
      const project = input.projectId ? ds.projects.find((p) => p.id === input.projectId) : undefined;
      const num = ds.invoices.length + 9001;
      const pending = Math.max(0, input.amount - input.paid);
      invoice = {
        id: uid("I"),
        number: input.number || `INV-2026-${String(num).padStart(4, "0")}`,
        clientId: input.clientId,
        client: client?.companyName ?? "Unknown",
        projectId: input.projectId,
        amount: input.amount,
        gst: input.gst,
        paid: input.paid,
        pending,
        status: input.status,
        issued: input.issued,
        due: input.due,
      };
      ds.invoices.unshift(invoice);
      if (project) void project;
      pushActivity(ds, {
        type: "invoice_generated",
        who: "Marcus Vane",
        whoInitials: "MV",
        message: "generated invoice",
        detail: `${invoice.number} → ${invoice.client}`,
        time: "just now",
        timestamp: 0,
      });
    });
    crmService.createInvoice({ ...invoice, businessMode: mode }).catch(console.error);
    return invoice;
  }, [updateMode, mode]);

  const addPayment = useCallback<CrmStoreValue["addPayment"]>((input) => {
    let payment!: Payment;
    updateMode((ds) => {
      const invoice = ds.invoices.find((i) => i.id === input.invoiceId);
      const client = ds.clients.find((c) => c.id === input.clientId);
      payment = {
        id: uid("PMT"),
        invoiceId: input.invoiceId,
        invoiceNumber: invoice?.number ?? "—",
        clientId: input.clientId,
        client: client?.companyName ?? "Unknown",
        projectId: input.projectId,
        amount: input.amount,
        date: input.date,
        mode: input.mode,
        transactionId: input.transactionId,
        remarks: input.remarks,
        receiptGenerated: input.receiptGenerated,
      };
      ds.payments.unshift(payment);
      if (invoice) {
        invoice.paid += input.amount;
        invoice.pending = Math.max(0, invoice.amount - invoice.paid);
        if (invoice.pending === 0) invoice.status = "paid";
        else if (invoice.paid > 0) invoice.status = "partial";
      }
      pushActivity(ds, {
        type: "payment_received",
        who: "System",
        whoInitials: "SY",
        message: "payment received",
        detail: `$${input.amount.toLocaleString()} from ${payment.client}`,
        time: "just now",
        timestamp: 0,
      });
    });
    crmService.createPayment({ ...payment, businessMode: mode }).catch(console.error);
    return payment;
  }, [updateMode, mode]);

  const addTeamMember = useCallback<CrmStoreValue["addTeamMember"]>((input) => {
    const member: TeamMember = {
      ...input,
      id: uid("TM"),
      activeProjects: 0,
      avatar: input.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
    };
    updateMode((ds) => {
      ds.team.push(member);
    });
    return member;
  }, [updateMode]);

  const addTask = useCallback<CrmStoreValue["addTask"]>((input) => {
    let task!: Task;
    updateMode((ds) => {
      const project = ds.projects.find((p) => p.id === input.projectId);
      task = {
        id: uid("T"),
        title: input.title,
        type: input.type,
        projectId: input.projectId,
        project: project?.name ?? "Unknown",
        assigneeId: input.assigneeId,
        assignee: input.assignee,
        priority: input.priority,
        status: input.status,
        due: input.due,
      };
      ds.tasks.unshift(task);
      pushActivity(ds, {
        type: "task_assigned",
        who: "Marcus Vane",
        whoInitials: "MV",
        message: "assigned task",
        detail: `${task.title} → ${task.assignee}`,
        time: "just now",
        timestamp: 0,
      });
    });
    return task;
  }, [updateMode]);

  const addCalendarEvent = useCallback<CrmStoreValue["addCalendarEvent"]>((input) => {
    const day = parseInt(input.date.split("-")[2] ?? "1", 10);
    const title = input.time ? `${input.title} (${input.time})` : input.title;
    const event: CalendarEvent = {
      id: uid("CE"),
      title: input.notes ? `${title} — ${input.notes}` : title,
      date: input.date,
      day,
      type: input.type,
      client: input.client,
      project: input.project,
    };
    updateMode((ds) => {
      ds.calendarEvents.push(event);
    });
    return event;
  }, [updateMode]);

  const addDocument = useCallback<CrmStoreValue["addDocument"]>((input) => {
    let doc!: Document;
    updateMode((ds) => {
      const project = input.projectId ? ds.projects.find((p) => p.id === input.projectId) : undefined;
      const client = input.clientId
        ? ds.clients.find((c) => c.id === input.clientId)
        : project
          ? ds.clients.find((c) => c.id === project.clientId)
          : undefined;
      doc = {
        id: uid("D"),
        name: input.fileName || input.name,
        type: input.type,
        folder: input.folder,
        projectId: input.projectId,
        project: project?.name,
        clientId: input.clientId ?? project?.clientId,
        size: input.size,
        uploadedAt: todayStr(),
      };
      ds.documents.unshift(doc);
      if (client && input.fileName) {
        client.documents = [...client.documents, input.fileName];
      }
      pushActivity(ds, {
        type: "document_uploaded",
        who: "Marcus Vane",
        whoInitials: "MV",
        message: "uploaded document",
        detail: doc.name,
        time: "just now",
        timestamp: 0,
      });
    });
    return doc;
  }, [updateMode]);

  const value = useMemo<CrmStoreValue>(
    () => ({
      dataset: datasets[mode],
      addLead,
      addClient,
      addProject,
      addProposal,
      addFollowUp,
      addInvoice,
      addPayment,
      addTeamMember,
      addTask,
      addCalendarEvent,
      addDocument,
    }),
    [
      datasets,
      mode,
      addLead,
      addClient,
      addProject,
      addProposal,
      addFollowUp,
      addInvoice,
      addPayment,
      addTeamMember,
      addTask,
      addCalendarEvent,
      addDocument,
    ],
  );

  return <CrmStoreContext.Provider value={value}>{children}</CrmStoreContext.Provider>;
}

export function useCrm() {
  const ctx = useContext(CrmStoreContext);
  if (!ctx) throw new Error("useCrm must be used within CrmStoreProvider");
  return ctx;
}

export function useDataset(): CrmDataset {
  return useCrm().dataset;
}
