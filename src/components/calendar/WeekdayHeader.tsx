import { getWeekdayNames } from "@/lib/calendar/date";

export function WeekdayHeader() {
  const weekdays = getWeekdayNames();

  return (
    <div className="mb-4 grid grid-cols-7 text-center text-sm font-medium tracking-[0.08em] text-slate-400">
      {weekdays.map((day, index) => {
        const isWeekend = index >= 5;

        return (
          <span
            key={day}
            className={isWeekend ? "text-[var(--calendar-accent)]" : undefined}
          >
            {day}
          </span>
        );
      })}
    </div>
  );
}
