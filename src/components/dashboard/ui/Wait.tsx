import type { FC } from 'react';

type Props = {
  nonParticipants: string[];
};

const Wait: FC<Props> = ({ nonParticipants }) => {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mr-2 px-1 w-8">Wait</span>
      {nonParticipants.length > 0 ? (
        <>
          {nonParticipants.map((name) => (
            <div
              key={name}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-zinc-100 bg-zinc-50/50 text-zinc-400 text-[11px] font-bold"
            >
              <div className="w-1 h-1 rounded-full bg-zinc-300" />
              {name}
            </div>
          ))}
        </>
      ) : (
        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mr-2 px-1">
          전원 투표 완료! 이제 즐거운 모임만 남았네요.
        </span>
      )}
    </div>
  );
};

export default Wait;
