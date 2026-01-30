import DashboardHeader from '@/components/dashboard/widget/DashboardHeader.tsx';
import RankingSection from '@/components/dashboard/widget/RankingSection.tsx';
import { useGetDashboard } from '@/api/generated/room/room.ts';
import { useParams } from 'react-router';
import type { DashboardResponse } from '@/api/generated/model';

const DashboardPage = () => {
  const { roomId } = useParams();
  const { data: dashboardData, isLoading } = useGetDashboard(roomId as string);

  if (isLoading) return <>로딩중...</>;

  return (
    <div className="min-h-screen pb-20 px-2">
      <DashboardHeader dashboardData={dashboardData?.data as DashboardResponse} />
      <RankingSection dashboardData={dashboardData?.data as DashboardResponse} />
    </div>
  );
};

export default DashboardPage;
