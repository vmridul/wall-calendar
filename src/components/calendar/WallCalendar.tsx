"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CalendarPanel } from "@/components/calendar/CalendarPanel";
import { EventDialog } from "@/components/calendar/EventDialog";
import { HeroImagePanel } from "@/components/calendar/HeroImagePanel";
import { JumpToTodayButton } from "@/components/calendar/JumpToTodayButton";
import { KeyboardShortcutsButton } from "@/components/calendar/KeyboardShortcutsButton";
import { KeyboardShortcutsDialog } from "@/components/calendar/KeyboardShortcutsDialog";
import { NotesPanel } from "@/components/calendar/NotesPanel";
import { TopRings } from "@/components/calendar/TopRings";
import {
  getCalendarDays,
  getMonthName,
  getPreviewRange,
  toMonthKey,
} from "@/lib/calendar/date";
import { fetchHolidays } from "@/lib/calendar/holidays";
import {
  readCalendarEvents,
  readMonthNote,
  writeCalendarEvents,
  writeMonthNote,
} from "@/lib/calendar/storage";
import { getMonthImage } from "@/lib/calendar/theme";
import { CalendarDateRange, CalendarEvent } from "@/types/calendar";

const animationDuration = 240;

type WallCalendarProps = {
  initialMonthIso: string;
  todayIso: string;
};

export function WallCalendar({ initialMonthIso, todayIso }: WallCalendarProps) {
  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date(`${initialMonthIso}T00:00:00`),
  );
  const [range, setRange] = useState<CalendarDateRange>({
    start: null,
    end: null,
  });
  const [hoverDate, setHoverDate] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [userEvents, setUserEvents] = useState<CalendarEvent[]>([]);
  const [publicHolidaysByYear, setPublicHolidaysByYear] = useState<
    Record<number, CalendarEvent[]>
  >({});
  const [animationClassName, setAnimationClassName] = useState(
    "calendar-grid-flip-in",
  );
  const [eventDraft, setEventDraft] = useState<{
    iso: string;
    label: string;
    symbol: string;
    tone: string;
  } | null>(null);
  const [isKeyboardShortcutsOpen, setIsKeyboardShortcutsOpen] = useState(false);
  const notesTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const monthKey = useMemo(() => toMonthKey(visibleMonth), [visibleMonth]);
  const days = useMemo(
    () => getCalendarDays(visibleMonth, todayIso),
    [todayIso, visibleMonth],
  );
  const monthName = getMonthName(visibleMonth.getMonth());
  const year = visibleMonth.getFullYear();
  const yearOptions = useMemo(() => {
    const years: number[] = [];

    for (let offset = -10; offset <= 10; offset += 1) {
      years.push(year + offset);
    }

    return years;
  }, [year]);
  const monthImage = getMonthImage(visibleMonth.getMonth());
  const previewRange = getPreviewRange(range, hoverDate);
  const visibleYear = visibleMonth.getFullYear();
  const publicHolidays = publicHolidaysByYear[visibleYear] ?? [];
  const todayDate = useMemo(() => new Date(`${todayIso}T00:00:00`), [todayIso]);
  const isTodayMonthVisible =
    visibleMonth.getFullYear() === todayDate.getFullYear() &&
    visibleMonth.getMonth() === todayDate.getMonth();

  useEffect(() => {
    setNote(readMonthNote(monthKey));
  }, [monthKey]);

  useEffect(() => {
    setUserEvents(readCalendarEvents());
  }, []);

  useEffect(() => {
    writeMonthNote(monthKey, note);
  }, [monthKey, note]);

  useEffect(() => {
    writeCalendarEvents(userEvents);
  }, [userEvents]);

  useEffect(() => {
    if (publicHolidaysByYear[visibleYear]) {
      return;
    }

    let isCancelled = false;

    fetchHolidays(visibleYear)
      .then((holidays) => {
        if (isCancelled) {
          return;
        }

        setPublicHolidaysByYear((current) => ({
          ...current,
          [visibleYear]: holidays,
        }));
      })
      .catch(() => {
        if (isCancelled) {
          return;
        }

        setPublicHolidaysByYear((current) => ({
          ...current,
          [visibleYear]: [],
        }));
      });

    return () => {
      isCancelled = true;
    };
  }, [publicHolidaysByYear, visibleYear]);

  const changeMonth = useCallback((offset: number) => {
    setAnimationClassName("calendar-grid-flip-out");

    window.setTimeout(() => {
      setVisibleMonth((currentMonth) => {
        return new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth() + offset,
          1,
        );
      });
      setAnimationClassName("calendar-grid-flip-in");
    }, animationDuration);
  }, []);

  const setVisibleMonthParts = useCallback(
    (nextYear: number, nextMonth: number) => {
      setAnimationClassName("calendar-grid-flip-out");

      window.setTimeout(() => {
        setVisibleMonth(new Date(nextYear, nextMonth, 1));
        setAnimationClassName("calendar-grid-flip-in");
      }, animationDuration);
    },
    [],
  );

  //keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName;
      const isTypingTarget =
        tagName === "INPUT" ||
        tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (isTypingTarget || eventDraft || isKeyboardShortcutsOpen) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        changeMonth(-1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        changeMonth(1);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setVisibleMonthParts(
          visibleMonth.getFullYear() + 1,
          visibleMonth.getMonth(),
        );
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setVisibleMonthParts(
          visibleMonth.getFullYear() - 1,
          visibleMonth.getMonth(),
        );
      }

      if (event.key.toLowerCase() === "t") {
        event.preventDefault();
        notesTextareaRef.current?.focus();
      }

      if (event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsKeyboardShortcutsOpen(true);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    changeMonth,
    eventDraft,
    isKeyboardShortcutsOpen,
    setVisibleMonthParts,
    visibleMonth,
  ]);

  function handleSelectDate(iso: string) {
    setHoverDate(null);

    setRange((currentRange) => {
      if (!currentRange.start || currentRange.end) {
        return { start: iso, end: null };
      }

      if (iso === currentRange.start) {
        return { start: null, end: null };
      }

      if (iso < currentRange.start) {
        return { start: iso, end: null };
      }

      return { start: currentRange.start, end: iso };
    });
  }

  function handleHoverDate(iso: string | null) {
    if (!range.start || range.end) {
      setHoverDate(null);
      return;
    }

    if (iso && iso > range.start) {
      setHoverDate(iso);
      return;
    }

    setHoverDate(null);
  }

  function clearRange() {
    setRange({ start: null, end: null });
    setHoverDate(null);
  }

  function handleAddEvent(iso: string) {
    setEventDraft({
      iso,
      label: "",
      symbol: "cake",
      tone: "rose",
    });
  }

  function handleSaveEvent(value: {
    label: string;
    symbol: string;
    tone: string;
  }) {
    if (!eventDraft) {
      return;
    }

    setUserEvents((currentEvents) => {
      return [
        ...currentEvents,
        {
          id: `${eventDraft.iso}-${value.label}-${value.symbol}-${Date.now()}`,
          iso: eventDraft.iso,
          label: value.label,
          symbol: value.symbol,
          tone: value.tone,
          isCustom: true,
        },
      ];
    });

    setEventDraft(null);
  }

  function handleDeleteEvent(eventId: string) {
    setUserEvents((currentEvents) =>
      currentEvents.filter((event) => event.id !== eventId),
    );
  }

  function getEventDateLabel() {
    if (!eventDraft) {
      return "";
    }

    const draftDate = new Date(`${eventDraft.iso}T00:00:00`);
    return `${getMonthName(draftDate.getMonth())} ${draftDate.getDate()}, ${draftDate.getFullYear()}`;
  }

  return (
    <div className="calendar-card relative w-full max-w-6xl overflow-hidden rounded-[28px] bg-[var(--calendar-paper)]">
      <TopRings />

      <HeroImagePanel image={monthImage} month={monthName} year={year} />

      <div className="relative z-30 flex flex-col gap-10 px-5 py-6 sm:px-8 md:flex-row md:gap-14 md:px-10 md:py-10 lg:px-12">
        <CalendarPanel
          month={visibleMonth.getMonth()}
          year={year}
          yearOptions={yearOptions}
          days={days}
          range={range}
          previewRange={previewRange}
          animationClassName={animationClassName}
          onSelect={handleSelectDate}
          onHover={handleHoverDate}
          hasActiveSelection={Boolean(range.start)}
          userEvents={userEvents}
          publicHolidays={publicHolidays}
          onClearSelection={clearRange}
          onAddEvent={handleAddEvent}
          onDeleteEvent={handleDeleteEvent}
          onMonthChange={(month) => setVisibleMonthParts(year, month)}
          onYearChange={(nextYear) =>
            setVisibleMonthParts(nextYear, visibleMonth.getMonth())
          }
          onPreviousMonth={() => changeMonth(-1)}
          onNextMonth={() => changeMonth(1)}
        />

        <NotesPanel
          value={note}
          onChange={setNote}
          textareaRef={notesTextareaRef}
        />
      </div>

      <div className="fixed right-4 bottom-4 z-40 flex items-center gap-3 sm:right-6 sm:bottom-6">
        {!isTodayMonthVisible ? (
          <JumpToTodayButton
            onClick={() =>
              setVisibleMonthParts(
                todayDate.getFullYear(),
                todayDate.getMonth(),
              )
            }
          />
        ) : null}
        <KeyboardShortcutsButton
          onClick={() => setIsKeyboardShortcutsOpen(true)}
        />
      </div>

      <EventDialog
        key={
          eventDraft
            ? `${eventDraft.iso}-${eventDraft.symbol}-${eventDraft.label}`
            : "event-dialog"
        }
        isOpen={Boolean(eventDraft)}
        initialLabel={eventDraft?.label ?? ""}
        initialSymbol={eventDraft?.symbol ?? "cake"}
        initialTone={eventDraft?.tone ?? "sky"}
        dateLabel={getEventDateLabel()}
        onClose={() => setEventDraft(null)}
        onSave={handleSaveEvent}
      />

      <KeyboardShortcutsDialog
        isOpen={isKeyboardShortcutsOpen}
        onClose={() => setIsKeyboardShortcutsOpen(false)}
      />
    </div>
  );
}
