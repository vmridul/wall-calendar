import { PickerMenu } from "@/components/calendar/PickerMenu";

type YearSelectProps = {
  value: number;
  years: number[];
  onChange: (year: number) => void;
};

export function YearSelect({ value, years, onChange }: YearSelectProps) {
  const yearOptions = years.map((year) => ({
    label: String(year),
    value: year,
  }));

  return (
    <PickerMenu
      label="Select year"
      value={value}
      options={yearOptions}
      onChange={onChange}
      triggerClassName="min-w-[5.25rem] justify-between"
      menuClassName="w-[6rem]"
    />
  );
}
