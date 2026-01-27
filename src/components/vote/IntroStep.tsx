import BottomButton from "@/components/shared/BottomButton.tsx";
import type {FC} from "react";
import Question from "@/components/shared/Question.tsx";

type Props = {
  onNext: () => void
}

const IntroStep: FC<Props> = ({onNext}) => {
  return (
      <div>
        <Question title='👋🏻 환영합니다! OOO 모임에 초대되었습니다.'/>

        <BottomButton text='시작하기' onClick={onNext}/>
      </div>
  );
};

export default IntroStep;