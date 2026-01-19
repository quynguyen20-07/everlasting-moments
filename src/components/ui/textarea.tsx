import { cn } from "@/lib/utils";
import * as React from "react";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full resize-none \
          rounded-2xl bg-background px-4 py-3 \
          text-base md:text-sm \
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
Textarea.displayName = "Textarea";

export { Textarea };
