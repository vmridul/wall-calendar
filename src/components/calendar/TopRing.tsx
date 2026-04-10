type TopRingProps = {
  index: number;
};

export function TopRing({ index }: TopRingProps) {
  return (
    <span
      aria-hidden="true"
      data-testid={`top-ring-${index}`}
      className="h-2.5 w-1.5 rounded-full border border-white/80 bg-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] sm:h-4"
    />
  );
}
