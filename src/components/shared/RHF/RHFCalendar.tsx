import {useController, type Control} from "react-hook-form";
import {Calendar} from "@/components/ui/calendar.tsx";
import type {FC} from "react";

interface Props {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  disabledBefore?: Date;
  selectedLength: number
}

const RHFCalendar: FC<Props> = ({name, control, disabledBefore, selectedLength}) => {
  const {
    field: {value, onChange},
  } = useController({
    name,
    control,
  });

  return (
      <div className='my-8'>
        <Calendar
            mode="multiple"
            selected={value}
            onSelect={onChange}
            className="w-full text-lg my-5 rounded-md"
            disabled={disabledBefore ? {before: disabledBefore} : {before: new Date()}}
        />

        <p className="text-center text-sm text-[var(--text-sub)]">
          현재 <span className="font-bold text-[var(--primary)]">{selectedLength}개</span>의 날짜가 선택되었습니다.
        </p>
      </div>
  );
};

export default RHFCalendar;