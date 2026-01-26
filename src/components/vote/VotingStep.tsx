import type {FC} from "react";
import BottomButton from "@/components/shared/BottomButton.tsx";

type Props = {
  onPrev: () => void
  onNext: () => void
}

const VotingStep: FC<Props> = ({onPrev, onNext}) => {
  return (
      <div>
        캘린더 날짜 투표

        <BottomButton text='다음' onClick={onNext} onPrev={onPrev}/>
      </div>
  );
};

export default VotingStep;