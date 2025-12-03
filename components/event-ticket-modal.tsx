"use client"

import { useState } from "react"
import type { TicketData } from "@/lib/types"

interface EventTicketModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (ticketData: TicketData) => void
}

export function EventTicketModal({ isOpen, onClose, onSave }: EventTicketModalProps) {
  const [ticketName, setTicketName] = useState("")
  const [ticketDescription, setTicketDescription] = useState("")
  const [price, setPrice] = useState("1")
  const [totalTickets, setTotalTickets] = useState("10")
  const [requireApproval, setRequireApproval] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)

  const handleSave = () => {
    onSave({ ticketName, ticketDescription, price, totalTickets, requireApproval })
    onClose()
  }

  const toggleFaq = (faq: string) => {
    setExpandedFaq(expandedFaq === faq ? null : faq)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-3 sm:p-4" role="dialog" aria-modal="true" aria-labelledby="ticket-modal-title">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-2xl bg-[rgba(58,58,80,0.6)] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mx-auto my-auto max-h-[95vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 id="ticket-modal-title" className="text-xl sm:text-2xl font-bold text-white">New ticket</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors cursor-pointer" aria-label="Close modal">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="bg-[#3a3a4a] border border-white/10 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 flex gap-2 sm:gap-3">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
          </svg>
          <p className="text-white/80 text-xs sm:text-sm">
            Each ticket let's one guest enter your event. Reselling tickets to someone else's events is not supported.
          </p>
        </div>

        <button
          onClick={() => setShowInfoModal(true)}
          className="w-full flex items-center justify-between bg-[#3a3a4a] hover:bg-[#4a4a5a] border border-white/10 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 transition-colors cursor-pointer"
        >
          <span className="text-white font-medium text-sm sm:text-base">Want to add donation or add ons?</span>
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="text-white font-medium mb-2 block text-sm sm:text-base">Ticket name</label>
            <input
              type="text"
              placeholder="e.g. VIP ticket"
              value={ticketName}
              onChange={(e) => setTicketName(e.target.value.slice(0, 40))}
              className="w-full bg-[#3a3a4a] border border-white/10 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-white/50 outline-none focus:border-white/30 transition-colors"
            />
            <p className="text-white/50 text-xs mt-1 sm:mt-2">{ticketName.length}/40</p>
          </div>

          <div>
            <label className="text-white font-medium mb-2 block text-sm sm:text-base">Ticket description</label>
            <textarea
              placeholder="e.g. You'll receive access to the VIP lounge"
              value={ticketDescription}
              onChange={(e) => setTicketDescription(e.target.value.slice(0, 200))}
              className="w-full bg-[#3a3a4a] border border-white/10 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-white/50 outline-none focus:border-white/30 transition-colors resize-none min-h-[80px] sm:min-h-[100px]"
            />
            <p className="text-white/50 text-xs mt-1 sm:mt-2">{ticketDescription.length}/200</p>
          </div>

          <div>
            <label className="text-white font-medium mb-2 block flex items-center gap-2 text-sm sm:text-base">
              Ticket price & availability
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S15.33 8 14.5 8 13 8.67 13 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S8.33 8 7.5 8 6 8.67 6 9.5s.67 1.5 1.5 1.5zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
              </svg>
            </label>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3 bg-[#3a3a4a] border border-white/10 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                <div className="flex-1 min-w-0">
                  <p className="text-white/60 text-xs">Price</p>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    min="0.01"
                    step="0.01"
                    className="bg-transparent text-white outline-none w-full font-semibold text-sm sm:text-base"
                    aria-label="Ticket price"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 bg-[#3a3a4a] border border-white/10 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-0.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l0.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-0.9-2-2-2z" />
                </svg>
                <div className="flex-1 min-w-0">
                  <p className="text-white/60 text-xs">Total tickets</p>
                  <input
                    type="number"
                    value={totalTickets}
                    onChange={(e) => setTotalTickets(e.target.value)}
                    min="1"
                    step="1"
                    className="bg-transparent text-white outline-none w-full font-semibold text-sm sm:text-base"
                    aria-label="Total number of tickets"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start sm:items-center justify-between gap-3">
            <div className="flex-1">
              <p className="text-white font-medium text-sm sm:text-base">Require approval</p>
              <p className="text-white/50 text-xs sm:text-sm">Guests get tickets instantly after purchase.</p>
            </div>
            <button
              onClick={() => setRequireApproval(!requireApproval)}
              className={`relative w-11 h-6 sm:w-12 sm:h-6 rounded-full transition-colors cursor-pointer flex-shrink-0 ${
                requireApproval ? "bg-gradient-to-r from-pink-500 to-purple-600" : "bg-white/20"
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  requireApproval ? "translate-x-6 sm:translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
          <button
            onClick={onClose}
            className="border border-white/20 text-white font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-sm sm:text-base hover:bg-white/5 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!ticketName || !price}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-sm sm:text-base transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create ticket
          </button>
        </div>
      </div>

      {/* Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowInfoModal(false)} />

          <div className="relative z-10 w-full max-w-lg bg-[rgba(40,40,50,0.95)] rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setShowInfoModal(false)}
                className="text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h3 className="text-xl font-bold text-white">Info</h3>
              <button
                onClick={() => setShowInfoModal(false)}
                className="text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              {/* FAQ 1 */}
              <div className="bg-[#3a3a4a] rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleFaq('addons')}
                  className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-[#4a4a5a] transition-colors"
                >
                  <span className="text-white font-medium">How to add add ons ?</span>
                  <svg
                    className={`w-5 h-5 text-white/60 transition-transform ${expandedFaq === 'addons' ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedFaq === 'addons' && (
                  <div className="px-4 pb-4 text-white/70 text-sm space-y-2">
                    <p>To sell add-ons, first create a ticket for your event. Once your ticket is set up, you'll see an option to add add-ons.</p>
                    <p>Guests can then purchase both the ticket and any add-ons together during checkout.</p>
                  </div>
                )}
              </div>

              {/* FAQ 2 */}
              <div className="bg-[#3a3a4a] rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleFaq('donation')}
                  className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-[#4a4a5a] transition-colors"
                >
                  <span className="text-white font-medium">How to add donation ?</span>
                  <svg
                    className={`w-5 h-5 text-white/60 transition-transform ${expandedFaq === 'donation' ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedFaq === 'donation' && (
                  <div className="px-4 pb-4 text-white/70 text-sm space-y-2">
                    <p className="font-medium text-white/90">To accept donations:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Create a ticket (free or paid) for your event.</li>
                      <li>Add a donation option to your event.</li>
                    </ol>
                    <p className="mt-3">If you only want to collect donations, create a $0 ticket first, then add the donation option.</p>
                    <p className="mt-2">Guests can buy a regular ticket and choose to donate, either your suggested amount or any amount they prefer.</p>
                  </div>
                )}
              </div>

              {/* FAQ 3 */}
              <div className="bg-[#3a3a4a] rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleFaq('resale')}
                  className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-[#4a4a5a] transition-colors"
                >
                  <span className="text-white font-medium">Can I resale tickets on Let's Hang ?</span>
                  <svg
                    className={`w-5 h-5 text-white/60 transition-transform ${expandedFaq === 'resale' ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedFaq === 'resale' && (
                  <div className="px-4 pb-4 text-white/70 text-sm">
                    <p>No, ticket resale isn't supported on Let's Hang. To keep events safe and fair for everyone, tickets can only be used by the original buyer.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}