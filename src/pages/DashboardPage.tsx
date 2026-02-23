import DashboardHeader from '@/components/dashboard/widget/DashboardHeader.tsx';
import RankingSection from '@/components/dashboard/widget/RankingSection.tsx';
import { useGetDashboard } from '@/api/generated/room/room.ts';
import { useParams } from 'react-router';
import type { DashboardResponse } from '@/api/generated/model';
import EmptyDashboard from '@/components/dashboard/ui/EmptyDashboard.tsx';
import LoadingPage from '@/pages/LoadingPage.tsx';

const DashboardPage = () => {
  const { roomId } = useParams();
  const { data, isLoading } = useGetDashboard(roomId as string);
  const dashboardData = data?.data as DashboardResponse;

  if (isLoading) return <LoadingPage />;

  if (!dashboardData) return <></>;

  return (
    <div className="mb-5">
      {dashboardData?.topSchedules?.length === 0 ? (
        <EmptyDashboard roomId={roomId || ''} meetingName={dashboardData.meetingName || ''} />
      ) : (
        <>
          <DashboardHeader dashboardData={dashboardData as DashboardResponse} />
          <RankingSection dashboardData={dashboardData as DashboardResponse} />
        </>
      )}
    </div>
  );
};

export default DashboardPage;
