import BottomButton from "@/components/shared/BottomButton.tsx";
import type {FC} from "react";

type Props = {
  onPrev: () => void
  onNext: () => void
}

const IdentityStep: FC<Props> = ({onPrev, onNext}) => {
  return (
      <div>
        본인의 이름을 입력해주세요

        <BottomButton text='다음' onClick={onNext} onPrev={onPrev}/>
      </div>
  );
};

export default IdentityStep;