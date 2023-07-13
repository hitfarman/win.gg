import Link from "next/link";
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen items-center justify-center">
          <div className="flex flex-col items-center gap-5 pb-5 text-center">
            <h1 className="font-header text-4xl font-semibold">Opps!</h1>
            <h2 className="font-header text-2xl font-semibold">
              Something went wrong.
            </h2>
            <h3 className="font-header text-base text-win-slate">
              We are sorry for the inconvenience.
            </h3>
            <Link href="/" className="win-primary-button">
              Back to home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
