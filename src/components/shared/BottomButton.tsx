import type {ButtonHTMLAttributes, FC} from "react";
import {cn} from "@/lib/utils.ts";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isLoading?: boolean;
  prevText?: string;
  onPrev?: () => void;
  isPrevDisabled?: boolean;
}

const BottomButton: FC<Props> = ({
                                   type = "submit",
                                   text,
                                   isLoading,
                                   className,
                                   disabled,
                                   prevText = "이전",
                                   onPrev,
                                   isPrevDisabled,
                                   ...props
                                 }) => {
  return (
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white/90 to-transparent">
        <div className="max-w-[768px] min-w-[360px] mx-auto px-5">
          <div className="flex gap-3 w-full my-3"> {/* flex와 gap 추가 */}

            {/* 이전 버튼: onPrev가 있을 때만 렌더링 */}
            {onPrev && (
                <button
                    type="button"
                    onClick={onPrev}
                    disabled={isPrevDisabled || isLoading}
                    className="flex-1 h-12 rounded-md font-bold border border-zinc-200 text-zinc-500 bg-white active:bg-zinc-50 disabled:opacity-50 transition-all"
                >
                  {prevText}
                </button>
            )}

            {/* 다음(메인) 버튼 */}
            <button
                type={type}
                disabled={disabled || isLoading}
                className={cn(
                    "flex-[2] h-12 rounded-md font-bold transition-all", // 이전 버튼보다 조금 더 넓게 배치
                    "bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] disabled:bg-zinc-200 px-5",
                    !onPrev && "flex-1", // 이전 버튼이 없으면 전체 너비 사용
                    className
                )}
                {...props}
            >
              {isLoading ? "처리 중..." : text}
            </button>
          </div>
        </div>
      </div>
  );
};

export default BottomButton