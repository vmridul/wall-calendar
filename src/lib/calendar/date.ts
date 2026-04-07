import { CalendarDateRange, CalendarDay } from "@/types/calendar";

const dayNames = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getMonthName(monthIndex: number) {
  return monthNames[monthIndex];
}

export function getMonthNames() {
  return monthNames;
}

export function getWeekdayNames() {
  return dayNames;
}

export function toMonthKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

export function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getCalendarDays(monthDate: Date, todayIso: string) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const firstWeekdayIndex = (firstDayOfMonth.getDay() + 6) % 7;
  const calendarStart = new Date(year, month, 1 - firstWeekdayIndex);
  const days: CalendarDay[] = [];

  for (let index = 0; index < 42; index += 1) {
    const currentDay = new Date(calendarStart);
    currentDay.setDate(calendarStart.getDate() + index);
    const iso = toIsoDate(currentDay);

    days.push({
      iso,
      dayNumber: currentDay.getDate(),
      isCurrentMonth: currentDay.getMonth() === month,
      isWeekend: index % 7 === 5 || index % 7 === 6,
      isToday: iso === todayIso,
    });
  }

  return days;
}

export function getPreviewRange(
  range: CalendarDateRange,
  hoverDate: string | null,
) {
  if (!range.start || range.end || !hoverDate || hoverDate <= range.start) {
    return null;
  }

  return {
    start: range.start,
    end: hoverDate,
  };
}

export function getRangeDayCount(startIso: string, endIso: string) {
  const start = new Date(`${startIso}T00:00:00`);
  const end = new Date(`${endIso}T00:00:00`);
  const differenceInMilliseconds = end.getTime() - start.getTime();
  const differenceInDays = Math.round(differenceInMilliseconds / 86400000);

  return differenceInDays + 1;
}
