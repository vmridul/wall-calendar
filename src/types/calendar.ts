export type CalendarDateRange = {
  start: string | null;
  end: string | null;
};

export type CalendarDay = {
  iso: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  isWeekend: boolean;
  isToday: boolean;
};

export type CalendarEvent = {
  id?: string;
  iso: string;
  label: string;
  symbol: string;
  tone: string;
  isCustom: boolean;
};

export type EventIconOption = {
  symbol: string;
  tone: string;
  label: string;
};
