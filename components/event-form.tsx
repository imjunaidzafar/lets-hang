"use client"

import { useState, lazy, Suspense } from "react"
import type { TicketData } from "@/lib/types"

// Lazy load modals for better performance
const EventDateTimeModal = lazy(() => import("@/components/event-date-time-modal").then(mod => ({ default: mod.EventDateTimeModal })))
const EventLocationModal = lazy(() => import("@/components/event-location-modal").then(mod => ({ default: mod.EventLocationModal })))
const EventTicketModal = lazy(() => import("@/components/event-ticket-modal").then(mod => ({ default: mod.EventTicketModal })))
const FeatureSelectionModal = lazy(() => import("@/components/feature-selection-modal").then(mod => ({ default: mod.FeatureSelectionModal })))

interface EventFormProps {
  eventData: {
    name: string
    phone: string
    dateTime: string
    location: string
    costPerPerson: string
    description: string
  }
  onEventChange: (field: string, value: string) => void
}

export function EventForm({ eventData, onEventChange }: EventFormProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [isTicketOpen, setIsTicketOpen] = useState(false)
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState("04:00 PM")

  const handleDateTimeClick = () => {
    setIsDatePickerOpen(true)
  }

  const handleLocationClick = () => {
    setIsLocationOpen(true)
  }

  const handleLocationSave = (location: string) => {
    onEventChange("location", location)
  }

  const handleTicketSave = (ticketData: TicketData) => {
    onEventChange("costPerPerson", `$${ticketData.price}`)
  }

  const handleDateTimeSave = (startDate: Date, startTime: string, endDate: Date, endTime: string) => {
    const formattedDate = startDate.toISOString().split("T")[0]
    const formattedDateTime = `${formattedDate}T${startTime}`
    onEventChange("dateTime", formattedDateTime)
    setSelectedDate(startDate)
    setSelectedTime(startTime)
    setIsDatePickerOpen(false)
  }

  const displayDate = selectedDate
    ? selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "Date and time"

  return (
    <>
      <div className="space-y-6">
        <h3 className="text-[26px] md:text-[48px] font-bold text-white/50">Name your event</h3>

        {/* Event Name Input */}
        <div className="relative">
          <label htmlFor="event-name" className="sr-only">Event Name</label>
          <div className="flex items-center gap-3 bg-[#6B5B7F]/40 hover:bg-[#6B5B7F]/50 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 transition-colors">
            <span className="text-lg">✨</span>
            <input
              id="event-name"
              type="text"
              placeholder="Enter event name"
              value={eventData.name}
              onChange={(e) => onEventChange("name", e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-white/50
outline-none focus:outline-none focus:ring-0 focus:border-0
focus:bg-transparent active:bg-transparent
[&:-webkit-autofill]:!bg-transparent
[&:-webkit-autofill:hover]:!bg-transparent
[&:-webkit-autofill:focus]:!bg-transparent
[&:-webkit-autofill:active]:!bg-transparent"
              style={{
                backgroundColor: 'transparent',
                WebkitBoxShadow: '0 0 0 1000px transparent inset',
                transition: 'background-color 5000s ease-in-out 0s'
              }}
              aria-label="Event name"
              aria-required="true"
              required
            />
          </div>
        </div>

        {/* Phone Number Input */}
        <div className="relative">
          <div className="flex items-center gap-3 bg-[#6B5B7F]/40 hover:bg-[#6B5B7F]/50 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 transition-colors">
            <span className="text-lg">📱</span>
            <input
              id="phone-number"
              type="tel"
              placeholder="Enter phone number to save the draft"
              value={eventData.phone}
              onChange={(e) => onEventChange("phone", e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-white/50
outline-none focus:outline-none focus:ring-0 focus:border-0
focus:bg-transparent active:bg-transparent
[&:-webkit-autofill]:!bg-transparent
[&:-webkit-autofill:hover]:!bg-transparent
[&:-webkit-autofill:focus]:!bg-transparent
[&:-webkit-autofill:active]:!bg-transparent"
              style={{
                backgroundColor: 'transparent',
                WebkitBoxShadow: '0 0 0 1000px transparent inset',
                transition: 'background-color 5000s ease-in-out 0s'
              }}
              aria-label="Phone number (optional)"
            />
            <button
              className="flex items-center justify-center w-9 h-9 rounded-xl 
             bg-[#8B6BA3]/70 hover:bg-[#8B6BA3]/90 
             text-white shadow-sm transition-all"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>

          </div>
        </div>

        <div className="bg-[#6B5B7F]/50 backdrop-blur-sm border border-white/20 rounded-xl py-3 transition-colors cursor-pointer">
          <div
            onClick={handleDateTimeClick}
            className=" hover:bg-[#6B5B7F]/50  px-4 py-3 transition-colors cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                handleDateTimeClick()
              }
            }}
            aria-label="Select date and time for event"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg" aria-hidden="true">📅</span>
              <span className="text-white">{displayDate}</span>
            </div>
          </div>
          <div className="my-2 w-auto h-px bg-white/20 ml-[20px] mr-[20px]"></div>

          
          <button
            onClick={handleLocationClick}
            className="w-full  hover:bg-[#6B5B7F]/50  px-4 py-3 transition-colors text-left cursor-pointer"
            aria-label="Set event location"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg" style={{ color: "#FF6B6B" }} aria-hidden="true">
                📍
              </span>
              <span className="text-white">{eventData.location || "Location"}</span>
            </div>
          </button>

          <div className="my-2 w-auto h-px bg-white/20 ml-[20px] mr-[20px]"></div>
        
          <button
            onClick={() => setIsTicketOpen(true)}
            className="w-full  hover:bg-[#6B5B7F]/50  px-4 py-3 transition-colors text-left cursor-pointer"
            aria-label="Set ticket price and cost per person"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg" aria-hidden="true">💰</span>
              <span className="text-white">{eventData.costPerPerson || "Cost per person"}</span>
            </div>
          </button>
        </div>

        
        <div className="bg-[#6B5B7F]/40 hover:bg-[#6B5B7F]/50 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 transition-colors">
          <label htmlFor="event-description" className="sr-only">Event Description</label>
          <textarea
            id="event-description"
            placeholder="Describe your event"
            value={eventData.description}
            onChange={(e) => onEventChange("description", e.target.value)}
            className="w-full bg-transparent text-white placeholder-white/50 outline-none min-h-[80px] resize-none
focus:bg-transparent active:bg-transparent
[&:-webkit-autofill]:!bg-transparent
[&:-webkit-autofill:hover]:!bg-transparent
[&:-webkit-autofill:focus]:!bg-transparent
[&:-webkit-autofill:active]:!bg-transparent"
            style={{
              backgroundColor: 'transparent',
              WebkitBoxShadow: '0 0 0 1000px transparent inset',
              transition: 'background-color 5000s ease-in-out 0s'
            }} aria-label="Event description (optional)"
          ></textarea>
        </div>
      </div>


      <Suspense fallback={null}>
        <EventDateTimeModal
          isOpen={isDatePickerOpen}
          onClose={() => setIsDatePickerOpen(false)}
          onSave={handleDateTimeSave}
        />
      </Suspense>

      <Suspense fallback={null}>
        <EventLocationModal
          isOpen={isLocationOpen}
          onClose={() => setIsLocationOpen(false)}
          onSave={handleLocationSave}
          currentLocation={eventData.location}
        />
      </Suspense>

      <Suspense fallback={null}>
        <EventTicketModal isOpen={isTicketOpen} onClose={() => setIsTicketOpen(false)} onSave={handleTicketSave} />
      </Suspense>

      <Suspense fallback={null}>
        <FeatureSelectionModal
          isOpen={isCustomizeOpen}
          onClose={() => setIsCustomizeOpen(false)}
          onAddFeature={(featureId) => {
            // Feature addition would be implemented here
          }}
        />
      </Suspense>
    </>
  )
}
