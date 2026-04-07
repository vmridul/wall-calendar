"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@/components/calendar/icons/ChevronDownIcon";

type PickerOption = {
  label: string;
  value: number;
};

type PickerMenuProps = {
  label: string;
  value: number;
  options: PickerOption[];
  onChange: (value: number) => void;
  triggerClassName?: string;
  menuClassName?: string;
};

export function PickerMenu({
  label,
  value,
  options,
  onChange,
  triggerClassName = "",
  menuClassName = "",
}: PickerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const selectedOption =
    options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label={label}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className={`flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-left text-[13px] font-medium text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 ${triggerClassName}`}
      >
        <span>{selectedOption?.label}</span>
        <ChevronDownIcon
          className={`h-3.5 w-3.5 transition ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen ? (
        <div
          className={`absolute left-0 top-full z-40 mt-1.5 min-w-full rounded-[18px] border border-slate-100 bg-white/98 p-1.5 shadow-[0_14px_28px_-22px_rgba(36,48,66,0.35)] ${menuClassName}`}
        >
          <div className="max-h-52 space-y-1 overflow-y-auto pr-0.5">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center rounded-xl px-2 py-1.5 text-left text-[12px] font-medium transition ${
                  option.value === value
                    ? "bg-slate-50 text-slate-700"
                    : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                }`}
              >
                <span className="truncate">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
