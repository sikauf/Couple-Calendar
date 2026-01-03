"use client";

import { useState } from "react";
import { deleteEvent } from "@/app/actions/remove-event";

export function RemoveEventButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="text-sm text-slate-600 hover:text-red-600 transition"
      >
        Remove
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          />

          {/* Modal card */}
          <div className="relative w-[90%] max-w-sm rounded-3xl bg-[#ead2d7] p-6 shadow-xl">
            <h3 className="text-lg font-semibold">
              Remove this event?
            </h3>

            <p className="mt-2 text-sm text-slate-700">
              This can’t be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-2 text-sm bg-white/60 hover:bg-white/80 transition"
              >
                Cancel
              </button>

              <form action={deleteEvent}>
                <input type="hidden" name="id" value={id} />
                <button
                  type="submit"
                  className="rounded-xl px-4 py-2 text-sm bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
