import type { FC } from 'react';
import type { DashboardResponse } from '@/api/generated/model';
import Done from '@/components/dashboard/ui/Done.tsx';
import Wait from '@/components/dashboard/ui/Wait.tsx';

type Props = {
  dashboardData: DashboardResponse;
};

const DashboardHeader: FC<Props> = ({ dashboardData }) => {
  const { meetingName, totalMembers, votedMembers } = dashboardData;

  const votedSet = new Set(votedMembers);
  const nonParticipants = totalMembers?.filter((name) => !votedSet.has(name)) || [];

  return (
    <header className="w-full pb-6 px-1">
      <h1 className="text-2xl font-black text-zinc-900 tracking-tight leading-tight mb-4 italic">{meetingName}</h1>

      <div className="bg-white/30 backdrop-blur-md border border-zinc-100/50 rounded-xl p-3 shadow-sm space-y-4">
        <Done votedMembers={votedMembers || []} />
        <Wait nonParticipants={nonParticipants || []} />
      </div>
    </header>
  );
};

export default DashboardHeader;
