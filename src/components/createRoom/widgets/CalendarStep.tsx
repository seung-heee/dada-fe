import z from 'zod';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Question from '@/components/shared/Question.tsx';
import BottomButton from '@/components/shared/BottomButton.tsx';
import type { FC } from 'react';
import RHFCalendar from '@/components/shared/RHF/RHFCalendar.tsx';

type Props = {
  meetingName: string;
  onPrev: () => void;
  onNext: (dates: string[]) => void;
  isLoading: boolean;
};

const calendarSchema = z.object({
  selectedDates: z.array(z.date()).min(1, { message: '모임 날짜를 최소 하루 이상 골라주세요!' }),
});

type CalendarFormValues = z.infer<typeof calendarSchema>;

const CalendarStep: FC<Props> = ({ meetingName, onPrev, onNext, isLoading }) => {
  const { control, handleSubmit } = useForm<CalendarFormValues>({
    resolver: zodResolver(calendarSchema),
    defaultValues: {
      selectedDates: [],
    },
  });

  const watchedDates = useWatch({
    control,
    name: 'selectedDates',
    defaultValue: [],
  });

  const onSubmit = (data: CalendarFormValues) => {
    const formattedDates = data.selectedDates.map((date) => date.toLocaleDateString('en-CA'));
    onNext(formattedDates);
  };

  return (
    <>
      <Question
        title={`${meetingName}! 우리 언제 모일까요?`}
        subTitle="후보가 많을수록 모임 성사 확률도 상한가! 다다익선 아시죠?"
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <RHFCalendar name="selectedDates" control={control} selectedLength={watchedDates.length} />
        <BottomButton
          text="완료"
          onPrev={onPrev}
          onClick={handleSubmit(onSubmit)}
          disabled={watchedDates.length === 0}
          isLoading={isLoading}
        />
      </form>
    </>
  );
};

export default CalendarStep;
