import { DateEntry } from "@/types";

interface DateCardProps {
  date: DateEntry;
  variant: "future" | "past";
}

export function DateCard({ date, variant }: DateCardProps) {
  const isFuture = variant === "future";

  return (
    <div className={`
      group p-5 border rounded-2xl transition-all duration-300 hover:scale-[1.02]
      ${isFuture 
        ? "border-emerald-200/50 bg-white/40 dark:bg-emerald-950/20 backdrop-blur-sm shadow-emerald-100/20 shadow-lg" 
        : "border-rose-100/50 bg-white/20 dark:bg-rose-950/10 backdrop-blur-sm"}
    `}>
      <div className="flex justify-between items-start">
        <h3 className={`font-bold text-lg ${isFuture ? "text-emerald-900 dark:text-emerald-100" : "text-rose-900 dark:text-rose-100"}`}>
          {date.title}
        </h3>
        <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-widest text-white
          ${isFuture ? "bg-emerald-500 shadow-md shadow-emerald-200" : "bg-rose-400"}
        `}>
          {new Date(date.date_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
        </span>
      </div>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-2 flex items-center gap-1 italic">
        {date.location ? `📍 ${date.location}` : "Secret Location"}
      </p>
    </div>
  );
}