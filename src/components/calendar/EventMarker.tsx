import { EventIcon } from "@/components/calendar/EventIcon";
import { CalendarEvent } from "@/types/calendar";

type EventMarkerProps = {
  events: CalendarEvent[];
};

export function EventMarker({ events }: EventMarkerProps) {
  const visibleEvents = events.filter(
    (event, index, collection) =>
      collection.findIndex(
        (candidate) =>
          candidate.symbol === event.symbol && candidate.tone === event.tone,
      ) === index,
  );

  return (
    <span
      title={events.map((event) => event.label).join(", ")}
      aria-label={events.map((event) => event.label).join(", ")}
      className="absolute bottom-0.5 left-1/2 flex -translate-x-1/2 items-center gap-px"
    >
      {visibleEvents.map((event) => (
        <EventIcon
          key={`${event.symbol}-${event.tone}-${event.label}`}
          symbol={event.symbol}
          tone={event.tone}
          className="h-3 w-3"
        />
      ))}
    </span>
  );
}
