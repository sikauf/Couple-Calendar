import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { RemoveEventButton } from "@/components/remove-event-button";
import { AddEventForm } from "@/components/add-event-form";

export default async function Page() {
  noStore();

  const supabase = await createClient();

  const { data: events } = await supabase
    .from("dates")
    .select("id, title, date_at, location")
    .eq("status", "future")
    .order("date_at", { ascending: true });

  return (
    <main className="min-h-screen bg-[#d6ccc6] flex items-center justify-center">
      <div className="relative w-[92%] max-w-6xl h-[90vh]">
        {/* back layers */}
        <div className="absolute inset-0 bg-[#c7d7c9] rotate-1 rounded-[40px] shadow-md" />
        <div className="absolute inset-0 bg-[#e3b7c2] -rotate-1 rounded-[40px] shadow-lg" />

        {/* top sheet */}
        <div className="relative h-full bg-[#ead2d7] rounded-[40px] p-14 text-slate-800 shadow-xl flex flex-col overflow-hidden">
          {/* Header */}
          <header className="shrink-0">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Sam and Callie&apos;s Couple Calendar 💗🌿
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-slate-700">
              Dates, plans, and little moments—together.
            </p>
          </header>

          {/* Main */}
          <div className="mt-10 grid gap-8 md:grid-cols-2 flex-1 min-h-0">
            {/* Add Event */}
            <AddEventForm />

            {/* Upcoming */}
            <section className="rounded-3xl bg-[#eef2ee] p-8 border border-black/5 overflow-y-auto">
              <h2 className="text-2xl font-semibold">Upcoming</h2>

              <div className="mt-6 space-y-4">
                {events && events.length > 0 ? (
                  events.map((event) => (
                    <div
                      key={event.id}
                      className="rounded-2xl bg-white/60 p-4 flex items-start justify-between gap-4"
                    >
                      <div>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-slate-600">
                          {new Date(event.date_at).toLocaleString(undefined, {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                          {event.location ? ` · ${event.location}` : ""}
                        </div>
                      </div>

                      <RemoveEventButton id={event.id} />
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-slate-600">
                    No upcoming dates yet 💗
                  </div>
                )}
              </div>
            </section>
          </div>

          <footer className="mt-6 text-sm text-slate-600 shrink-0">
            💗 Sam & Callie
          </footer>
        </div>
      </div>
    </main>
  );
}
