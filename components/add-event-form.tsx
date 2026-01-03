import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase/public";

export function AddEventForm() {
  async function addEvent(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const date_at = formData.get("date_at") as string;
    const location = (formData.get("location") as string) || null;
    const notes = (formData.get("notes") as string) || null;

    if (!title || !date_at) return;

    await supabase.from("dates").insert({
      title,
      date_at,
      location,
      notes,
      status: "future",
    });

    revalidatePath("/");
  }

  return (
    <section className="rounded-3xl bg-[#f0e3e6] p-8 border border-black/5 overflow-y-auto">
      <h2 className="text-2xl font-semibold">Add Event</h2>

      <form action={addEvent} className="mt-6 space-y-4">
        <input
          name="title"
          required
          placeholder="Title"
          className="w-full rounded-xl border border-black/10 bg-[#fbf4f6] px-4 py-2"
        />

        <input
          name="date_at"
          type="datetime-local"
          required
          className="w-full rounded-xl border border-black/10 bg-[#fbf4f6] px-4 py-2"
        />

        <input
          name="location"
          placeholder="Location"
          className="w-full rounded-xl border border-black/10 bg-[#fbf4f6] px-4 py-2"
        />

        <textarea
          name="notes"
          rows={3}
          placeholder="Notes"
          className="w-full rounded-xl border border-black/10 bg-[#fbf4f6] px-4 py-2 resize-none"
        />

        <button
          type="submit"
          className="w-full rounded-xl bg-[#c7d7c9] px-6 py-2.5 font-medium hover:bg-[#b7cbb9] transition"
        >
          Add to Calendar
        </button>
      </form>
    </section>
  );
}
