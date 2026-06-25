import type { BusinessMode } from "./business-context";
import type { CrmDataset } from "@/types/crm";

export type {
  Lead,
  Client,
  Project,
  Invoice,
  Task,
  Proposal,
  Payment,
  FollowUp,
  Document,
  CalendarEvent,
  Activity,
  Notification,
  TeamMember,
  TimelineEvent,
} from "@/types/crm";

export { LIFECYCLE_STAGES } from "@/types/crm";

const itFeatureCatalog: Record<string, string[]> = {
  Frontend: [
    "Responsive Design",
    "Admin Panel",
    "Authentication",
    "Dashboard",
    "CMS",
    "SEO Optimization",
    "Multi-language",
    "Dark Mode",
  ],
  Backend: [
    "REST API",
    "GraphQL API",
    "Database Design",
    "Authentication & RBAC",
    "Payment Gateway",
    "Email Notifications",
    "File Upload",
    "Cron Jobs",
  ],
  DevOps: [
    "CI/CD Pipeline",
    "Docker Setup",
    "AWS Deployment",
    "SSL Certificate",
    "Monitoring & Alerts",
    "Backup Strategy",
  ],
  Support: ["Hosting Setup", "3 Month Support", "6 Month Support", "Annual Maintenance", "Bug Fixes"],
};

const mktFeatureCatalog: Record<string, string[]> = {
  Marketing: [
    "Brand Audit",
    "SEO Strategy",
    "Content Calendar",
    "Paid Social Ads",
    "Google Ads",
    "Email Automation",
    "Analytics Dashboard",
    "A/B Testing",
  ],
  Creative: [
    "Logo Design",
    "Brand Guidelines",
    "Social Media Creatives",
    "Video Production",
    "Landing Page Copy",
  ],
  Support: ["Monthly Reports", "Quarterly Reviews", "Campaign Optimization", "Competitor Analysis"],
};

const itTeam = [
  { id: "TM-1", name: "Marcus Vane", email: "marcus@inefai.it", phone: "+1 415 555 0101", role: "manager" as const, skills: ["React", "AWS", "Node"], activeProjects: 3, avatar: "MV", status: "busy" as const },
  { id: "TM-2", name: "Riya Kapoor", email: "riya@inefai.it", phone: "+1 415 555 0102", role: "developer" as const, skills: ["Next.js", "Terraform", "Postgres"], activeProjects: 2, avatar: "RK", status: "busy" as const },
  { id: "TM-3", name: "Sam Devlin", email: "sam@inefai.it", phone: "+1 415 555 0103", role: "developer" as const, skills: ["Security", "Go", "OWASP"], activeProjects: 1, avatar: "SD", status: "available" as const },
  { id: "TM-4", name: "Eli Laurent", email: "eli@inefai.it", phone: "+1 415 555 0104", role: "designer" as const, skills: ["Figma", "UI/UX", "Design Systems"], activeProjects: 2, avatar: "EL", status: "available" as const },
  { id: "TM-5", name: "Priya Nair", email: "priya@inefai.it", phone: "+1 415 555 0105", role: "tester" as const, skills: ["QA", "Automation", "Cypress"], activeProjects: 2, avatar: "PN", status: "away" as const },
];

const mktTeam = [
  { id: "TM-11", name: "Marcus Vane", email: "marcus@inefai.mkt", phone: "+1 415 555 0101", role: "manager" as const, skills: ["Strategy", "Analytics"], activeProjects: 2, avatar: "MV", status: "busy" as const },
  { id: "TM-12", name: "Riya Kapoor", email: "riya@inefai.mkt", phone: "+1 415 555 0102", role: "developer" as const, skills: ["Meta Ads", "GA4"], activeProjects: 2, avatar: "RK", status: "busy" as const },
  { id: "TM-13", name: "Eli Laurent", email: "eli@inefai.mkt", phone: "+1 415 555 0104", role: "designer" as const, skills: ["Brand", "Video"], activeProjects: 1, avatar: "EL", status: "available" as const },
];

const itCompany = {
  name: "INTEFAI IT  SOLUTIONS PVT LTD",
  tagline: "Modern engineering for ambitious teams",
  logo: "INTEFAI",
  gst: "27AABCU9603R1ZM",
  address: "105 jakhya indore madhya pradesh",
  city: "indore",
  state: "madhya pradesh",
  country: "India",
  email: "hellow@intefai.com",
  phone: "+91 9899735140",
  website: "https://intefai.com",
  bankName: " Chase Business",
  accountNumber: "****4892",
  ifsc: "CHASUS33",
  upiId: "inefai@chase",
  signature: "Lakhan Jadam, Founder",
};

const itData: CrmDataset = {
  featureCatalog: itFeatureCatalog,
  company: itCompany,
  team: itTeam,

  leads: [
    { id: "L-1042", name: "Jordan Davies", email: "j.davies@techpulse.io", phone: "+1 555 0142", company: "TechPulse", service: "Infrastructure Scaling", source: "LinkedIn Ads", status: "qualified", value: 18400, createdAt: "2026-06-12", owner: "MV", notes: "Needs AWS migration", clientId: "C-204" },
    { id: "L-1043", name: "Amara Smith", email: "amara@designflow.com", phone: "+1 555 0188", company: "DesignFlow", service: "UI/UX Modernization", source: "Referral", status: "negotiating", value: 42000, createdAt: "2026-06-10", owner: "RK", clientId: "C-206" },
    { id: "L-1044", name: "Tom Lin", email: "tom@scaleup.tech", phone: "+1 555 0190", company: "ScaleUp", service: "Full-stack Retainer", source: "Organic", status: "new", value: 120000, createdAt: "2026-06-15", owner: "MV" },
    { id: "L-1045", name: "Priya Sharma", email: "p.sharma@finova.com", phone: "+44 20 7946 0123", company: "Finova Bank", service: "Security Audit", source: "Outbound", status: "qualified", value: 65000, createdAt: "2026-06-08", owner: "SD", clientId: "C-203" },
    { id: "L-1046", name: "Marco Rossi", email: "marco@rossi-arch.it", phone: "+39 02 555 0199", company: "Rossi Architects", service: "Cloud Migration", source: "Conference", status: "won", value: 88000, createdAt: "2026-05-28", owner: "RK", clientId: "C-207" },
    { id: "L-1047", name: "Hana Kim", email: "hana@bluepeak.kr", phone: "+82 2 555 0199", company: "BluePeak", service: "DevOps Setup", source: "LinkedIn", status: "new", value: 23000, createdAt: "2026-06-18", owner: "MV" },
    { id: "L-1048", name: "Liam O'Connor", email: "liam@oconnor.co", phone: "+353 1 555 0199", company: "O'Connor Group", service: "Mobile App", source: "Referral", status: "lost", value: 54000, createdAt: "2026-05-22", owner: "SD" },
  ],

  clients: [
    {
      id: "C-201", companyName: "Vortex Media Group", clientName: "Marcus Vortex", email: "marcus@vortexmg.com", phone: "+1 415 555 0142", whatsapp: "+1 415 555 0142", address: "100 Market St", country: "USA", state: "California", city: "San Francisco", gst: "US-GST-201", website: "vortexmg.com", linkedin: "linkedin.com/company/vortexmg", industry: "Media", source: "Referral", priority: "high", notes: "Long-term retainer client", status: "converted", revenue: 284000, projects: 4, since: "2024-03-12",
      timeline: [
        { id: "t1", type: "inquiry", title: "Initial Inquiry", description: "Reached out for cloud migration", date: "2024-02-15", done: true },
        { id: "t2", type: "meeting", title: "Discovery Meeting", description: "Discussed AWS architecture", date: "2024-02-22", done: true },
        { id: "t3", type: "proposal_sent", title: "Proposal Sent", description: "Cloud Modernization — $142k", date: "2024-03-01", done: true },
        { id: "t4", type: "payment", title: "Advance Received", description: "$42,600 (30%)", date: "2024-03-12", done: true },
        { id: "t5", type: "project_started", title: "Project Started", description: "Vortex Cloud Migration", date: "2024-03-15", done: true },
        { id: "t6", type: "project_delivered", title: "Phase 1 Delivered", description: "Pilot migration complete", date: "2026-05-12", done: true },
        { id: "t7", type: "support", title: "Support Active", description: "6-month hypercare window", date: "2026-06-01", done: false },
      ],
      documents: ["SOW.pdf", "Contract.pdf"],
    },
    {
      id: "C-202", companyName: "Luna Boutique", clientName: "Luna Park", email: "luna@luna.shop", phone: "+1 212 555 0188", whatsapp: "+1 212 555 0188", address: "55 Spring St", country: "USA", state: "New York", city: "New York", gst: "US-GST-202", website: "luna.shop", linkedin: "linkedin.com/company/lunaboutique", industry: "E-commerce", source: "Organic", priority: "medium", notes: "E-commerce refactor in review", status: "converted", revenue: 96000, projects: 2, since: "2025-01-08",
      timeline: [
        { id: "t1", type: "inquiry", title: "Website Inquiry", description: "Shopify to custom stack", date: "2024-12-10", done: true },
        { id: "t2", type: "proposal_sent", title: "Proposal Sent", description: "E-Commerce Refactor — $68k", date: "2024-12-20", done: true },
        { id: "t3", type: "negotiation", title: "Negotiation", description: "Timeline adjusted to 5 months", date: "2025-01-02", done: true },
        { id: "t4", type: "project_started", title: "Development Started", description: "Next.js + Stripe integration", date: "2025-01-08", done: true },
        { id: "t5", type: "follow_up", title: "Client Review", description: "Checkout flow demo scheduled", date: "2026-06-28", done: false },
      ],
      documents: ["Brand Guidelines.pdf"],
    },
    {
      id: "C-203", companyName: "Global FinTech", clientName: "Diego Alvarez", email: "diego@globalfin.com", phone: "+44 20 7946 0123", whatsapp: "+44 20 7946 0123", address: "1 Canary Wharf", country: "UK", state: "England", city: "London", gst: "GB-GST-203", website: "globalfin.com", linkedin: "linkedin.com/company/globalfin", industry: "Finance", source: "Outbound", priority: "urgent", notes: "Security audit Q3", status: "negotiation", revenue: 412000, projects: 3, since: "2023-09-22",
      timeline: [
        { id: "t1", type: "inquiry", title: "Security Inquiry", description: "Annual penetration test", date: "2023-08-15", done: true },
        { id: "t2", type: "meeting", title: "Scoping Call", description: "OWASP + compliance requirements", date: "2026-06-10", done: true },
        { id: "t3", type: "proposal_sent", title: "Proposal Sent", description: "Security Audit v2 — $88k", date: "2026-06-15", done: true },
        { id: "t4", type: "follow_up", title: "Follow Up Pending", description: "Awaiting legal review", date: "2026-06-25", done: false },
      ],
      documents: ["Security Report Q2.xlsx"],
    },
    {
      id: "C-204", companyName: "Starlight Logistics", clientName: "Hannah Reed", email: "hannah@starlight.co", phone: "+1 312 555 0117", whatsapp: "+1 312 555 0117", address: "200 Wacker Dr", country: "USA", state: "Illinois", city: "Chicago", gst: "US-GST-204", website: "starlight.co", linkedin: "linkedin.com/company/starlight", industry: "Logistics", source: "Conference", priority: "medium", notes: "Prospect — proposal sent", status: "proposal_sent", revenue: 0, projects: 1, since: "2026-04-02", leadId: "L-1042",
      timeline: [
        { id: "t1", type: "inquiry", title: "Lead Captured", description: "Infrastructure scaling inquiry", date: "2026-04-02", done: true },
        { id: "t2", type: "meeting", title: "Requirement Discussion", description: "Scaling needs documented", date: "2026-05-15", done: true },
        { id: "t3", type: "proposal_sent", title: "Proposal Sent", description: "Infra Scaling — $18.4k", date: "2026-06-01", done: true },
        { id: "t4", type: "follow_up", title: "Follow Up Today", description: "Send revised SOW", date: "2026-06-22", done: false },
      ],
      documents: [],
    },
    {
      id: "C-205", companyName: "Nova Health", clientName: "Ren Kobayashi", email: "ren@novahealth.jp", phone: "+81 3 5555 0199", whatsapp: "+81 90 5555 0199", address: "Shibuya 1-1", country: "Japan", state: "Tokyo", city: "Tokyo", gst: "JP-GST-205", website: "novahealth.jp", linkedin: "linkedin.com/company/novahealth", industry: "Healthcare", source: "Referral", priority: "high", notes: "FHIR compliance required", status: "converted", revenue: 168000, projects: 2, since: "2025-06-14",
      timeline: [
        { id: "t1", type: "inquiry", title: "Portal Inquiry", description: "Patient records system", date: "2025-05-01", done: true },
        { id: "t2", type: "proposal_sent", title: "Proposal Accepted", description: "Health Records Portal — $124k", date: "2025-06-01", done: true },
        { id: "t3", type: "payment", title: "Advance Received", description: "$37,200 (30%)", date: "2025-06-14", done: true },
        { id: "t4", type: "project_started", title: "Development", description: "Auth + Records API in progress", date: "2025-07-01", done: true },
      ],
      documents: ["Patient consent flow.png", "FHIR spec.pdf"],
    },
    {
      id: "C-206", companyName: "DesignFlow", clientName: "Amara Smith", email: "amara@designflow.com", phone: "+1 555 0188", whatsapp: "+1 555 0188", address: "88 Design Ave", country: "USA", state: "Texas", city: "Austin", gst: "US-GST-206", website: "designflow.com", linkedin: "linkedin.com/company/designflow", industry: "Design", source: "Referral", priority: "high", notes: "UI/UX modernization", status: "negotiation", revenue: 0, projects: 0, since: "2026-06-10", leadId: "L-1043",
      timeline: [
        { id: "t1", type: "inquiry", title: "Inquiry", description: "UI/UX overhaul needed", date: "2026-06-10", done: true },
        { id: "t2", type: "meeting", title: "Requirement Discussion", description: "Design system + component library", date: "2026-06-14", done: true },
        { id: "t3", type: "proposal_sent", title: "Proposal Sent", description: "UI Modernization — $42k", date: "2026-06-18", done: true },
        { id: "t4", type: "negotiation", title: "Negotiation Call", description: "Scheduled tomorrow 11 AM", date: "2026-06-23", done: false },
      ],
      documents: [],
    },
    {
      id: "C-207", companyName: "Rossi Architects", clientName: "Marco Rossi", email: "marco@rossi-arch.it", phone: "+39 02 555 0199", whatsapp: "+39 333 555 0199", address: "Via Milano 12", country: "Italy", state: "Lombardy", city: "Milan", gst: "IT-GST-207", website: "rossi-arch.it", linkedin: "linkedin.com/company/rossi-arch", industry: "Architecture", source: "Conference", priority: "medium", notes: "Won at conference", status: "converted", revenue: 88000, projects: 1, since: "2026-05-28", leadId: "L-1046",
      timeline: [
        { id: "t1", type: "inquiry", title: "Conference Lead", description: "Met at AWS Summit", date: "2026-05-20", done: true },
        { id: "t2", type: "proposal_sent", title: "Proposal Accepted", description: "Cloud Migration — $88k", date: "2026-05-28", done: true },
        { id: "t3", type: "payment", title: "Advance Received", description: "$26,400 (30%)", date: "2026-06-01", done: true },
        { id: "t4", type: "project_started", title: "Project Created", description: "Rossi Cloud Migration", date: "2026-06-05", done: true },
        { id: "t5", type: "project_delivered", title: "Delivery", description: "Scheduled Sep 2026", date: "2026-09-30", done: false },
      ],
      documents: ["Contract.pdf"],
    },
  ],

  projects: [
    {
      id: "P-501", name: "Vortex Cloud Migration", clientId: "C-201", client: "Vortex Media Group", category: "Full Stack", projectType: "it", technologies: ["AWS", "Terraform", "Kubernetes", "React"], priority: "high", status: "development", progress: 75, paymentProgress: 68, estimatedDays: 60, startDate: "2026-03-01", endDate: "2026-07-15", deliveryDate: "2026-07-15", warranty: "90 days", supportPeriod: "6 months",
      cost: { total: 142000, gst: 25560, discount: 5000, advance: 42600, received: 96000, pending: 46000, expenses: 42000, profit: 54000 },
      team: [{ id: "TM-1", name: "Marcus Vane", initials: "MV", role: "Lead" }, { id: "TM-2", name: "Riya Kapoor", initials: "RK", role: "DevOps" }, { id: "TM-3", name: "Sam Devlin", initials: "SD", role: "Backend" }],
      milestones: [{ name: "Discovery", done: true, date: "2026-03-15" }, { name: "Network design", done: true, date: "2026-04-05" }, { name: "Pilot migration", done: true, date: "2026-05-12" }, { name: "Full cutover", done: false, date: "2026-07-01" }],
      proposalId: "PR-101",
    },
    {
      id: "P-502", name: "E-Commerce Refactor", clientId: "C-202", client: "Luna Boutique", category: "Full Stack", projectType: "it", technologies: ["Next.js", "Postgres", "Stripe", "React"], priority: "high", status: "client_review", progress: 92, paymentProgress: 76, estimatedDays: 45, startDate: "2026-02-10", endDate: "2026-06-28", deliveryDate: "2026-06-28", warranty: "60 days", supportPeriod: "3 months",
      cost: { total: 68000, gst: 12240, discount: 2000, advance: 20400, received: 52000, pending: 16000, expenses: 28000, profit: 24000 },
      team: [{ id: "TM-2", name: "Riya Kapoor", initials: "RK", role: "Full Stack" }, { id: "TM-4", name: "Eli Laurent", initials: "EL", role: "UI Design" }],
      milestones: [{ name: "Audit", done: true, date: "2026-02-22" }, { name: "Catalog rebuild", done: true, date: "2026-04-18" }, { name: "Checkout", done: true, date: "2026-06-01" }, { name: "Launch", done: false, date: "2026-06-28" }],
      proposalId: "PR-102",
    },
    {
      id: "P-503", name: "Security Audit v2", clientId: "C-203", client: "Global FinTech", category: "API", projectType: "it", technologies: ["Burp", "OWASP", "Splunk", "Python"], priority: "urgent", status: "planning", progress: 12, paymentProgress: 14, estimatedDays: 90, startDate: "2026-06-01", endDate: "2026-09-30", deliveryDate: "2026-09-30", warranty: "30 days", supportPeriod: "1 month",
      cost: { total: 88000, gst: 15840, discount: 0, advance: 12000, received: 12000, pending: 76000, expenses: 8000, profit: 80000 },
      team: [{ id: "TM-3", name: "Sam Devlin", initials: "SD", role: "Security Lead" }],
      milestones: [{ name: "Scoping", done: true, date: "2026-06-10" }, { name: "Threat model", done: false, date: "2026-07-05" }, { name: "Pen test", done: false, date: "2026-08-15" }, { name: "Report", done: false, date: "2026-09-25" }],
      proposalId: "PR-103",
    },
    {
      id: "P-504", name: "Health Records Portal", clientId: "C-205", client: "Nova Health", category: "Dashboard", projectType: "it", technologies: ["React", "Go", "FHIR", "Postgres"], priority: "high", status: "development", progress: 48, paymentProgress: 48, estimatedDays: 120, startDate: "2026-04-20", endDate: "2026-10-10", deliveryDate: "2026-10-10", warranty: "90 days", supportPeriod: "12 months",
      cost: { total: 124000, gst: 22320, discount: 4000, advance: 37200, received: 60000, pending: 64000, expenses: 32000, profit: 92000 },
      team: [{ id: "TM-1", name: "Marcus Vane", initials: "MV", role: "Lead" }, { id: "TM-4", name: "Eli Laurent", initials: "EL", role: "Frontend" }],
      milestones: [{ name: "Auth", done: true, date: "2026-05-08" }, { name: "Records API", done: true, date: "2026-06-12" }, { name: "UI shell", done: false, date: "2026-07-30" }, { name: "Compliance", done: false, date: "2026-09-30" }],
      proposalId: "PR-104",
    },
    {
      id: "P-505", name: "Legacy ERP Sunset", clientId: "C-201", client: "Vortex Media Group", category: "Backend", projectType: "it", technologies: ["SAP", "Snowflake", "Python"], priority: "low", status: "completed", progress: 100, paymentProgress: 100, estimatedDays: 30, startDate: "2025-11-01", endDate: "2026-03-20", deliveryDate: "2026-03-20", warranty: "30 days", supportPeriod: "1 month",
      cost: { total: 54000, gst: 9720, discount: 0, advance: 16200, received: 54000, pending: 0, expenses: 22000, profit: 32000 },
      team: [{ id: "TM-2", name: "Riya Kapoor", initials: "RK", role: "Lead" }],
      milestones: [{ name: "Data export", done: true, date: "2026-01-10" }, { name: "Migration", done: true, date: "2026-02-22" }, { name: "Decommission", done: true, date: "2026-03-20" }],
    },
    {
      id: "P-506", name: "Rossi Cloud Migration", clientId: "C-207", client: "Rossi Architects", category: "Full Stack", projectType: "it", technologies: ["AWS", "React", "Node.js", "Docker"], priority: "medium", status: "development", progress: 35, paymentProgress: 30, estimatedDays: 90, startDate: "2026-06-05", endDate: "2026-09-30", deliveryDate: "2026-09-30", warranty: "60 days", supportPeriod: "3 months",
      cost: { total: 88000, gst: 15840, discount: 0, advance: 26400, received: 26400, pending: 61600, expenses: 12000, profit: 76000 },
      team: [{ id: "TM-2", name: "Riya Kapoor", initials: "RK", role: "Lead" }, { id: "TM-3", name: "Sam Devlin", initials: "SD", role: "DevOps" }],
      milestones: [{ name: "Discovery", done: true, date: "2026-06-12" }, { name: "Architecture", done: true, date: "2026-06-20" }, { name: "Migration", done: false, date: "2026-08-15" }, { name: "Go-live", done: false, date: "2026-09-30" }],
      proposalId: "PR-105", leadId: "L-1046",
    },
    {
      id: "P-507", name: "Starlight Portal", clientId: "C-204", client: "Starlight Logistics", category: "Admin Panel", projectType: "it", technologies: ["React", "Laravel", "MySQL"], priority: "medium", status: "requirement", progress: 5, paymentProgress: 0, estimatedDays: 45, startDate: "2026-07-01", endDate: "2026-08-15", deliveryDate: "2026-08-15", warranty: "30 days", supportPeriod: "2 months",
      cost: { total: 18400, gst: 3312, discount: 0, advance: 0, received: 0, pending: 18400, expenses: 0, profit: 18400 },
      team: [{ id: "TM-1", name: "Marcus Vane", initials: "MV", role: "Lead" }],
      milestones: [{ name: "Requirements", done: false, date: "2026-07-05" }, { name: "Design", done: false, date: "2026-07-20" }],
      leadId: "L-1042",
    },
  ],

  proposals: [
    { id: "PR-101", title: "Cloud Modernization Engagement", clientId: "C-201", client: "Vortex Media Group", status: "accepted", features: ["Responsive Design", "CI/CD Pipeline", "AWS Deployment", "6 Month Support"], scope: "End-to-end migration of legacy infrastructure to AWS.", timelineWeeks: 16, technologies: ["AWS", "Terraform", "Kubernetes"], totalCost: 142000, gst: 25560, paymentTerms: "30% upfront · 40% midpoint · 30% delivery", createdAt: "2024-02-28", sentAt: "2024-03-01", expiresAt: "2024-04-01" },
    { id: "PR-102", title: "E-Commerce Platform Refactor", clientId: "C-202", client: "Luna Boutique", status: "accepted", features: ["Responsive Design", "Payment Gateway", "CMS", "SEO Optimization"], scope: "Rebuild e-commerce on Next.js with Stripe.", timelineWeeks: 20, technologies: ["Next.js", "Stripe", "Postgres"], totalCost: 68000, gst: 12240, paymentTerms: "30% upfront · 40% midpoint · 30% delivery", createdAt: "2024-12-15", sentAt: "2024-12-20", expiresAt: "2025-01-20" },
    { id: "PR-103", title: "Security Audit v2", clientId: "C-203", client: "Global FinTech", status: "viewed", features: ["REST API", "Authentication & RBAC", "Monitoring & Alerts"], scope: "Comprehensive OWASP penetration test and compliance report.", timelineWeeks: 12, technologies: ["OWASP", "Splunk"], totalCost: 88000, gst: 15840, paymentTerms: "40% upfront · 60% on delivery", createdAt: "2026-06-10", sentAt: "2026-06-15", expiresAt: "2026-07-15" },
    { id: "PR-104", title: "Health Records Portal", clientId: "C-205", client: "Nova Health", status: "accepted", features: ["Dashboard", "Authentication", "REST API", "File Upload"], scope: "FHIR-compliant patient records portal.", timelineWeeks: 24, technologies: ["React", "Go", "FHIR"], totalCost: 124000, gst: 22320, paymentTerms: "30% upfront · 35% midpoint · 35% delivery", createdAt: "2025-05-20", sentAt: "2025-06-01", expiresAt: "2025-07-01" },
    { id: "PR-105", title: "Cloud Migration — Rossi", clientId: "C-207", client: "Rossi Architects", status: "accepted", features: ["AWS Deployment", "Docker Setup", "SSL Certificate", "3 Month Support"], scope: "Migrate on-prem workloads to AWS.", timelineWeeks: 14, technologies: ["AWS", "Docker", "React"], totalCost: 88000, gst: 15840, paymentTerms: "30% upfront · 40% midpoint · 30% delivery", createdAt: "2026-05-22", sentAt: "2026-05-25", expiresAt: "2026-06-25" },
    { id: "PR-106", title: "Infrastructure Scaling", clientId: "C-204", client: "Starlight Logistics", status: "sent", features: ["Responsive Design", "REST API", "Hosting Setup"], scope: "Scale logistics portal for 10x traffic.", timelineWeeks: 8, technologies: ["React", "Laravel"], totalCost: 18400, gst: 3312, paymentTerms: "50% upfront · 50% delivery", createdAt: "2026-05-28", sentAt: "2026-06-01", expiresAt: "2026-07-01" },
    { id: "PR-107", title: "UI/UX Modernization", clientId: "C-206", client: "DesignFlow", status: "sent", features: ["Responsive Design", "Dashboard", "Dark Mode", "CMS"], scope: "Complete UI overhaul with design system.", timelineWeeks: 10, technologies: ["React", "Figma"], totalCost: 42000, gst: 7560, paymentTerms: "40% upfront · 60% delivery", createdAt: "2026-06-14", sentAt: "2026-06-18", expiresAt: "2026-07-18" },
    { id: "PR-108", title: "DevOps Setup", clientId: "", client: "BluePeak", status: "draft", features: ["CI/CD Pipeline", "Docker Setup", "Monitoring & Alerts"], scope: "DevOps pipeline for Korean startup.", timelineWeeks: 6, technologies: ["Docker", "GitHub Actions"], totalCost: 23000, gst: 4140, paymentTerms: "50% upfront · 50% delivery", createdAt: "2026-06-20", expiresAt: "2026-07-20" },
  ],

  invoices: [
    { id: "I-9001", number: "INV-2026-0142", clientId: "C-201", client: "Vortex Media Group", projectId: "P-501", amount: 32000, gst: 5760, paid: 32000, pending: 0, status: "paid", issued: "2026-05-01", due: "2026-05-15" },
    { id: "I-9002", number: "INV-2026-0143", clientId: "C-202", client: "Luna Boutique", projectId: "P-502", amount: 18000, gst: 3240, paid: 18000, pending: 0, status: "paid", issued: "2026-05-08", due: "2026-05-22" },
    { id: "I-9003", number: "INV-2026-0144", clientId: "C-203", client: "Global FinTech", projectId: "P-503", amount: 24000, gst: 4320, paid: 0, pending: 24000, status: "sent", issued: "2026-06-01", due: "2026-06-30" },
    { id: "I-9004", number: "INV-2026-0145", clientId: "C-205", client: "Nova Health", projectId: "P-504", amount: 12000, gst: 2160, paid: 0, pending: 12000, status: "overdue", issued: "2026-05-12", due: "2026-06-12" },
    { id: "I-9005", number: "INV-2026-0146", clientId: "C-204", client: "Starlight Logistics", projectId: "P-507", amount: 8500, gst: 1530, paid: 0, pending: 8500, status: "draft", issued: "2026-06-20", due: "2026-07-20" },
    { id: "I-9006", number: "INV-2026-0147", clientId: "C-207", client: "Rossi Architects", projectId: "P-506", amount: 26400, gst: 4752, paid: 26400, pending: 0, status: "paid", issued: "2026-06-01", due: "2026-06-15" },
    { id: "I-9007", number: "INV-2026-0148", clientId: "C-201", client: "Vortex Media Group", projectId: "P-501", amount: 40000, gst: 7200, paid: 0, pending: 40000, status: "sent", issued: "2026-06-10", due: "2026-07-10" },
  ],

  payments: [
    { id: "PMT-1001", invoiceId: "I-9001", invoiceNumber: "INV-2026-0142", clientId: "C-201", client: "Vortex Media Group", projectId: "P-501", amount: 32000, date: "2026-05-14", mode: "Bank Transfer", transactionId: "TXN-88421", remarks: "Milestone 2 payment", receiptGenerated: true },
    { id: "PMT-1002", invoiceId: "I-9002", invoiceNumber: "INV-2026-0143", clientId: "C-202", client: "Luna Boutique", projectId: "P-502", amount: 18000, date: "2026-05-20", mode: "Stripe", transactionId: "pi_3NxK8s2eZvKYlo2C", remarks: "Checkout milestone", receiptGenerated: true },
    { id: "PMT-1003", invoiceId: "I-9006", invoiceNumber: "INV-2026-0147", clientId: "C-207", client: "Rossi Architects", projectId: "P-506", amount: 26400, date: "2026-06-12", mode: "Wire", transactionId: "WIRE-IT-4421", remarks: "30% advance", receiptGenerated: true },
    { id: "PMT-1004", invoiceId: "I-9001", invoiceNumber: "INV-2026-0142", clientId: "C-201", client: "Vortex Media Group", projectId: "P-501", amount: 42600, date: "2026-03-10", mode: "Bank Transfer", transactionId: "TXN-77201", remarks: "Project advance", receiptGenerated: true },
    { id: "PMT-1005", invoiceId: "I-9002", invoiceNumber: "INV-2026-0143", clientId: "C-202", client: "Luna Boutique", projectId: "P-502", amount: 20400, date: "2026-02-15", mode: "UPI", transactionId: "UPI-inefai@chase-20400", remarks: "Project advance", receiptGenerated: true },
  ],

  tasks: [
    { id: "T-1", title: "Provision staging cluster", type: "deployment", projectId: "P-501", project: "Vortex Cloud Migration", assigneeId: "TM-1", assignee: "MV", priority: "high", status: "doing", due: "2026-06-25" },
    { id: "T-2", title: "Write IAM policies", type: "development", projectId: "P-501", project: "Vortex Cloud Migration", assigneeId: "TM-3", assignee: "SD", priority: "medium", status: "todo", due: "2026-06-28" },
    { id: "T-3", title: "Stripe webhook reliability", type: "bug_fix", projectId: "P-502", project: "E-Commerce Refactor", assigneeId: "TM-2", assignee: "RK", priority: "high", status: "review", due: "2026-06-24" },
    { id: "T-4", title: "Lighthouse audit", type: "testing", projectId: "P-502", project: "E-Commerce Refactor", assigneeId: "TM-5", assignee: "PN", priority: "low", status: "done", due: "2026-06-20" },
    { id: "T-5", title: "Threat-model workshop", type: "design", projectId: "P-503", project: "Security Audit v2", assigneeId: "TM-3", assignee: "SD", priority: "high", status: "backlog", due: "2026-07-05" },
    { id: "T-6", title: "FHIR mapping spec", type: "development", projectId: "P-504", project: "Health Records Portal", assigneeId: "TM-1", assignee: "MV", priority: "medium", status: "doing", due: "2026-06-30" },
    { id: "T-7", title: "Patient consent flow UI", type: "design", projectId: "P-504", project: "Health Records Portal", assigneeId: "TM-4", assignee: "EL", priority: "medium", status: "todo", due: "2026-07-10" },
    { id: "T-8", title: "AWS VPC setup", type: "development", projectId: "P-506", project: "Rossi Cloud Migration", assigneeId: "TM-3", assignee: "SD", priority: "high", status: "doing", due: "2026-06-26" },
    { id: "T-9", title: "Catalog page redesign", type: "design", projectId: "P-502", project: "E-Commerce Refactor", assigneeId: "TM-4", assignee: "EL", priority: "medium", status: "done", due: "2026-06-18" },
    { id: "T-10", title: "Cutover runbook", type: "deployment", projectId: "P-501", project: "Vortex Cloud Migration", assigneeId: "TM-2", assignee: "RK", priority: "high", status: "todo", due: "2026-06-30" },
  ],

  followUps: [
    { id: "FU-1", leadId: "L-1042", clientId: "C-204", name: "Jordan Davies", company: "TechPulse", type: "email", nextCall: "Today 4:00 PM", reminder: "2026-06-22 16:00", remarks: "Send revised SOW for infra scaling", outcome: "pending", nextDate: "2026-06-22", isToday: true },
    { id: "FU-2", leadId: "L-1043", clientId: "C-206", name: "Amara Smith", company: "DesignFlow", type: "call", nextCall: "Tomorrow 11:00 AM", reminder: "2026-06-23 11:00", meeting: "Zoom", remarks: "Negotiation call — discuss timeline", outcome: "pending", nextDate: "2026-06-23", isToday: false },
    { id: "FU-3", leadId: "L-1044", name: "Tom Lin", company: "ScaleUp", type: "email", nextCall: "Thu", reminder: "2026-06-26 10:00", remarks: "Share retainer references and case studies", outcome: "pending", nextDate: "2026-06-26", isToday: false },
    { id: "FU-4", leadId: "L-1045", clientId: "C-203", name: "Priya Sharma", company: "Finova Bank", type: "email", nextCall: "Fri", reminder: "2026-06-27 14:00", remarks: "Forward banking compliance case study", outcome: "pending", nextDate: "2026-06-27", isToday: false },
    { id: "FU-5", leadId: "L-1047", name: "Hana Kim", company: "BluePeak", type: "whatsapp", nextCall: "Next Mon", reminder: "2026-06-30 09:00", remarks: "Intro to DevOps lead", outcome: "pending", nextDate: "2026-06-30", isToday: false },
    { id: "FU-6", clientId: "C-203", name: "Diego Alvarez", company: "Global FinTech", type: "meeting", nextCall: "Jun 25", reminder: "2026-06-25 15:00", meeting: "Teams", remarks: "Legal review follow-up for security audit", outcome: "rescheduled", nextDate: "2026-06-25", isToday: false },
  ],

  documents: [
    { id: "D-1", name: "Vortex Cloud Migration — SOW.pdf", type: "pdf", folder: "Contracts", projectId: "P-501", project: "Vortex Cloud Migration", clientId: "C-201", size: "1.4 MB", uploadedAt: "2026-06-18" },
    { id: "D-2", name: "Luna Boutique — Brand Guidelines.pdf", type: "pdf", folder: "Design Assets", projectId: "P-502", project: "E-Commerce Refactor", clientId: "C-202", size: "8.2 MB", uploadedAt: "2026-06-14" },
    { id: "D-3", name: "Finova Security Report Q2.xlsx", type: "excel", folder: "Reports", projectId: "P-503", project: "Security Audit v2", clientId: "C-203", size: "640 KB", uploadedAt: "2026-06-12" },
    { id: "D-4", name: "Patient consent flow.png", type: "image", folder: "Design Assets", projectId: "P-504", project: "Health Records Portal", clientId: "C-205", size: "2.1 MB", uploadedAt: "2026-06-09" },
    { id: "D-5", name: "Cutover runbook.pdf", type: "pdf", folder: "Internal", projectId: "P-501", project: "Vortex Cloud Migration", size: "920 KB", uploadedAt: "2026-06-05" },
    { id: "D-6", name: "Rossi Contract.pdf", type: "contract", folder: "Contracts", projectId: "P-506", project: "Rossi Cloud Migration", clientId: "C-207", size: "420 KB", uploadedAt: "2026-05-28" },
    { id: "D-7", name: "Health Portal Figma.fig", type: "figma", folder: "Design Assets", projectId: "P-504", project: "Health Records Portal", size: "12.4 MB", uploadedAt: "2026-06-01" },
    { id: "D-8", name: "Source Code — ERP Sunset.zip", type: "source", folder: "Internal", projectId: "P-505", project: "Legacy ERP Sunset", size: "48 MB", uploadedAt: "2026-03-20" },
  ],

  calendarEvents: [
    { id: "CE-1", title: "Discovery call · ScaleUp", date: "2026-06-03", day: 3, type: "meeting", client: "ScaleUp" },
    { id: "CE-2", title: "Stripe review", date: "2026-06-08", day: 8, type: "deadline", project: "E-Commerce Refactor" },
    { id: "CE-3", title: "Vortex milestone", date: "2026-06-12", day: 12, type: "delivery", project: "Vortex Cloud Migration" },
    { id: "CE-4", title: "Demo · Finova", date: "2026-06-12", day: 12, type: "meeting", client: "Global FinTech" },
    { id: "CE-5", title: "Quarterly review", date: "2026-06-17", day: 17, type: "meeting", client: "Vortex Media Group" },
    { id: "CE-6", title: "Audit kickoff", date: "2026-06-21", day: 21, type: "meeting", project: "Security Audit v2" },
    { id: "CE-7", title: "Follow up · TechPulse", date: "2026-06-22", day: 22, type: "follow_up", client: "TechPulse" },
    { id: "CE-8", title: "Webhook deploy", date: "2026-06-24", day: 24, type: "deadline", project: "E-Commerce Refactor" },
    { id: "CE-9", title: "INV-0145 due", date: "2026-06-28", day: 28, type: "payment_due", client: "Nova Health" },
    { id: "CE-10", title: "Vortex full cutover", date: "2026-07-01", day: 1, type: "delivery", project: "Vortex Cloud Migration" },
  ],

  activities: [
    { id: "A-1", type: "project_created", who: "John Smith", whoInitials: "JS", message: "created project", detail: "Rossi Cloud Migration", time: "2h", timestamp: 2 },
    { id: "A-2", type: "proposal_sent", who: "Riya Kapoor", whoInitials: "RK", message: "sent proposal", detail: "UI/UX Modernization → DesignFlow", time: "4h", timestamp: 4 },
    { id: "A-3", type: "payment_received", who: "System", whoInitials: "SY", message: "payment received", detail: "$26,400 from Rossi Architects", time: "6h", timestamp: 6 },
    { id: "A-4", type: "project_completed", who: "Riya Kapoor", whoInitials: "RK", message: "completed project", detail: "Legacy ERP Sunset", time: "1d", timestamp: 24 },
    { id: "A-5", type: "invoice_generated", who: "Marcus Vane", whoInitials: "MV", message: "generated invoice", detail: "INV-2026-0148 → Vortex Media", time: "1d", timestamp: 26 },
    { id: "A-6", type: "follow_up", who: "Marcus Vane", whoInitials: "MV", message: "scheduled follow-up", detail: "Jordan Davies · TechPulse", time: "2h", timestamp: 2 },
    { id: "A-7", type: "task_assigned", who: "Marcus Vane", whoInitials: "MV", message: "assigned task", detail: "AWS VPC setup → Sam Devlin", time: "3h", timestamp: 3 },
    { id: "A-8", type: "document_uploaded", who: "Eli Laurent", whoInitials: "EL", message: "uploaded document", detail: "Patient consent flow.png", time: "8h", timestamp: 8 },
  ],

  notifications: [
    { id: "N-1", type: "payment_due", title: "Payment Due", description: "Nova Health — INV-2026-0145 is 10 days overdue ($12,000)", time: "10m", read: false },
    { id: "N-2", type: "proposal_pending", title: "Proposal Pending", description: "Starlight Logistics proposal viewed but not accepted", time: "1h", read: false },
    { id: "N-3", type: "follow_up", title: "Client Follow Up", description: "Jordan Davies follow-up due today at 4:00 PM", time: "2h", read: false },
    { id: "N-4", type: "deadline", title: "Project Deadline", description: "E-Commerce Refactor launch — Jun 28", time: "3h", read: true },
    { id: "N-5", type: "invoice", title: "Invoice Generated", description: "INV-2026-0148 sent to Vortex Media Group", time: "1d", read: true },
    { id: "N-6", type: "task", title: "Task Assigned", description: "Cutover runbook assigned to Riya Kapoor", time: "1d", read: true },
  ],
};

// Marketing dataset (condensed but complete)
const mktData: CrmDataset = {
  featureCatalog: mktFeatureCatalog,
  company: { ...itCompany, name: "INEFAI.MKT", email: "hello@inefai.mkt", tagline: "Growth marketing for ambitious brands" },
  team: mktTeam,
  leads: [
    { id: "L-2031", name: "Sara Whitman", email: "sara@bloomco.com", phone: "+1 555 0201", company: "Bloom Co.", service: "SEO Retainer", source: "Inbound Form", status: "qualified", value: 12000, createdAt: "2026-06-14", owner: "MV", clientId: "C-301" },
    { id: "L-2032", name: "Derek Olu", email: "derek@northgate.com", phone: "+1 555 0202", company: "Northgate", service: "Paid Social", source: "Webinar", status: "negotiating", value: 28000, createdAt: "2026-06-11", owner: "RK" },
    { id: "L-2033", name: "Eva Martin", email: "eva@vinopulse.fr", phone: "+33 1 555 0203", company: "VinoPulse", service: "Brand Strategy", source: "Referral", status: "new", value: 45000, createdAt: "2026-06-16", owner: "EL", clientId: "C-303" },
    { id: "L-2034", name: "Owen Park", email: "owen@parkstudios.com", phone: "+1 555 0204", company: "Park Studios", service: "Content + Video", source: "Organic", status: "won", value: 36000, createdAt: "2026-05-30", owner: "MV", clientId: "C-302" },
    { id: "L-2035", name: "Yuki Tanaka", email: "yuki@harborlabs.jp", phone: "+81 3 555 0205", company: "Harbor Labs", service: "Email Automation", source: "Outbound", status: "new", value: 9800, createdAt: "2026-06-19", owner: "RK" },
  ],
  clients: [
    { id: "C-301", companyName: "Bloom Co.", clientName: "Sophia Bloom", email: "sophia@bloomco.com", phone: "+1 415 555 0190", whatsapp: "+1 415 555 0190", address: "12 Wellness Way", country: "USA", state: "California", city: "LA", gst: "US-GST-301", website: "bloomco.com", linkedin: "linkedin.com/company/bloomco", industry: "Wellness", source: "Inbound Form", priority: "medium", notes: "SEO retainer client", status: "converted", revenue: 72000, projects: 3, since: "2025-02-10", timeline: [{ id: "t1", type: "inquiry", title: "SEO Inquiry", description: "Organic growth needed", date: "2025-01-15", done: true }, { id: "t2", type: "proposal_sent", title: "Proposal Accepted", description: "SEO Retainer — $12k/mo", date: "2025-02-01", done: true }, { id: "t3", type: "project_started", title: "Campaign Live", description: "Spring campaign running", date: "2026-04-01", done: true }], documents: [] },
    { id: "C-302", companyName: "Park Studios", clientName: "Adrian Park", email: "adrian@parkstudios.com", phone: "+1 646 555 0173", whatsapp: "+1 646 555 0173", address: "88 Creative Blvd", country: "USA", state: "New York", city: "NYC", gst: "US-GST-302", website: "parkstudios.com", linkedin: "linkedin.com/company/parkstudios", industry: "Creative", source: "Organic", priority: "high", notes: "Brand refresh in review", status: "converted", revenue: 124000, projects: 2, since: "2024-11-04", timeline: [{ id: "t1", type: "inquiry", title: "Brand Inquiry", description: "Full rebrand needed", date: "2024-10-01", done: true }, { id: "t2", type: "proposal_sent", title: "Proposal Accepted", description: "Brand Refresh — $56k", date: "2024-11-01", done: true }, { id: "t3", type: "project_started", title: "Design Phase", description: "Concepts approved", date: "2024-11-15", done: true }], documents: ["Brand Guidelines.pdf"] },
    { id: "C-303", companyName: "VinoPulse", clientName: "Camille Roux", email: "camille@vinopulse.fr", phone: "+33 1 4344 0123", whatsapp: "+33 6 5555 0123", address: "15 Rue de Vin", country: "France", state: "Bordeaux", city: "Bordeaux", gst: "FR-GST-303", website: "vinopulse.fr", linkedin: "linkedin.com/company/vinopulse", industry: "Beverage", source: "Referral", priority: "medium", notes: "Brand strategy prospect", status: "proposal_sent", revenue: 0, projects: 1, since: "2026-05-19", leadId: "L-2033", timeline: [{ id: "t1", type: "inquiry", title: "Brand Strategy", description: "French wine brand launch", date: "2026-05-19", done: true }, { id: "t2", type: "proposal_sent", title: "Proposal Sent", description: "Brand Strategy — $45k", date: "2026-06-10", done: true }, { id: "t3", type: "follow_up", title: "Follow Up", description: "Awaiting board approval", date: "2026-06-25", done: false }], documents: [] },
  ],
  projects: [
    { id: "P-601", name: "Spring Campaign Launch", clientId: "C-301", client: "Bloom Co.", category: "Digital Marketing", projectType: "marketing", technologies: ["Meta Ads", "GA4", "Klaviyo"], priority: "high", status: "development", progress: 64, paymentProgress: 58, estimatedDays: 90, startDate: "2026-04-01", endDate: "2026-07-30", deliveryDate: "2026-07-30", warranty: "N/A", supportPeriod: "3 months", cost: { total: 38000, gst: 6840, discount: 0, advance: 11400, received: 22000, pending: 16000, expenses: 12000, profit: 26000 }, team: [{ id: "TM-11", name: "Marcus Vane", initials: "MV", role: "Strategy" }, { id: "TM-12", name: "Riya Kapoor", initials: "RK", role: "Ads" }], milestones: [{ name: "Strategy", done: true, date: "2026-04-10" }, { name: "Creative", done: true, date: "2026-05-12" }, { name: "Launch", done: false, date: "2026-07-01" }] },
    { id: "P-602", name: "Brand Refresh", clientId: "C-302", client: "Park Studios", category: "UI Design", projectType: "marketing", technologies: ["Figma", "Webflow"], priority: "high", status: "client_review", progress: 88, paymentProgress: 75, estimatedDays: 60, startDate: "2026-03-15", endDate: "2026-06-30", deliveryDate: "2026-06-30", warranty: "N/A", supportPeriod: "1 month", cost: { total: 56000, gst: 10080, discount: 2000, advance: 16800, received: 42000, pending: 14000, expenses: 18000, profit: 38000 }, team: [{ id: "TM-13", name: "Eli Laurent", initials: "EL", role: "Design Lead" }], milestones: [{ name: "Audit", done: true, date: "2026-04-01" }, { name: "Concepts", done: true, date: "2026-05-10" }, { name: "Rollout", done: false, date: "2026-06-30" }] },
    { id: "P-603", name: "VinoPulse Brand Launch", clientId: "C-303", client: "VinoPulse", category: "Logo Design", projectType: "marketing", technologies: ["Figma", "Illustrator"], priority: "medium", status: "requirement", progress: 8, paymentProgress: 0, estimatedDays: 45, startDate: "2026-07-01", endDate: "2026-08-15", deliveryDate: "2026-08-15", warranty: "N/A", supportPeriod: "1 month", cost: { total: 45000, gst: 8100, discount: 0, advance: 0, received: 0, pending: 45000, expenses: 0, profit: 45000 }, team: [{ id: "TM-13", name: "Eli Laurent", initials: "EL", role: "Brand" }], milestones: [{ name: "Discovery", done: false, date: "2026-07-10" }] },
  ],
  proposals: [
    { id: "PR-201", title: "Spring Campaign", clientId: "C-301", client: "Bloom Co.", status: "accepted", features: ["SEO Strategy", "Paid Social Ads", "Content Calendar"], scope: "Q2 growth campaign.", timelineWeeks: 12, technologies: ["Meta Ads", "GA4"], totalCost: 38000, gst: 6840, paymentTerms: "30% upfront · 70% on launch", createdAt: "2026-03-20", sentAt: "2026-03-25", expiresAt: "2026-04-25" },
    { id: "PR-202", title: "Brand Refresh", clientId: "C-302", client: "Park Studios", status: "accepted", features: ["Logo Design", "Brand Guidelines", "Social Media Creatives"], scope: "Complete brand identity overhaul.", timelineWeeks: 10, technologies: ["Figma"], totalCost: 56000, gst: 10080, paymentTerms: "30% upfront · 70% delivery", createdAt: "2026-03-01", sentAt: "2026-03-05", expiresAt: "2026-04-05" },
    { id: "PR-203", title: "Brand Strategy — VinoPulse", clientId: "C-303", client: "VinoPulse", status: "sent", features: ["Brand Audit", "Logo Design", "Brand Guidelines"], scope: "French wine brand launch strategy.", timelineWeeks: 8, technologies: ["Figma"], totalCost: 45000, gst: 8100, paymentTerms: "50% upfront · 50% delivery", createdAt: "2026-06-05", sentAt: "2026-06-10", expiresAt: "2026-07-10" },
  ],
  invoices: [
    { id: "I-9101", number: "INV-2026-0231", clientId: "C-301", client: "Bloom Co.", projectId: "P-601", amount: 12000, gst: 2160, paid: 12000, pending: 0, status: "paid", issued: "2026-05-04", due: "2026-05-18" },
    { id: "I-9102", number: "INV-2026-0232", clientId: "C-302", client: "Park Studios", projectId: "P-602", amount: 18000, gst: 3240, paid: 0, pending: 18000, status: "sent", issued: "2026-06-02", due: "2026-07-02" },
    { id: "I-9103", number: "INV-2026-0233", clientId: "C-303", client: "VinoPulse", projectId: "P-603", amount: 6500, gst: 1170, paid: 0, pending: 6500, status: "draft", issued: "2026-06-18", due: "2026-07-18" },
  ],
  payments: [
    { id: "PMT-2001", invoiceId: "I-9101", invoiceNumber: "INV-2026-0231", clientId: "C-301", client: "Bloom Co.", projectId: "P-601", amount: 12000, date: "2026-05-16", mode: "Stripe", transactionId: "pi_mkt_001", remarks: "Campaign milestone", receiptGenerated: true },
    { id: "PMT-2002", invoiceId: "I-9101", invoiceNumber: "INV-2026-0231", clientId: "C-301", client: "Bloom Co.", projectId: "P-601", amount: 11400, date: "2026-04-05", mode: "Bank Transfer", transactionId: "TXN-MKT-11400", remarks: "Advance", receiptGenerated: true },
  ],
  tasks: [
    { id: "T-21", title: "Hero video edit v2", type: "design", projectId: "P-601", project: "Spring Campaign Launch", assigneeId: "TM-11", assignee: "MV", priority: "high", status: "doing", due: "2026-06-26" },
    { id: "T-22", title: "Audience exclusion list", type: "development", projectId: "P-601", project: "Spring Campaign Launch", assigneeId: "TM-12", assignee: "RK", priority: "medium", status: "todo", due: "2026-06-28" },
    { id: "T-23", title: "Logo lockup approval", type: "design", projectId: "P-602", project: "Brand Refresh", assigneeId: "TM-13", assignee: "EL", priority: "high", status: "review", due: "2026-06-25" },
  ],
  followUps: [
    { id: "FU-21", leadId: "L-2033", clientId: "C-303", name: "Eva Martin", company: "VinoPulse", type: "email", nextCall: "Jun 25", reminder: "2026-06-25 10:00", remarks: "Board approval follow-up", outcome: "pending", nextDate: "2026-06-25", isToday: false },
    { id: "FU-22", leadId: "L-2032", name: "Derek Olu", company: "Northgate", type: "call", nextCall: "Today 3 PM", reminder: "2026-06-22 15:00", remarks: "Paid social package discussion", outcome: "pending", nextDate: "2026-06-22", isToday: true },
  ],
  documents: [
    { id: "D-21", name: "Bloom Campaign Brief.pdf", type: "pdf", folder: "Proposals", projectId: "P-601", project: "Spring Campaign Launch", clientId: "C-301", size: "2.1 MB", uploadedAt: "2026-04-05" },
    { id: "D-22", name: "Park Studios Brand.fig", type: "figma", folder: "Design Assets", projectId: "P-602", project: "Brand Refresh", clientId: "C-302", size: "18 MB", uploadedAt: "2026-05-10" },
  ],
  calendarEvents: [
    { id: "CE-21", title: "Campaign review · Bloom", date: "2026-06-10", day: 10, type: "meeting", client: "Bloom Co." },
    { id: "CE-22", title: "Brand rollout deadline", date: "2026-06-30", day: 30, type: "delivery", project: "Brand Refresh" },
    { id: "CE-23", title: "Follow up · Northgate", date: "2026-06-22", day: 22, type: "follow_up", client: "Northgate" },
  ],
  activities: [
    { id: "A-21", type: "proposal_sent", who: "Marcus Vane", whoInitials: "MV", message: "sent proposal", detail: "Brand Strategy → VinoPulse", time: "3h", timestamp: 3 },
    { id: "A-22", type: "payment_received", who: "System", whoInitials: "SY", message: "payment received", detail: "$12,000 from Bloom Co.", time: "1d", timestamp: 24 },
    { id: "A-23", type: "task_assigned", who: "Eli Laurent", whoInitials: "EL", message: "assigned task", detail: "Logo lockup → Brand Refresh", time: "2d", timestamp: 48 },
  ],
  notifications: [
    { id: "N-21", type: "follow_up", title: "Client Follow Up", description: "Derek Olu follow-up due today at 3 PM", time: "30m", read: false },
    { id: "N-22", type: "proposal_pending", title: "Proposal Pending", description: "VinoPulse brand strategy awaiting approval", time: "2h", read: false },
    { id: "N-23", type: "deadline", title: "Project Deadline", description: "Brand Refresh rollout — Jun 30", time: "5h", read: true },
  ],
};

const data: Record<BusinessMode, CrmDataset> = { it: itData, marketing: mktData };

/** Deep-cloned seed data for the mutable CRM store. */
export function getInitialDatasets(): Record<BusinessMode, CrmDataset> {
  return JSON.parse(JSON.stringify(data)) as Record<BusinessMode, CrmDataset>;
}

/** @deprecated Prefer `useDataset` from `@/lib/crm-store` for live data. */
export function useDataset(mode: BusinessMode): CrmDataset {
  return data[mode];
}

export const revenueSeries = {
  it: [
    { month: "Jan", actual: 184, projected: 200 },
    { month: "Feb", actual: 210, projected: 220 },
    { month: "Mar", actual: 248, projected: 235 },
    { month: "Apr", actual: 232, projected: 250 },
    { month: "May", actual: 276, projected: 260 },
    { month: "Jun", actual: 312, projected: 290 },
  ],
  marketing: [
    { month: "Jan", actual: 64, projected: 70 },
    { month: "Feb", actual: 72, projected: 78 },
    { month: "Mar", actual: 88, projected: 84 },
    { month: "Apr", actual: 96, projected: 92 },
    { month: "May", actual: 108, projected: 104 },
    { month: "Jun", actual: 124, projected: 118 },
  ],
} as const;

export const pipelineSeries = {
  it: [
    { stage: "New", value: 38 },
    { stage: "Qualified", value: 24 },
    { stage: "Negotiating", value: 14 },
    { stage: "Won", value: 9 },
    { stage: "Lost", value: 6 },
  ],
  marketing: [
    { stage: "New", value: 28 },
    { stage: "Qualified", value: 18 },
    { stage: "Negotiating", value: 11 },
    { stage: "Won", value: 7 },
    { stage: "Lost", value: 4 },
  ],
} as const;

export const conversionSeries = {
  it: [
    { month: "Jan", rate: 18 },
    { month: "Feb", rate: 22 },
    { month: "Mar", rate: 24 },
    { month: "Apr", rate: 21 },
    { month: "May", rate: 28 },
    { month: "Jun", rate: 32 },
  ],
  marketing: [
    { month: "Jan", rate: 12 },
    { month: "Feb", rate: 15 },
    { month: "Mar", rate: 18 },
    { month: "Apr", rate: 20 },
    { month: "May", rate: 22 },
    { month: "Jun", rate: 26 },
  ],
} as const;

export const paymentCollectionSeries = {
  it: [
    { month: "Jan", collected: 160, pending: 40 },
    { month: "Feb", collected: 190, pending: 35 },
    { month: "Mar", collected: 220, pending: 50 },
    { month: "Apr", collected: 200, pending: 45 },
    { month: "May", collected: 250, pending: 38 },
    { month: "Jun", collected: 280, pending: 52 },
  ],
  marketing: [
    { month: "Jan", collected: 55, pending: 15 },
    { month: "Feb", collected: 62, pending: 12 },
    { month: "Mar", collected: 78, pending: 18 },
    { month: "Apr", collected: 85, pending: 14 },
    { month: "May", collected: 95, pending: 20 },
    { month: "Jun", collected: 110, pending: 22 },
  ],
} as const;

export const projectCategorySeries = {
  it: [
    { name: "Full Stack", value: 3 },
    { name: "Backend", value: 1 },
    { name: "Dashboard", value: 1 },
    { name: "API", value: 1 },
    { name: "Admin Panel", value: 1 },
  ],
  marketing: [
    { name: "Digital Marketing", value: 1 },
    { name: "UI Design", value: 1 },
    { name: "Logo Design", value: 1 },
  ],
} as const;

export const projectStatusSeries = {
  it: [
    { status: "Development", count: 3 },
    { status: "Planning", count: 1 },
    { status: "Client Review", count: 1 },
    { status: "Completed", count: 1 },
    { status: "Requirement", count: 1 },
  ],
  marketing: [
    { status: "Development", count: 1 },
    { status: "Client Review", count: 1 },
    { status: "Requirement", count: 1 },
  ],
} as const;
