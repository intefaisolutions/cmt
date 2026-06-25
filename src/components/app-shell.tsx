import { Link, useRouterState, useRouter } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Users, Building2, FolderKanban, FileText, Receipt,
  CreditCard, BellRing, CheckSquare, Calendar, FolderOpen, BarChart3,
  Settings, Bell, Plus, ChevronsUpDown, Moon, Sun, UsersRound, Menu, X,
} from "lucide-react";
import { type ReactNode, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useBusiness } from "@/lib/business-context";
import { useTheme } from "@/lib/theme-context";
import { GlobalSearch } from "@/components/crm/global-search";
import { useDataset } from "@/lib/crm-store";

const nav = [
  { section: "Overview", items: [{ to: "/", label: "Dashboard", icon: LayoutDashboard, exact: true }] },
  {
    section: "CRM",
    items: [
      { to: "/leads", label: "Leads", icon: Users },
      { to: "/clients", label: "Clients", icon: Building2 },
      { to: "/follow-ups", label: "Follow Ups", icon: BellRing },
    ],
  },
  {
    section: "Delivery",
    items: [
      { to: "/projects", label: "Projects", icon: FolderKanban },
      { to: "/proposals", label: "Proposal Builder", icon: FileText },
      { to: "/invoices", label: "Invoices", icon: Receipt },
      { to: "/payments", label: "Payments", icon: CreditCard },
    ],
  },
  {
    section: "Workspace",
    items: [
      { to: "/tasks", label: "Tasks", icon: CheckSquare },
      { to: "/team", label: "Team", icon: UsersRound },
      { to: "/calendar", label: "Calendar", icon: Calendar },
      { to: "/documents", label: "Documents", icon: FolderOpen },
      { to: "/reports", label: "Reports", icon: BarChart3 },
      { to: "/settings", label: "Settings", icon: Settings },
    ],
  },
] as const;

function SidebarContent({ pathname, onNavClick, onLogout }: { pathname: string; onNavClick?: () => void; onLogout?: () => void }) {
  return (
    <>
      <div className="h-16 flex items-center px-6 border-b border-border shrink-0">
        <div className="size-7 bg-gradient-to-br from-accent to-accent/70 rounded-lg flex items-center justify-center shadow-lg shadow-accent/20 shrink-0">
          <div className="size-3 bg-primary-foreground rounded-sm" />
        </div>
        <span className="ml-3 font-bold tracking-tight text-base truncate">INTEFAI IT CRM</span>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {nav.map((group) => (
          <div key={group.section} className="mb-2">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground px-3 mb-2 mt-3">
              {group.section}
            </div>
            {group.items.map((item) => {
              const exact = "exact" in item && item.exact;
              const active = exact ? pathname === item.to : item.to !== "/" && pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={onNavClick}
                  className={cn(
                    "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all",
                    active
                      ? "bg-accent/10 text-accent shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
                  )}
                >
                  <Icon className={cn("mr-3 size-4 shrink-0", active ? "" : "opacity-60")} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-border shrink-0">
        <div className="flex items-center gap-3 px-2">
          <div className="size-8 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 ring-1 ring-accent/20 grid place-items-center text-xs font-bold shrink-0">
            MV
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold truncate">Marcus Vane</p>
            <p className="text-[10px] text-muted-foreground font-mono truncate">Admin Console</p>
          </div>
          <button onClick={onLogout} title="Logout" className="p-2 hover:bg-secondary rounded-md text-muted-foreground transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
          </button>
        </div>
      </div>
    </>
  );
}

export function AppShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { mode, setMode } = useBusiness();
  const { theme, toggleTheme } = useTheme();
  const ds = useDataset();
  const unread = ds.notifications.filter((n) => !n.read).length;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useRouter().navigate;

  // Check auth
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate({ to: "/login" });
    }
  }, [navigate, pathname]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    navigate({ to: "/login" });
  };

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Close sidebar on window resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 1024) setSidebarOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/10 selection:text-accent">

      {/* ── Desktop sidebar (always visible lg+) ── */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:flex lg:flex-col border-r border-border bg-sidebar/80 backdrop-blur-xl z-20">
        <SidebarContent pathname={pathname} onLogout={handleLogout} />
      </aside>

      {/* ── Mobile sidebar drawer ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            {/* Drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-72 flex flex-col border-r border-border bg-sidebar backdrop-blur-xl z-40 lg:hidden"
            >
              {/* Close button */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 size-8 grid place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary"
              >
                <X className="size-4" />
              </button>
              <SidebarContent pathname={pathname} onNavClick={() => setSidebarOpen(false)} onLogout={handleLogout} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main content ── */}
      <main className="lg:pl-64">
        <header className="h-14 lg:h-16 border-b border-border sticky top-0 bg-background/70 backdrop-blur-xl z-10 flex items-center justify-between px-4 lg:px-8 gap-3">
          {/* Hamburger (mobile only) */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden size-8 grid place-items-center text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary shrink-0"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>

          {/* Mode switcher */}
          <div className="flex items-center gap-2 lg:gap-4 flex-1 min-w-0">
            <div className="flex bg-secondary/80 p-0.5 rounded-lg border border-border shrink-0">
              <button
                onClick={() => setMode("it")}
                className={cn(
                  "px-2 lg:px-3 py-1 text-[10px] lg:text-xs font-medium rounded-md transition-all",
                  mode === "it"
                    ? "bg-background shadow-sm border border-black/5 text-foreground dark:border-white/10"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                IT Services
              </button>
              <button
                onClick={() => setMode("marketing")}
                className={cn(
                  "px-2 lg:px-3 py-1 text-[10px] lg:text-xs font-medium rounded-md transition-all",
                  mode === "marketing"
                    ? "bg-background shadow-sm border border-black/5 text-foreground dark:border-white/10"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Marketing
              </button>
            </div>
            <div className="h-4 w-px bg-border hidden md:block" />
            <div className="text-xs text-muted-foreground hidden md:block truncate">Client Relation Management</div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1 lg:gap-3 shrink-0">
            <div className="hidden sm:block">
              <GlobalSearch />
            </div>
            <button
              onClick={toggleTheme}
              className="size-8 grid place-items-center text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary"
              title="Toggle theme"
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <Link
              to="/notifications"
              className="size-8 grid place-items-center text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary relative"
            >
              <Bell className="size-4" />
              {unread > 0 && (
                <span className="absolute top-1 right-1 size-4 bg-accent text-accent-foreground text-[9px] font-bold rounded-full grid place-items-center ring-2 ring-background">
                  {unread}
                </span>
              )}
            </Link>
          </div>
        </header>

        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="p-4 sm:p-6 lg:p-8"
        >
          <div className="flex flex-wrap items-start justify-between gap-3 mb-6 lg:mb-8">
            <div className="min-w-0">
              <h1 className="text-xl lg:text-2xl font-bold tracking-tight">{title}</h1>
              {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
            </div>
            {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
          </div>
          {children}
        </motion.div>
      </main>
    </div>
  );
}



export function PrimaryButton({
  children,
  onClick,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-lg hover:opacity-90 transition-opacity shadow-sm"
    >
      <Plus className="size-3.5" /> {children}
    </button>
  );
}

export function StatusPill({
  tone = "neutral",
  children,
}: {
  tone?: "neutral" | "blue" | "amber" | "green" | "red";
  children: ReactNode;
}) {
  const tones = {
    neutral: "border-border bg-secondary text-muted-foreground",
    blue: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300",
    amber: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300",
    green: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300",
    red: "border-red-200 bg-red-50 text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-medium uppercase tracking-wider",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("p-6 border border-border rounded-2xl bg-card/80 backdrop-blur-sm shadow-sm", className)}>
      {children}
    </div>
  );
}

export function GradientCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "p-5 border border-border rounded-xl bg-gradient-to-br from-card via-card to-accent/5 backdrop-blur-sm shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
