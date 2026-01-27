import {forwardRef, type InputHTMLAttributes} from "react";
import {cn} from "@/lib/utils.ts";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const RHFInput = forwardRef<HTMLInputElement, InputProps>(
    ({className, error, ...props}, ref) => {
      return (
          <div className="w-full space-y-2">
            <input
                ref={ref}
                className={cn(
                    "customInput",
                    error && "border-red-500 focus:ring-red-500",
                    className
                )}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-500 ml-1 mt-1 animate-in fade-in slide-in-from-top-1">
                  {error}
                </p>
            )}
          </div>
      );
    }
);

// 디버깅할 때 컴포넌트 이름을 명확히 알 수 있게 설정
RHFInput.displayName = "RHFInput";

export default RHFInput;