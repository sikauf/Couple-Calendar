import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { DateEntry } from "@/types";
import { Suspense } from "react";

// 1. Component for fetching and displaying the actual data
async function DatesData() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("dates")
    .select("*")
    .order("date_at", { ascending: false });

  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  const dates: DateEntry[] = data || [];
  const now = new Date();
  const pastDates = dates.filter((d) => new Date(d.date_at) < now);
  const futureDates = dates
    .filter((d) => new Date(d.date_at) >= now)
    .sort((a, b) => new Date(a.date_at).getTime() - new Date(b.date_at).getTime());

  return (
    <div className="grid md:grid-cols-2 gap-12 mt-10">
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-blue-500 border-b pb-2">Upcoming Plans</h2>
        {futureDates.length === 0 ? (
          <div className="p-8 border-2 border-dashed rounded-xl text-center text-muted-foreground">No plans yet.</div>
        ) : (
          futureDates.map(date => (
            <div key={date.id} className="p-5 border rounded-xl bg-card shadow-sm">
              <h3 className="font-bold">{date.title}</h3>
              <p className="text-sm text-muted-foreground">📍 {date.location}</p>
            </div>
          ))
        )}
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-rose-500 border-b pb-2">Memory Lane</h2>
        {pastDates.length === 0 ? (
          <p className="text-muted-foreground italic py-8 text-center">Our story is just beginning...</p>
        ) : (
          pastDates.map(date => (
            <div key={date.id} className="p-5 border rounded-xl bg-muted/30">
              <h3 className="font-semibold">{date.title}</h3>
              <p className="text-sm text-muted-foreground">{new Date(date.date_at).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

// 2. Auth gate component
async function AuthedHome() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight">Every date, remembered forever.</h1>
        <div className="mt-4"><AuthButton /></div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full flex flex-col max-w-4xl p-5 mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Hello! 👋</h1>
          <p className="text-muted-foreground font-medium">Our Shared Timeline</p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium">
          + Add New Date
        </button>
      </div>

      <Suspense fallback={<div className="mt-10 h-64 w-full bg-muted animate-pulse rounded-xl" />}>
        <DatesData />
      </Suspense>
    </div>
  );
}

// 3. Root Page
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-background text-foreground">
      <nav className="w-full flex justify-center border-b h-16">
        <div className="w-full max-w-4xl flex justify-between items-center px-5">
          <div className="font-bold text-xl">Our Date Archive ❤️</div>
          <div className="flex items-center gap-4">
            <AuthButton />
            <ThemeSwitcher />
          </div>
        </div>
      </nav>

      <Suspense fallback={<div className="mt-20 h-10 w-48 bg-muted animate-pulse rounded" />}>
        <AuthedHome />
      </Suspense>
    </main>
  );
}