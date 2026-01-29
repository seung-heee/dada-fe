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
}

const RHFCalendar: FC<Props> = ({ name, control, dates, selectedLength }) => {
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
    <div className="my-8">
      <Calendar
        mode="multiple"
        selected={value}
        onSelect={onChange}
        className="w-full text-lg my-5 rounded-md"
        disabled={dates?.length ? isDateDisabled : defaultDisabled}
      />

      <p className="text-center text-sm text-(--text-sub)">
        현재 <span className="font-bold text-(--primary)">{selectedLength}개</span>의 날짜가 선택되었습니다.
      </p>
    </div>
  );
};

export default RHFCalendar;
