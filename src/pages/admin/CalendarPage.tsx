import {useNavigate, useParams,} from "react-router";
import {Calendar} from "@/components/ui/calendar.tsx";
import Question from "@/components/Question.tsx";
import BottomButton from "@/components/BottomButton.tsx";
import {z} from "zod";
import {Controller, useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const calendarSchema = z.object({
  selectedDates: z
      .array(z.date())
      .min(1, {message: "모임 날짜를 최소 하루 이상 골라주세요!"})
})

type CalendarFormValues = z.infer<typeof calendarSchema>

const CalendarPage = () => {
  const navigate = useNavigate()
  const {meetingName} = useParams<{ meetingName: string }>()

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

    const payload = {
      meetingName,
      dates: formattedDates
    }

    console.log('BE로 보낼 최종 데이터: ', payload)

    // 성공 후 navigate
    navigate(`/create-success/${meetingName}`)
  }


  return (
      <>
        <Question title={`${meetingName}! 다 같이, 다 되는 날을 찾아볼까요?`}/>

        <form onSubmit={handleSubmit(onSubmit)}>

          <Controller control={control} name='selectedDates'
                      render={({field}) => (
                          <Calendar
                              mode="multiple"
                              selected={field.value}
                              onSelect={field.onChange}
                              className="w-full text-lg my-5"
                              disabled={{before: new Date()}}
                          />
                      )}
          />

          <p className="text-center text-sm text-[var(--text-sub)]">
            현재 <span className="font-bold text-[var(--primary)]">{watchedDates.length}개</span>의 날짜가 선택되었습니다.
          </p>

          <BottomButton
              type='submit'
              text="날짜 선택 완료"
              disabled={watchedDates.length === 0}
          />
        </form>
      </>
  )
};

export default CalendarPage;