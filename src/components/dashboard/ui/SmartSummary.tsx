import { cn } from '@/lib/utils.ts';
import type { FC } from 'react';

type Props = {
  availableMembers: string[];
  absentMembers: string[];
  pendingMembers: string[];
};

const SmartSummary: FC<Props> = ({ availableMembers, absentMembers, pendingMembers }) => {
  const isPerfect = absentMembers.length === 0 && pendingMembers.length === 0;

  return (
    <div
      className={cn(
        'py-3 px-3.5 rounded-xl flex flex-col gap-3 text-[12px] border transition-all bg-white shadow-sm',
        isPerfect ? 'border-emerald-200' : 'border-zinc-200',
      )}
    >
      {/* 1. 참여 / 불참 나란히 레이아웃 */}
      <div className="flex gap-4 divide-x divide-zinc-100">
        {/* 참여 섹션 */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-emerald-500" />
            <span className="font-bold text-[11px] text-emerald-600">참여 {availableMembers.length}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {availableMembers.length > 0 ? (
              availableMembers.map((name) => (
                <span
                  key={name}
                  className="bg-emerald-50/50 text-emerald-700 px-1.5 py-0.5 rounded-md text-[10.5px] font-bold border border-emerald-100"
                >
                  {name}
                </span>
              ))
            ) : (
              <span className="text-zinc-300 text-[10px] pl-1 italic">없음</span>
            )}
          </div>
        </div>

        {/* 불참 섹션 */}
        <div className="flex-1 pl-4 flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-zinc-300" />
            <span className="font-bold text-[11px] text-zinc-400">불참 {absentMembers.length}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {absentMembers.length > 0 ? (
              absentMembers.map((name) => (
                <span
                  key={name}
                  className="bg-zinc-50 text-zinc-500 px-1.5 py-0.5 rounded-md text-[10.5px] font-bold border border-zinc-200/50"
                >
                  {name}
                </span>
              ))
            ) : (
              <span className="text-zinc-300 text-[10px] pl-1 italic">없음</span>
            )}
          </div>
        </div>
      </div>

      {/* 2. 미투표자 (가장 아래에 캡션처럼) */}
      {/*{!isPerfect && pendingMembers.length > 0 && (*/}
      {/*  <div className="mt-1 pt-2.5 border-t border-zinc-50 flex gap-1.5 items-center text-[10px] text-zinc-400">*/}
      {/*    <span className="font-bold shrink-0 opacity-70">미투표</span>*/}
      {/*    <span className="truncate opacity-80">{pendingMembers.join(', ')}</span>*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
};

export default SmartSummary;
