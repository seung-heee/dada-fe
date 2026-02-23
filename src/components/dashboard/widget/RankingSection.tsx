import type { FC } from 'react';
import type { DashboardResponse, TopScheduleDto } from '@/api/generated/model';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

type Props = {
  dashboardData: DashboardResponse;
};

const RankingSection: FC<Props> = ({ dashboardData }) => {
  const topSchedules = dashboardData.topSchedules || [];
  const totalMembers = dashboardData.totalMembers || [];
  const votedMembers = dashboardData.votedMembers || [];

  const chartData = topSchedules.map((schedule: TopScheduleDto) => {
    const dateObj = new Date(schedule.date as string);
    const dayOfWeek = new Intl.DateTimeFormat('ko-KR', { weekday: 'short' }).format(dateObj);

    // 이름 리스트 계산 🛫
    const availableNames = schedule.availableMembers ?? [];
    const absentNames = votedMembers.filter((m) => !availableNames.includes(m));
    const pendingNames = totalMembers.filter((m) => !votedMembers.includes(m));

    return {
      date: `${dateObj.getMonth() + 1}/${dateObj.getDate()} (${dayOfWeek})`,
      참여: availableNames.length,
      불참: absentNames.length,
      미투표: pendingNames.length,
      availableList: availableNames.join(', '),
      absentList: absentNames.join(', '),
      pendingList: pendingNames.join(', '),
    };
  });

  return (
    <div className="w-full bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="font-bold text-zinc-800 text-lg">참여 현황 요약 📊</h3>
        <p className="text-[11px] text-zinc-400 font-medium">DADA가 찾은 최적의 날짜, 그래프로 비교해 보세요.</p>
      </div>

      <div className="w-full h-64 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          {/* 1. layout="vertical" 추가 */}
          <BarChart layout="vertical" data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }} barSize={24}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f4f4f5" />
            <XAxis type="number" domain={[0, totalMembers.length]} hide />

            <YAxis
              dataKey="date"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fontWeight: 700, fill: '#52525b' }}
              width={63}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
            />

            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ fontSize: '11px', fontWeight: 600, paddingBottom: '20px' }}
            />

            <Bar dataKey="참여" stackId="a" fill="#10b981" />
            <Bar dataKey="불참" stackId="a" fill="#d1fae5" />
            <Bar dataKey="미투표" stackId="a" fill="#e4e4e7" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RankingSection;

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload; // 우리가 chartData에 넣은 원본 데이터

    return (
      <div className="bg-white p-3 rounded-xl border border-zinc-100 shadow-lg text-[11px] flex flex-col gap-1 min-w-[140px]">
        <p className="font-bold text-zinc-800 border-b border-zinc-50 pb-1">{data.date}</p>

        <div className="flex flex-col gap-[0.5]">
          <p className=" font-bold">
            참여 ({data.참여}명): <span className="font-medium text-zinc-500">{data.availableList || '없음'}</span>
          </p>
          <p className=" font-bold">
            불참 ({data.불참}명): <span className="font-medium text-zinc-500">{data.absentList || '없음'}</span>
          </p>
          <p className=" font-bold">
            미투표 ({data.미투표}명): <span className="font-medium text-zinc-500">{data.pendingList || '없음'}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};
