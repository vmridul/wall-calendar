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
  animationClassName: string;
  onSelect: (iso: string) => void;
  onHover: (iso: string | null) => void;
  hasActiveSelection: boolean;
  userEvents: CalendarEvent[];
  publicHolidays: CalendarEvent[];
  onClearSelection: () => void;
  onAddEvent: (iso: string) => void;
  onDeleteEvent: (eventId: string) => void;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
};

export function CalendarPanel({
  month,
  year,
  yearOptions,
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
  onMonthChange,
  onYearChange,
  onPreviousMonth,
  onNextMonth,
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
      <WeekdayHeader />
      <CalendarGrid
        days={days}
        range={range}
        previewRange={previewRange}
        animationClassName={animationClassName}
        onSelect={onSelect}
        onHover={onHover}
        hasActiveSelection={hasActiveSelection}
        userEvents={userEvents}
        publicHolidays={publicHolidays}
        onClearSelection={onClearSelection}
        onAddEvent={onAddEvent}
        onDeleteEvent={onDeleteEvent}
      />
    </section>
  );
}
