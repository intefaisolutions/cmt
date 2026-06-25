import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useBusiness } from "@/lib/business-context";
import {
  CALENDAR_EVENT_TYPES,
  CLIENT_PRIORITIES,
  CLIENT_STATUSES,
  DOCUMENT_FOLDERS,
  DOCUMENT_TYPES,
  ESTIMATED_DAYS,
  FOLLOW_UP_OUTCOMES,
  FOLLOW_UP_TYPES,
  INVOICE_STATUSES,
  LEAD_SOURCES,
  LEAD_STATUSES,
  OWNERS,
  PAYMENT_MODES,
  PROJECT_CATEGORIES,
  PROJECT_PRIORITIES,
  PROJECT_STATUSES,
  SUPPORT_PERIODS,
  TASK_PRIORITIES,
  TASK_STATUSES,
  TASK_TYPES,
  TEAM_ROLES,
  TEAM_STATUSES,
  TECHNOLOGIES,
  WARRANTY_OPTIONS,
} from "@/constants/form-options";
import type {
  CalendarEventType,
  Client,
  ClientPriority,
  ClientStatus,
  DocumentType,
  FollowUpOutcome,
  FollowUpType,
  Invoice,
  InvoiceStatus,
  Lead,
  LeadSource,
  LeadStatus,
  PaymentMode,
  Project,
  ProjectCategory,
  ProjectPriority,
  ProjectStatus,
  TaskPriority,
  TaskStatus,
  TaskType,
  TeamMember,
} from "@/types/crm";
import {
  Field,
  FormActions,
  FormGrid,
  NativeCheckbox,
  Section,
  SelectInput,
  num,
  str,
} from "./form-fields";

const today = () => new Date().toISOString().slice(0, 10);

export function LeadForm({ onSubmit }: { onSubmit: (data: {
  name: string; email: string; phone: string; company: string; service: string;
  source: LeadSource; status: LeadStatus; value: number; owner: string; notes: string;
}) => void }) {
  const handle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    onSubmit({
      name: str(fd, "name"), email: str(fd, "email"), phone: str(fd, "phone"),
      company: str(fd, "company"), service: str(fd, "service"),
      source: str(fd, "source") as LeadSource, status: str(fd, "status") as LeadStatus,
      value: num(fd, "value"), owner: str(fd, "owner"), notes: str(fd, "notes"),
    });
  };
  return (
    <form onSubmit={handle}>
      <FormGrid>
        <Section title="Contact">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Full Name"><Input name="name" required placeholder="John Doe" /></Field>
            <Field label="Company"><Input name="company" required placeholder="Acme Inc." /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Email"><Input name="email" type="email" required /></Field>
            <Field label="Phone"><Input name="phone" required placeholder="+91 98765 43210" /></Field>
          </div>
        </Section>
        <Section title="Lead Details">
          <Field label="Service Required"><Input name="service" required placeholder="Web Development" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Source">
              <SelectInput name="source" defaultValue="Website">
                {LEAD_SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
              </SelectInput>
            </Field>
            <Field label="Status">
              <SelectInput name="status" defaultValue="new">
                {LEAD_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </SelectInput>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Estimated Value ($)"><Input name="value" type="number" min={0} defaultValue={10000} /></Field>
            <Field label="Owner">
              <SelectInput name="owner" defaultValue="MV">
                {OWNERS.map((o) => <option key={o} value={o}>{o}</option>)}
              </SelectInput>
            </Field>
          </div>
          <Field label="Notes"><Textarea name="notes" rows={3} placeholder="Lead notes, requirements..." /></Field>
        </Section>
      </FormGrid>
      <FormActions label="Create Lead" />
    </form>
  );
}

export function ClientForm({ onSubmit }: { onSubmit: (data: {
  companyName: string; clientName: string; email: string; phone: string; whatsapp: string;
  address: string; country: string; state: string; city: string; gst: string; website: string;
  linkedin: string; industry: string; source: LeadSource; priority: ClientPriority;
  status: ClientStatus; notes: string; documents: string[];
}) => void }) {
  const handle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const file = fd.get("document") as File | null;
    const documents = file?.name ? [file.name] : [];
    onSubmit({
      companyName: str(fd, "companyName"), clientName: str(fd, "clientName"),
      email: str(fd, "email"), phone: str(fd, "phone"), whatsapp: str(fd, "whatsapp"),
      address: str(fd, "address"), country: str(fd, "country"), state: str(fd, "state"), city: str(fd, "city"),
      gst: str(fd, "gst"), website: str(fd, "website"), linkedin: str(fd, "linkedin"),
      industry: str(fd, "industry"), source: str(fd, "source") as LeadSource,
      priority: str(fd, "priority") as ClientPriority, status: str(fd, "status") as ClientStatus,
      notes: str(fd, "notes"), documents,
    });
  };
  return (
    <form onSubmit={handle}>
      <FormGrid>
        <Section title="Company & Contact">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Company Name"><Input name="companyName" required /></Field>
            <Field label="Contact Name"><Input name="clientName" required /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Email"><Input name="email" type="email" required /></Field>
            <Field label="Phone"><Input name="phone" required /></Field>
          </div>
          <Field label="WhatsApp"><Input name="whatsapp" placeholder="Same as phone" /></Field>
        </Section>
        <Section title="Address">
          <Field label="Address"><Input name="address" /></Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="City"><Input name="city" /></Field>
            <Field label="State"><Input name="state" /></Field>
            <Field label="Country"><Input name="country" defaultValue="India" /></Field>
          </div>
        </Section>
        <Section title="Business Info">
          <div className="grid grid-cols-2 gap-3">
            <Field label="GST / Tax ID"><Input name="gst" /></Field>
            <Field label="Industry"><Input name="industry" placeholder="Technology" /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Website"><Input name="website" placeholder="company.com" /></Field>
            <Field label="LinkedIn"><Input name="linkedin" placeholder="linkedin.com/company/..." /></Field>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Source">
              <SelectInput name="source" defaultValue="Website">
                {LEAD_SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
              </SelectInput>
            </Field>
            <Field label="Priority">
              <SelectInput name="priority" defaultValue="medium">
                {CLIENT_PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
              </SelectInput>
            </Field>
            <Field label="Status">
              <SelectInput name="status" defaultValue="new">
                {CLIENT_STATUSES.map((s) => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
              </SelectInput>
            </Field>
          </div>
          <Field label="Notes"><Textarea name="notes" rows={2} /></Field>
          <Field label="Document Upload" hint="Attach contract, NDA, or company profile">
            <Input name="document" type="file" accept=".pdf,.doc,.docx,.png,.jpg" />
          </Field>
        </Section>
      </FormGrid>
      <FormActions label="Create Client" />
    </form>
  );
}

export function ProjectForm({
  clients,
  onSubmit,
}: {
  clients: Pick<Client, "id" | "companyName">[];
  onSubmit: (data: {
    name: string; clientId: string; category: ProjectCategory; projectType: "it" | "marketing";
    technologies: string[]; priority: ProjectPriority; status: ProjectStatus; progress: number;
    paymentProgress: number; estimatedDays: number; startDate: string; endDate: string;
    deliveryDate: string; warranty: string; supportPeriod: string;
    cost: { total: number; gst: number; discount: number; advance: number; received: number; expenses: number };
  }) => void;
}) {
  const { mode } = useBusiness();
  const [total, setTotal] = useState(50000);
  const [received, setReceived] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [discount, setDiscount] = useState(0);
  const gst = Math.round(total * 0.18);
  const pending = Math.max(0, total - received);
  const profit = total - expenses - discount;

  const handle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const technologies = fd.getAll("technologies").map(String);
    onSubmit({
      name: str(fd, "name"), clientId: str(fd, "clientId"),
      category: str(fd, "category") as ProjectCategory,
      projectType: str(fd, "projectType") as "it" | "marketing",
      technologies, priority: str(fd, "priority") as ProjectPriority,
      status: str(fd, "status") as ProjectStatus,
      progress: num(fd, "progress"), paymentProgress: num(fd, "paymentProgress"),
      estimatedDays: num(fd, "estimatedDays"),
      startDate: str(fd, "startDate"), endDate: str(fd, "endDate"), deliveryDate: str(fd, "deliveryDate"),
      warranty: str(fd, "warranty"), supportPeriod: str(fd, "supportPeriod"),
      cost: {
        total: num(fd, "total"), gst: num(fd, "gst"), discount: num(fd, "discount"),
        advance: num(fd, "advance"), received: num(fd, "received"), expenses: num(fd, "expenses"),
      },
    });
  };

  return (
    <form onSubmit={handle}>
      <FormGrid>
        <Section title="Project Info">
          <Field label="Project Name"><Input name="name" required placeholder="Cloud Migration" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Client">
              <SelectInput name="clientId" required defaultValue={clients[0]?.id}>
                {clients.map((c) => <option key={c.id} value={c.id}>{c.companyName}</option>)}
              </SelectInput>
            </Field>
            <Field label="Project Type">
              <SelectInput name="projectType" defaultValue={mode}>
                <option value="it">IT</option>
                <option value="marketing">Marketing</option>
              </SelectInput>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Category">
              <SelectInput name="category" defaultValue="Full Stack">
                {PROJECT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </SelectInput>
            </Field>
            <Field label="Priority">
              <SelectInput name="priority" defaultValue="medium">
                {PROJECT_PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
              </SelectInput>
            </Field>
          </div>
          <Field label="Technologies">
            <div className="grid grid-cols-3 gap-2 p-3 border border-border rounded-md max-h-32 overflow-y-auto">
              {TECHNOLOGIES.map((t) => <NativeCheckbox key={t} name="technologies" value={t} label={t} />)}
            </div>
          </Field>
        </Section>
        <Section title="Status & Timeline">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Status">
              <SelectInput name="status" defaultValue="requirement">
                {PROJECT_STATUSES.map((s) => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
              </SelectInput>
            </Field>
            <Field label="Estimated Days">
              <SelectInput name="estimatedDays" defaultValue={30}>
                {ESTIMATED_DAYS.map((d) => <option key={d} value={d}>{d} days</option>)}
              </SelectInput>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Progress (%)"><Input name="progress" type="number" min={0} max={100} defaultValue={0} /></Field>
            <Field label="Payment Progress (%)"><Input name="paymentProgress" type="number" min={0} max={100} defaultValue={0} /></Field>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Start Date"><Input name="startDate" type="date" required defaultValue={today()} /></Field>
            <Field label="End Date"><Input name="endDate" type="date" required /></Field>
            <Field label="Delivery Date"><Input name="deliveryDate" type="date" required /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Warranty">
              <SelectInput name="warranty" defaultValue="90 days">
                {WARRANTY_OPTIONS.map((w) => <option key={w} value={w}>{w}</option>)}
              </SelectInput>
            </Field>
            <Field label="Support Period">
              <SelectInput name="supportPeriod" defaultValue="3 months">
                {SUPPORT_PERIODS.map((s) => <option key={s} value={s}>{s}</option>)}
              </SelectInput>
            </Field>
          </div>
        </Section>
        <Section title="Cost Breakdown">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Total Cost ($)">
              <Input name="total" type="number" min={0} required defaultValue={50000}
                onChange={(e) => setTotal(Number(e.target.value) || 0)} />
            </Field>
            <Field label="GST (18%)" hint="Auto-calculated">
              <Input name="gst" type="number" readOnly value={gst} />
            </Field>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Discount ($)">
              <Input name="discount" type="number" min={0} defaultValue={0}
                onChange={(e) => setDiscount(Number(e.target.value) || 0)} />
            </Field>
            <Field label="Advance ($)"><Input name="advance" type="number" min={0} defaultValue={0} /></Field>
            <Field label="Received ($)">
              <Input name="received" type="number" min={0} defaultValue={0}
                onChange={(e) => setReceived(Number(e.target.value) || 0)} />
            </Field>
          </div>
          <Field label="Expenses ($)">
            <Input name="expenses" type="number" min={0} defaultValue={0}
              onChange={(e) => setExpenses(Number(e.target.value) || 0)} />
          </Field>
          <div className="grid grid-cols-2 gap-3 p-3 bg-secondary/40 rounded-md text-xs">
            <div><span className="text-muted-foreground">Pending: </span><span className="font-mono font-semibold">${pending.toLocaleString()}</span></div>
            <div><span className="text-muted-foreground">Profit: </span><span className="font-mono font-semibold text-green-600">${profit.toLocaleString()}</span></div>
          </div>
        </Section>
      </FormGrid>
      <FormActions label="Create Project" />
    </form>
  );
}

export function FollowUpForm({
  leads,
  clients,
  onSubmit,
}: {
  leads: Pick<Lead, "id" | "name" | "company">[];
  clients: Pick<Client, "id" | "clientName" | "companyName">[];
  onSubmit: (data: {
    leadId?: string; clientId?: string; name: string; company: string; type: FollowUpType;
    nextCall: string; reminder: string; meeting?: string; remarks: string;
    outcome: FollowUpOutcome; nextDate: string;
  }) => void;
}) {
  const handle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const leadId = str(fd, "leadId") || undefined;
    const clientId = str(fd, "clientId") || undefined;
    const meeting = str(fd, "meeting") || undefined;
    onSubmit({
      leadId, clientId, name: str(fd, "name"), company: str(fd, "company"),
      type: str(fd, "type") as FollowUpType, nextCall: str(fd, "nextCall"),
      reminder: str(fd, "reminder"), meeting, remarks: str(fd, "remarks"),
      outcome: str(fd, "outcome") as FollowUpOutcome, nextDate: str(fd, "nextDate"),
    });
  };
  return (
    <form onSubmit={handle}>
      <FormGrid>
        <Section title="Link to Lead / Client">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Lead (optional)">
              <SelectInput name="leadId" defaultValue="">
                <option value="">— None —</option>
                {leads.map((l) => <option key={l.id} value={l.id}>{l.name} · {l.company}</option>)}
              </SelectInput>
            </Field>
            <Field label="Client (optional)">
              <SelectInput name="clientId" defaultValue="">
                <option value="">— None —</option>
                {clients.map((c) => <option key={c.id} value={c.id}>{c.clientName} · {c.companyName}</option>)}
              </SelectInput>
            </Field>
          </div>
        </Section>
        <Section title="Follow-up Details">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Contact Name"><Input name="name" required /></Field>
            <Field label="Company"><Input name="company" required /></Field>
          </div>
          <Field label="Type">
            <SelectInput name="type" defaultValue="call">
              {FOLLOW_UP_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </SelectInput>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Next Call"><Input name="nextCall" required placeholder="Today 4:00 PM" /></Field>
            <Field label="Reminder"><Input name="reminder" placeholder="1 hour before" /></Field>
          </div>
          <Field label="Meeting Link / Location"><Input name="meeting" placeholder="Zoom link or office address" /></Field>
          <Field label="Remarks"><Textarea name="remarks" required rows={2} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Outcome">
              <SelectInput name="outcome" defaultValue="pending">
                {FOLLOW_UP_OUTCOMES.map((o) => <option key={o} value={o}>{o}</option>)}
              </SelectInput>
            </Field>
            <Field label="Next Date"><Input name="nextDate" type="date" required defaultValue={today()} /></Field>
          </div>
        </Section>
      </FormGrid>
      <FormActions label="Schedule Follow Up" />
    </form>
  );
}

export function InvoiceForm({
  clients,
  projects,
  onSubmit,
}: {
  clients: Pick<Client, "id" | "companyName">[];
  projects: Pick<Project, "id" | "name" | "clientId">[];
  onSubmit: (data: {
    clientId: string; projectId?: string; number?: string; amount: number; gst: number;
    paid: number; status: InvoiceStatus; issued: string; due: string;
  }) => void;
}) {
  const [amount, setAmount] = useState(0);
  const [paid, setPaid] = useState(0);
  const gst = Math.round(amount * 0.18);
  const pending = Math.max(0, amount - paid);

  const handle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const projectId = str(fd, "projectId") || undefined;
    const number = str(fd, "number") || undefined;
    onSubmit({
      clientId: str(fd, "clientId"), projectId, number,
      amount: num(fd, "amount"), gst: num(fd, "gst"), paid: num(fd, "paid"),
      status: str(fd, "status") as InvoiceStatus,
      issued: str(fd, "issued"), due: str(fd, "due"),
    });
  };
  return (
    <form onSubmit={handle}>
      <FormGrid>
        <Field label="Invoice Number" hint="Leave blank to auto-generate">
          <Input name="number" placeholder="INV-2026-0001" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Client">
            <SelectInput name="clientId" required defaultValue={clients[0]?.id}>
              {clients.map((c) => <option key={c.id} value={c.id}>{c.companyName}</option>)}
            </SelectInput>
          </Field>
          <Field label="Project (optional)">
            <SelectInput name="projectId" defaultValue="">
              <option value="">— None —</option>
              {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </SelectInput>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Amount ($)">
            <Input name="amount" type="number" min={1} required
              onChange={(e) => setAmount(Number(e.target.value) || 0)} />
          </Field>
          <Field label="GST (18%)" hint="Auto-calculated">
            <Input name="gst" type="number" readOnly value={gst} />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Paid ($)">
            <Input name="paid" type="number" min={0} defaultValue={0}
              onChange={(e) => setPaid(Number(e.target.value) || 0)} />
          </Field>
          <Field label="Pending ($)" hint="Auto-calculated">
            <Input type="number" readOnly value={pending} className="bg-muted" />
          </Field>
        </div>
        <Field label="Status">
          <SelectInput name="status" defaultValue="draft">
            {INVOICE_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </SelectInput>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Issued Date"><Input name="issued" type="date" required defaultValue={today()} /></Field>
          <Field label="Due Date"><Input name="due" type="date" required /></Field>
        </div>
      </FormGrid>
      <FormActions label="Generate Invoice" />
    </form>
  );
}

export function PaymentForm({
  invoices,
  clients,
  projects,
  onSubmit,
}: {
  invoices: Pick<Invoice, "id" | "number" | "clientId" | "pending">[];
  clients: Pick<Client, "id" | "companyName">[];
  projects: Pick<Project, "id" | "name">[];
  onSubmit: (data: {
    invoiceId: string; clientId: string; projectId?: string; amount: number; date: string;
    mode: PaymentMode; transactionId: string; remarks: string; receiptGenerated: boolean;
  }) => void;
}) {
  const handle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const projectId = str(fd, "projectId") || undefined;
    onSubmit({
      invoiceId: str(fd, "invoiceId"), clientId: str(fd, "clientId"), projectId,
      amount: num(fd, "amount"), date: str(fd, "date"),
      mode: str(fd, "mode") as PaymentMode, transactionId: str(fd, "transactionId"),
      remarks: str(fd, "remarks"), receiptGenerated: fd.get("receiptGenerated") === "on",
    });
  };
  return (
    <form onSubmit={handle}>
      <FormGrid>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Invoice">
            <SelectInput name="invoiceId" required defaultValue={invoices[0]?.id}>
              {invoices.map((i) => (
                <option key={i.id} value={i.id}>{i.number} (pending ${i.pending.toLocaleString()})</option>
              ))}
            </SelectInput>
          </Field>
          <Field label="Client">
            <SelectInput name="clientId" required defaultValue={clients[0]?.id}>
              {clients.map((c) => <option key={c.id} value={c.id}>{c.companyName}</option>)}
            </SelectInput>
          </Field>
        </div>
        <Field label="Project (optional)">
          <SelectInput name="projectId" defaultValue="">
            <option value="">— None —</option>
            {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </SelectInput>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Amount ($)"><Input name="amount" type="number" min={1} required /></Field>
          <Field label="Payment Date"><Input name="date" type="date" required defaultValue={today()} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Payment Mode">
            <SelectInput name="mode" defaultValue="UPI">
              {PAYMENT_MODES.map((m) => <option key={m} value={m}>{m}</option>)}
            </SelectInput>
          </Field>
          <Field label="Transaction ID"><Input name="transactionId" placeholder="TXN-123456" /></Field>
        </div>
        <Field label="Remarks"><Textarea name="remarks" rows={2} placeholder="Payment notes..." /></Field>
        <Field label="Receipt Upload">
          <Input name="receipt" type="file" accept=".pdf,.png,.jpg" />
        </Field>
        <NativeCheckbox name="receiptGenerated" value="on" label="Auto-generate receipt PDF" />
      </FormGrid>
      <FormActions label="Record Payment" />
    </form>
  );
}

export function TeamForm({ onSubmit }: { onSubmit: (data: {
  name: string; email: string; phone: string; role: TeamMember["role"];
  skills: string[]; status: TeamMember["status"];
}) => void }) {
  const handle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    onSubmit({
      name: str(fd, "name"), email: str(fd, "email"), phone: str(fd, "phone"),
      role: str(fd, "role") as TeamMember["role"],
      skills: str(fd, "skills").split(",").map((s) => s.trim()).filter(Boolean),
      status: str(fd, "status") as TeamMember["status"],
    });
  };
  return (
    <form onSubmit={handle}>
      <FormGrid>
        <Field label="Full Name"><Input name="name" required /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Email"><Input name="email" type="email" required /></Field>
          <Field label="Phone"><Input name="phone" required /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Role">
            <SelectInput name="role" defaultValue="developer">
              {TEAM_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </SelectInput>
          </Field>
          <Field label="Status">
            <SelectInput name="status" defaultValue="available">
              {TEAM_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </SelectInput>
          </Field>
        </div>
        <Field label="Skills (comma separated)"><Input name="skills" placeholder="React, Node, AWS" /></Field>
      </FormGrid>
      <FormActions label="Add Member" />
    </form>
  );
}

export function TaskForm({
  projects,
  team,
  onSubmit,
}: {
  projects: Pick<Project, "id" | "name">[];
  team: Pick<TeamMember, "id" | "name" | "avatar">[];
  onSubmit: (data: {
    title: string; projectId: string; type: TaskType; assigneeId: string; assignee: string;
    priority: TaskPriority; status: TaskStatus; due: string;
  }) => void;
}) {
  const [assigneeId, setAssigneeId] = useState(team[0]?.id ?? "");
  const selected = team.find((m) => m.id === assigneeId);

  const handle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const member = team.find((m) => m.id === str(fd, "assigneeId"));
    onSubmit({
      title: str(fd, "title"), projectId: str(fd, "projectId"),
      type: str(fd, "type") as TaskType, assigneeId: str(fd, "assigneeId"),
      assignee: member?.avatar ?? str(fd, "assignee"),
      priority: str(fd, "priority") as TaskPriority,
      status: str(fd, "status") as TaskStatus, due: str(fd, "due"),
    });
  };
  return (
    <form onSubmit={handle}>
      <FormGrid>
        <Field label="Task Title"><Input name="title" required placeholder="Implement login page" /></Field>
        <Field label="Project">
          <SelectInput name="projectId" required defaultValue={projects[0]?.id}>
            {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </SelectInput>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Type">
            <SelectInput name="type" defaultValue="development">
              {TASK_TYPES.map((t) => <option key={t} value={t}>{t.replace("_", " ")}</option>)}
            </SelectInput>
          </Field>
          <Field label="Priority">
            <SelectInput name="priority" defaultValue="medium">
              {TASK_PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
            </SelectInput>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Assignee">
            <SelectInput name="assigneeId" required value={assigneeId}
              onChange={(e) => setAssigneeId(e.target.value)}>
              {team.map((m) => <option key={m.id} value={m.id}>{m.name} ({m.avatar})</option>)}
            </SelectInput>
          </Field>
          <Field label="Status">
            <SelectInput name="status" defaultValue="todo">
              {TASK_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </SelectInput>
          </Field>
        </div>
        <input type="hidden" name="assignee" value={selected?.avatar ?? ""} />
        <Field label="Due Date"><Input name="due" type="date" required /></Field>
      </FormGrid>
      <FormActions label="Create Task" />
    </form>
  );
}

export function CalendarForm({ onSubmit }: { onSubmit: (data: {
  title: string; date: string; time?: string; type: CalendarEventType;
  client?: string; project?: string; notes?: string;
}) => void }) {
  const handle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const client = str(fd, "client") || undefined;
    const project = str(fd, "project") || undefined;
    const time = str(fd, "time") || undefined;
    const notes = str(fd, "notes") || undefined;
    onSubmit({
      title: str(fd, "title"), date: str(fd, "date"), time, type: str(fd, "type") as CalendarEventType,
      client, project, notes,
    });
  };
  return (
    <form onSubmit={handle}>
      <FormGrid>
        <Field label="Event Title"><Input name="title" required placeholder="Client meeting" /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Date"><Input name="date" type="date" required defaultValue={today()} /></Field>
          <Field label="Time"><Input name="time" type="time" /></Field>
        </div>
        <Field label="Type">
          <SelectInput name="type" defaultValue="meeting">
            {CALENDAR_EVENT_TYPES.map((t) => <option key={t} value={t}>{t.replace(/_/g, " ")}</option>)}
          </SelectInput>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Client"><Input name="client" placeholder="Company name" /></Field>
          <Field label="Project"><Input name="project" placeholder="Project name" /></Field>
        </div>
        <Field label="Notes"><Textarea name="notes" rows={2} placeholder="Agenda, location..." /></Field>
      </FormGrid>
      <FormActions label="Add Event" />
    </form>
  );
}

export function DocumentForm({
  projects,
  clients,
  onSubmit,
}: {
  projects: Pick<Project, "id" | "name">[];
  clients: Pick<Client, "id" | "companyName">[];
  onSubmit: (data: {
    name: string; folder: string; type: DocumentType; projectId?: string;
    clientId?: string; size: string; fileName?: string;
  }) => void;
}) {
  const handle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const file = fd.get("file") as File | null;
    const projectId = str(fd, "projectId") || undefined;
    const clientId = str(fd, "clientId") || undefined;
    onSubmit({
      name: str(fd, "name") || file?.name || "Document",
      folder: str(fd, "folder"), type: str(fd, "type") as DocumentType,
      projectId, clientId, size: str(fd, "size") || "—", fileName: file?.name,
    });
  };
  return (
    <form onSubmit={handle}>
      <FormGrid>
        <Field label="File Upload">
          <Input name="file" type="file" accept=".pdf,.doc,.docx,.png,.jpg,.zip,.fig" />
        </Field>
        <Field label="Document Name"><Input name="name" placeholder="Auto-filled from file name" /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Folder">
            <SelectInput name="folder" defaultValue="Contracts">
              {DOCUMENT_FOLDERS.map((f) => <option key={f} value={f}>{f}</option>)}
            </SelectInput>
          </Field>
          <Field label="File Type">
            <SelectInput name="type" defaultValue="pdf">
              {DOCUMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </SelectInput>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Client (optional)">
            <SelectInput name="clientId" defaultValue="">
              <option value="">— None —</option>
              {clients.map((c) => <option key={c.id} value={c.id}>{c.companyName}</option>)}
            </SelectInput>
          </Field>
          <Field label="Project (optional)">
            <SelectInput name="projectId" defaultValue="">
              <option value="">— None —</option>
              {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </SelectInput>
          </Field>
        </div>
        <Field label="File Size" hint="e.g. 2.4 MB"><Input name="size" placeholder="2.4 MB" /></Field>
      </FormGrid>
      <FormActions label="Upload Document" />
    </form>
  );
}
