import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCrm } from "@/lib/crm-store";
import {
  CalendarForm,
  ClientForm,
  DocumentForm,
  FollowUpForm,
  InvoiceForm,
  LeadForm,
  PaymentForm,
  ProjectForm,
  TaskForm,
  TeamForm,
} from "./entity-forms";

export type EntityType =
  | "lead"
  | "client"
  | "project"
  | "follow-up"
  | "invoice"
  | "payment"
  | "team"
  | "task"
  | "calendar"
  | "document";

const titles: Record<EntityType, string> = {
  lead: "New Lead",
  client: "New Client",
  project: "New Project",
  "follow-up": "New Follow Up",
  invoice: "Generate Invoice",
  payment: "Record Payment",
  team: "Add Team Member",
  task: "New Task",
  calendar: "New Calendar Event",
  document: "Upload Document",
};

const descriptions: Record<EntityType, string> = {
  lead: "Add a new lead with full contact and pipeline details.",
  client: "Create a complete client profile with all business information.",
  project: "Create a project with timeline, cost breakdown, and technologies.",
  "follow-up": "Schedule a follow-up with reminders and outcome tracking.",
  invoice: "Generate an invoice with GST, payment status, and dates.",
  payment: "Record a payment with mode, transaction ID, and receipt.",
  team: "Add a team member with role, skills, and availability.",
  task: "Add a task with assignee, type, priority, and status.",
  calendar: "Schedule a meeting, deadline, or reminder with notes.",
  document: "Upload a document with folder, client, and project links.",
};

const wideDialogs: EntityType[] = ["client", "project", "invoice", "payment", "follow-up"];

export function CreateEntityDialog({
  entity,
  open,
  onOpenChange,
}: {
  entity: EntityType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const crm = useCrm();
  const ds = crm.dataset;
  const [key, setKey] = useState(0);

  const reset = () => setKey((k) => k + 1);

  const handleClose = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  const onSuccess = (message: string) => {
    toast.success(message);
    handleClose(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={`${wideDialogs.includes(entity) ? "max-w-3xl" : "max-w-lg"} max-h-[90vh] overflow-y-auto`}>
        <DialogHeader>
          <DialogTitle>{titles[entity]}</DialogTitle>
          <DialogDescription>{descriptions[entity]}</DialogDescription>
        </DialogHeader>

        {entity === "lead" && (
          <LeadForm key={key} onSubmit={(data) => { crm.addLead(data); onSuccess(`Lead "${data.name}" created`); }} />
        )}
        {entity === "client" && (
          <ClientForm key={key} onSubmit={(data) => { crm.addClient(data); onSuccess(`Client "${data.companyName}" created`); }} />
        )}
        {entity === "project" && (
          <ProjectForm key={key} clients={ds.clients} onSubmit={(data) => { crm.addProject(data); onSuccess(`Project "${data.name}" created`); }} />
        )}
        {entity === "follow-up" && (
          <FollowUpForm key={key} leads={ds.leads} clients={ds.clients} onSubmit={(data) => { crm.addFollowUp(data); onSuccess(`Follow-up scheduled for ${data.name}`); }} />
        )}
        {entity === "invoice" && (
          <InvoiceForm key={key} clients={ds.clients} projects={ds.projects} onSubmit={(data) => { crm.addInvoice(data); onSuccess("Invoice generated"); }} />
        )}
        {entity === "payment" && (
          <PaymentForm key={key} invoices={ds.invoices} clients={ds.clients} projects={ds.projects} onSubmit={(data) => { crm.addPayment(data); onSuccess(`Payment of $${data.amount.toLocaleString()} recorded`); }} />
        )}
        {entity === "team" && (
          <TeamForm key={key} onSubmit={(data) => { crm.addTeamMember(data); onSuccess(`Team member "${data.name}" added`); }} />
        )}
        {entity === "task" && (
          <TaskForm key={key} projects={ds.projects} team={ds.team} onSubmit={(data) => { crm.addTask(data); onSuccess(`Task "${data.title}" created`); }} />
        )}
        {entity === "calendar" && (
          <CalendarForm key={key} onSubmit={(data) => { crm.addCalendarEvent(data); onSuccess(`Event "${data.title}" added`); }} />
        )}
        {entity === "document" && (
          <DocumentForm key={key} projects={ds.projects} clients={ds.clients} onSubmit={(data) => { crm.addDocument(data); onSuccess(`Document "${data.name}" uploaded`); }} />
        )}
      </DialogContent>
    </Dialog>
  );
}
