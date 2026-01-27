import BottomButton from "@/components/shared/BottomButton.tsx";
import type {FC} from "react";
import Question from "@/components/shared/Question.tsx";
import z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import RHFInput from "@/components/shared/RHF/RHFInput.tsx";

type Props = {
  onPrev: () => void
  onNext: (name: string) => void
  memberName: string
}

const memberNameSchema = z.object({
  memberName: z
      .string()
      .min(1, {message: '이름을 입력해주세요.'})
      .max(10, {message: '이름은 최대 10자 이내로 입력해주세요.'})
      .trim()
})

type memberNameFormValue = z.infer<typeof memberNameSchema>

const IdentityStep: FC<Props> = ({onPrev, onNext, memberName}) => {
  const {register, handleSubmit, formState: {errors, isValid}} = useForm<memberNameFormValue>({
    resolver: zodResolver(memberNameSchema),
    mode: 'onChange',
    defaultValues: {
      memberName: memberName
    }
  })

  const onSubmit = (data: memberNameFormValue) => {
    console.log(data)
    onNext(data.memberName)
  }


  return (
      <>
        <Question title="누가 오셨나요? 본인의 이름을 알려주세요."/>

        <form onSubmit={handleSubmit(onSubmit)}>
          <RHFInput
              {...register('memberName')}
              placeholder='예: 홍길동'
              error={errors.memberName?.message}
          />

          <BottomButton type='submit' text='다음' disabled={!isValid} onPrev={onPrev}/>
        </form>
      </>
  );
};

export default IdentityStep;