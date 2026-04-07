import { toIsoDate } from "@/lib/calendar/date";
import { WallCalendar } from "@/components/calendar/WallCalendar";

export const dynamic = "force-dynamic";

export default function Home() {
  const now = new Date();
  const initialMonthDate = new Date(now.getFullYear(), now.getMonth(), 1);
  const initialMonthIso = toIsoDate(initialMonthDate);
  const todayIso = toIsoDate(now);

  return (
    <main className="calendar-page flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 md:px-8">
      <WallCalendar initialMonthIso={initialMonthIso} todayIso={todayIso} />
    </main>
  );
}
