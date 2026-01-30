import { cn } from '@/lib/utils.ts';
import { AlertCircle, CheckCircle2, PartyPopper } from 'lucide-react';
import type { FC } from 'react';

type Props = {
  missingMembers: string[];
};

const SmartSummary: FC<Props> = ({ missingMembers }) => {
  const isPerfect = missingMembers.length === 0;
  const isAlmost = missingMembers.length === 1;

  return (
    <div
      className={cn(
        'py-2.5 px-3 rounded-xl flex items-start gap-2.5 text-[13px] leading-tight relative z-10 border-l-4',
        isPerfect ? 'bg-emerald-50 text-emerald-800 border-emerald-400' : 'bg-zinc-50/70 text-zinc-700 border-zinc-200',
      )}
    >
      {isPerfect ? (
        <>
          <PartyPopper size={18} className="text-emerald-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-bold">모두가 다 되는 날! 🎉</p>
            <p className="text-[11px] opacity-80 mt-0.5 font-medium text-emerald-700">고민 없이 이 날로 확정각?!</p>
          </div>
        </>
      ) : (
        <>
          {isAlmost ? (
            <CheckCircle2 size={18} className="text-zinc-400 mt-0.5 shrink-0" />
          ) : (
            <AlertCircle size={18} className="text-zinc-400 mt-0.5 shrink-0" />
          )}

          <div className="flex flex-col gap-1.5 w-full">
            {isAlmost ? (
              <p className="flex items-center flex-wrap gap-1.5 font-medium">
                🙌
                <span className="bg-zinc-200/80 text-zinc-800 px-2 py-0.5 rounded-md text-[12px] font-bold">
                  {missingMembers[0]}
                </span>
                님만 오면 전원 참석!
              </p>
            ) : (
              <div className="flex items-center flex-wrap gap-1.5">
                <span className="text-zinc-500 font-medium mr-1">불참:</span>
                {missingMembers.map((name) => (
                  <span
                    key={name}
                    className="bg-zinc-200/60 text-zinc-600 px-2 py-0.5 rounded-md text-[11px] font-bold border border-zinc-200/50"
                  >
                    {name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SmartSummary;
