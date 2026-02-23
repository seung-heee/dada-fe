import { getRecurringDates } from '@/components/createRoom/selectRecurringDays.ts';
import { cn } from '@/lib/utils.ts';
import type { FC } from 'react';

type Props = {
  onSelect: (val: any) => void;
  watchedDates: Date[];
  currentMonth: Date;
};

const days = [
  { label: '평일 전체', value: 'weekday' },
  { label: '주말', value: 'weekend' },
  { label: '월', value: 1 },
  { label: '화', value: 2 },
  { label: '수', value: 3 },
  { label: '목', value: 4 },
  { label: '금', value: 5 },
  { label: '토', value: 6 },
  { label: '일', value: 0 },
];

const QuickSelectButtons: FC<Props> = ({ onSelect, watchedDates, currentMonth }) => {
  return (
    <div className="flex flex-wrap gap-2 my-6 px-1">
      {days.map((day) => {
        const recurringDates = getRecurringDates(day.value, currentMonth);
        const isActive =
          recurringDates.length > 0 &&
          recurringDates.every((rd) => watchedDates.some((wd) => wd.getTime() === rd.getTime()));

        return (
          <button
            key={day.label}
            type="button"
            onClick={() => onSelect(day.value)}
            className={cn(
              'px-3.5 py-1.5 text-[12px] font-bold rounded-full transition-all border shadow-xs active:scale-95',
              isActive
                ? 'bg-emerald-500 text-white border-emerald-500'
                : 'bg-white text-emerald-600 border-emerald-100 hover:bg-emerald-50',
            )}
          >
            {day.value === 'weekend' && '📆 주말 전체'}
            {day.value === 'weekday' && '📆 평일 전체'}
            {typeof day.value === 'number' && `매주 ${day.label}`}
          </button>
        );
      })}
    </div>
  );
};

export default QuickSelectButtons;
