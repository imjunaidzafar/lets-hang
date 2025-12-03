"use client"

interface EventFeaturesPanelProps {
  activeModules: string[]
  onToggleModule: (module: string) => void
}

export function EventFeaturesPanel({ activeModules, onToggleModule }: EventFeaturesPanelProps) {
  const modules = [
    { id: "capacity", label: "Capacity"},
    { id: "gallery", label: "Photo gallery"},
    { id: "links", label: "Links" },
  ]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => onToggleModule(module.id)}
            className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeModules.includes(module.id)
                ? "bg-[#8B6BA3] text-white"
                : "bg-[#6B5B7F]/40 text-white/70 hover:bg-[#6B5B7F]/60 border border-white/20"
            }`}
          >
            <span>+</span>
            <span>{module.label}</span>
          </button>
        ))}
        <button className="text-white/50 hover:text-white/70 transition-colors text-sm font-medium cursor-pointer">Show more</button>
      </div>

    </div>
  )
}
