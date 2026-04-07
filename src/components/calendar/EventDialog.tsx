"use client";

import { useEffect, useState } from "react";
import { EventIconOptionButton } from "@/components/calendar/EventIconOptionButton";
import { eventIconOptions } from "@/lib/calendar/events";
import { EventIconOption } from "@/types/calendar";

type EventDialogProps = {
  isOpen: boolean;
  initialLabel: string;
  initialSymbol: string;
  initialTone: string;
  dateLabel: string;
  onClose: () => void;
  onSave: (value: { label: string; symbol: string; tone: string }) => void;
};

export function EventDialog({
  isOpen,
  initialLabel,
  initialSymbol,
  initialTone,
  dateLabel,
  onClose,
  onSave,
}: EventDialogProps) {
  const initialOption =
    eventIconOptions.find(
      (option) =>
        option.symbol === initialSymbol && option.tone === initialTone,
    ) ?? eventIconOptions[0];
  const [label, setLabel] = useState(initialLabel);
  const [selectedIcon, setSelectedIcon] =
    useState<EventIconOption>(initialOption);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/25 px-3 sm:px-4">
      <div className="w-full max-w-[22rem] rounded-[24px] bg-[var(--calendar-paper)] p-4 shadow-[0_32px_80px_-34px_rgba(35,68,111,0.35)] sm:max-w-md sm:rounded-[28px] sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="mt-1.5 text-xl font-medium tracking-tight text-slate-800 sm:mt-2 sm:text-2xl">
              Add Event
            </h2>
            <p className="mt-1 text-sm text-slate-500">{dateLabel}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 sm:h-10 sm:w-10"
            aria-label="Close event dialog"
          >
            ×
          </button>
        </div>

        <div className="mt-5 sm:mt-6">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Event title
          </label>
          <input
            autoFocus
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            placeholder="For eg. TUF's birthday"
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[var(--calendar-accent)] focus:ring-4 focus:ring-[var(--calendar-accent-soft)] sm:rounded-2xl sm:px-4 sm:py-3"
          />
        </div>

        <div className="mt-4 sm:mt-5">
          <p className="mb-2 text-sm font-medium text-slate-600">Icon</p>
          <div className="grid grid-cols-4 gap-2">
            {eventIconOptions.map((option) => (
              <EventIconOptionButton
                key={`${option.symbol}-${option.tone}`}
                option={option}
                isSelected={
                  selectedIcon.symbol === option.symbol &&
                  selectedIcon.tone === option.tone
                }
                onSelect={setSelectedIcon}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2.5 sm:mt-6 sm:gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-3.5 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 sm:px-4"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              const trimmedLabel = label.trim();

              if (!trimmedLabel) {
                return;
              }

              onSave({
                label: trimmedLabel,
                symbol: selectedIcon.symbol,
                tone: selectedIcon.tone,
              });
            }}
            className="rounded-full bg-[var(--calendar-accent)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 sm:px-5"
          >
            Save Event
          </button>
        </div>
      </div>
    </div>
  );
}
