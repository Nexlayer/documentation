import React from 'react';

interface MdxErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface MdxErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class MdxErrorBoundary extends React.Component<MdxErrorBoundaryProps, MdxErrorBoundaryState> {
  constructor(props: MdxErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can log the error to an error reporting service here
    if (process.env.NODE_ENV !== 'production') {
      console.error('MDX rendering error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 bg-red-100 text-red-800 rounded">
          <strong>MDX Error:</strong> {this.state.error?.message}
        </div>
      );
    }
    return this.props.children;
  }
} 