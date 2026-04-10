import { PencilIcon } from "@/components/calendar/icons/PencilIcon";
import { EventMarker } from "@/components/calendar/EventMarker";
import {
  CalendarEvent,
  CalendarDateRange,
  CalendarDay,
} from "@/types/calendar";

type DayCellProps = {
  day: CalendarDay;
  range: CalendarDateRange;
  previewRange: CalendarDateRange | null;
  activeRangeEndIso: string | null;
  selectedDayCount: number | null;
  markers: CalendarEvent[];
  onSelect: (iso: string) => void;
  onClearSelection: () => void;
  onAddRangeNote: () => void;
  onHover: (iso: string | null) => void;
  onHoverCardOpen: (payload: {
    day: CalendarDay;
    markers: CalendarEvent[];
    anchorElement: HTMLElement;
  }) => void;
  onHoverCardClose: () => void;
  color: string;
};

export function DayCell({
  day,
  range,
  previewRange,
  activeRangeEndIso,
  selectedDayCount,
  markers,
  onSelect,
  onClearSelection,
  onAddRangeNote,
  onHover,
  onHoverCardOpen,
  onHoverCardClose,
  color,
}: DayCellProps) {
  const isStart = day.iso === range.start;
  const isEnd = day.iso === range.end;
  const activeRange = previewRange ?? range;
  const isBetween =
    activeRange.start !== null &&
    activeRange.end !== null &&
    day.iso > activeRange.start &&
    day.iso < activeRange.end;
  const showsClearSelection = range.end !== null && isEnd;
  const showsSelectedDayCount =
    selectedDayCount !== null && activeRangeEndIso === day.iso;
  const showsPreviewTail =
    previewRange?.end === day.iso && previewRange.end !== previewRange.start;

  return (
    <div className="group relative z-0 flex min-h-10 md:min-h-14 justify-center py-1">
      {showsSelectedDayCount ? (
        <div className="absolute -top-5 left-1/2 z-50 inline-flex -translate-x-1/2 items-center gap-1.5">
          {showsClearSelection ? (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onAddRangeNote();
              }}
              className="flex h-5 w-5 items-center justify-center rounded-full text-white shadow-sm transition hover:opacity-90"
              style={{ backgroundColor: color }}
              aria-label="Add note for selected range"
            >
              <PencilIcon className="h-2.5 w-2.5" />
            </button>
          ) : null}
          <span
            className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] shadow-sm ring-1 ring-slate-200"
            style={{ color }}
          >
            <span>{selectedDayCount} days</span>
            {showsClearSelection ? (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onClearSelection();
                }}
                className="flex h-3.5 w-3.5 items-center justify-center rounded-full transition hover:opacity-70"
                style={{ color }}
                aria-label="Clear selected range"
              >
                <span className="text-[10px] leading-none">×</span>
              </button>
            ) : null}
          </span>
        </div>
      ) : null}

      {(isBetween || isStart || isEnd || showsPreviewTail) && (
        <div
          className={[
            "absolute inset-y-2 transition-all duration-200",
            isBetween && "left-0 right-0",
            isStart && (activeRange.end ? "left-1/2 right-0" : "hidden"),
            isEnd && "left-0 right-1/2",
            showsPreviewTail && "left-0 right-1/2 opacity-70",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ backgroundColor: `${color}20` }}
        />
      )}

      <button
        type="button"
        onClick={() => onSelect(day.iso)}
        aria-label={day.iso}
        className={[
          "relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-lg transition duration-200 md:h-11 md:w-11",
          day.isCurrentMonth && !day.isWeekend && "text-slate-700",
          !day.isCurrentMonth && "text-slate-300",
          day.isToday && !isStart && !isEnd && "ring-1 ring-slate-200",
          isBetween && "font-semibold text-slate-900",
          !isStart && !isEnd && !isBetween && "hover:bg-[var(--calendar-accent-soft-hover)] hover:text-[var(--calendar-accent)]",
          (isStart || isEnd) && "scale-105 bg-[var(--calendar-accent)] font-semibold text-white shadow-md",
          showsPreviewTail && "bg-[var(--calendar-accent-soft)] text-slate-900 hover:bg-[var(--calendar-accent-soft-hover)]",
        ]
          .filter(Boolean)
          .join(" ")}
        style={
          (isStart || isEnd)
            ? {
                backgroundColor: color,
                color: "white",
                transform: "scale(1.05)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }
            : day.isCurrentMonth && day.isWeekend
              ? { color }
              : showsPreviewTail
                ? {
                    backgroundColor: `${color}33`,
                  }
                : undefined
        }
        onMouseEnter={(event) => {
          onHover(day.iso);
          if (day.isCurrentMonth) {
            onHoverCardOpen({
              day,
              markers,
              anchorElement: event.currentTarget,
            });
          }
        }}
        onMouseLeave={() => {
          onHover(null);
          onHoverCardClose();
        }}
        onFocus={(event) => {
          if (day.isCurrentMonth) {
            onHoverCardOpen({
              day,
              markers,
              anchorElement: event.currentTarget,
            });
          }
        }}
        onBlur={onHoverCardClose}
        aria-pressed={isStart || isEnd || isBetween}
      >
        {day.dayNumber}
      </button>

      {day.isCurrentMonth ? (
        <>{markers.length > 0 ? <EventMarker events={markers} /> : null}</>
      ) : null}
    </div>
  );
}
