import { useState } from 'react';
import NameInputStep from '@/components/createRoom/NameInputStep.tsx';
import CalendarStep from '@/components/createRoom/CalendarStep.tsx';
import CreateSuccessStep from '@/components/createRoom/CreateSuccessStep.tsx';
import MemberInputStep from '@/components/createRoom/MemberInputStep.tsx';
import { useCreateRoom } from '@/api/generated/room/room.ts';

export interface RoomData {
  roomId?: string;
  name: string;
  invitedMembers: string[];
  candidateDates: string[];
}

type step = 'NAME' | 'MEMBER' | 'CALENDAR' | 'SUCCESS';

const CreateRoomPage = () => {
  const [step, setStep] = useState<step>('NAME');
  const [roomData, setRoomData] = useState<RoomData>({ roomId: '', name: '', invitedMembers: [], candidateDates: [] });

  const { mutate, isPending } = useCreateRoom({
    mutation: {
      onSuccess: (response) => {
        setRoomData((prev) => ({ ...prev, roomId: response.data?.roomId }));
        setStep('SUCCESS');
      },
      onError: (error) => {
        console.error(error);
      },
    },
  });

  const handleCreateRoom = async (dates: string[]) => {
    const payload = {
      name: roomData.name,
      invitedMembers: roomData.invitedMembers || [],
      candidateDates: dates,
    };

    mutate({ data: payload });
  };

  return (
    <>
      {step === 'NAME' && (
        <NameInputStep
          meetingName={roomData.name}
          onNext={(name: string) => {
            setRoomData((prev) => ({ ...prev, name }));
            setStep('MEMBER');
          }}
        />
      )}

      {step === 'MEMBER' && (
        <MemberInputStep
          invitedMembers={roomData.invitedMembers}
          onPrev={() => setStep('NAME')}
          onNext={(members) => {
            setRoomData((prev) => ({ ...prev, invitedMembers: members }));
            setStep('CALENDAR');
          }}
        />
      )}

      {step === 'CALENDAR' && (
        <CalendarStep
          meetingName={roomData.name}
          onPrev={() => setStep('MEMBER')}
          onNext={handleCreateRoom}
          isLoading={isPending}
        />
      )}

      {step === 'SUCCESS' && <CreateSuccessStep roomData={roomData} />}
    </>
  );
};

export default CreateRoomPage;
