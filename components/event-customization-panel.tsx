"use client"

import type { EventData } from "@/lib/types"

interface EventCustomizationPanelProps {
  eventData: EventData
  activeModules: string[]
  onBack: () => void
  onToggleModule?: (moduleId: string) => void
}

export function EventCustomizationPanel({ eventData, activeModules, onBack, onToggleModule }: EventCustomizationPanelProps) {
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
        <h3 className="text-2xl font-bold text-white">Customize your event your way</h3>
      </div>


      <div className="bg-[#6B5B7F]/40 backdrop-blur-sm border border-white/20 rounded-2xl p-8 min-h-[250px] flex items-center justify-center relative overflow-hidden">
        <div className="pointer-events-none select-none text-white/30">
          <span className="absolute left-16 top-8 text-4xl">📋</span>
          <span className="absolute left-6 top-28 text-4xl">📢</span>
          <span className="absolute left-16 bottom-12 text-4xl">👥</span>
          <span className="absolute right-16 top-10 text-4xl">🔗</span>
          <span className="absolute right-12 top-32 text-4xl">🖼️</span>
          <span className="absolute right-10 bottom-10 text-xl font-bold tracking-[0.2em] uppercase">
            RSVP
          </span>
        </div>

        <div className="relative z-10 text-center">
          <p className="text-white/80 text-lg font-medium mb-2">Customize your</p>
          <p className="text-white text-2xl font-bold">event your way</p>
        </div>
      </div>


      <div className="space-y-3">
        <p className="text-white/60 text-sm font-medium">Available modules:</p>
        <div className="grid grid-cols-2 gap-3">
          {customizableModules.map((module) => {
            const isActive = activeModules.includes(module.id)
            return (
              <button
                key={module.id}
                onClick={() => onToggleModule?.(module.id)}
                className={`backdrop-blur-sm border rounded-xl p-4 cursor-pointer transition-all text-center ${
                  isActive
                    ? "bg-[#8B6BA3] border-[#8B6BA3] ring-2 ring-white/30"
                    : "bg-[#6B5B7F]/40 hover:bg-[#6B5B7F]/60 border-white/20"
                }`}
              >
                <span className="text-2xl mb-2 block">{module.icon}</span>
                <p className="text-white/80 text-sm font-medium">{module.label}</p>
                {isActive && (
                  <div className="mt-2 text-white/60 text-xs">✓ Active</div>
                )}
              </button>
            )
          })}
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
