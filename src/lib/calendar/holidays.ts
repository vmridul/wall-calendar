import { CalendarEvent } from "@/types/calendar";

type TallyfyHolidayResponse = {
  holidays?: Array<{
    date: string;
    name: string;
    type: string;
  }>;
};

export async function fetchHolidays(year: number) {
  const response = await fetch(
    `https://tallyfy.com/national-holidays/api/IN/${year}.json`,
  );

  if (!response.ok) {
    throw new Error(`Failed to load India holidays for ${year}`);
  }

  const data = (await response.json()) as TallyfyHolidayResponse;

  return (data.holidays ?? [])
    .filter((holiday) => holiday.type === "national")
    .map<CalendarEvent>((holiday) => ({
      iso: holiday.date,
      label: holiday.name,
      symbol: "dot",
      tone: "red",
      isCustom: false,
    }));
}
