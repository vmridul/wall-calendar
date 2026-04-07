import { useEffect, useRef, useState } from "react";
import { DayCell } from "@/components/calendar/DayCell";
import { EventPopover } from "@/components/calendar/EventPopover";
import { getRangeDayCount } from "@/lib/calendar/date";
import {
  CalendarEvent,
  CalendarDateRange,
  CalendarDay,
} from "@/types/calendar";

type CalendarGridProps = {
  days: CalendarDay[];
  range: CalendarDateRange;
  previewRange: CalendarDateRange | null;
  animationClassName: string;
  onSelect: (iso: string) => void;
  onHover: (iso: string | null) => void;
  hasActiveSelection: boolean;
  userEvents: CalendarEvent[];
  publicHolidays: CalendarEvent[];
  onClearSelection: () => void;
  onAddEvent: (iso: string) => void;
  onDeleteEvent: (eventId: string) => void;
};

export function CalendarGrid({
  days,
  range,
  previewRange,
  animationClassName,
  onSelect,
  onHover,
  hasActiveSelection,
  userEvents,
  publicHolidays,
  onClearSelection,
  onAddEvent,
  onDeleteEvent,
}: CalendarGridProps) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const activeRange = previewRange ?? range;
  const activeRangeEndIso = activeRange.end;
  const selectedDayCount =
    activeRange.start && activeRange.end
      ? getRangeDayCount(activeRange.start, activeRange.end)
      : null;
  const [hoverCard, setHoverCard] = useState<{
    day: CalendarDay;
    events: CalendarEvent[];
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  function clearCloseTimeout() {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }

  function openHoverCard(payload: {
    day: CalendarDay;
    markers: CalendarEvent[];
    anchorElement: HTMLElement;
  }) {
    if (hasActiveSelection) {
      setHoverCard(null);
      return;
    }

    const gridElement = gridRef.current;

    if (!gridElement) {
      return;
    }

    clearCloseTimeout();

    const gridRect = gridElement.getBoundingClientRect();
    const anchorRect = payload.anchorElement.getBoundingClientRect();

    setHoverCard({
      day: payload.day,
      events: payload.markers,
      x: anchorRect.left - gridRect.left + anchorRect.width / 2,
      y: anchorRect.top - gridRect.top - 4,
    });
  }

  function closeHoverCardSoon() {
    clearCloseTimeout();

    closeTimeoutRef.current = window.setTimeout(() => {
      setHoverCard(null);
    }, 140);
  }

  function updateHoverCardAfterDelete(eventId: string) {
    setHoverCard((currentHoverCard) => {
      if (!currentHoverCard) {
        return currentHoverCard;
      }

      const remainingEvents = currentHoverCard.events.filter(
        (event) => event.id !== eventId,
      );

      return {
        ...currentHoverCard,
        events: remainingEvents,
      };
    });
  }

  return (
    <div
      ref={gridRef}
      className={`relative grid grid-cols-7 gap-y-2 [perspective:1200px] ${animationClassName}`}
    >
      {days.map((day) => {
        const dayUserEvents = userEvents.filter((event) => event.iso === day.iso);
        const dayPublicHolidays = publicHolidays.filter((event) => event.iso === day.iso);
        const markers = day.isCurrentMonth
          ? [...dayPublicHolidays, ...dayUserEvents]
          : [];

        return (
          <DayCell
            key={day.iso}
            day={day}
            range={range}
            previewRange={previewRange}
            activeRangeEndIso={activeRangeEndIso}
            selectedDayCount={selectedDayCount}
            markers={markers}
            onSelect={onSelect}
            onClearSelection={onClearSelection}
            onHover={onHover}
            onHoverCardOpen={openHoverCard}
            onHoverCardClose={closeHoverCardSoon}
          />
        );
      })}

      {hoverCard && !hasActiveSelection ? (
        <EventPopover
          isOpen
          events={hoverCard.events}
          style={{
            left: hoverCard.x,
            top: hoverCard.y,
          }}
          onMouseEnter={clearCloseTimeout}
          onMouseLeave={closeHoverCardSoon}
          onAddEvent={() => {
            onAddEvent(hoverCard.day.iso);
            closeHoverCardSoon();
          }}
          onDeleteEvent={(eventId) => {
            onDeleteEvent(eventId);
            updateHoverCardAfterDelete(eventId);
            clearCloseTimeout();
          }}
        />
      ) : null}
    </div>
  );
}
