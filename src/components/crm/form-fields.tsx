import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FormGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-5 py-2">{children}</div>;
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground border-b border-border pb-1.5">{title}</p>
      {children}
    </div>
  );
}

export function Field({ label, children, className, hint }: { label: string; children: React.ReactNode; className?: string; hint?: string }) {
  return (
    <div className={className ?? "grid gap-1.5"}>
      <Label className="text-xs font-medium">{label}</Label>
      {children}
      {hint && <p className="text-[10px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function SelectInput(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
    />
  );
}

export function FormActions({ label = "Create" }: { label?: string }) {
  return (
    <DialogFooter className="pt-4 border-t border-border mt-2">
      <Button type="submit">{label}</Button>
    </DialogFooter>
  );
}

export function str(fd: FormData, key: string) {
  return String(fd.get(key) ?? "");
}

export function num(fd: FormData, key: number | string) {
  return Number(fd.get(String(key))) || 0;
}

export function NativeCheckbox({ name, value, label }: { name: string; value: string; label: string }) {
  return (
    <label className="flex items-center gap-2 text-xs cursor-pointer">
      <input type="checkbox" name={name} value={value} className="size-3.5 rounded border-input accent-accent" />
      {label}
    </label>
  );
}
