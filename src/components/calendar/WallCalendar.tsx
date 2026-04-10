"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CalendarPanel } from "@/components/calendar/CalendarPanel";
import { EventDialog } from "@/components/calendar/EventDialog";
import { HeroImagePanel } from "@/components/calendar/HeroImagePanel";
import { JumpToTodayButton } from "@/components/calendar/JumpToTodayButton";
import { KeyboardShortcutsButton } from "@/components/calendar/KeyboardShortcutsButton";
import { KeyboardShortcutsDialog } from "@/components/calendar/KeyboardShortcutsDialog";
import { NotesPanel } from "@/components/calendar/NotesPanel";
import { RangeNoteDialog } from "@/components/calendar/RangeNoteDialog";
import { TopRings } from "@/components/calendar/TopRings";
import {
  getCalendarDays,
  getMonthName,
  getPreviewRange,
  toMonthKey,
} from "@/lib/calendar/date";
import { animateCalendarFaceMonthChange } from "@/lib/calendar/animation";
import { fetchHolidays } from "@/lib/calendar/holidays";
import {
  getRangeNoteKey,
  readCalendarEvents,
  readMonthNote,
  readRangeNotes,
  writeCalendarEvents,
  writeMonthNote,
  writeRangeNotes,
} from "@/lib/calendar/storage";
import { getMonthColor, getMonthImage } from "@/lib/calendar/theme";
import { CalendarDateRange, CalendarEvent } from "@/types/calendar";

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
  const [rangeNotes, setRangeNotes] = useState<Record<string, string>>({});
  const [eventDraft, setEventDraft] = useState<{
    iso: string;
    label: string;
    symbol: string;
    tone: string;
  } | null>(null);
  const [rangeNoteDraft, setRangeNoteDraft] = useState<{
    start: string;
    end: string;
  } | null>(null);
  const [isKeyboardShortcutsOpen, setIsKeyboardShortcutsOpen] = useState(false);
  const calendarFaceRef = useRef<HTMLDivElement | null>(null);
  const isMonthAnimatingRef = useRef(false);
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
  const monthColor = getMonthColor(visibleMonth.getMonth());
  const previewRange = getPreviewRange(range, hoverDate);
  const visibleYear = visibleMonth.getFullYear();
  const publicHolidays = publicHolidaysByYear[visibleYear] ?? [];
  const todayDate = useMemo(() => new Date(`${todayIso}T00:00:00`), [todayIso]);
  const selectedRangeNoteKey =
    range.start && range.end
      ? getRangeNoteKey(range.start, range.end, monthKey)
      : null;
  const isTodayMonthVisible =
    visibleMonth.getFullYear() === todayDate.getFullYear() &&
    visibleMonth.getMonth() === todayDate.getMonth();

  useEffect(() => {
    setNote(readMonthNote(monthKey));
  }, [monthKey]);

  useEffect(() => {
    setUserEvents(readCalendarEvents());
    setRangeNotes(readRangeNotes());
  }, []);

  useEffect(() => {
    writeMonthNote(monthKey, note);
  }, [monthKey, note]);

  useEffect(() => {
    writeCalendarEvents(userEvents);
  }, [userEvents]);

  useEffect(() => {
    writeRangeNotes(rangeNotes);
  }, [rangeNotes]);

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

  const animateToMonth = useCallback(
    (nextMonthDate: Date) => {
      const normalizedNextMonth = new Date(
        nextMonthDate.getFullYear(),
        nextMonthDate.getMonth(),
        1,
      );

      if (
        normalizedNextMonth.getFullYear() === visibleMonth.getFullYear() &&
        normalizedNextMonth.getMonth() === visibleMonth.getMonth()
      ) {
        return;
      }

      if (isMonthAnimatingRef.current) {
        return;
      }

      const faceElement = calendarFaceRef.current;

      if (!faceElement || typeof faceElement.animate !== "function") {
        setVisibleMonth(normalizedNextMonth);
        return;
      }

      isMonthAnimatingRef.current = true;
      animateCalendarFaceMonthChange({
        faceElement,
        currentMonth: visibleMonth,
        nextMonth: normalizedNextMonth,
        onMonthSwap: () => {
          setVisibleMonth(normalizedNextMonth);
        },
        onComplete: () => {
          isMonthAnimatingRef.current = false;
        },
      });
    },
    [visibleMonth],
  );

  const changeMonth = useCallback(
    (offset: number) => {
      animateToMonth(
        new Date(
          visibleMonth.getFullYear(),
          visibleMonth.getMonth() + offset,
          1,
        ),
      );
    },
    [animateToMonth, visibleMonth],
  );

  const setVisibleMonthParts = useCallback(
    (nextYear: number, nextMonth: number) => {
      animateToMonth(new Date(nextYear, nextMonth, 1));
    },
    [animateToMonth],
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName;
      const isTypingTarget =
        tagName === "INPUT" ||
        tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (
        isTypingTarget ||
        eventDraft ||
        rangeNoteDraft ||
        isKeyboardShortcutsOpen
      ) {
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
    rangeNoteDraft,
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

  function handleAddRangeNote() {
    if (!range.start || !range.end) {
      return;
    }

    setRangeNoteDraft({
      start: range.start,
      end: range.end,
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

  function handleSaveRangeNote(value: string) {
    if (!rangeNoteDraft) {
      return;
    }

    const noteKey = getRangeNoteKey(
      rangeNoteDraft.start,
      rangeNoteDraft.end,
      monthKey,
    );

    setRangeNotes((currentRangeNotes) => {
      if (!value) {
        const nextRangeNotes = { ...currentRangeNotes };

        delete nextRangeNotes[noteKey];

        return nextRangeNotes;
      }

      return {
        ...currentRangeNotes,
        [noteKey]: value,
      };
    });

    setRangeNoteDraft(null);
    clearRange();
  }

  function handleRemoveRangeNote(rangeNoteKey: string) {
    setRangeNotes((currentRangeNotes) => {
      const nextRangeNotes = { ...currentRangeNotes };

      delete nextRangeNotes[rangeNoteKey];

      return nextRangeNotes;
    });
  }

  function getEventDateLabel() {
    if (!eventDraft) {
      return "";
    }

    const draftDate = new Date(`${eventDraft.iso}T00:00:00`);
    return `${getMonthName(draftDate.getMonth())} ${draftDate.getDate()}, ${draftDate.getFullYear()}`;
  }

  function formatRangeLabel(startIso: string, endIso: string) {
    const startDate = new Date(`${startIso}T00:00:00`);
    const endDate = new Date(`${endIso}T00:00:00`);
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    const startMonth = getMonthName(startDate.getMonth());
    const endMonth = getMonthName(endDate.getMonth());
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();

    if (startMonth === endMonth && startYear === endYear) {
      return `${startDay}-${endDay} ${endMonth}, ${endYear}`;
    }

    return `${startDay} ${startMonth}, ${startYear} - ${endDay} ${endMonth}, ${endYear}`;
  }

  function getRangeNoteLabel() {
    if (!rangeNoteDraft) {
      return "";
    }

    return formatRangeLabel(rangeNoteDraft.start, rangeNoteDraft.end);
  }

  function getSelectedRangeLabel() {
    if (!range.start || !range.end) {
      return null;
    }

    return formatRangeLabel(range.start, range.end);
  }

  function getRangeLabelFromKey(rangeNoteKey: string) {
    const parts = rangeNoteKey.split(":");
    const startIso = parts[1];
    const endIso = parts[2];

    if (!startIso || !endIso) {
      return rangeNoteKey;
    }

    return formatRangeLabel(startIso, endIso);
  }

  const selectedRangeLabel = getSelectedRangeLabel();
  const rangeNoteItems = Object.entries(rangeNotes)
    .filter(([key]) => key.startsWith(`${monthKey}:`))
    .map(([key, value]) => ({
      key,
      label:
        key === selectedRangeNoteKey && selectedRangeLabel
          ? selectedRangeLabel
          : getRangeLabelFromKey(key),
      note: value,
      isActive: key === selectedRangeNoteKey,
    }))
    .sort((firstItem, secondItem) => {
      if (firstItem.isActive && !secondItem.isActive) {
        return -1;
      }

      if (!firstItem.isActive && secondItem.isActive) {
        return 1;
      }

      return secondItem.key.localeCompare(firstItem.key);
    });

  return (
    <div
      className="calendar-card relative w-full max-w-6xl rounded-[28px] bg-[var(--calendar-paper)]"
      style={
        {
          "--calendar-accent": monthColor,
          "--calendar-accent-soft": `${monthColor}20`,
          "--calendar-accent-soft-hover": `${monthColor}35`,
        } as React.CSSProperties
      }
    >
      <TopRings />

      <div ref={calendarFaceRef} className="will-change-transform">
        <HeroImagePanel
          image={monthImage}
          month={monthName}
          year={year}
          color={monthColor}
        />

        <div className="relative z-30 flex flex-col gap-4 px-3 py-5 sm:px-8 md:flex-row md:gap-14 md:px-10 md:py-10 lg:px-12">
          <CalendarPanel
            month={visibleMonth.getMonth()}
            year={year}
            yearOptions={yearOptions}
            days={days}
            range={range}
            previewRange={previewRange}
            onSelect={handleSelectDate}
            onHover={handleHoverDate}
            hasActiveSelection={Boolean(range.start)}
            userEvents={userEvents}
            publicHolidays={publicHolidays}
            onClearSelection={clearRange}
            onAddRangeNote={handleAddRangeNote}
            onAddEvent={handleAddEvent}
            onDeleteEvent={handleDeleteEvent}
            onMonthChange={(month) => setVisibleMonthParts(year, month)}
            onYearChange={(nextYear) =>
              setVisibleMonthParts(nextYear, visibleMonth.getMonth())
            }
            onPreviousMonth={() => changeMonth(-1)}
            onNextMonth={() => changeMonth(1)}
            color={monthColor}
          />

          <NotesPanel
            value={note}
            onChange={setNote}
            rangeNotes={rangeNoteItems}
            onRemoveRangeNote={handleRemoveRangeNote}
            textareaRef={notesTextareaRef}
          />
        </div>
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

      <RangeNoteDialog
        key={
          rangeNoteDraft
            ? `${rangeNoteDraft.start}-${rangeNoteDraft.end}-${
                rangeNotes[
                  getRangeNoteKey(
                    rangeNoteDraft.start,
                    rangeNoteDraft.end,
                    monthKey,
                  )
                ] ?? ""
              }`
            : "range-note-dialog"
        }
        isOpen={Boolean(rangeNoteDraft)}
        rangeLabel={getRangeNoteLabel()}
        initialValue={
          rangeNoteDraft
            ? (rangeNotes[
                getRangeNoteKey(
                  rangeNoteDraft.start,
                  rangeNoteDraft.end,
                  monthKey,
                )
              ] ?? "")
            : ""
        }
        onClose={() => setRangeNoteDraft(null)}
        onSave={handleSaveRangeNote}
      />

      <KeyboardShortcutsDialog
        isOpen={isKeyboardShortcutsOpen}
        onClose={() => setIsKeyboardShortcutsOpen(false)}
      />
    </div>
  );
}
