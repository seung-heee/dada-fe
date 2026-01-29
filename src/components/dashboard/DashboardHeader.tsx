import type { FC } from 'react';
import type { DashboardResponse } from '@/api/generated/model';

type Props = {
  dashboardData: DashboardResponse;
};

const DashboardHeader: FC<Props> = ({ dashboardData }) => {
  const { meetingName, totalMembers, votedMembers } = dashboardData;

  const votedSet = new Set(votedMembers);
  const nonParticipants = totalMembers?.filter((name) => !votedSet.has(name)) || [];

  return (
    <header className="w-full pb-6 px-1">
      <h1 className="text-2xl font-black text-zinc-900 tracking-tight leading-tight mb-4 italic">{meetingName}</h1>

      <div className="bg-white/30 backdrop-blur-md border border-zinc-100/50 rounded-xl p-3 shadow-sm space-y-4">
        {/* 참여 완료 (Done) */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mr-2 px-1 w-8">Done</span>
          {votedMembers!.length > 0 ? (
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
          ) : (
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mr-2 px-1">
              텅 빈 투표함을 보니 제 마음도 텅... 🥺 얼른 채워주세요!
            </span>
          )}
        </div>

        {/* 미참여 (Wait) - 크기/구조 동일, 색상만 변경 */}
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
              준비 완료! 🚀 이제 즐거운 모임만 남았네요.
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
