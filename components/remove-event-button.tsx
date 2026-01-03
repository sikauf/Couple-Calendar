import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export function RemoveEventButton({ id }: { id: string }) {
  async function remove() {
    "use server";

    const supabase = await createClient();
    await supabase.from("dates").delete().eq("id", id);
    revalidatePath("/");
  }

  return (
    <form action={remove}>
      <button
        type="submit"
        className="text-sm text-slate-600 hover:text-red-600 transition"
      >
        Remove
      </button>
    </form>
  );
}
