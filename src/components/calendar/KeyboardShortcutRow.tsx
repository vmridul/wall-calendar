import { ShortcutKey } from "@/components/calendar/ShortcutKey";

type KeyboardShortcutRowProps = {
  keys: string[];
  label: string;
};

export function KeyboardShortcutRow({
  keys,
  label,
}: KeyboardShortcutRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-3 py-2.5">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="flex items-center gap-1.5">
        {keys.map((key) => (
          <ShortcutKey key={key}>{key}</ShortcutKey>
        ))}
      </div>
    </div>
  );
}
