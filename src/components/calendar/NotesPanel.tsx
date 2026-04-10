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
  return (
    <section className="relative z-0 flex w-full flex-col md:w-5/12">
      <NotesHeader />
      <div className="flex-1 overflow-y-auto md:max-h-[360px] lg:max-h-[460px]">
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
