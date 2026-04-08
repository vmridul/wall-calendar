type MonthBannerProps = {
  month: string;
  year: number;
  color: string;
};

export function MonthBanner({ month, year, color }: MonthBannerProps) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-10">
      <svg
        viewBox="0 0 1000 200"
        preserveAspectRatio="none"
        className="h-36 w-full drop-shadow-lg sm:h-40 md:h-48"
      >
        <path style={{ fill: color }} d="M0,200 L0,52 L360,178 L665,42 L1000,42 L1000,200 Z" />
      </svg>

      <div className="absolute bottom-5 right-5 flex flex-col items-end text-right text-white sm:bottom-6 md:bottom-9 md:right-12">
        <span className="text-xl font-medium tracking-tight text-white/90 md:text-3xl">
          {year}
        </span>
        <span className="font-[var(--font-cormorant-garamond)] text-4xl leading-none tracking-[0.08em] md:text-6xl">
          {month.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
