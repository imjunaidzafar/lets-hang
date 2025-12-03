"use client"

import type { EventData } from "@/lib/types"

interface EventCustomizationPanelProps {
  eventData: EventData
  activeModules: string[]
  onBack: () => void
}

export function EventCustomizationPanel({ eventData, activeModules, onBack }: EventCustomizationPanelProps) {
  const customizableModules = [
    { id: "capacity", label: "Capacity", icon: "👥" },
    { id: "gallery", label: "Photo gallery", icon: "🖼️" },
    { id: "links", label: "Links", icon: "🔗" },
    { id: "music", label: "Music", icon: "🎵" },
    { id: "rsvp", label: "RSVP", icon: "✉️" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2.5">
        <button onClick={onBack} className="text-white/60 hover:text-white transition-colors cursor-pointer" aria-label="Go back">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-2xl font-bold text-white">Customize your event your way</h3>
      </div>

      
      <div className="bg-[#6B5B7F]/40 backdrop-blur-sm border border-white/20 rounded-2xl p-8 min-h-[250px] flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-4 right-4 opacity-30 text-3xl">🔗</div>
        <div className="absolute bottom-8 right-12 opacity-30 text-3xl">📸</div>
        <div className="absolute top-12 left-8 opacity-30 text-3xl">📢</div>
        <div className="absolute bottom-4 left-1/3 opacity-30 text-3xl">👥</div>
        <div className="absolute top-1/3 right-1/4 opacity-30 text-3xl">✉️</div>

        <div className="relative z-10 text-center">
          <p className="text-white/80 text-lg font-medium mb-2">Customize your</p>
          <p className="text-white text-2xl font-bold">event your way</p>
        </div>
      </div>

      
      <div className="space-y-3">
        <p className="text-white/60 text-sm font-medium">Available modules:</p>
        <div className="grid grid-cols-2 gap-3">
          {customizableModules.map((module) => (
            <div
              key={module.id}
              className="bg-[#6B5B7F]/40 hover:bg-[#6B5B7F]/60 backdrop-blur-sm border border-white/20 rounded-xl p-4 cursor-pointer transition-all text-center"
            >
              <span className="text-2xl mb-2 block">{module.icon}</span>
              <p className="text-white/80 text-sm font-medium">{module.label}</p>
            </div>
          ))}
        </div>
      </div>

      
      <button
        onClick={onBack}
        className="w-full bg-[#6B5B7F] hover:bg-[#7A6A8E] text-white py-3 px-4 rounded-lg font-medium transition-colors cursor-pointer"
      >
        ← Back to event
      </button>
    </div>
  )
}
