import RHFInput from '@/components/shared/RHF/RHFInput.tsx';
import type { FC } from 'react';

type Props = {
  member: string;
  members: string[];
  setMember: React.Dispatch<React.SetStateAction<string>>;
  setMembers: React.Dispatch<React.SetStateAction<string[]>>;
};

const MemberInput: FC<Props> = ({ member, members, setMember, setMembers }) => {
  const addMember = () => {
    if (member.trim() && !members.includes(member)) {
      setMembers([...members, member.trim()]);
      setMember('');
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      addMember();
    }
  };

  return (
    <div className="flex gap-3 mb-4 items-center">
      <RHFInput
        value={member}
        onChange={(e) => setMember(e.target.value)}
        placeholder="예: 홍길동, 김철수"
        onKeyDown={onKeyDown}
      />
      <button onClick={addMember} className="bg-emerald-400 text-white rounded-full font-bold text-sm px-5 h-9 w-20">
        추가
      </button>
    </div>
  );
};

export default MemberInput;
