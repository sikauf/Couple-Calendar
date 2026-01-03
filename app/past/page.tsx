import { unstable_noStore as noStore } from "next/cache";
import { supabase } from "@/lib/supabase/public";

export default async function PastDatesPage() {
  const { data } = await supabase.from("dates").select("*");


  const { data: pastEvents } = await supabase
    .from("dates")
    .select("id, title, date_at, location, notes")
    .eq("status", "past")
    .order("date_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#d6ccc6] flex items-center justify-center">
      <div className="relative w-[92%] max-w-5xl h-[90vh]">
        {/* back layers */}
        <div className="absolute inset-0 bg-[#c7d7c9] rotate-1 rounded-[40px] shadow-md" />
        <div className="absolute inset-0 bg-[#e3b7c2] -rotate-1 rounded-[40px] shadow-lg" />

        {/* top sheet */}
        <div className="relative h-full bg-[#ead2d7] rounded-[40px] p-14 text-slate-800 shadow-xl flex flex-col overflow-hidden">
          {/* Header */}
          <header className="shrink-0">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Past Dates 💗
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-slate-700">
              Memories we’ve already made.
            </p>
          </header>

          {/* Past list */}
          <section className="mt-10 flex-1 overflow-y-auto space-y-4">
            {pastEvents && pastEvents.length > 0 ? (
              pastEvents.map((event) => (
                <div
                  key={event.id}
                  className="rounded-3xl bg-white/55 p-6 border border-black/5"
                >
                  <div className="font-medium text-lg">
                    {event.title}
                  </div>

                  <div className="mt-1 text-sm text-slate-600">
                    {new Date(event.date_at).toLocaleDateString(undefined, {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                    {event.location ? ` · ${event.location}` : ""}
                  </div>

                  {event.notes && (
                    <p className="mt-3 text-slate-700">
                      {event.notes}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <div className="text-slate-600">
                No past dates yet 🌱
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
