import Question from "@/components/Question.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {useNavigate} from "react-router";
import {zodResolver} from "@hookform/resolvers/zod";
import BottomButton from "@/components/BottomButton.tsx";

const meetingSchema = z.object({
  meetingName: z
      .string()
      .min(1, {message: '모임 이름을 입력해주세요.'})
      .max(20, {message: '모임 이름을 최대 20자 이내로 입력해주세요.'})
      .trim()
})

type MeetingFormValues = z.infer<typeof meetingSchema>

const MeetingNamePage = () => {
  const navigate = useNavigate()

  const {register, handleSubmit, formState: {errors, isValid}} = useForm<MeetingFormValues>({
    resolver: zodResolver(meetingSchema),
    mode: "onChange",
  })

  const onSubmit = (data: MeetingFormValues) => {
    const meetingName = data.meetingName
    navigate(`/calendar/${meetingName}`)
  }

  return (
      <>
        <Question title='어떤 모임인가요?'/>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
              {...register('meetingName')}
              placeholder="예: 다다와 친구들의 신년회"
              className='customInput'
          />

          {errors.meetingName && (
              <p className='text-sm text-red-500 ml-1 mt-[0.5]'>{errors.meetingName.message as string}</p>
          )}

          <BottomButton type='submit' text='다음 단계로' disabled={!isValid}/>
        </form>
      </>
  );
};

export default MeetingNamePage;