import { cn } from "@/lib/utils";
import * as React from "react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-2xl bg-background px-4 py-2 text-base md:text-sm \
          placeholder:text-muted-foreground \
          shadow-[0_4px_20px_rgba(0,0,0,0.08)] \
          transition-all duration-300 \
          focus-visible:outline-none \
          focus-visible:ring-2 focus-visible:ring-ring/40 \
          focus-visible:ring-offset-0 \
          focus-visible:shadow-[0_6px_30px_rgba(0,0,0,0.15)] \
          disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
