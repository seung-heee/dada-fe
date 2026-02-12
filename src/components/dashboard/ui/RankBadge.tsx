import { Crown } from 'lucide-react';
import { cn } from '@/lib/utils.ts';
import type { FC } from 'react';

type Props = {
  rank: number;
  participationRate: number | string;
};

const RankBadge: FC<Props> = ({ rank, participationRate }) => {
  return (
    <>
      {/* 👑 1위 전용: 거대한 배경 왕관 */}
      {rank === 1 && (
        <div className="absolute top-0 right-0 -mt-3 -mr-3 text-emerald-200/40 opacity-30 pointer-events-none group-hover:rotate-12 transition-transform">
          <Crown size={100} strokeWidth={1.5} />
        </div>
      )}

      {/* [상단] 랭크 배지 & 참여율 */}
      <div className="flex justify-between items-center relative z-10 mb-2">
        {rank === 1 ? (
          <div className="flex items-center gap-1.5 bg-linear-to-r from-emerald-500 to-teal-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm transform -translate-x-1">
            <Crown size={12} className="text-yellow-300" fill="currentColor" />
            <span>1위 강력 추천!</span>
          </div>
        ) : (
          <span className="bg-zinc-100 text-zinc-500 text-[11px] font-bold px-3 py-1 rounded-full">{rank}위</span>
        )}
        {!!participationRate ? (
          <></>
        ) : (
          <span className={cn('text-xs font-bold', rank === 1 ? 'text-emerald-600' : 'text-zinc-400')}>
            참여율 {participationRate}%
          </span>
        )}
      </div>
    </>
  );
};

export default RankBadge;
