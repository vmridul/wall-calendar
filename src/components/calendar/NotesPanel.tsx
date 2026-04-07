import { NotesHeader } from "@/components/calendar/NotesHeader";
import { NotesTextarea } from "@/components/calendar/NotesTextarea";

type NotesPanelProps = {
  value: string;
  onChange: (value: string) => void;
  textareaRef?: React.RefObject<HTMLTextAreaElement | null>;
};

export function NotesPanel({
  value,
  onChange,
  textareaRef,
}: NotesPanelProps) {
  return (
    <section className="flex w-full flex-col md:w-5/12">
      <NotesHeader />
      <NotesTextarea
        value={value}
        onChange={onChange}
        textareaRef={textareaRef}
      />
    </section>
  );
}
