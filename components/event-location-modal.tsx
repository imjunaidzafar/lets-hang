"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface EventLocationModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (location: string) => void
  currentLocation: string
}

export function EventLocationModal({ isOpen, onClose, onSave, currentLocation }: EventLocationModalProps) {
  const [location, setLocation] = useState(currentLocation)
  const { toast } = useToast()

  const handleDetectLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          // Reduce precision for privacy (2 decimal places ≈ 1km accuracy)
          setLocation(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`)
          toast({
            title: "Location detected",
            description: "Your approximate location has been added",
          })
        },
        (error) => {
          let errorMessage = 'Unable to detect location'
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location permission denied. Please allow location access and try again.'
              break
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable. Please try again later.'
              break
            case error.TIMEOUT:
              errorMessage = 'Location request timed out. Please try again.'
              break
          }
          toast({
            title: "Location error",
            description: errorMessage,
            variant: "destructive",
          })
        }
      )
    } else {
      toast({
        title: "Not supported",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      })
    }
  }

  const handleSave = () => {
    onSave(location)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="location-modal-title">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-md bg-[rgba(58,58,80,0.6)] rounded-2xl p-6 mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 id="location-modal-title" className="text-xl font-bold text-white">Location</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors cursor-pointer" aria-label="Close modal">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-[#4a4a5a]/60 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 outline-none focus:border-white/40 transition-colors"
          />

          <button
            onClick={handleDetectLocation}
            className="w-full flex items-center gap-3 bg-[#4a4a5a]/40 hover:bg-[#4a4a5a]/60 border border-white/20 rounded-xl px-4 py-3 transition-colors text-left"
          >
            <svg className="w-5 h-5 text-white/60 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" opacity="0.3" />
              <circle cx="12" cy="12" r="6" opacity="0.6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
            <div>
              <p className="text-white font-medium">Detect the location</p>
              <p className="text-white/50 text-sm">Using GPS</p>
            </div>
          </button>

          <button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all cursor-pointer"
          >
            Save location
          </button>
        </div>
      </div>
    </div>
  )
}
