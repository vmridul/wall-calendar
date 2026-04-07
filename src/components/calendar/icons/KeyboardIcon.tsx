type KeyboardIconProps = {
  className?: string;
};

export function KeyboardIcon({ className = "" }: KeyboardIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="6"
        width="17"
        height="12"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M7.5 10H7.51M10.5 10H10.51M13.5 10H13.51M16.5 10H16.51M7.5 13H7.51M10.5 13H13.5M16.5 13H16.51"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
