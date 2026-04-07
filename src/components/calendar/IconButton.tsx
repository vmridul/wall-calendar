import { ReactNode } from "react";

type IconButtonProps = {
  label: string;
  onClick: () => void;
  children: ReactNode;
};

export function IconButton({ label, onClick, children }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
    >
      {children}
    </button>
  );
}
