"use client"

import { useState } from "react"
import { EventInvitationPreview } from "@/components/event-invitation-preview"
import { EventForm } from "@/components/event-form"
import { EventFeaturesPanel } from "@/components/event-features-panel"
import { EventCustomizationPanel } from "@/components/event-customization-panel"
import { PageBackgroundChanger } from "@/components/page-background-changer"
import { useToast } from "@/hooks/use-toast"

export default function EventBuilderPage() {
  const { toast } = useToast()
  const [cardImage, setCardImage] = useState("/images/image.png") // Invitation card image
  const [pageBackground, setPageBackground] = useState("linear-gradient(to bottom, #D4A5D9, #C695BE, #5B3A7D)") // Page background
  const [eventData, setEventData] = useState({
    name: "",
    phone: "",
    dateTime: "",
    location: "",
    costPerPerson: "",
    description: "",
  })
  const [activeModules, setActiveModules] = useState<string[]>([])
  const [showCustomize, setShowCustomize] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formKey, setFormKey] = useState(0)

  const handleEventChange = (field: string, value: string) => {
    setEventData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const toggleModule = (module: string) => {
    setActiveModules((prev) => (prev.includes(module) ? prev.filter((m) => m !== module) : [...prev, module]))
  }

  const handleGoLive = async () => {
    if (isSubmitting) return

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      })

      const result = await response.json()

      if (!response.ok) {
        // Extract detailed validation errors if available
        if (result.details && Array.isArray(result.details) && result.details.length > 0) {
          const errorMessages = result.details.map((detail: { message: string }) => detail.message).join(", ")
          throw new Error(errorMessages)
        }
        throw new Error(result.error || "Failed to create event")
      }

      toast({
        title: "Success! 🎉",
        description: "Your event has been created successfully!",
      })

      // Reset all form state after successful submission
      setEventData({
        name: "",
        phone: "",
        dateTime: "",
        location: "",
        costPerPerson: "",
        description: "",
      })
      setActiveModules([])
      setCardImage("/images/image.png")
      setPageBackground("linear-gradient(to bottom, #D4A5D9, #C695BE, #5B3A7D)")
      setShowCustomize(false)
      setFormKey(prev => prev + 1) // Force remount of child components
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error
          ? error.message
          : "Failed to create event. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="min-h-screen flex justify-center p-4"
      style={{
        backgroundImage: pageBackground.startsWith('linear-gradient')
          ? pageBackground
          : pageBackground.startsWith('url')
          ? pageBackground
          : `url('${pageBackground}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="w-full max-w-7xl">

        <div className="mb-8">
          <h1
            className="text-4xl font-bold text-white"
            style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)", fontFamily: "var(--font-syne)" }}
          >
            let's hang
          </h1>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8">

          <div className="flex flex-col gap-6">
            <EventInvitationPreview key={formKey} backgroundImage={cardImage} onBackgroundChange={setCardImage} />
            <PageBackgroundChanger onBackgroundChange={setPageBackground} />
          </div>


          <div className="flex flex-col gap-6">
            {!showCustomize ? (
              <>
                <EventForm key={formKey} eventData={eventData} onEventChange={handleEventChange} />
                <EventFeaturesPanel activeModules={activeModules} onToggleModule={toggleModule} />

                <div className="relative w-full h-[242px] rounded-3xl bg-[rgba(58,58,80,0.6)] backdrop-blur-xl border border-white/10 px-8 pt-10 pb-6 shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden">

                  <div className="pointer-events-none select-none text-white/30">
                    <span className="absolute left-16 top-8 text-4xl">📋</span>
                    <span className="absolute left-6 top-20 text-4xl">📢</span>
                    <span className="absolute left-16 top-32 text-4xl">👥</span>
                    <span className="absolute right-12 top-6 text-4xl">🔗</span>
                    <span className="absolute right-8 top-24 text-4xl">🖼️</span>
                    <span className="absolute right-8 top-36 text-xl font-bold tracking-[0.2em] uppercase">
                      RSVP
                    </span>
                  </div>


                  <div className="flex flex-col items-center justify-between h-full">
                    <div className="flex-1 flex items-center justify-center">
                      <h2 className="text-white text-lg md:text-xl font-semibold text-center leading-snug">
                        Customize your
                        <br />
                        event your way
                      </h2>
                    </div>


                    <div className="w-full rounded-[10px] bg-white/7 p-1">
                      <button
                        onClick={() => setShowCustomize(true)}
                        className="w-full rounded-lg bg-[rgba(139,107,163,0.5)] hover:bg-[#8B6BA3]/80 text-white py-2.5 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <span>🎨</span>
                        <span>Customize</span>
                      </button>
                    </div>
                  </div>


                  <div className="pointer-events-none absolute inset-x-24 bottom-0 h-2 rounded-full bg-white/20 blur-2xl" />
                </div>

                <button
                  onClick={handleGoLive}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#8B6BA3] to-[#6B5B7F] hover:from-[#9A7AB2] hover:to-[#7A6A8E] text-white py-3 px-4 rounded-lg font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="text-lg mr-2">⏳</span><br />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-lg mr-2">🎊</span><br />
                      <span className="text-[rgba(52,199,89,1)]">Go live</span>
                    </>
                  )}
                </button>

              </>
            ) : (
              <EventCustomizationPanel
                eventData={eventData}
                activeModules={activeModules}
                onBack={() => setShowCustomize(false)}
                onToggleModule={toggleModule}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
