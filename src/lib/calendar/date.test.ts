import { describe, expect, it } from "vitest";
import { getCalendarDays, getPreviewRange, toMonthKey } from "@/lib/calendar/date";

describe("calendar date helpers", () => {
  it("builds a 42-cell grid that starts on monday", () => {
    const days = getCalendarDays(new Date(2022, 0, 1), "2022-01-15");

    expect(days).toHaveLength(42);
    expect(days[0]?.iso).toBe("2021-12-27");
    expect(days[41]?.iso).toBe("2022-02-06");
  });

  it("returns a preview range only when hover is after the start", () => {
    expect(
      getPreviewRange({ start: "2022-01-10", end: null }, "2022-01-15"),
    ).toEqual({
      start: "2022-01-10",
      end: "2022-01-15",
    });

    expect(
      getPreviewRange({ start: "2022-01-10", end: null }, "2022-01-08"),
    ).toBeNull();
  });

  it("builds a stable month storage key", () => {
    expect(toMonthKey(new Date(2022, 0, 1))).toBe("2022-01");
  });
});
