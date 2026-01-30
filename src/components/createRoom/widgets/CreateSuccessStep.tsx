import { type FC } from 'react';
import type { RoomData } from '@/pages/CreateRoomPage.tsx';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import Question from '@/components/shared/Question.tsx';
import BottomButton from '@/components/shared/BottomButton.tsx';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

type Props = {
  roomData: RoomData;
};

const CreateSuccessStep: FC<Props> = ({ roomData }) => {
  const navigate = useNavigate();

  const shareUrl = `${window.location.origin}/vote/${roomData.roomId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast('링크가 복사되었습니다!', {
        description: '친구들에게 링크를 공유해보세요. 🔗',
      });
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  return (
    <div className="flex flex-col h-full gap-10 grow">
      <div className="grow space-y-8">
        <Question
          title={`축하해요! ${roomData.name} 오픈 완료 🎉`}
          subTitle="참여율 100% 달성하러 갑시다. 지금 링크로 소환하세요! 🔗"
        />

        <div className="flex flex-col">
          <DotLottieReact
            src="https://lottie.host/04ce0b10-4d80-4511-b074-6b71a112f1f0/nyRRGortgZ.json"
            loop
            autoplay
            className="w-50 h-50 mx-auto my-20 grow"
          />

          <div className="space-y-2 pt-4 px-5">
            <p className="text-center text-xs text-(--text-sub)">아래 박스를 누르면 링크가 바로 복사됩니다.</p>
            <div
              className="flex items-center justify-between p-4 bg-white border border-(--border-color) rounded-md shadow-sm active:scale-95 transition-transform cursor-pointer"
              onClick={handleCopyLink}
            >
              <span className="text-(--text-main) font-medium truncate mr-4">{shareUrl}</span>
              <button className="text-emerald-400 font-bold shrink-0">COPY</button>
            </div>
          </div>
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
