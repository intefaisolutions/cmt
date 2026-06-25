import { motion } from "framer-motion";
import { LIFECYCLE_STAGES } from "@/lib/crm-data";

export function LifecycleFlow({ activeStage = 7 }: { activeStage?: number }) {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex items-center gap-1 min-w-max">
        {LIFECYCLE_STAGES.map((stage, i) => {
          const done = i < activeStage;
          const current = i === activeStage;
          return (
            <div key={stage} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                className={
                  "px-2.5 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wide border transition-all " +
                  (current
                    ? "bg-accent text-accent-foreground border-accent shadow-lg shadow-accent/20"
                    : done
                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:text-emerald-400"
                      : "bg-secondary/60 text-muted-foreground border-border")
                }
              >
                {stage}
              </motion.div>
              {i < LIFECYCLE_STAGES.length - 1 && (
                <div className={"w-3 h-px mx-0.5 " + (done ? "bg-emerald-500/50" : "bg-border")} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
