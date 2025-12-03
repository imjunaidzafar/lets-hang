import { z } from "zod"
import {
  MAX_EVENT_NAME_LENGTH,
  MAX_LOCATION_LENGTH,
  MAX_EVENT_DESCRIPTION_LENGTH,
  MAX_TICKET_NAME_LENGTH,
  MAX_TICKET_DESCRIPTION_LENGTH,
  PHONE_NUMBER_REGEX,
  PRICE_REGEX,
  MIN_PRICE,
  MIN_TICKETS,
} from "./constants"

// Event validation schema
export const eventSchema = z.object({
  name: z
    .string()
    .min(1, "Event name is required")
    .max(MAX_EVENT_NAME_LENGTH, `Event name must be less than ${MAX_EVENT_NAME_LENGTH} characters`),
  phone: z
    .string()
    .regex(PHONE_NUMBER_REGEX, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  dateTime: z
    .string()
    .min(1, "Date and time are required")
    .refine((dateTimeStr) => {
      try {
        // Handle both ISO format and custom format
        const date = new Date(dateTimeStr)
        return !isNaN(date.getTime()) && date > new Date()
      } catch {
        return false
      }
    }, "Event date must be a valid date in the future"),
  location: z
    .string()
    .min(1, "Location is required")
    .max(MAX_LOCATION_LENGTH, `Location must be less than ${MAX_LOCATION_LENGTH} characters`),
  costPerPerson: z
    .string()
    .regex(/^\$?\d+(\.\d{1,2})?$/, "Please enter a valid price")
    .refine((price) => {
      if (!price || price === "") return true
      const numPrice = parseFloat(price.replace("$", ""))
      return numPrice >= MIN_PRICE
    }, `Price must be at least $${MIN_PRICE}`)
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .max(MAX_EVENT_DESCRIPTION_LENGTH, `Description must be less than ${MAX_EVENT_DESCRIPTION_LENGTH} characters`)
    .optional()
    .or(z.literal("")),
})

// Ticket validation schema
export const ticketSchema = z.object({
  ticketName: z
    .string()
    .min(1, "Ticket name is required")
    .max(MAX_TICKET_NAME_LENGTH, `Ticket name must be ${MAX_TICKET_NAME_LENGTH} characters or less`),
  ticketDescription: z
    .string()
    .max(MAX_TICKET_DESCRIPTION_LENGTH, `Description must be ${MAX_TICKET_DESCRIPTION_LENGTH} characters or less`)
    .optional()
    .or(z.literal("")),
  price: z
    .string()
    .regex(PRICE_REGEX, "Please enter a valid price")
    .refine((price) => parseFloat(price) >= MIN_PRICE, `Price must be at least $${MIN_PRICE}`),
  totalTickets: z
    .string()
    .regex(/^\d+$/, "Please enter a valid number")
    .refine((tickets) => parseInt(tickets) >= MIN_TICKETS, `Must have at least ${MIN_TICKETS} ticket`),
  requireApproval: z.boolean(),
})

// Location validation schema
export const locationSchema = z.object({
  address: z
    .string()
    .min(1, "Location is required")
    .max(200, "Location must be less than 200 characters"),
  coordinates: z
    .object({
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180),
    })
    .optional(),
})

// Type exports
export type EventFormData = z.infer<typeof eventSchema>
export type TicketFormData = z.infer<typeof ticketSchema>
export type LocationFormData = z.infer<typeof locationSchema>
