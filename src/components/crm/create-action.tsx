import { useState } from "react";
import { PrimaryButton } from "@/components/app-shell";
import { CreateEntityDialog, type EntityType } from "@/components/crm/create-entity-dialog";

export function CreateAction({ entity, label }: { entity: EntityType; label: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <PrimaryButton onClick={() => setOpen(true)}>{label}</PrimaryButton>
      <CreateEntityDialog entity={entity} open={open} onOpenChange={setOpen} />
    </>
  );
}
