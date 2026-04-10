import { TopRing } from "@/components/calendar/TopRing";

export function TopRings() {
  const rings = Array.from({ length: 30 }, (_, index) => index);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex h-4 items-start justify-evenly border-b border-white/50 bg-white/35 px-4 pt-2 sm:pt-1 backdrop-blur-sm sm:px-10 md:px-14">
      {rings.map((ring) => (
        <TopRing key={ring} index={ring} />
      ))}
    </div>
  );
}
