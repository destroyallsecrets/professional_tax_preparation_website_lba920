import { forwardRef } from "react";
import { cn } from "../../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type = "text", 
    label, 
    error, 
    helperText, 
    leftIcon, 
    rightIcon, 
    id,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;

    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-gold-light"
          >
            {label}
            {props.required && <span className="text-red-400 ml-1" aria-label="required">*</span>}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gold-dark">{leftIcon}</span>
            </div>
          )}
          
          <input
            type={type}
            id={inputId}
            ref={ref}
            className={cn(
              "w-full px-4 py-3 rounded-lg border transition-all duration-200",
              "bg-black-light text-gold-light placeholder-gold-light/60",
              "border-gold-dark focus:border-gold focus:ring-2 focus:ring-gold/20",
              "focus:outline-none",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={cn(errorId, helperId)}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gold-dark">{rightIcon}</span>
            </div>
          )}
        </div>
        
        {error && (
          <p id={errorId} className="text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p id={helperId} className="text-sm text-gold-light/70">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };