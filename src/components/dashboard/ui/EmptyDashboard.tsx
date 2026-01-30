import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import CopyLink from '@/components/shared/CopyLink.tsx';
import type { FC } from 'react';

type Props = {
  roomId: string;
  meetingName: string;
};

const EmptyDashboard: FC<Props> = ({ roomId, meetingName }) => {
  return (
    <div className="flex flex-col h-[calc(100dvh-96px)]">
      <header className="w-full pb-6 px-1">
        <h1 className="text-2xl font-black text-zinc-900 tracking-tight leading-tight mb-4 italic">{meetingName}</h1>
      </header>

      <div className="grow flex flex-col">
        {/* 2. Lottie 애니메이션: 적절한 크기 조절 */}
        <div className="relative w-40 h-40 mx-auto">
          {/* 배경에 은은한 빛 효과 추가 */}
          <div className="absolute inset-0 bg-emerald-200/30 blur-2xl rounded-full transform scale-75 -z-10"></div>
          <DotLottieReact
            src="https://lottie.host/f33d8dd8-e12f-4791-b726-9ac9731c2586/jU5jaId2E4.lottie"
            loop
            autoplay
            className="w-full h-full"
          />
        </div>

        {/* 3. 텍스트 메시지: 힙한 메인 타이틀 + 친절한 서브 텍스트로 분리 */}
        <div className="space-y-2 max-w-md text-center mx-auto">
          <h3 className="text-xl font-bold text-zinc-800">아직 정적이 흐르는 중... 🍃</h3>
          <p className="text-sm text-zinc-500 leading-relaxed">
            투표함이 너무 가벼워요! <br className="md:hidden" />
            팀원들에게 링크를 '투척'해서 참여율을 떡상시켜 보세요! 🚀
          </p>
        </div>
      </div>

      {/* 4. 링크 복사 버튼: 기존 컴포넌트 활용 */}
      <div className="pt-2 pb-10">
        <CopyLink roomId={roomId || ''} />
      </div>
    </div>
  );
};

export default EmptyDashboard;
