"use client"

import { useState } from "react"

export function Navigation() {
  const [isSignedIn, setIsSignedIn] = useState(false)

  return (
    <nav className="backdrop-blur-sm bg-black/20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>
          let's hang
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#"
            className="text-white/80 hover:text-white transition-colors font-medium"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Home
          </a>
          <a
            href="#"
            className="text-white/80 hover:text-white transition-colors font-medium"
            style={{ fontFamily: "var(--font-display)" }}
          >
            People
          </a>
          <a
            href="#"
            className="text-white/80 hover:text-white transition-colors font-medium"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Search
          </a>
        </div>

        <button
          onClick={() => setIsSignedIn(!isSignedIn)}
          className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full font-medium transition-all backdrop-blur-sm border border-white/30"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {isSignedIn ? "Signed in" : "Sign in"}
        </button>
      </div>
    </nav>
  )
}
