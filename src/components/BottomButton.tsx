import {type ButtonHTMLAttributes, type FC} from 'react';
import {cn} from "@/lib/utils.ts";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isLoading?: boolean; // 로딩 상태 같은 커스텀 옵션 추가
}

const BottomButton: FC<Props> = ({type = "button", text, isLoading, className, disabled, ...props}) => {
  return (
      <div className="fixed bottom-0 left-0 right-0 p-4">
        <div className="max-w-[768px] min-w-[360px] mx-auto px-5">
          <button
              type={type}
              disabled={disabled || isLoading}
              className={cn(
                  "w-full h-12 rounded-md font-bold transition-all",
                  "bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] disabled:bg-zinc-200 my-3 px-5",
                  className
              )}
              {...props}
          >
            {isLoading ? "처리 중..." : text}
          </button>
        </div>
      </div>
  );
};

export default BottomButton;