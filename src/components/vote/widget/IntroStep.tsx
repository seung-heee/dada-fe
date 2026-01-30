import BottomButton from '@/components/shared/BottomButton.tsx';
import type { FC } from 'react';
import Question from '@/components/shared/Question.tsx';

type Props = {
  name?: string;
  onNext: () => void;
};

const IntroStep: FC<Props> = ({ name, onNext }) => {
  return (
    <div>
      <Question
        title={`👋🏻 환영합니다! ${name}에 초대되었습니다.`}
        subTitle="다 같이, 다 되는 날을 찾기 위해, 딱 1분만 빌려주세요. 💌"
      />

      <BottomButton text="시작하기" onClick={onNext} />
    </div>
  );
};

export default IntroStep;
