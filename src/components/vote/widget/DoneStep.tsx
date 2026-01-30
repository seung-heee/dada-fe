import Question from '@/components/shared/Question.tsx';
import BottomButton from '@/components/shared/BottomButton.tsx';
import { useNavigate } from 'react-router';
import type { FC } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

type Props = {
  roomId: string;
};

const DoneStep: FC<Props> = ({ roomId }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Question title={`투표 완료! 우리의 '다 되는 날'은 언제일까요?`} />

      <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
        <DotLottieReact
          src="https://lottie.host/04ce0b10-4d80-4511-b074-6b71a112f1f0/nyRRGortgZ.json"
          loop
          autoplay
          className="w-50 h-50 mx-auto my-20 grow"
        />
      </div>

      <BottomButton text="투표 결과 보러가기" onClick={() => navigate(`/dashboard/${roomId}`)} />
    </div>
  );
};

export default DoneStep;
