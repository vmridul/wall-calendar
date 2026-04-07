"use client";

import { useEffect } from "react";
import { KeyboardShortcutRow } from "@/components/calendar/KeyboardShortcutRow";

type KeyboardShortcutsDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const shortcuts = [
  { keys: ["←", "→"], label: "Previous or Next month" },
  { keys: ["↓", "↑"], label: "Previous or Next year" },
  { keys: ["T"], label: "Focus on notes" },
  { keys: ["K"], label: "Open this dialog" },
];

export function KeyboardShortcutsDialog({
  isOpen,
  onClose,
}: KeyboardShortcutsDialogProps) {
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
            <h2 className="mt-1.5 flex items-center gap-2 text-xl font-medium tracking-tight text-slate-800 sm:mt-2 sm:text-2xl">
              <span>Keyboard Shortcuts</span>
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 sm:h-10 sm:w-10"
            aria-label="Close keyboard shortcuts dialog"
          >
            ×
          </button>
        </div>

        <div className="mt-5 space-y-2.5 sm:mt-6">
          {shortcuts.map((shortcut) => (
            <KeyboardShortcutRow
              key={`${shortcut.label}-${shortcut.keys.join("-")}`}
              keys={shortcut.keys}
              label={shortcut.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
