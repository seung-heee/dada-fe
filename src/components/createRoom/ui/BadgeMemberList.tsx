import type { FC } from 'react';

type Props = {
  members: string[];
  setMembers: React.Dispatch<React.SetStateAction<string[]>>;
};

const BadgeMemberList: FC<Props> = ({ members, setMembers }) => {
  return (
    <div className="flex flex-wrap gap-2 min-h-10">
      {members.map((m) => (
        <span
          key={m}
          className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1.5 h-8 rounded-full text-sm font-bold flex items-center gap-1"
        >
          {m}
          <button onClick={() => setMembers(members.filter((name) => name !== m))} className="text-emerald-400 ml-1">
            ×
          </button>
        </span>
      ))}
    </div>
  );
};

export default BadgeMemberList;
