import {useState} from "react";
import IntroStep from "@/components/vote/IntroStep.tsx";
import IdentityStep from "@/components/vote/IdentityStep.tsx";
import VotingStep from "@/components/vote/VotingStep.tsx";
import DoneStep from "@/components/vote/DoneStep.tsx";
import type {RoomData} from "@/pages/CreateRoomPage.tsx";

type VoteStep = "INTRO" | "NAME" | "VOTING" | "DONE"

const VotePage = () => {
  const [step, setStep] = useState<VoteStep>("INTRO");
  const [memberData, setMemberData] = useState<RoomData>({name: '', dates: []});

  return (
      <>
        {step === "INTRO" && (
            <IntroStep onNext={() => setStep("NAME")}/>
        )}

        {step === "NAME" && (
            <IdentityStep
                onPrev={() => setStep("INTRO")}
                onNext={(name: string) => {
                  setMemberData(prev => ({...prev, name}));
                  setStep('VOTING');
                }}
                memberName={memberData.name}
            />
        )}

        {step === "VOTING" && (
            <VotingStep
                onPrev={() => setStep("NAME")}
                onNext={() => setStep("DONE")}/>
        )}

        {step === "DONE" && (
            <DoneStep/>
        )}
      </>
  );
};

export default VotePage;