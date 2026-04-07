import { EventIcon } from "@/components/calendar/EventIcon";
import { EventIconOption } from "@/types/calendar";

type EventIconOptionButtonProps = {
  option: EventIconOption;
  isSelected: boolean;
  onSelect: (option: EventIconOption) => void;
};

export function EventIconOptionButton({
  option,
  isSelected,
  onSelect,
}: EventIconOptionButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option)}
      className={`flex min-h-14 flex-col items-center justify-center rounded-xl border px-2 py-2 transition sm:min-h-16 sm:rounded-2xl sm:px-3 ${
        isSelected
          ? "border-[var(--calendar-accent)] bg-[var(--calendar-accent-soft)]"
          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      <EventIcon symbol={option.symbol} tone={option.tone} className="h-5 w-5" />
      <span className="mt-1 text-[11px] font-medium text-slate-500 sm:text-xs">
        {option.label}
      </span>
    </button>
  );
}
