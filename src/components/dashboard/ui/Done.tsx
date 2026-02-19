import type { FC } from 'react';

type Props = {
  votedMembers: string[];
};

const Done: FC<Props> = ({ votedMembers }) => {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mr-2 px-1 w-8">Done</span>
      {votedMembers!.length > 0 && (
        <>
          {votedMembers!.map((name) => (
            <div
              key={name}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-emerald-100/50 bg-emerald-50/40 text-emerald-700 text-[11px] font-bold"
            >
              <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              {name}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Done;
