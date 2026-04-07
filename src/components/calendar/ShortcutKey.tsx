type ShortcutKeyProps = {
  children: React.ReactNode;
};

export function ShortcutKey({ children }: ShortcutKeyProps) {
  return (
    <span className="inline-flex min-w-8 items-center justify-center rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
      {children}
    </span>
  );
}
