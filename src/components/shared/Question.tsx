import type {FC} from "react";

type Props = {
  title: string
  subTitle?: string
}

const Question: FC<Props> = ({title, subTitle}) => {
  return (
      <>
        <p className='text-xl mb-2'>{title}</p>
        <p className='text-sm text-zinc-500'>{subTitle}</p>
      </>
  );
};

export default Question;