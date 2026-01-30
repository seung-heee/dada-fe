import { cn } from '@/lib/utils.ts';
import RankBadge from '@/components/dashboard/ui/RankBadge.tsx';
import type { FC } from 'react';
import ParticipationInfo from '@/components/dashboard/ui/ParticipationInfo.tsx';
import SmartSummary from '@/components/dashboard/ui/SmartSummary.tsx';

interface Props {
  rank: number;
  date: string;
  availableMembers: string[];
  totalMembers: string[];
}

const RankCard: FC<Props> = ({ rank, date, availableMembers, totalMembers }) => {
  const missingMembers = totalMembers.filter((m) => !availableMembers.includes(m));
  const participationRate = Math.round((availableMembers.length / totalMembers.length) * 100);

  const dateObj = new Date(date);
  const formattedFullDate = dateObj.toLocaleDateString('ko-KR', {
    year: '2-digit',
    month: 'long',
    day: 'numeric',
  });
  const weekday = dateObj.toLocaleDateString('ko-KR', { weekday: 'short' });

  return (
    <div
      className={cn(
        'relative w-full rounded-2xl p-4 mb-3 transition-all duration-300 overflow-hidden group border',
        rank === 1
          ? 'bg-linear-to-br from-white to-emerald-50 border-emerald-300 shadow-[0_4px_15px_-4px_rgba(16,185,129,0.25)]'
          : 'bg-white border-zinc-100 shadow-sm',
      )}
    >
      <RankBadge rank={rank} participationRate={participationRate} />

      <ParticipationInfo
        formattedFullDate={formattedFullDate}
        rank={rank}
        weekday={weekday}
        availableMembers={availableMembers}
        totalMembers={totalMembers}
      />

      <SmartSummary missingMembers={missingMembers} />
    </div>
  );
};

export default RankCard;
