import { useState } from "react";
import { NotesHeader } from "@/components/calendar/NotesHeader";
import { NotesTextarea } from "@/components/calendar/NotesTextarea";
import { SelectedRangeNote } from "@/components/calendar/SelectedRangeNote";

type RangeNoteItem = {
  key: string;
  label: string;
  note: string;
  isActive: boolean;
};

type NotesPanelProps = {
  value: string;
  onChange: (value: string) => void;
  rangeNotes?: RangeNoteItem[];
  onRemoveRangeNote: (rangeNoteKey: string) => void;
  textareaRef?: React.RefObject<HTMLTextAreaElement | null>;
};

export function NotesPanel({
  value,
  onChange,
  rangeNotes = [],
  onRemoveRangeNote,
  textareaRef,
}: NotesPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative z-0 flex w-full flex-col md:w-5/12">
      <div className="flex items-center justify-between md:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between text-slate-600 transition hover:text-slate-800"
          aria-label={isOpen ? "Close notes" : "Open notes"}
        >
          <h2 className="text-xl font-medium tracking-tight">Notes</h2>
          <svg
            className={`h-5 w-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      </div>
      <div className="hidden md:block">
        <NotesHeader />
      </div>
      <div
        className={`flex-1 mt-4 overflow-y-auto md:mt-0 md:max-h-[360px] lg:max-h-[400px] ${
          isOpen ? "" : "hidden md:block"
        }`}
      >
        {rangeNotes.map((rangeNote) => (
          <SelectedRangeNote
            key={rangeNote.key}
            rangeNoteKey={rangeNote.key}
            rangeLabel={rangeNote.label}
            note={rangeNote.note}
            isActive={rangeNote.isActive}
            onRemove={onRemoveRangeNote}
          />
        ))}
        <NotesTextarea
          value={value}
          onChange={onChange}
          textareaRef={textareaRef}
        />
      </div>
    </section>
  );
}
