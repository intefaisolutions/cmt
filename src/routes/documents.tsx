import { createFileRoute } from "@tanstack/react-router";
import { FileText, FileImage, FileSpreadsheet, FolderOpen, Upload, Search, FileArchive, Smartphone } from "lucide-react";
import { useState } from "react";
import { CreateAction } from "@/components/crm/create-action";
import { AppShell, Card } from "@/components/app-shell";
import { useDataset } from "@/lib/crm-store";

export const Route = createFileRoute("/documents")({
  head: () => ({ meta: [{ title: "Documents — INEFAI.CRM" }] }),
  component: DocumentsPage,
});

const folders = ["Contracts", "Proposals", "Design Assets", "Reports", "Invoices", "Internal", "Source Code"];

const iconMap: Record<string, React.ElementType> = {
  pdf: FileText,
  image: FileImage,
  excel: FileSpreadsheet,
  figma: FileImage,
  contract: FileText,
  source: FileArchive,
  zip: FileArchive,
  apk: Smartphone,
  word: FileText,
};

function DocumentsPage() {
  const ds = useDataset();
  const [folder, setFolder] = useState("Contracts");
  const [q, setQ] = useState("");

  const docs = ds.documents.filter((d) => {
    const matchFolder = d.folder === folder;
    const matchQ = !q || d.name.toLowerCase().includes(q.toLowerCase());
    return matchFolder || q ? (q ? matchQ : matchFolder) : true;
  });

  const displayDocs = q ? ds.documents.filter((d) => d.name.toLowerCase().includes(q.toLowerCase())) : docs;

  return (
    <AppShell title="Documents" subtitle="Requirements, designs, contracts, source code & more" actions={<CreateAction entity="document" label="Upload" />}>
      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-12 lg:col-span-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Folders</h3>
          <div className="space-y-0.5">
            {folders.map((f) => (
              <button key={f} onClick={() => { setFolder(f); setQ(""); }} className={"w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs font-medium transition-colors " + (folder === f && !q ? "bg-accent/5 text-accent" : "hover:bg-secondary text-muted-foreground hover:text-foreground")}>
                <FolderOpen className="size-3.5" /> {f}
                <span className="ml-auto text-[10px] font-mono">{ds.documents.filter((d) => d.folder === f).length}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card className="col-span-12 lg:col-span-9 p-0 overflow-hidden">
          <div className="p-4 border-b border-border flex items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <Search className="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search documents..." className="w-full bg-secondary border border-border rounded-md pl-8 pr-3 py-1.5 text-xs focus:ring-1 focus:ring-accent outline-none" />
            </div>
            <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-border rounded-md hover:bg-secondary"><Upload className="size-3.5" /> Upload</button>
          </div>
          <table className="w-full">
            <thead className="bg-secondary/40">
              <tr className="text-left">
                {["Name", "Type", "Folder", "Project", "Size", "Uploaded"].map((h) => (
                  <th key={h} className="px-6 py-3 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {displayDocs.map((d) => {
                const Icon = iconMap[d.type] ?? FileText;
                return (
                  <tr key={d.id} className="hover:bg-secondary/40">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3 text-xs font-medium">
                        <Icon className="size-4 text-accent" /> {d.name}
                      </div>
                    </td>
                    <td className="px-6 py-3 text-xs font-mono uppercase text-muted-foreground">{d.type}</td>
                    <td className="px-6 py-3 text-xs text-muted-foreground">{d.folder}</td>
                    <td className="px-6 py-3 text-xs text-muted-foreground">{d.project ?? "—"}</td>
                    <td className="px-6 py-3 text-xs font-mono text-muted-foreground">{d.size}</td>
                    <td className="px-6 py-3 text-xs font-mono text-muted-foreground">{d.uploadedAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </AppShell>
  );
}
