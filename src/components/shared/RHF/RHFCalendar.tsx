import { useController, type Control } from 'react-hook-form';
import { Calendar } from '@/components/ui/calendar.tsx';
import type { FC } from 'react';
import { format, startOfToday } from 'date-fns';

interface Props {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  dates?: string[];
  selectedLength: number;
  currentMonth?: Date;
  onMonthChange?: (date: Date) => void;
}

const RHFCalendar: FC<Props> = ({ name, control, dates, selectedLength, currentMonth, onMonthChange }) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const availableSet = new Set(dates);
  const defaultDisabled = { before: startOfToday() };

  const isDateDisabled = (date: Date) => {
    return !availableSet.has(format(date, 'yyyy-MM-dd'));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="my-2">
        <Calendar
          mode="multiple"
          selected={value}
          onSelect={onChange}
          className="w-full text-lg my-5 rounded-md"
          disabled={dates?.length ? isDateDisabled : defaultDisabled}
          month={currentMonth}
          onMonthChange={onMonthChange}
        />
      </div>

      <p className="text-center text-sm text-(--text-sub) my-4">
        현재 <span className="font-bold text-(--primary)">{selectedLength}개</span>의 날짜가 선택되었습니다.
      </p>
    </div>
  );
};

export default RHFCalendar;
