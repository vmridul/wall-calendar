type SelectedRangeNoteProps = {
  rangeNoteKey: string;
  rangeLabel: string;
  note: string;
  isActive?: boolean;
  onRemove: (rangeNoteKey: string) => void;
};

export function SelectedRangeNote({
  rangeNoteKey,
  rangeLabel,
  note,
  isActive = false,
  onRemove,
}: SelectedRangeNoteProps) {
  return (
    <div
      className={[
        "group relative mb-4 rounded-2xl border bg-white/80 px-4 py-3 shadow-sm",
        isActive
          ? "border-[var(--calendar-accent)] ring-2 ring-[var(--calendar-accent-soft)]"
          : "border-slate-200",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        type="button"
        onClick={() => onRemove(rangeNoteKey)}
        className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full text-slate-400 opacity-0 transition hover:bg-slate-100 hover:text-slate-700 group-hover:opacity-100"
        aria-label={`Remove note for ${rangeLabel}`}
      >
        <span className="text-sm leading-none">×</span>
      </button>
      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--calendar-accent)]">
        {rangeLabel}
      </p>
      <p className="mt-1 text-sm leading-6 whitespace-pre-wrap text-slate-600">
        {note}
      </p>
    </div>
  );
}
