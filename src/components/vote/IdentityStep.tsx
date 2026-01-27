import {useState, type FC} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import z from "zod";
import {cn} from "@/lib/utils";
import {Check} from "lucide-react";

import Question from "@/components/shared/Question.tsx";
import RHFInput from "@/components/shared/RHF/RHFInput.tsx";
import BottomButton from "@/components/shared/BottomButton.tsx";


type Props = {
  onPrev: () => void;
  onNext: (name: string) => void;
  memberName: string;
  invitedMembers?: string[]; // 방장이 입력한 멤버 명단
}

const memberNameSchema = z.object({
  memberName: z
      .string()
      .min(1, {message: '이름을 입력해주세요.'})
      .max(10, {message: '이름은 최대 10자 이내로 입력해주세요.'})
      .trim()
});

type memberNameFormValue = z.infer<typeof memberNameSchema>

const IdentityStep: FC<Props> = ({onPrev, onNext, memberName, invitedMembers = []}) => {
  // 1. 방장이 명단을 입력했는지 확인
  const hasInvitedList = invitedMembers.length > 0;

  // 2. 명단 선택 모드일 때 사용할 상태
  const [selectedName, setSelectedName] = useState<string>(memberName || "");

  // 3. 직접 입력 모드일 때 사용할 RHF
  const {register, handleSubmit, formState: {errors, isValid}} = useForm<memberNameFormValue>({
    resolver: zodResolver(memberNameSchema),
    mode: 'onChange',
    defaultValues: {memberName: memberName}
  });

  const onSubmit = (data: memberNameFormValue) => {
    onNext(data.memberName);
  };

  const handleBadgeClick = (name: string) => {
    setSelectedName(name);
  };

  return (
      <>
        <Question
            title="누가 오셨나요?"
            subTitle={hasInvitedList ? "본인의 이름을 명단에서 선택해주세요." : "본인의 이름을 알려주세요."}
        />

        <div className="mt-8">
          {hasInvitedList ? (
              /* Case 1: 방장이 명단을 입력했을 때 (통일된 뱃지 스타일) */
              <div className="flex flex-wrap gap-2 min-h-[40px]">
                {invitedMembers.map((name) => {
                  const isSelected = selectedName === name;
                  return (
                      <button
                          key={name}
                          type="button"
                          onClick={() => handleBadgeClick(name)}
                          className={cn(
                              // 요청하신 뱃지 기본 디자인 (h-8, px-3, rounded-full, text-sm)
                              "h-8 px-3 rounded-full text-sm font-bold flex items-center gap-1 transition-all border",
                              isSelected
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-100 ring-1 ring-emerald-500/20 shadow-sm" // 선택됨
                                  : "bg-white text-zinc-400 border-zinc-100 hover:border-zinc-200" // 선택 안 됨
                          )}
                      >
                        {name}
                        {/* 선택 시 체크 아이콘 표시 (기존 '×' 버튼 자리) */}
                        {isSelected && (
                            <Check size={14} strokeWidth={3} className="text-emerald-500 ml-0.5"/>
                        )}
                      </button>
                  );
                })}
              </div>
          ) : (
              /* Case 2: 명단이 없을 때 (기존 직접 입력형) */
              <form onSubmit={handleSubmit(onSubmit)}>
                <RHFInput
                    {...register('memberName')}
                    placeholder='예: 홍길동'
                    error={errors.memberName?.message}
                />
              </form>
          )}
        </div>

        <BottomButton
            type={hasInvitedList ? 'button' : 'submit'}
            text='다음'
            // 선택 모드일 땐 이름 선택 여부, 입력 모드일 땐 유효성 검사 결과 사용
            disabled={hasInvitedList ? !selectedName : !isValid}
            onPrev={onPrev}
            onClick={hasInvitedList ? () => onNext(selectedName) : handleSubmit(onSubmit)}
        />
      </>
  );
};

export default IdentityStep;