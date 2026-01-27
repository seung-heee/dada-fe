// 1. 하드코딩된 참여자 명단
import DashboardHeader from "@/components/dashboard/DashboardHeader.tsx";
import RankingSection from "@/components/dashboard/RankingSection.tsx";

const DUMMY_PARTICIPANTS = ["승희", "민수", "영희", "지민", "도현", "지혜"];

const DashboardPage = () => {
  return (
      <div className="min-h-screen pb-20 px-2">
        <DashboardHeader
            meetingName="2월 정기 모임 🍺"
            participants={DUMMY_PARTICIPANTS}
        />

        <RankingSection/>
      </div>
  );
};

export default DashboardPage;