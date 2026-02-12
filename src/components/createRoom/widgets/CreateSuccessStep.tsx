import { type FC } from 'react';
import type { RoomData } from '@/pages/CreateRoomPage.tsx';
import { useNavigate } from 'react-router';
import Question from '@/components/shared/Question.tsx';
import BottomButton from '@/components/shared/BottomButton.tsx';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import CopyLink from '@/components/shared/CopyLink.tsx';

type Props = {
  roomData: RoomData;
};

const CreateSuccessStep: FC<Props> = ({ roomData }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full gap-10 grow">
      <div className="grow space-y-3">
        <Question
          title={`축하해요! ${roomData.name} 오픈 완료 🎉`}
          subTitle="참여율 100% 달성하러 갑시다. 지금 링크로 소환하세요! 🔗"
        />
        <CopyLink roomId={roomData.roomId || ''} desc={false} />

        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
          <DotLottieReact
            src="https://lottie.host/04ce0b10-4d80-4511-b074-6b71a112f1f0/nyRRGortgZ.json"
            loop
            autoplay
            className="w-30 h-30 mx-auto my-20 grow"
          />
        </div>

        <BottomButton
          text="결과 리포트 보러가기"
          onClick={() => navigate(`/dashboard/${roomData.roomId}`)}
          prevText="홈으로"
          onPrev={() => navigate('/')}
        />
      </div>
    </div>
  );
};

export default CreateSuccessStep;
