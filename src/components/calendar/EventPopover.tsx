import { CSSProperties } from "react";
import { EventIcon } from "@/components/calendar/EventIcon";
import { CalendarEvent } from "@/types/calendar";

type EventPopoverProps = {
  isOpen: boolean;
  events: CalendarEvent[];
  style: CSSProperties;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onAddEvent: () => void;
  onDeleteEvent: (eventId: string) => void;
};

export function EventPopover({
  isOpen,
  events,
  style,
  onMouseEnter,
  onMouseLeave,
  onAddEvent,
  onDeleteEvent,
}: EventPopoverProps) {
  return (
    <div
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute z-[9999] w-36 -translate-x-1/2 -translate-y-full rounded-[18px] border border-slate-100 bg-white/98 p-1.5 shadow-[0_14px_28px_-22px_rgba(36,48,66,0.35)] transition duration-150 ${
        isOpen
          ? "pointer-events-auto opacity-100 scale-100"
          : "pointer-events-none opacity-0 scale-95"
      }`}
    >
      {events.length > 0 ? (
        <div className="max-h-36 space-y-1 overflow-y-auto pr-0.5">
          {events.map((event) => (
            <div
              key={event.id ?? `${event.symbol}-${event.label}`}
              className="rounded-xl bg-slate-50 px-2 py-1.5"
            >
              <div className="flex items-center gap-1.5 text-slate-700">
                <EventIcon
                  symbol={event.symbol}
                  tone={event.tone}
                  className="h-3.5 w-3.5 shrink-0"
                />
                <span
                  title={event.label}
                  className="min-w-0 flex-1 truncate text-[12px] font-medium"
                >
                  {event.label}
                </span>
                {event.isCustom && event.id ? (
                  <button
                    type="button"
                    onClick={() => onDeleteEvent(event.id!)}
                    className="flex h-4 w-4 items-center justify-center rounded-full text-slate-400 transition hover:bg-white hover:text-slate-700"
                    aria-label={`Delete ${event.label}`}
                  >
                    <span className="text-[11px] leading-none">×</span>
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <button
        type="button"
        onClick={onAddEvent}
        className={`flex w-full items-center gap-1.5 rounded-xl px-2 py-1.5 text-left text-slate-400 ${
          events.length > 0 ? "mt-1.5" : ""
        } transition hover:bg-slate-50 hover:text-slate-600`}
      >
        <span className="text-xs leading-none">+</span>
        <span className="text-[12px] font-medium">Add Event</span>
      </button>
    </div>
  );
}
