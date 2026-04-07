type EventIconProps = {
  symbol: string;
  tone: string;
  className?: string;
};

const toneMap: Record<string, string> = {
  amber: "text-amber-400",
  red: "text-red-500",
  rose: "text-rose-400",
  sky: "text-sky-500",
  orange: "text-orange-500",
  emerald: "text-emerald-500",
};

export function EventIcon({
  symbol,
  tone,
  className = "h-4 w-4",
}: EventIconProps) {
  const toneClassName = toneMap[tone] ?? "text-sky-500";

  if (symbol === "cake") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={`${className} ${toneClassName}`}>
        <path d="M7 10H17V19H7V10Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5 10H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8 14H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 5V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 5C12.9 5.6 13.1 6.7 12 7.6C10.9 6.7 11.1 5.6 12 5Z" fill="currentColor" />
      </svg>
    );
  }

  if (symbol === "plane") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={`${className} ${toneClassName}`}>
        <path
          d="M21 4L11 13M21 4L14.5 20L11 13M21 4L5 9L11 13M11 13L8 20"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (symbol === "calendar") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={`${className} ${toneClassName}`}>
        <rect x="4" y="5" width="16" height="15" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 3V7M16 3V7M4 10H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (symbol === "bookmark") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={`${className} ${toneClassName}`}>
        <path
          d="M7 5.5C7 4.7 7.7 4 8.5 4H15.5C16.3 4 17 4.7 17 5.5V20L12 16.5L7 20V5.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${className} ${toneClassName}`}>
      <circle cx="12" cy="12" r="4" fill="currentColor" />
    </svg>
  );
}
