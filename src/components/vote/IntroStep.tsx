import BottomButton from "@/components/shared/BottomButton.tsx";
import type {FC} from "react";

type Props = {
  onNext: () => void
}

const IntroStep: FC<Props> = ({onNext}) => {
  return (
      <div>
        환영합니다!

        <BottomButton text='시작하기' onClick={onNext}/>
      </div>
  );
};

export default IntroStep;