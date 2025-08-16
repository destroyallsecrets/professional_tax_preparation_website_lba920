import { cn } from "../../lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  color?: "gold" | "white" | "current";
}

export function LoadingSpinner({ 
  size = "md", 
  className,
  color = "gold" 
}: LoadingSpinnerProps) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8",
    xl: "h-12 w-12"
  };

  const colors = {
    gold: "border-gold",
    white: "border-white",
    current: "border-current"
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-transparent",
        `${colors[color]} border-t-transparent`,
        sizes[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

interface LoadingStateProps {
  loading: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export function LoadingState({ 
  loading, 
  children, 
  fallback,
  className 
}: LoadingStateProps) {
  if (loading) {
    return (
      <div className={cn("flex items-center justify-center p-8", className)}>
        {fallback || <LoadingSpinner size="lg" />}
      </div>
    );
  }

  return <>{children}</>;
}