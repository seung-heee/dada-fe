import { type FC } from 'react';
import type { RoomData } from '@/pages/CreateRoomPage.tsx';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import Question from '@/components/shared/Question.tsx';
import BottomButton from '@/components/shared/BottomButton.tsx';

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
        description: '친구들에게 링크를 공유해보세요.',
      });
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  return (
    <div className="flex flex-col h-full gap-10">
      <div className="grow space-y-8">
        <Question title={`축하해요! ${roomData.name} 방이 생겼어요.`} />

        <div className="space-y-4 pt-4">
          <p className="text-sm text-(--text-sub) ml-2">친구들에게 링크를 공유해보세요!</p>
          <div
            className="flex items-center justify-between p-4 bg-white border border-(--border-color) rounded-[20px] shadow-sm active:scale-95 transition-transform cursor-pointer"
            onClick={handleCopyLink}
          >
            <span className="text-(--text-main) font-medium truncate mr-4">{shareUrl}</span>
            <button className="text-(--primary-color) font-bold shrink-0">복사</button>
          </div>
          <p className="text-center text-xs text-(--text-sub)">위 박스를 누르면 링크가 바로 복사됩니다.</p>
        </div>
      </div>

      <div className="py-4 mt-auto">
        <BottomButton text="메인으로 돌아가기" onClick={() => navigate('/')} />
      </div>
    </div>
  );
};

export default CreateSuccessStep;
