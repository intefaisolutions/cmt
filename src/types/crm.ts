import type { BusinessMode } from "@/lib/business-context";

export type LeadSource =
  | "Website"
  | "Instagram"
  | "Facebook"
  | "LinkedIn"
  | "Reference"
  | "Google Ads"
  | "WhatsApp"
  | "Cold Call"
  | "Email"
  | "Conference"
  | "Organic"
  | "Outbound"
  | "Referral"
  | "LinkedIn Ads"
  | "Inbound Form"
  | "Webinar";

export type LeadStatus = "new" | "qualified" | "negotiating" | "won" | "lost";

export type ClientStatus =
  | "new"
  | "interested"
  | "follow_up"
  | "proposal_sent"
  | "negotiation"
  | "converted"
  | "rejected"
  | "active"
  | "prospect"
  | "churned";

export type ClientPriority = "low" | "medium" | "high" | "urgent";

export type ProjectCategory =
  | "Frontend"
  | "Backend"
  | "Full Stack"
  | "Website"
  | "Mobile App"
  | "Dashboard"
  | "Admin Panel"
  | "API"
  | "SEO"
  | "Digital Marketing"
  | "UI Design"
  | "Logo Design"
  | "Hosting"
  | "Maintenance";

export type ProjectStatus =
  | "requirement"
  | "planning"
  | "design"
  | "development"
  | "testing"
  | "client_review"
  | "completed"
  | "on_hold"
  | "cancelled"
  | "in_progress"
  | "review";

export type ProjectPriority = "low" | "medium" | "high" | "urgent";

export type ProposalStatus = "draft" | "sent" | "viewed" | "accepted" | "rejected" | "expired";

export type PaymentMode = "UPI" | "Cash" | "Cheque" | "Bank Transfer" | "Stripe" | "Wire" | "ACH";

export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "partial";

export type TaskStatus = "backlog" | "todo" | "doing" | "review" | "done";

export type TaskType = "design" | "development" | "testing" | "deployment" | "bug_fix" | "support";

export type TaskPriority = "low" | "medium" | "high";

export type FollowUpType = "call" | "email" | "meeting" | "whatsapp" | "reminder";

export type FollowUpOutcome = "pending" | "positive" | "negative" | "rescheduled" | "converted";

export type CalendarEventType = "meeting" | "deadline" | "follow_up" | "payment_due" | "delivery";

export type DocumentType =
  | "pdf"
  | "image"
  | "figma"
  | "word"
  | "excel"
  | "zip"
  | "apk"
  | "source"
  | "contract";

export type ActivityType =
  | "project_created"
  | "proposal_sent"
  | "payment_received"
  | "project_completed"
  | "invoice_generated"
  | "lead_created"
  | "follow_up"
  | "task_assigned"
  | "document_uploaded";

export type NotificationType =
  | "payment_due"
  | "proposal_pending"
  | "follow_up"
  | "deadline"
  | "invoice"
  | "task";

export type TimelineEventType =
  | "inquiry"
  | "meeting"
  | "proposal_sent"
  | "follow_up"
  | "negotiation"
  | "payment"
  | "project_started"
  | "project_delivered"
  | "support";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  source: LeadSource;
  status: LeadStatus;
  value: number;
  createdAt: string;
  owner: string;
  notes?: string;
  clientId?: string;
}

export interface Client {
  id: string;
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
  source: LeadSource;
  priority: ClientPriority;
  notes: string;
  status: ClientStatus;
  revenue: number;
  projects: number;
  since: string;
  leadId?: string;
  timeline: TimelineEvent[];
  documents: string[];
}

export interface ProjectCost {
  total: number;
  gst: number;
  discount: number;
  advance: number;
  received: number;
  pending: number;
  expenses: number;
  profit: number;
}

export interface Project {
  id: string;
  name: string;
  clientId: string;
  client: string;
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
  cost: ProjectCost;
  team: TeamMemberRef[];
  milestones: { name: string; done: boolean; date: string }[];
  leadId?: string;
  proposalId?: string;
}

export interface TeamMemberRef {
  id: string;
  name: string;
  initials: string;
  role: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "developer" | "designer" | "tester" | "manager" | "sales";
  skills: string[];
  activeProjects: number;
  avatar: string;
  status: "available" | "busy" | "away";
}

export interface Proposal {
  id: string;
  title: string;
  clientId: string;
  client: string;
  status: ProposalStatus;
  features: string[];
  scope: string;
  timelineWeeks: number;
  technologies: string[];
  totalCost: number;
  gst: number;
  paymentTerms: string;
  createdAt: string;
  sentAt?: string;
  expiresAt: string;
  leadId?: string;
}

export interface Invoice {
  id: string;
  number: string;
  clientId: string;
  client: string;
  projectId?: string;
  amount: number;
  gst: number;
  paid: number;
  pending: number;
  status: InvoiceStatus;
  issued: string;
  due: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  invoiceNumber: string;
  clientId: string;
  client: string;
  projectId?: string;
  amount: number;
  date: string;
  mode: PaymentMode;
  transactionId: string;
  remarks: string;
  receiptGenerated: boolean;
}

export interface Task {
  id: string;
  title: string;
  type: TaskType;
  projectId: string;
  project: string;
  assigneeId: string;
  assignee: string;
  priority: TaskPriority;
  status: TaskStatus;
  due: string;
}

export interface FollowUp {
  id: string;
  leadId?: string;
  clientId?: string;
  name: string;
  company: string;
  type: FollowUpType;
  nextCall: string;
  reminder: string;
  meeting?: string;
  remarks: string;
  outcome: FollowUpOutcome;
  nextDate: string;
  isToday: boolean;
}

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  folder: string;
  projectId?: string;
  project?: string;
  clientId?: string;
  size: string;
  uploadedAt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  day: number;
  type: CalendarEventType;
  client?: string;
  project?: string;
}

export interface Activity {
  id: string;
  type: ActivityType;
  who: string;
  whoInitials: string;
  message: string;
  detail: string;
  time: string;
  timestamp: number;
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  title: string;
  description: string;
  date: string;
  done: boolean;
}

export interface CompanySettings {
  name: string;
  tagline: string;
  logo: string;
  gst: string;
  address: string;
  city: string;
  state: string;
  country: string;
  email: string;
  phone: string;
  website: string;
  bankName: string;
  accountNumber: string;
  ifsc: string;
  upiId: string;
  signature: string;
}

export interface CrmDataset {
  leads: Lead[];
  clients: Client[];
  projects: Project[];
  proposals: Proposal[];
  invoices: Invoice[];
  payments: Payment[];
  tasks: Task[];
  followUps: FollowUp[];
  documents: Document[];
  calendarEvents: CalendarEvent[];
  activities: Activity[];
  notifications: Notification[];
  team: TeamMember[];
  company: CompanySettings;
  featureCatalog: Record<string, string[]>;
}

export const LIFECYCLE_STAGES = [
  "Lead",
  "Client Inquiry",
  "Requirement Discussion",
  "Proposal Generated",
  "Proposal Sent",
  "Client Follow Up",
  "Accepted",
  "Project Created",
  "Development",
  "Testing",
  "Delivery",
  "Payment Completed",
  "Support",
] as const;
