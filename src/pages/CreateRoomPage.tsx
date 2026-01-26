import {useState} from "react";
import NameInputStep from "@/components/createRoom/NameInputStep.tsx";
import CalendarStep from "@/components/createRoom/CalendarStep.tsx";
import CreateSuccessStep from "@/components/createRoom/CreateSuccessStep.tsx";

export interface RoomData {
  name: string;
  dates: string[];
}

const CreateRoomPage = () => {
  const [step, setStep] = useState<'NAME' | 'CALENDAR' | 'SUCCESS'>('NAME');
  const [roomData, setRoomData] = useState<RoomData>({name: '', dates: []});

  console.log(roomData)

  return (
      <>
        {step === 'NAME' && (
            <NameInputStep
                meetingName={roomData.name}
                onNext={(name: string) => {
                  setRoomData(prev => ({...prev, name}));
                  setStep('CALENDAR');
                }}
            />
        )}

        {step === "CALENDAR" && (
            <CalendarStep
                meetingName={roomData.name}
                onPrev={() => setStep("NAME")}
                onNext={(dates) => {
                  setRoomData(prev => ({...prev, dates: dates}))
                  setStep('SUCCESS')
                  // BE 통신 로직 필요
                }}
            />
        )}

        {step === "SUCCESS" && (
            <CreateSuccessStep roomData={roomData}/>
        )}
      </>
  );
};

export default CreateRoomPage;