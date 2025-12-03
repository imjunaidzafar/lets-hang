"use client"

import React, { Component, type ReactNode } from "react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to error reporting service
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error("Error caught by boundary:", error, errorInfo)
    }
    // In production, send to error tracking service (e.g., Sentry, LogRocket)
    // Example: errorTrackingService.log(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#D4A5D9] via-[#C695BE] to-[#5B3A7D] p-4">
          <div className="bg-[rgba(58,58,80,0.6)] backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-md w-full text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-white/80 mb-6">
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all cursor-pointer"
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-white/60 cursor-pointer mb-2">
                  Error details
                </summary>
                <pre className="text-xs text-white/60 bg-black/20 p-4 rounded-lg overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
