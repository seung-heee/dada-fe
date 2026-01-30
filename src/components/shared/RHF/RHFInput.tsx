import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils.ts';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const RHFInput = forwardRef<HTMLInputElement, InputProps>(({ className, error, ...props }, ref) => {
  return (
    <div className="w-full space-y-2 group mt-5">
      <input
        ref={ref}
        className={cn(
          'w-full px-4 py-3 rounded-2xl border-2 border-zinc-100 bg-white outline-none transition-all duration-300 placeholder:text-zinc-400',
          'hover:border-emerald-100',
          'focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 focus:bg-white',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/10',

          className,
        )}
        {...props}
      />

      {error && (
        <p className="text-sm font-medium text-red-500 ml-2 mt-1 animate-in fade-in slide-in-from-top-1">{error}</p>
      )}
    </div>
  );
});

// 디버깅할 때 컴포넌트 이름을 명확히 알 수 있게 설정
RHFInput.displayName = 'RHFInput';

export default RHFInput;
