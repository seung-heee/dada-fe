import {cn} from "@/lib/utils";
import {CheckCircle2, AlertCircle, PartyPopper, Crown} from "lucide-react";

interface RankCardProps {
  rank: number;
  date: string;
  availableMembers: string[];
  totalMembers: string[];
}

const RankCard = ({rank, date, availableMembers, totalMembers}: RankCardProps) => {
  const missingMembers = totalMembers.filter(m => !availableMembers.includes(m));
  const isPerfect = missingMembers.length === 0;
  const isAlmost = missingMembers.length === 1;
  const participationRate = Math.round((availableMembers.length / totalMembers.length) * 100);

  const dateObj = new Date(date);

  const formattedFullDate = dateObj.toLocaleDateString('ko-KR', {
    year: '2-digit',
    month: 'long',
    day: 'numeric'
  });
  const weekday = dateObj.toLocaleDateString('ko-KR', {weekday: 'short'});

  return (
      <div
          className={cn(
              "relative w-full rounded-2xl p-4 mb-3 transition-all duration-300 overflow-hidden group border",
              rank === 1
                  ? "bg-gradient-to-br from-white to-emerald-50 border-emerald-300 shadow-[0_4px_15px_-4px_rgba(16,185,129,0.25)]"
                  : "bg-white border-zinc-100 shadow-sm"
          )}
      >
        {/* 👑 1위 전용: 거대한 배경 왕관 */}
        {rank === 1 && (
            <div className="absolute top-0 right-0 -mt-3 -mr-3 text-emerald-200/40 opacity-30 pointer-events-none group-hover:rotate-12 transition-transform">
              <Crown size={100} strokeWidth={1.5}/>
            </div>
        )}

        {/* [상단] 랭크 배지 & 참여율 */}
        <div className="flex justify-between items-center relative z-10 mb-2">
          {rank === 1 ? (
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm transform -translate-x-1">
                <Crown size={12} className="text-yellow-300" fill="currentColor"/>
                <span>1위 강력 추천!</span>
              </div>
          ) : (
              <span className="bg-zinc-100 text-zinc-500 text-[11px] font-bold px-3 py-1 rounded-full">
            {rank}위
          </span>
          )}
          <span className={cn("text-xs font-bold", rank === 1 ? "text-emerald-600" : "text-zinc-400")}>
          참여율 {participationRate}%
        </span>
        </div>

        {/* [중단] 날짜 및 인원 정보 */}
        <div className="flex items-baseline justify-between relative z-10 mb-3">
          <div>
            <h3 className="text-xl font-black text-zinc-800 leading-tight tracking-tight inline-block mr-2">
              {formattedFullDate}
            </h3>
            <span className={cn("text-lg font-semibold", rank === 1 ? "text-emerald-600" : "text-zinc-500")}>
            ({weekday})
          </span>
          </div>
          <p className="text-sm text-zinc-500 font-medium">
          <span className={cn("font-extrabold text-base", rank === 1 ? "text-emerald-600" : "text-zinc-800")}>
            {availableMembers.length}
          </span>
            /{totalMembers.length}명
          </p>
        </div>

        {/* [하단] 스마트 브리핑 */}
        <div className={cn(
            "py-2.5 px-3 rounded-xl flex items-start gap-2.5 text-[13px] leading-tight relative z-10 border-l-4",
            isPerfect
                ? "bg-emerald-50 text-emerald-800 border-emerald-400"
                : "bg-zinc-50/70 text-zinc-700 border-zinc-200"
        )}>
          {isPerfect ? (
              <>
                <PartyPopper size={18} className="text-emerald-600 mt-0.5 flex-shrink-0"/>
                <div>
                  <p className="font-bold">모두가 다 되는 날! 🎉</p>
                  <p className="text-[11px] opacity-80 mt-0.5 font-medium text-emerald-700">고민 없이 이 날로 확정각?!</p>
                </div>
              </>
          ) : (
              <>
                {isAlmost ? <CheckCircle2 size={18} className="text-zinc-400 mt-0.5 flex-shrink-0"/> :
                    <AlertCircle size={18} className="text-zinc-400 mt-0.5 flex-shrink-0"/>}
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
      </div>
  );
};

export default RankCard;