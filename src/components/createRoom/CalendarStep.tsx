import z from "zod";
import {useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Question from "@/components/shared/Question.tsx";
import BottomButton from "@/components/shared/BottomButton.tsx";
import type {FC} from "react";
import RHFCalendar from "@/components/shared/RHF/RHFCalendar.tsx";

type Props = {
  meetingName: string,
  onPrev: () => void,
  onNext: (dates: string[]) => void,
  isLoading: boolean
}

const calendarSchema = z.object({
  selectedDates: z
      .array(z.date())
      .min(1, {message: "모임 날짜를 최소 하루 이상 골라주세요!"})
})

type CalendarFormValues = z.infer<typeof calendarSchema>

const CalendarStep: FC<Props> = ({meetingName, onPrev, onNext, isLoading}) => {
  const {control, handleSubmit} = useForm<CalendarFormValues>({
    resolver: zodResolver(calendarSchema),
    defaultValues: {
      selectedDates: []
    }
  })

  const watchedDates = useWatch({
    control, name: "selectedDates", defaultValue: []
  })

  const onSubmit = (data: CalendarFormValues) => {
    const formattedDates = data.selectedDates.map((date) => date.toLocaleDateString("en-CA"));

    onNext(formattedDates)
  }

  return (
      <>
        <Question title={`${meetingName}! 다 같이, 다 되는 날을 찾아볼까요?`}/>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 방장이 선택한 날짜만 체크 가능하도록 해야함 */}
          <RHFCalendar name='selectedDates' control={control} selectedLength={watchedDates.length}/>

          <div className='flex'>
            <BottomButton
                text="다음 단계로"
                onPrev={onPrev}
                onClick={handleSubmit(onSubmit)}
                disabled={watchedDates.length === 0}
                isLoading={isLoading}
            />
          </div>
        </form>
      </>
  );
};

export default CalendarStep;