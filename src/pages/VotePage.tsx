import {useState} from "react";
import IntroStep from "@/components/vote/IntroStep.tsx";
import IdentityStep from "@/components/vote/IdentityStep.tsx";
import VotingStep from "@/components/vote/VotingStep.tsx";
import DoneStep from "@/components/vote/DoneStep.tsx";

type VoteStep = "INTRO" | "NAME" | "VOTING" | "DONE"

type MemberData = {
  name: string,
  dates: []
}

const VotePage = () => {
  const [step, setStep] = useState<VoteStep>("INTRO");
  const [memberData, setMemberData] = useState<MemberData>({name: '', dates: []});


  const invitedMembers_MOCK = ["승희", "안드로이드마스터", "선릉역개발왕", "지민", "도현"];
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
                invitedMembers={invitedMembers_MOCK}
            />
        )}

        {step === "VOTING" && (
            <VotingStep
                memberName={memberData.name}
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