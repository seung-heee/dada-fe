import RankCard from '@/components/dashboard/widget/RankCard.tsx';
import type { FC } from 'react';
import type { DashboardResponse, TopScheduleDto } from '@/api/generated/model';

type Props = {
  dashboardData: DashboardResponse;
};

const RankingSection: FC<Props> = ({ dashboardData }) => {
  const topSchedules = dashboardData.topSchedules || [];
  const totalMembers = dashboardData.totalMembers;

  return (
    <div className="flex flex-col gap-4 rounded-xl">
      {topSchedules.map((schedule: TopScheduleDto) => (
        <RankCard
          key={schedule.date}
          rank={schedule.rank || 1}
          date={schedule.date || ''}
          availableMembers={schedule.availableMembers || []}
          totalMembers={totalMembers || []}
          votedMembers={dashboardData.votedMembers || []}
        />
      ))}
    </div>
  );
};

export default RankingSection;
