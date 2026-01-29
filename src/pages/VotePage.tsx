import { useState } from 'react';
import IntroStep from '@/components/vote/IntroStep.tsx';
import IdentityStep from '@/components/vote/IdentityStep.tsx';
import VotingStep from '@/components/vote/VotingStep.tsx';
import DoneStep from '@/components/vote/DoneStep.tsx';
import { useGetRoom } from '@/api/generated/room/room.ts';
import { Navigate } from 'react-router';

type VoteStep = 'INTRO' | 'NAME' | 'VOTING' | 'DONE';

type MemberData = {
  name: string;
  dates: [];
};

const VotePage = () => {
  const [step, setStep] = useState<VoteStep>('INTRO');
  const [memberData, setMemberData] = useState<MemberData>({ name: '', dates: [] });

  const { data: roomInfo, isLoading, isError } = useGetRoom('m2JvXgtk');

  if (isLoading) return <>로딩중...</>;

  if (isError || !roomInfo?.data) {
    return <Navigate to="/404" replace />;
  }

  console.log(roomInfo?.data.availableDates);

  return (
    <>
      {step === 'INTRO' && <IntroStep name={roomInfo.data.name} onNext={() => setStep('NAME')} />}

      {step === 'NAME' && (
        <IdentityStep
          onPrev={() => setStep('INTRO')}
          onNext={(name: string) => {
            setMemberData((prev) => ({ ...prev, name }));
            setStep('VOTING');
          }}
          memberName={memberData.name}
          invitedMembers={roomInfo?.data.invitedMembers}
        />
      )}

      {step === 'VOTING' && (
        <VotingStep
          availableDates={roomInfo?.data.availableDates || []}
          memberName={memberData.name}
          onPrev={() => setStep('NAME')}
          onNext={() => setStep('DONE')}
        />
      )}

      {step === 'DONE' && <DoneStep />}
    </>
  );
};

export default VotePage;
