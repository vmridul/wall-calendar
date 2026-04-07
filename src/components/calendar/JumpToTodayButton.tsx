import { JumpIcon } from "@/components/calendar/icons/JumpIcon";

type JumpToTodayButtonProps = {
  onClick: () => void;
};

export function JumpToTodayButton({ onClick }: JumpToTodayButtonProps) {
  return (
    <div className="group relative">
      <button
        type="button"
        onClick={onClick}
        aria-label="Jump to today"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-500 shadow-[0_18px_36px_-24px_rgba(36,48,66,0.45)] ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:text-slate-700"
      >
        <JumpIcon className="h-5 w-5" />
      </button>

      <div className="pointer-events-none absolute bottom-full left-1/2 z-40 mb-2 -translate-x-1/2 whitespace-nowrap rounded-xl border border-slate-100 bg-white/98 px-2.5 py-1.5 text-[12px] font-medium text-slate-600 opacity-0 shadow-[0_14px_28px_-22px_rgba(36,48,66,0.35)] transition duration-150 group-hover:opacity-100">
        Jump to today
      </div>
    </div>
  );
}
