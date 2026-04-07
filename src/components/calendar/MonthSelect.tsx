import { getMonthNames } from "@/lib/calendar/date";
import { PickerMenu } from "@/components/calendar/PickerMenu";

type MonthSelectProps = {
  value: number;
  onChange: (month: number) => void;
};

const monthNames = getMonthNames();
const monthOptions = monthNames.map((monthName, monthIndex) => ({
  label: monthName,
  value: monthIndex,
}));

export function MonthSelect({ value, onChange }: MonthSelectProps) {
  return (
    <PickerMenu
      label="Select month"
      value={value}
      options={monthOptions}
      onChange={onChange}
      triggerClassName="min-w-[7rem] justify-between"
      menuClassName="w-[8.75rem]"
    />
  );
}
