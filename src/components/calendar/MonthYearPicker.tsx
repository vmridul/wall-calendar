import { MonthSelect } from "@/components/calendar/MonthSelect";
import { YearSelect } from "@/components/calendar/YearSelect";

type MonthYearPickerProps = {
  month: number;
  year: number;
  years: number[];
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
};

export function MonthYearPicker({
  month,
  year,
  years,
  onMonthChange,
  onYearChange,
}: MonthYearPickerProps) {
  return (
    <div className="flex items-center gap-2">
      <MonthSelect value={month} onChange={onMonthChange} />
      <YearSelect value={year} years={years} onChange={onYearChange} />
    </div>
  );
}
