import { cn } from '@/lib/utils.ts';
import type { FC } from 'react';

type Props = {
  formattedFullDate: string;
  rank: number;
  weekday: string;
  availableMembers: string[];
  totalMembers: string[];
};

const ParticipationInfo: FC<Props> = ({ formattedFullDate, rank, weekday, availableMembers, totalMembers }) => {
  return (
    <div className="flex items-baseline justify-between relative z-10 mb-3">
      <div>
        <h3 className="text-xl font-black text-zinc-800 leading-tight tracking-tight inline-block mr-2">
          {formattedFullDate}
        </h3>
        <span className={cn('text-lg font-semibold', rank === 1 ? 'text-emerald-600' : 'text-zinc-500')}>
          ({weekday})
        </span>
      </div>
      {totalMembers.length === 0 ? (
        <p className="text-sm text-zinc-500 font-medium">
          <span className={cn('font-extrabold text-base mr-1', rank === 1 ? 'text-emerald-600' : 'text-zinc-800')}>
            {availableMembers.length}
          </span>
          명 참여
        </p>
      ) : (
        <p className="text-sm text-zinc-500 font-medium">
          <span className={cn('font-extrabold text-base', rank === 1 ? 'text-emerald-600' : 'text-zinc-800')}>
            {availableMembers.length}
          </span>
          /{totalMembers.length}명
        </p>
      )}
    </div>
  );
};

export default ParticipationInfo;
