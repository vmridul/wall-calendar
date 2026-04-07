import { IconButton } from "@/components/calendar/IconButton";
import { MonthYearPicker } from "@/components/calendar/MonthYearPicker";
import { ChevronLeftIcon } from "@/components/calendar/icons/ChevronLeftIcon";
import { ChevronRightIcon } from "@/components/calendar/icons/ChevronRightIcon";

type CalendarHeaderProps = {
  month: number;
  year: number;
  years: number[];
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
};

export function CalendarHeader({
  month,
  year,
  years,
  onMonthChange,
  onYearChange,
  onPreviousMonth,
  onNextMonth,
}: CalendarHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <IconButton label="Go to previous month" onClick={onPreviousMonth}>
        <ChevronLeftIcon className="h-5 w-5" />
      </IconButton>

      <div className="flex items-center justify-center">
        <MonthYearPicker
          month={month}
          year={year}
          years={years}
          onMonthChange={onMonthChange}
          onYearChange={onYearChange}
        />
      </div>

      <IconButton label="Go to next month" onClick={onNextMonth}>
        <ChevronRightIcon className="h-5 w-5" />
      </IconButton>
    </div>
  );
}
