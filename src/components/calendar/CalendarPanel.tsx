import { CalendarGrid } from "@/components/calendar/CalendarGrid";
import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import { WeekdayHeader } from "@/components/calendar/WeekdayHeader";
import {
  CalendarDateRange,
  CalendarDay,
  CalendarEvent,
} from "@/types/calendar";

type CalendarPanelProps = {
  month: number;
  year: number;
  yearOptions: number[];
  days: CalendarDay[];
  range: CalendarDateRange;
  previewRange: CalendarDateRange | null;
  onSelect: (iso: string) => void;
  onHover: (iso: string | null) => void;
  hasActiveSelection: boolean;
  userEvents: CalendarEvent[];
  publicHolidays: CalendarEvent[];
  onClearSelection: () => void;
  onAddRangeNote: () => void;
  onAddEvent: (iso: string) => void;
  onDeleteEvent: (eventId: string) => void;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  color: string;
};

export function CalendarPanel({
  month,
  year,
  yearOptions,
  days,
  range,
  previewRange,
  onSelect,
  onHover,
  hasActiveSelection,
  userEvents,
  publicHolidays,
  onClearSelection,
  onAddRangeNote,
  onAddEvent,
  onDeleteEvent,
  onMonthChange,
  onYearChange,
  onPreviousMonth,
  onNextMonth,
  color,
}: CalendarPanelProps) {
  return (
    <section className="w-full md:w-7/12">
      <CalendarHeader
        month={month}
        year={year}
        years={yearOptions}
        onMonthChange={onMonthChange}
        onYearChange={onYearChange}
        onPreviousMonth={onPreviousMonth}
        onNextMonth={onNextMonth}
      />
      <WeekdayHeader color={color} />
      <CalendarGrid
        days={days}
        range={range}
        previewRange={previewRange}
        onSelect={onSelect}
        onHover={onHover}
        hasActiveSelection={hasActiveSelection}
        userEvents={userEvents}
        publicHolidays={publicHolidays}
        onClearSelection={onClearSelection}
        onAddRangeNote={onAddRangeNote}
        onAddEvent={onAddEvent}
        onDeleteEvent={onDeleteEvent}
        color={color}
      />
    </section>
  );
}
