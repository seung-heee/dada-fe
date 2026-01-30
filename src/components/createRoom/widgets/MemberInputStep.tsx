import BottomButton from '@/components/shared/BottomButton.tsx';
import Question from '@/components/shared/Question.tsx';
import { type FC, useState } from 'react';
import MemberInput from '@/components/createRoom/ui/MemberInput.tsx';
import BadgeMemberList from '@/components/createRoom/ui/BadgeMemberList.tsx';

type Props = {
  invitedMembers: string[];
  onNext: (name: string[]) => void;
  onPrev: () => void;
};

const MemberInputStep: FC<Props> = ({ onNext, onPrev, invitedMembers }) => {
  const [member, setMember] = useState('');
  const [members, setMembers] = useState<string[]>(invitedMembers || []);

  return (
    <>
      <Question
        title="함께할 크루를 알려주세요! 🤟"
        subTitle="참여자를 미리 등록하면 투표 참여율이 더 높아집니다. (건너뛰기 가능)"
      />

      <MemberInput member={member} members={members} setMember={setMember} setMembers={setMembers} />

      <BadgeMemberList members={members} setMembers={setMembers} />

      <BottomButton
        text={members.length > 0 ? '다음 단계로' : '건너뛰기'}
        onPrev={onPrev}
        onClick={() => onNext(members)} // 빈 배열이면 건너뛰기로 간주
      />
    </>
  );
};

export default MemberInputStep;
