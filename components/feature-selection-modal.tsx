"use client"

import { useState } from "react"

interface FeatureSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onAddFeature: (featureId: string) => void
}

export function FeatureSelectionModal({ isOpen, onClose, onAddFeature }: FeatureSelectionModalProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const features = [
    {
      id: "questionnaires",
      name: "Questionnaires",
      description: "Create questionnaires for your event. Hosts can create questions and view respon...",
      pricing: "Free",
      events: "446",
      likes: "406",
      icon: "📋",
    },
    {
      id: "new-section",
      name: "New section",
      description: "Add a custom section to showcase anything you want on your event page.",
      pricing: "Free",
      events: "817",
      likes: "277",
      icon: "📄",
    },
    {
      id: "invite",
      name: "Invite",
      description: "Personally invite each and every guest within seconds",
      pricing: "Paid",
      events: "340k",
      likes: "150k",
      icon: "✉️",
    },
    {
      id: "photo-gallery",
      name: "Photo Gallery",
      description: "Add photos for guests to view and relive the vibe.",
      pricing: "Free",
      events: "342",
      likes: "302",
      icon: "🖼️",
    },
    {
      id: "links",
      name: "Links",
      description: "Share links to event guides, menus, playlists, and more.",
      pricing: "Free",
      events: "832",
      likes: "292",
      icon: "🔗",
    },
    {
      id: "announcements",
      name: "Announcements",
      description: "Post updates & messages to keep your guests informed.",
      pricing: "Free",
      events: "686",
      likes: "146",
      icon: "⚡",
    },
  ]

  const filteredFeatures = features.filter(
    (feature) =>
      feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      
      <div className="relative z-10 w-full max-w-2xl bg-[#2a2a3a] rounded-2xl p-8 mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6 sticky top-0 bg-[#2a2a3a] pb-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>🎨</span>
            Customize
          </h2>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        
        <div className="mb-6 relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search for features"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#3a3a4a] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/50 outline-none focus:border-white/30 transition-colors"
          />
        </div>

        
        <div className="space-y-4">
          {filteredFeatures.map((feature) => (
            <div
              key={feature.id}
              className="flex items-start justify-between bg-[#3a3a4a] hover:bg-[#4a4a5a] border border-white/10 rounded-xl p-4 transition-colors"
            >
              <div className="flex items-start gap-4 flex-1">
                <span className="text-3xl mt-1">{feature.icon}</span>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-1">{feature.name}</h3>
                  <p className="text-white/60 text-sm mb-3">{feature.description}</p>
                  <div className="flex gap-4 text-white/50 text-xs">
                    <span>{feature.pricing}</span>
                    <span className="flex items-center gap-1">👥 {feature.events} events</span>
                    <span className="flex items-center gap-1">❤️ {feature.likes}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  onAddFeature(feature.id)
                  onClose()
                }}
                className="flex-shrink-0 ml-4 w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold flex items-center justify-center transition-all"
              >
                +
              </button>
            </div>
          ))}
        </div>

        {filteredFeatures.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60">No features found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
