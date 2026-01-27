import z from "zod";
import Question from "@/components/shared/Question.tsx";
import BottomButton from "@/components/shared/BottomButton.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import type {FC} from "react";
import RHFInput from "@/components/shared/RHF/RHFInput.tsx";

type Props = {
  meetingName: string,
  onNext: (name: string) => void
}

const meetingSchema = z.object({
  meetingName: z
      .string()
      .min(1, {message: '모임 이름을 입력해주세요.'})
      .max(20, {message: '모임 이름을 최대 20자 이내로 입력해주세요.'})
      .trim()
})

type MeetingFormValues = z.infer<typeof meetingSchema>

const NameInputStep: FC<Props> = ({meetingName, onNext}) => {
  const {register, handleSubmit, formState: {errors, isValid}} = useForm<MeetingFormValues>({
    resolver: zodResolver(meetingSchema),
    mode: "onChange",
    defaultValues: {
      meetingName: meetingName
    }
  })

  const onSubmit = (data: MeetingFormValues) => {
    onNext(data.meetingName)
  }

  return (
      <>
        <Question title='어떤 모임인가요?'/>

        <form onSubmit={handleSubmit(onSubmit)}>
          <RHFInput
              {...register('meetingName')}
              placeholder="예: 다다와 친구들의 신년회"
              error={errors.meetingName?.message}
          />

          <BottomButton type='submit' text='다음 단계로' disabled={!isValid}/>
        </form>
      </>
  );
};

export default NameInputStep;