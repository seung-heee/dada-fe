// selectRecurringDays.ts
import { startOfMonth, endOfMonth, eachDayOfInterval, getDay, startOfDay, startOfToday, isBefore } from 'date-fns';

/**
 * @param targetDay - 선택할 요일 (0~6 또는 'weekend')
 * @param referenceDate - 기준이 되는 날짜 (이 날짜가 포함된 '월'을 계산함)
 */

export const getRecurringDates = (targetDay: number | string, referenceDate: Date) => {
  const start = startOfMonth(referenceDate);
  const end = endOfMonth(referenceDate);
  const today = startOfToday();
  const allDays = eachDayOfInterval({ start, end });

  return allDays
    .filter((date) => {
      if (isBefore(date, today)) return false;

      const day = getDay(date);
      if (targetDay === 'weekend') return day === 0 || day === 6; // 토, 일
      if (targetDay === 'weekday') return day >= 1 && day <= 5; // 월, 화, 수, 목, 금
      return day === targetDay;
    })
    .map((date) => startOfDay(date));
};
