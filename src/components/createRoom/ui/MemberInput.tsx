import RHFInput from '@/components/shared/RHF/RHFInput.tsx';
import type { FC } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils.ts';

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
        placeholder="ex) 짱구, 철수, 유리, 훈이, 맹구"
        onKeyDown={onKeyDown}
      />
      <button
        onClick={addMember}
        disabled={!member.trim()} // 값이 비어있으면 버튼 비활성화
        className={cn(
          'mt-5 py-4 px-4 flex items-center justify-center rounded-2xl transition-all duration-200 shadow-md',
          'bg-emerald-400 text-white hover:bg-emerald-500 active:scale-95',
          'disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed disabled:shadow-none disabled:active:scale-100',
        )}
        aria-label="멤버 추가"
      >
        <Plus className="w-5 h-5 stroke-3" />
      </button>
    </div>
  );
};

export default MemberInput;
