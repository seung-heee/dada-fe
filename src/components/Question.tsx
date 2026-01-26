import type {FC} from "react";

type Props = {
  title: string
}

const Question: FC<Props> = ({title}) => {
  return (
      <p className='text-xl mb-5'>{title}</p>
  );
};

export default Question;