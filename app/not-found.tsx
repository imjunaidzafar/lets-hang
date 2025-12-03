"use client"

import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D4A5D9] via-[#C695BE] to-[#5B3A7D] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-[rgba(58,58,80,0.6)] backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-2xl">
          {/* 404 Icon */}
          <div className="text-8xl mb-6">🤔</div>

          {/* Error Code */}
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>

          {/* Error Message */}
          <h2 className="text-2xl font-semibold text-white/90 mb-4">
            Page Not Found
          </h2>

          <p className="text-white/70 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all"
            >
              🏠 Go Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="block w-full border border-white/20 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/5 transition-colors"
            >
              ← Go Back
            </button>
          </div>

          {/* Additional Help */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-white/60 text-sm">
              Need help? Try creating a new event or check your URL.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
