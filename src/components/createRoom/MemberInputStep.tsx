// src/features/create-room/ui/MemberInputStep.tsx
import BottomButton from "@/components/shared/BottomButton.tsx";
import Question from "@/components/shared/Question.tsx";
import RHFInput from "@/components/shared/RHF/RHFInput.tsx";
import {type FC, useState} from "react";

type Props = {
  initialMembers: string[]
  onNext: (name: string[]) => void
  onPrev: () => void
}

const MemberInputStep: FC<Props> = ({onNext, onPrev, initialMembers}) => {
  const [member, setMember] = useState("");
  const [members, setMembers] = useState<string[]>(initialMembers || []);

  const addMember = () => {
    if (member.trim() && !members.includes(member)) {
      setMembers([...members, member.trim()]);
      setMember("");
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
      <>
        <Question
            title="함께하는 멤버가 있나요?"
            subTitle="미리 적어두면 친구들이 투표할 때 편해해요! (건너뛰기 가능)"
        />

        <div className="mt-6">
          <div className="flex gap-3 mb-4 items-center">
            <RHFInput
                value={member}
                onChange={(e) => setMember(e.target.value)}
                placeholder="예: 홍길동, 김철수"
                onKeyDown={onKeyDown}
            />
            <button
                onClick={addMember}
                className="bg-emerald-400 text-white rounded-full font-bold text-sm px-5 h-9 w-20"
            >
              추가
            </button>
          </div>

          <div className="flex flex-wrap gap-2 min-h-[40px]">
            {members.map((m) => (
                <span key={m} className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1.5 h-8 rounded-full text-sm font-bold flex items-center gap-1">
              {m}
                  <button onClick={() => setMembers(members.filter(name => name !== m))} className="text-emerald-400 ml-1">×</button>
            </span>
            ))}
          </div>
        </div>

        <BottomButton
            text={members.length > 0 ? "다음 단계로" : "건너뛰기"}
            onPrev={onPrev}
            onClick={() => onNext(members)} // 빈 배열이면 건너뛰기로 간주
        />
      </>
  );
};

export default MemberInputStep