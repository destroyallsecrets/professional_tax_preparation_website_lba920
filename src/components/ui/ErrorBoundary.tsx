import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "./Button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">⚠️</div>
            <h2 className="text-2xl font-bold text-gold mb-4">
              Something went wrong
            </h2>
            <p className="text-gold-light mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <div className="space-y-3">
              <Button onClick={this.handleReset} variant="primary">
                Try Again
              </Button>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
              >
                Refresh Page
              </Button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gold-light hover:text-gold">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 p-4 bg-black-light rounded-lg text-xs text-red-400 overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}