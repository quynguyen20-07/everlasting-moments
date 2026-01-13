import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-elegant font-display",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 font-display",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground font-display",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 font-display",
        ghost: "hover:bg-accent hover:text-accent-foreground font-display",
        link: "text-primary underline-offset-4 hover:underline font-display",
        elegant:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-elegant hover:shadow-glow tracking-wide font-display",
        romantic:
          "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 shadow-soft hover:shadow-elegant font-display",
        blush:
          "bg-secondary text-secondary-foreground hover:bg-blush border border-blush/50 shadow-soft font-display",
        gold: "bg-gradient-to-r from-champagne-dark to-champagne text-primary-foreground hover:opacity-90 hover:text-white shadow-elegant font-display tracking-wider font-display",
        "outline-elegant":
          "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-display",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8 text-base",
        xl: "h-14 rounded-lg px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
