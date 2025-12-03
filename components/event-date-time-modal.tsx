"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface EventDateTimeModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (startDate: Date, startTime: string, endDate: Date, endTime: string) => void
  initialStartDate?: Date
  initialStartTime?: string
  initialEndDate?: Date
  initialEndTime?: string
}

export function EventDateTimeModal({
  isOpen,
  onClose,
  onSave,
  initialStartDate = new Date(),
  initialStartTime = "04:00 PM",
  initialEndDate = new Date(),
  initialEndTime = "05:00 PM",
}: EventDateTimeModalProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(initialStartDate))
  const [selectedStartDate, setSelectedStartDate] = useState(new Date(initialStartDate))
  const [selectedEndDate, setSelectedEndDate] = useState(new Date(initialEndDate))
  const [startTime, setStartTime] = useState(initialStartTime)
  const [endTime, setEndTime] = useState(initialEndTime)

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    setSelectedStartDate(newDate)
    setSelectedEndDate(newDate)
  }

  const handleSave = () => {
    onSave(selectedStartDate, startTime, selectedEndDate, endTime)
    onClose()
  }

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
    return date.toLocaleDateString("en-US", options)
  }

  // Memoize calendar days for performance
  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-10 flex items-center justify-center text-gray-500 text-sm">
          {new Date(currentMonth.getFullYear(), currentMonth.getMonth(), -firstDay + i + 1).getDate()}
        </div>,
      )
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        selectedStartDate.getDate() === day &&
        selectedStartDate.getMonth() === currentMonth.getMonth() &&
        selectedStartDate.getFullYear() === currentMonth.getFullYear()
      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`h-10 rounded-md text-sm font-medium transition-colors ${isSelected ? "bg-blue-500 text-white" : "text-white hover:bg-white/10"}`}
        >
          {day}
        </button>,
      )
    }

    // Add empty cells for days after the last day of the month
    const totalCells = days.length
    const remainingCells = 42 - totalCells // 6 rows × 7 days
    for (let i = 1; i <= remainingCells; i++) {
      days.push(
        <div key={`next-${i}`} className="h-10 flex items-center justify-center text-gray-500 text-sm">
          {i}
        </div>,
      )
    }

    return days
  }, [currentMonth, selectedStartDate])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[rgba(58,58,80,0.6)] rounded-2xl p-8 w-full max-w-md shadow-2xl border border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Date and time</h2>
          <button onClick={handleSave} className="text-white/60 hover:text-white transition-colors font-medium cursor-pointer">
            Save
          </button>
        </div>

        {/* Separator */}
        <div className="h-px bg-white/10 mb-6"></div>

        {/* Start Time Section */}
        <div className="mb-6">
          <label className="text-white/70 text-sm font-medium mb-2 block">Starts</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={formatDate(selectedStartDate)}
              readOnly
              className="flex-1 text-white px-3 py-2 rounded-lg text-sm border border-white/10"
            />
            <input
              type="text"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-28 text-white px-3 py-2 rounded-lg text-sm border border-white/10"
              placeholder="04:00 PM"
            />
          </div>
        </div>

        {/* Calendar Section */}
        <div className="mb-6 rounded-xl p-4 border border-white/10">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium text-center flex-1">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button onClick={handlePrevMonth} className="text-blue-400 hover:text-blue-300 p-1">
              <ChevronLeft size={20} />
            </button>
            <button onClick={handleNextMonth} className="text-blue-400 hover:text-blue-300 p-1">
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Day names */}
          <div className="grid grid-cols-7 gap-2 mb-3">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-white/50 text-xs font-semibold">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">{calendarDays}</div>
        </div>

        {/* End Time Section */}
        <div>
          <label className="text-white/70 text-sm font-medium mb-2 block">Ends</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={formatDate(selectedEndDate)}
              readOnly
              className="flex-1 text-white px-3 py-2 rounded-lg text-sm border border-white/10"
            />
            <input
              type="text"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-28 text-white px-3 py-2 rounded-lg text-sm border border-white/10"
              placeholder="05:00 PM"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
