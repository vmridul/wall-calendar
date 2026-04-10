import { getWeekdayNames } from "@/lib/calendar/date";

type WeekdayHeaderProps = {
  color: string;
};

export function WeekdayHeader({ color }: WeekdayHeaderProps) {
  const weekdays = getWeekdayNames();

  return (
    <div className="mb-4 grid grid-cols-7 text-center text-xs font-medium tracking-[0.08em] text-slate-400">
      {weekdays.map((day, index) => {
        const isWeekend = index >= 5;

        return (
          <span key={day} style={isWeekend ? { color } : undefined}>
            {day}
          </span>
        );
      })}
    </div>
  );
}
