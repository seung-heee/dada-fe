import { Crown, Medal, Star } from 'lucide-react';
import { cn } from '@/lib/utils.ts';
import type { FC } from 'react';

type Props = {
  rank: number;
  participationRate: number | string;
};

const RankBadge: FC<Props> = ({ rank, participationRate }) => {
  return (
    <>
      {/* 👑 1위 전용: 거대한 배경 왕관 (기존 유지) */}
      {rank === 1 && (
        <div className="absolute top-0 right-0 -mt-3 -mr-3 text-emerald-200/40 opacity-30 pointer-events-none group-hover:rotate-12 transition-transform">
          <Crown size={100} strokeWidth={1.5} />
        </div>
      )}

      <div className="flex justify-between items-center relative z-10 mb-2">
        <div
          className={cn(
            'flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm transition-all',
            rank === 1 && 'bg-linear-to-r from-emerald-500 to-teal-500 text-white transform -translate-x-1',
            rank === 2 && 'bg-teal-50 text-teal-700 border border-teal-100',
            rank === 3 && 'bg-emerald-50 text-emerald-600 border border-emerald-100',
            rank > 3 && 'bg-zinc-100 text-zinc-500',
          )}
        >
          {rank === 1 && <Crown size={12} className="text-yellow-300" fill="currentColor" />}
          {rank === 2 && <Star size={12} className="text-teal-500" fill="currentColor" />}
          {rank === 3 && <Medal size={12} className="text-emerald-500" />}

          <span>
            {rank === 1 && '1위 강력 추천!'}
            {rank === 2 && '2위 추천'}
            {rank === 3 && '3위 후보'}
            {rank > 3 && `${rank}위`}
          </span>
        </div>

        {participationRate && (
          <span
            className={cn(
              'text-[11px] font-bold px-2 py-0.5 rounded-md',
              rank === 1 && 'text-emerald-600 bg-emerald-50',
              rank === 2 && 'text-teal-600 bg-teal-50/50',
              rank === 3 && 'text-emerald-500 bg-emerald-50/50',
              rank > 3 && 'text-zinc-400',
            )}
          >
            참여율 {participationRate}%
          </span>
        )}
      </div>
    </>
  );
};

export default RankBadge;
