export const LEAD_SOURCES = [
  "Website", "Instagram", "Facebook", "LinkedIn", "Reference", "Google Ads",
  "WhatsApp", "Cold Call", "Email", "Conference", "Organic", "Outbound",
  "Referral", "LinkedIn Ads", "Inbound Form", "Webinar",
] as const;

export const LEAD_STATUSES = ["new", "qualified", "negotiating", "won", "lost"] as const;

export const CLIENT_STATUSES = [
  "new", "interested", "follow_up", "proposal_sent", "negotiation",
  "converted", "rejected", "active", "prospect", "churned",
] as const;

export const CLIENT_PRIORITIES = ["low", "medium", "high", "urgent"] as const;

export const PROJECT_CATEGORIES = [
  "Frontend", "Backend", "Full Stack", "Website", "Mobile App", "Dashboard",
  "Admin Panel", "API", "SEO", "Digital Marketing", "UI Design", "Logo Design",
  "Hosting", "Maintenance",
] as const;

export const PROJECT_STATUSES = [
  "requirement", "planning", "design", "development", "testing",
  "client_review", "completed", "on_hold", "cancelled",
] as const;

export const PROJECT_PRIORITIES = ["low", "medium", "high", "urgent"] as const;

export const ESTIMATED_DAYS = [15, 30, 45, 60, 90, 120] as const;

export const TECHNOLOGIES = [
  "React", "Vue", "Angular", "Next.js", "Node.js", "Laravel", "PHP",
  "Flutter", "React Native", "WordPress", "Shopify", "Python", "AI",
  "MERN", "MEAN", "AWS", "Docker", "PostgreSQL", "MongoDB", "GraphQL",
] as const;

export const PAYMENT_MODES = [
  "UPI", "Cash", "Cheque", "Bank Transfer", "Stripe", "Wire", "ACH",
] as const;

export const INVOICE_STATUSES = ["draft", "sent", "paid", "overdue", "partial"] as const;

export const TASK_TYPES = [
  "design", "development", "testing", "deployment", "bug_fix", "support",
] as const;

export const TASK_STATUSES = ["backlog", "todo", "doing", "review", "done"] as const;

export const TASK_PRIORITIES = ["low", "medium", "high"] as const;

export const FOLLOW_UP_TYPES = ["call", "email", "meeting", "whatsapp", "reminder"] as const;

export const FOLLOW_UP_OUTCOMES = [
  "pending", "positive", "negative", "rescheduled", "converted",
] as const;

export const CALENDAR_EVENT_TYPES = [
  "meeting", "deadline", "follow_up", "payment_due", "delivery",
] as const;

export const DOCUMENT_TYPES = [
  "pdf", "image", "figma", "word", "excel", "zip", "apk", "source", "contract",
] as const;

export const DOCUMENT_FOLDERS = [
  "Contracts", "Proposals", "Design Assets", "Reports", "Invoices", "Internal", "Source Code",
] as const;

export const TEAM_ROLES = ["developer", "designer", "tester", "manager", "sales"] as const;

export const TEAM_STATUSES = ["available", "busy", "away"] as const;

export const OWNERS = ["MV", "RK", "SD", "EL", "PN"] as const;

export const WARRANTY_OPTIONS = ["30 days", "60 days", "90 days", "6 months", "1 year", "N/A"] as const;

export const SUPPORT_PERIODS = ["1 month", "3 months", "6 months", "12 months", "N/A"] as const;
