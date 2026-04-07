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
  onHover: (iso: string | null) => void;
  onHoverCardOpen: (payload: {
    day: CalendarDay;
    markers: CalendarEvent[];
    anchorElement: HTMLElement;
  }) => void;
  onHoverCardClose: () => void;
};

function getTextColor(day: CalendarDay) {
  if (!day.isCurrentMonth) {
    return "text-slate-300";
  }

  if (day.isWeekend) {
    return "text-[var(--calendar-accent)]";
  }

  return "text-slate-700";
}

export function DayCell({
  day,
  range,
  previewRange,
  activeRangeEndIso,
  selectedDayCount,
  markers,
  onSelect,
  onClearSelection,
  onHover,
  onHoverCardOpen,
  onHoverCardClose,
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
    <div className="group relative flex min-h-14 justify-center py-1 hover:z-20">
      {showsSelectedDayCount ? (
        <span className="absolute -top-5 left-1/2 z-20 inline-flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--calendar-accent)] shadow-sm ring-1 ring-slate-200">
          <span>{selectedDayCount} days</span>
          {showsClearSelection ? (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onClearSelection();
              }}
              className="flex h-3.5 w-3.5 items-center justify-center rounded-full text-[var(--calendar-accent)] transition hover:bg-[var(--calendar-accent-soft)]"
              aria-label="Clear selected range"
            >
              <span className="text-[10px] leading-none">×</span>
            </button>
          ) : null}
        </span>
      ) : null}

      {(isBetween || isStart || isEnd || showsPreviewTail) && (
        <div
          className={[
            "absolute inset-y-2 bg-[var(--calendar-accent-soft)] transition-all duration-200",
            isBetween && "left-0 right-0",
            isStart && (activeRange.end ? "left-1/2 right-0" : "hidden"),
            isEnd && "left-0 right-1/2",
            showsPreviewTail && "left-0 right-1/2 opacity-70",
          ]
            .filter(Boolean)
            .join(" ")}
        />
      )}

      <button
        type="button"
        onClick={() => onSelect(day.iso)}
        aria-label={day.iso}
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
        className={[
          "relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-lg transition duration-200 md:h-11 md:w-11",
          getTextColor(day),
          day.isToday && !isStart && !isEnd && "ring-1 ring-slate-200",
          isBetween && "font-semibold text-slate-900",
          !isStart &&
            !isEnd &&
            !isBetween &&
            "hover:scale-[0.94] hover:bg-[var(--calendar-accent-soft)] hover:text-[var(--calendar-accent)]",
          (isStart || isEnd) &&
            "scale-105 bg-[var(--calendar-accent)] font-semibold text-white shadow-md",
          showsPreviewTail &&
            "bg-[var(--calendar-accent-soft)] text-slate-900 hover:bg-[var(--calendar-accent-soft)]",
        ]
          .filter(Boolean)
          .join(" ")}
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
