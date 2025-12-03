// File upload constants
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB in bytes
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

// Form validation constants
export const MAX_EVENT_NAME_LENGTH = 100
export const MAX_TICKET_NAME_LENGTH = 40
export const MAX_TICKET_DESCRIPTION_LENGTH = 200
export const MAX_EVENT_DESCRIPTION_LENGTH = 1000
export const MAX_LOCATION_LENGTH = 200

// Phone number validation
export const PHONE_NUMBER_REGEX = /^\+?[1-9]\d{1,14}$/

// Price validation
export const PRICE_REGEX = /^\d+(\.\d{1,2})?$/
export const MIN_PRICE = 0.01
export const MIN_TICKETS = 1

// Toast configuration
export const TOAST_DURATION = 5000 // 5 seconds

// Time format validation
export const TIME_FORMAT_REGEX = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i
