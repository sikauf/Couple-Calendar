"use server";

import { supabase } from "@/lib/supabase/public";
import { revalidatePath } from "next/cache";

export async function deleteEvent(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;

  await supabase.from("dates").delete().eq("id", id);
  revalidatePath("/");
}
