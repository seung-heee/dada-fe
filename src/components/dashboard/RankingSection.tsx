import RankCard from "@/components/dashboard/RankCard.tsx";

const TOTAL_MEMBERS = ['승희', '민수', '영희', '지민', '도현', '지혜'];

const RankingSection = () => {
  return (
      <div className="flex flex-col gap-4 rounded-xl">
        <RankCard
            rank={1}
            date="2026-02-06"
            availableMembers={['승희', '민수', '영희', '지민', '도현', '지혜']}
            totalMembers={TOTAL_MEMBERS}
        />

        <RankCard
            rank={2}
            date="2026-02-07"
            availableMembers={['승희', '민수', '영희', '지민', '도현']}
            totalMembers={TOTAL_MEMBERS}
        />

        <RankCard
            rank={3}
            date="2026-02-08"
            availableMembers={['승희', '영희', '지민', '도현']}
            totalMembers={TOTAL_MEMBERS}
        />
      </div>
  );
};

export default RankingSection;