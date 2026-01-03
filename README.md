# 💗 Sam and Callie’s Couple Calendar 🌿

A simple, cozy web app for keeping track of dates, plans, and shared memories — built just for us.

This project focuses on clarity, warmth, and intentional design rather than complexity. It’s a space to plan upcoming dates and reflect on past ones, without accounts, logins, or unnecessary friction.

---

## ✨ Features

- 📅 Add upcoming dates (title, date & time, location, notes)
- 🕒 View upcoming events in chronological order
- 🗑️ Remove events with a confirmation modal
- 📖 Past dates page for memories and reflection
- 🎨 Soft, layered pink & green design
- 🚫 No authentication — intentionally simple

---

## 🛠 Tech Stack

- Next.js (App Router)
- TypeScript
- Supabase (Postgres, no auth)
- Tailwind CSS
- Server Actions

---

## 📂 Project Structure

app/
page.tsx
past/page.tsx
actions/
remove-event.ts

components/
add-event-form.tsx
remove-event-button.tsx

lib/
supabase/
public.ts


---

## 🗄 Database Schema

create table public.dates (
id uuid primary key default gen_random_uuid(),
title text not null,
date_at timestamp with time zone not null,
status text default 'future',
location text,
notes text,
created_at timestamp with time zone default now()
);

## 🚀 Running Locally
`npm run dev`