import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Command } from "lucide-react";
import { useDataset } from "@/lib/crm-store";
import { searchAll } from "@/lib/crm-helpers";

export function GlobalSearch() {
  const ds = useDataset();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const results = searchAll(ds, q);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const click = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", click);
    return () => document.removeEventListener("mousedown", click);
  }, []);

  return (
    <div ref={ref} className="relative">
      <Search className="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      <input
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder="Search clients, projects, invoices..."
        className="w-64 bg-secondary/80 backdrop-blur border border-border rounded-md pl-8 pr-12 py-1.5 text-xs focus:ring-1 focus:ring-accent outline-none font-mono"
      />
      <kbd className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] text-muted-foreground font-mono pointer-events-none">
        <Command className="size-3" />K
      </kbd>

      {open && q.trim() && (
        <div className="absolute top-full mt-2 w-80 right-0 bg-card/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl z-50 overflow-hidden">
          {results.length === 0 ? (
            <p className="p-4 text-xs text-muted-foreground">No results for &ldquo;{q}&rdquo;</p>
          ) : (
            <ul>
              {results.map((r, i) => (
                <li key={i}>
                  <Link
                    to={r.href}
                    onClick={() => { setOpen(false); setQ(""); }}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-secondary/60 transition-colors"
                  >
                    <span className="text-[10px] font-mono uppercase text-accent w-16 shrink-0">{r.type}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate">{r.label}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{r.sub}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
