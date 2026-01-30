import { cn } from '@/lib/utils.ts';
import { Check } from 'lucide-react';
import type { FC } from 'react';

type Props = {
  handleBadgeClick: (name: string) => void;
  isSelected: boolean;
  name: string;
};

const MemberBadge: FC<Props> = ({ handleBadgeClick, isSelected, name }) => {
  return (
    <button
      type="button"
      onClick={() => handleBadgeClick(name)}
      className={cn(
        'h-8 px-3 rounded-full text-sm font-bold flex items-center gap-1 transition-all border',
        isSelected
          ? 'bg-emerald-50 text-emerald-700 border-emerald-100 ring-1 ring-emerald-500/20 shadow-sm' // 선택됨
          : 'bg-white text-zinc-400 border-zinc-100 hover:border-zinc-200', // 선택 안 됨
      )}
    >
      {name}
      {/* 선택 시 체크 아이콘 표시 (기존 '×' 버튼 자리) */}
      {isSelected && <Check size={14} strokeWidth={3} className="text-emerald-500 ml-0.5" />}
    </button>
  );
};

export default MemberBadge;
