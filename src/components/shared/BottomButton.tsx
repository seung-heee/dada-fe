import type { ButtonHTMLAttributes, FC } from 'react';
import { cn } from '@/lib/utils.ts';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isLoading?: boolean;
  prevText?: string;
  onPrev?: () => void;
  isPrevDisabled?: boolean;
}

const BottomButton: FC<Props> = ({
  type = 'submit',
  text,
  isLoading,
  className,
  disabled,
  prevText = '이전',
  onPrev,
  isPrevDisabled,
  ...props
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-linear-to-t from-white via-white/90 to-transparent">
      <div className="max-w-3xl min-w-90 mx-auto px-5">
        <div className="flex gap-3 w-full my-3">
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

          <button
            type={type}
            disabled={disabled || isLoading}
            className={cn(
              'flex-2 h-12 rounded-md font-bold transition-all',
              'bg-(--primary) text-white hover:bg-(--primary-dark) disabled:bg-zinc-200 px-5',
              !onPrev && 'flex-1',
              className,
            )}
            {...props}
          >
            {isLoading ? '처리 중...' : text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomButton;
