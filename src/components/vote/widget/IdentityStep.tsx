import { useState, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import Question from '@/components/shared/Question.tsx';
import RHFInput from '@/components/shared/RHF/RHFInput.tsx';
import BottomButton from '@/components/shared/BottomButton.tsx';
import MemberBadge from '@/components/vote/ui/MemberBadge.tsx';
import { toast } from 'sonner';

type Props = {
  onPrev: () => void;
  onNext: (name: string) => void;
  memberName: string;
  invitedMembers?: string[]; // 방장이 입력한 멤버 명단
  participantNames?: string[];
};

const memberNameSchema = z.object({
  memberName: z
    .string()
    .min(1, { message: '이름을 입력해주세요.' })
    .max(10, { message: '이름은 최대 10자 이내로 입력해주세요.' })
    .trim(),
});

type memberNameFormValue = z.infer<typeof memberNameSchema>;

const IdentityStep: FC<Props> = ({ onPrev, onNext, memberName, invitedMembers = [], participantNames = [] }) => {
  const hasInvitedList = invitedMembers.length > 0;
  const [selectedName, setSelectedName] = useState<string>(memberName || '');
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<memberNameFormValue>({
    resolver: zodResolver(memberNameSchema),
    mode: 'onChange',
    defaultValues: { memberName: memberName },
  });

  const onSubmit = (data: memberNameFormValue) => {
    onNext(data.memberName);
  };

  const handleBadgeClick = (name: string) => {
    const alreadyVotedMembers = participantNames.includes(name);

    if (alreadyVotedMembers) {
      toast(`⚠️ ${name}님은 이미 투표를 완료하셨습니다.`, {
        description: '재투표 시 이전 기록을 덮어쓰게 됩니다.',
      });
    }

    setSelectedName(name);
  };

  return (
    <>
      <Question
        title="누구신지 '정체'를 밝혀주세요! 🕵️‍♂️"
        subTitle={hasInvitedList ? '명단에서 본인 이름을 콕 찍어주세요.' : '본인의 이름을 알려주세요.'}
      />

      <div className="mt-8">
        {hasInvitedList ? (
          <div className="flex flex-wrap gap-2 min-h-10">
            {invitedMembers.map((name) => {
              const isSelected = selectedName === name;
              return (
                <li key={name} className="list-none">
                  <MemberBadge handleBadgeClick={handleBadgeClick} isSelected={isSelected} name={name} />
                </li>
              );
            })}
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <RHFInput {...register('memberName')} placeholder="예: 홍길동" error={errors.memberName?.message} />
          </form>
        )}
      </div>

      <BottomButton
        type={hasInvitedList ? 'button' : 'submit'}
        text="다음"
        disabled={hasInvitedList ? !selectedName : !isValid}
        onPrev={onPrev}
        onClick={hasInvitedList ? () => onNext(selectedName) : handleSubmit(onSubmit)}
      />
    </>
  );
};

export default IdentityStep;
