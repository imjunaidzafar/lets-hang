"use client"

import { useState } from "react"

interface EventFeaturesPanelProps {
  activeModules: string[]
  onToggleModule: (module: string) => void
}

export function EventFeaturesPanel({ activeModules, onToggleModule }: EventFeaturesPanelProps) {
  const [showMore, setShowMore] = useState(false)

  const visibleModules = [
    { id: "capacity", label: "Capacity" },
    { id: "gallery", label: "Photo gallery" },
    { id: "links", label: "Links" },
  ]

  const moreModules = [
    { id: "privacy", label: "Privacy" },
    { id: "announcements", label: "Announcements" },
    { id: "schedule", label: "Schedule" },
  ]

  const allModules = showMore ? [...visibleModules, ...moreModules] : visibleModules

  return (
    <div className="space-y-4">
      {activeModules.length > 0 && (
        <div className="space-y-3">
          {activeModules.includes("capacity") && (
            <div className="bg-[#6B5B7F]/40 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <label className="text-white font-medium text-sm">Capacity</label>
                <button
                  onClick={() => onToggleModule("capacity")}
                  className="text-white/60 hover:text-white/90 text-xs cursor-pointer"
                >
                  Remove
                </button>
              </div>
              <input
                type="number"
                placeholder="Maximum number of guests"
                className="w-full bg-transparent text-white placeholder-white/50 outline-none"
                min="1"
              />
            </div>
          )}

          {activeModules.includes("gallery") && (
            <div className="bg-[#6B5B7F]/40 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <label className="text-white font-medium text-sm">Photo Gallery</label>
                <button
                  onClick={() => onToggleModule("gallery")}
                  className="text-white/60 hover:text-white/90 text-xs cursor-pointer"
                >
                  Remove
                </button>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                className="w-full text-white/70 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#8B6BA3] file:text-white file:cursor-pointer hover:file:bg-[#9A7AB2]"
              />
            </div>
          )}

          {activeModules.includes("links") && (
            <div className="bg-[#6B5B7F]/40 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <label className="text-white font-medium text-sm">Links</label>
                <button
                  onClick={() => onToggleModule("links")}
                  className="text-white/60 hover:text-white/90 text-xs cursor-pointer"
                >
                  Remove
                </button>
              </div>
              <input
                type="url"
                placeholder="Add a link (e.g., menu, playlist)"
                className="w-full bg-transparent text-white placeholder-white/50 outline-none"
              />
            </div>
          )}

          {activeModules.includes("privacy") && (
            <div className="bg-[#6B5B7F]/40 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <label className="text-white font-medium text-sm">Privacy</label>
                <button
                  onClick={() => onToggleModule("privacy")}
                  className="text-white/60 hover:text-white/90 text-xs cursor-pointer"
                >
                  Remove
                </button>
              </div>
              <select className="w-full bg-transparent text-white outline-none">
                <option value="public" className="bg-[#6B5B7F]">Public</option>
                <option value="private" className="bg-[#6B5B7F]">Private</option>
                <option value="invite-only" className="bg-[#6B5B7F]">Invite Only</option>
              </select>
            </div>
          )}

          {activeModules.includes("announcements") && (
            <div className="bg-[#6B5B7F]/40 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <label className="text-white font-medium text-sm">Announcements</label>
                <button
                  onClick={() => onToggleModule("announcements")}
                  className="text-white/60 hover:text-white/90 text-xs cursor-pointer"
                >
                  Remove
                </button>
              </div>
              <textarea
                placeholder="Post updates for your guests"
                className="w-full bg-transparent text-white placeholder-white/50 outline-none min-h-[60px] resize-none"
              />
            </div>
          )}

          {activeModules.includes("schedule") && (
            <div className="bg-[#6B5B7F]/40 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <label className="text-white font-medium text-sm">Schedule</label>
                <button
                  onClick={() => onToggleModule("schedule")}
                  className="text-white/60 hover:text-white/90 text-xs cursor-pointer"
                >
                  Remove
                </button>
              </div>
              <textarea
                placeholder="Add event timeline (e.g., 5:00 PM - Arrival, 6:00 PM - Dinner)"
                className="w-full bg-transparent text-white placeholder-white/50 outline-none min-h-[60px] resize-none"
              />
            </div>
          )}
        </div>
      )}
      <div className="flex flex-wrap gap-3">
        {allModules.map((module) => (
          <button
            key={module.id}
            onClick={() => onToggleModule(module.id)}
            className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 cursor-pointer ${activeModules.includes(module.id)
                ? "bg-[#8B6BA3] text-white"
                : "bg-[#6B5B7F]/40 text-white/70 hover:bg-[#6B5B7F]/60 border border-white/20"
              }`}
          >
            <span>+</span>
            <span>{module.label}</span>
          </button>
        ))}
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-white/50 hover:text-white/70 transition-colors text-sm font-medium cursor-pointer"
        >
          {showMore ? "Show less" : "Show more"}
        </button>
      </div>
    </div>
  )
}
