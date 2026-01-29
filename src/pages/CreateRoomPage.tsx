import { useState } from 'react';
import NameInputStep from '@/components/createRoom/NameInputStep.tsx';
import CalendarStep from '@/components/createRoom/CalendarStep.tsx';
import CreateSuccessStep from '@/components/createRoom/CreateSuccessStep.tsx';
import { toast } from 'sonner';
import MemberInputStep from '@/components/createRoom/MemberInputStep.tsx';

export interface RoomData {
  name: string;
  invitedMembers: string[];
  candidateDates: string[];
}

type step = 'NAME' | 'MEMBER' | 'CALENDAR' | 'SUCCESS';

const CreateRoomPage = () => {
  const [step, setStep] = useState<step>('NAME');
  const [roomData, setRoomData] = useState<RoomData>({ name: '', invitedMembers: [], candidateDates: [] });
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateRoom = async (dates: string[]) => {
    try {
      setIsLoading(true);

      const payload = {
        name: roomData.name,
        invitedMembers: roomData.invitedMembers || [],
        candidateDates: dates,
      };

      console.log('payload: ', payload);

      // BE 통신 로직 & 성공 시 데이터 업데이트 및 다음 스텝 이동
      // setRoomData({...payload});
      setStep('SUCCESS');
    } catch (error) {
      toast.error('방 생성에 실패하였습니다.');
      console.error('방 생성 실패:', error);
    } finally {
      setIsLoading(false);
    }
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
            setRoomData((prev) => ({ ...prev, members }));
            setStep('CALENDAR');
          }}
        />
      )}

      {step === 'CALENDAR' && (
        <CalendarStep
          meetingName={roomData.name}
          onPrev={() => setStep('MEMBER')}
          onNext={handleCreateRoom}
          isLoading={isLoading}
        />
      )}

      {step === 'SUCCESS' && <CreateSuccessStep roomData={roomData} />}
    </>
  );
};

export default CreateRoomPage;
