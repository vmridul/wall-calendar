import { CalendarEvent } from "@/types/calendar";

const notesPrefix = "wall-calendar-note";
const eventsKey = "wall-calendar-events";

export function getMonthNoteStorageKey(monthKey: string) {
  return `${notesPrefix}:${monthKey}`;
}

export function readMonthNote(monthKey: string) {
  if (typeof window === "undefined") {
    return "";
  }

  return window.localStorage.getItem(getMonthNoteStorageKey(monthKey)) ?? "";
}

export function writeMonthNote(monthKey: string, value: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(getMonthNoteStorageKey(monthKey), value);
}

export function readCalendarEvents() {
  if (typeof window === "undefined") {
    return [];
  }

  const value = window.localStorage.getItem(eventsKey);

  if (!value) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(value);

    return Array.isArray(parsedValue)
      ? parsedValue.map<CalendarEvent>((event) => ({
          ...event,
          isCustom: true,
        }))
      : [];
  } catch {
    return [];
  }
}

export function writeCalendarEvents(value: CalendarEvent[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(eventsKey, JSON.stringify(value));
}
