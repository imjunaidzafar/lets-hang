/**
 * Sanitization utilities for user input
 */

/**
 * Sanitize string input to prevent XSS attacks
 * Removes HTML tags and dangerous characters
 */
export function sanitizeString(input: string): string {
  if (!input) return ""

  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim()
}

/**
 * Sanitize HTML content - strips all HTML tags
 */
export function stripHtml(input: string): string {
  if (!input) return ""
  return input.replace(/<[^>]*>/g, "")
}

/**
 * Sanitize phone number - removes non-numeric characters except + and spaces
 */
export function sanitizePhoneNumber(input: string): string {
  if (!input) return ""
  return input.replace(/[^\d\s+()-]/g, "")
}

/**
 * Sanitize price - ensures only valid price format
 */
export function sanitizePrice(input: string): string {
  if (!input) return ""
  // Remove everything except digits, decimal point, and dollar sign
  return input.replace(/[^\d.$ ]/g, "").trim()
}

/**
 * Validate and sanitize URL
 */
export function sanitizeUrl(url: string): string | null {
  if (!url) return null

  try {
    const parsed = new URL(url)
    // Only allow http and https protocols
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null
    }
    return parsed.toString()
  } catch {
    return null
  }
}

/**
 * Truncate string to maximum length
 */
export function truncateString(input: string, maxLength: number): string {
  if (!input || input.length <= maxLength) return input
  return input.substring(0, maxLength)
}
