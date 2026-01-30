import Question from '@/components/shared/Question.tsx';
import BottomButton from '@/components/shared/BottomButton.tsx';
import { useNavigate } from 'react-router';
import type { FC } from 'react';

type Props = {
  roomId: string;
};

const DoneStep: FC<Props> = ({ roomId }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Question title={`투표 완료! 우리의 '다 되는 날'은 언제일까요?`} />

      <BottomButton text="투표 결과 보러가기" onClick={() => navigate(`/dashboard/${roomId}`)} />
    </div>
  );
};

export default DoneStep;
