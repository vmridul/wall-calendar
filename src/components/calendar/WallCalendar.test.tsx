import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WallCalendar } from "@/components/calendar/WallCalendar";
import { toIsoDate, toMonthKey } from "@/lib/calendar/date";

describe("WallCalendar", () => {
  it("renders the notes area and weekday header", () => {
    render(
      <WallCalendar initialMonthIso="2026-04-01" todayIso="2026-04-07" />,
    );

    expect(screen.getByRole("heading", { name: "Notes" })).toBeInTheDocument();
    expect(screen.getByText("MON")).toBeInTheDocument();
    expect(screen.getByText("SUN")).toBeInTheDocument();
  });

  it("stores notes in localStorage per month", async () => {
    render(
      <WallCalendar initialMonthIso="2026-04-01" todayIso="2026-04-07" />,
    );

    const noteField = screen.getByLabelText("Monthly notes");
    const storageKey = `wall-calendar-note:${toMonthKey(new Date("2026-04-01T00:00:00"))}`;

    fireEvent.change(noteField, { target: { value: "Plan climbing weekend" } });

    await waitFor(() => {
      expect(window.localStorage.getItem(storageKey)).toBe("Plan climbing weekend");
    });
  });

  it("lets the user select and clear a date range", () => {
    render(
      <WallCalendar initialMonthIso="2026-04-01" todayIso="2026-04-07" />,
    );

    const firstSelectedDate = toIsoDate(new Date("2026-04-07T00:00:00"));
    const secondSelectedDate = toIsoDate(new Date("2026-04-12T00:00:00"));

    fireEvent.click(screen.getByRole("button", { name: firstSelectedDate }));

    fireEvent.click(screen.getByRole("button", { name: secondSelectedDate }));
    expect(screen.getByText("6 days")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Clear selected range" }));

    expect(screen.queryByText("6 days")).not.toBeInTheDocument();
  });

  it("changes the viewed month when navigating", async () => {
    render(
      <WallCalendar initialMonthIso="2026-04-01" todayIso="2026-04-07" />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Go to next month" }));

    await waitFor(
      () => {
        expect(screen.getByText("MAY")).toBeInTheDocument();
      },
      { timeout: 400 },
    );
  });
});
