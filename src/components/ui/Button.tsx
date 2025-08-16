import { forwardRef } from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = "primary", 
    size = "md", 
    loading = false,
    leftIcon,
    rightIcon,
    children, 
    disabled,
    ...props 
  }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-gold text-black hover:bg-gold-dark focus:ring-gold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]",
      secondary: "bg-black-light text-gold border border-gold-dark hover:bg-gold hover:text-black focus:ring-gold",
      outline: "border-2 border-gold text-gold hover:bg-gold hover:text-black focus:ring-gold",
      ghost: "text-gold hover:bg-gold/10 focus:ring-gold",
      destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
    };
    
    const sizes = {
      sm: "px-3 py-1.5 text-sm rounded-md",
      md: "px-4 py-2 text-base rounded-lg",
      lg: "px-6 py-3 text-lg rounded-lg",
      xl: "px-8 py-4 text-xl rounded-xl"
    };

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          loading && "cursor-wait",
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
        )}
        {leftIcon && !loading && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };