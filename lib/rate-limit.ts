/**
 * Simple in-memory rate limiter
 * For production, use a distributed solution like Redis
 */

interface RateLimitStore {
  count: number
  resetTime: number
}

const store = new Map<string, RateLimitStore>()

export interface RateLimitConfig {
  interval: number // Time window in milliseconds
  maxRequests: number // Maximum requests per interval
}

export function rateLimit(config: RateLimitConfig) {
  const { interval, maxRequests } = config

  return {
    check: (identifier: string): { success: boolean; limit: number; remaining: number; reset: number } => {
      const now = Date.now()
      const record = store.get(identifier)

      // Clean up expired entries
      if (record && now > record.resetTime) {
        store.delete(identifier)
      }

      const currentRecord = store.get(identifier)

      if (!currentRecord) {
        // First request
        const resetTime = now + interval
        store.set(identifier, { count: 1, resetTime })
        return {
          success: true,
          limit: maxRequests,
          remaining: maxRequests - 1,
          reset: resetTime,
        }
      }

      if (currentRecord.count >= maxRequests) {
        // Rate limit exceeded
        return {
          success: false,
          limit: maxRequests,
          remaining: 0,
          reset: currentRecord.resetTime,
        }
      }

      // Increment count
      currentRecord.count++
      store.set(identifier, currentRecord)

      return {
        success: true,
        limit: maxRequests,
        remaining: maxRequests - currentRecord.count,
        reset: currentRecord.resetTime,
      }
    },
  }
}

// Preset configurations
export const rateLimiters = {
  strict: rateLimit({ interval: 60 * 1000, maxRequests: 5 }), // 5 requests per minute
  moderate: rateLimit({ interval: 60 * 1000, maxRequests: 20 }), // 20 requests per minute
  lenient: rateLimit({ interval: 60 * 1000, maxRequests: 100 }), // 100 requests per minute
}
