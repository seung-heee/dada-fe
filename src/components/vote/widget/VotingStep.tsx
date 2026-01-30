import type { FC } from 'react';
import BottomButton from '@/components/shared/BottomButton.tsx';
import Question from '@/components/shared/Question.tsx';
import z from 'zod';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import RHFCalendar from '@/components/shared/RHF/RHFCalendar.tsx';

type Props = {
  candidateDates: string[];
  memberName: string;
  onPrev: () => void;
  onNext: (dates: string[]) => void;
};

const calendarSchema = z.object({
  selectedDates: z.array(z.date()),
});

type CalendarFormValues = z.infer<typeof calendarSchema>;

const VotingStep: FC<Props> = ({ candidateDates, memberName, onPrev, onNext }) => {
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
    const formattedDates = data.selectedDates.map((date: Date) => date.toLocaleDateString('en-CA'));
    onNext(formattedDates);
  };

  return (
    <div>
      <Question
        title={`${memberName}님, 언제가 좋으세요?`}
        subTitle="가능한 날짜를 모두 찍어야 모임 성사 확률이 올라가는 거 아시죠? 😉"
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <RHFCalendar
          name="selectedDates"
          control={control}
          selectedLength={watchedDates.length}
          dates={candidateDates}
        />

        <BottomButton type="submit" text="다음" onPrev={onPrev} />
      </form>
    </div>
  );
};

export default VotingStep;
