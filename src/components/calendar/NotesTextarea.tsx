type NotesTextareaProps = {
  value: string;
  onChange: (value: string) => void;
  textareaRef?: React.RefObject<HTMLTextAreaElement | null>;
};

export function NotesTextarea({
  value,
  onChange,
  textareaRef,
}: NotesTextareaProps) {
  const handleChange = (nextValue: string, element: HTMLTextAreaElement) => {
    const isShrinking = nextValue.length <= value.length;

    if (isShrinking || element.scrollHeight <= element.clientHeight + 1) {
      onChange(nextValue);
    }
  };

  return (
    <div className="notes-paper min-h-[320px] w-full md:min-h-[380px]">
      <textarea
        ref={textareaRef}
        aria-label="Monthly notes"
        value={value}
        onChange={(event) => handleChange(event.target.value, event.currentTarget)}
        placeholder="Write your memos here..."
        className="notes-input min-h-[320px] overflow-hidden px-0 md:min-h-[380px]"
      />
    </div>
  );
}
