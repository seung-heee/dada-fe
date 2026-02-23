import { useState } from 'react';
import IntroStep from '@/components/vote/widget/IntroStep.tsx';
import IdentityStep from '@/components/vote/widget/IdentityStep.tsx';
import VotingStep from '@/components/vote/widget/VotingStep.tsx';
import DoneStep from '@/components/vote/widget/DoneStep.tsx';
import { useGetRoom, useVoteForRoom } from '@/api/generated/room/room.ts';
import { Navigate, useParams } from 'react-router';
import LoadingPage from '@/pages/LoadingPage.tsx';

type VoteStep = 'INTRO' | 'NAME' | 'VOTING' | 'DONE';

type MemberData = {
  name: string;
  dates: string[];
};

const VotePage = () => {
  const [step, setStep] = useState<VoteStep>('INTRO');
  const [memberData, setMemberData] = useState<MemberData>({ name: '', dates: [] });
  const { roomId } = useParams();
  const { data: roomInfo, isLoading, isError } = useGetRoom(roomId as string);
  const { mutate } = useVoteForRoom({
    mutation: {
      onSuccess: (response) => {
        console.log(response);
      },
      onError: (error) => {
        console.error(error);
      },
    },
  });

  if (isLoading) return <LoadingPage />;

  if (isError || !roomInfo?.data) {
    return <Navigate to="/404" replace />;
  }

  const handleCompleteVote = (dates: string[]) => {
    if (!roomId) return;
    setMemberData((prev) => ({ ...prev, dates }));

    const data = {
      memberName: memberData.name,
      selectedDates: dates,
    };

    mutate({ roomId, data });
    setStep('DONE');
  };

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
          participantNames={roomInfo?.data.participantNames}
        />
      )}

      {step === 'VOTING' && (
        <VotingStep
          candidateDates={roomInfo?.data.candidateDates || []}
          memberName={memberData.name}
          onPrev={() => setStep('NAME')}
          onNext={handleCompleteVote}
        />
      )}

      {step === 'DONE' && <DoneStep roomId={roomId || ''} />}
    </>
  );
};

export default VotePage;
