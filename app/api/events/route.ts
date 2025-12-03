import { NextRequest, NextResponse } from "next/server"
import { eventSchema } from "@/lib/validations"
import { eventStore } from "@/lib/db"
import { rateLimiters } from "@/lib/rate-limit"

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - get IP from headers
    const forwardedFor = request.headers.get("x-forwarded-for")
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : request.headers.get("x-real-ip") ?? "anonymous"
    const rateLimitResult = rateLimiters.strict.check(ip)

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": rateLimitResult.limit.toString(),
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": new Date(rateLimitResult.reset).toISOString(),
            "Retry-After": Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString(),
          },
        }
      )
    }

    const body = await request.json()

    // Validate the event data
    const validationResult = eventSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.errors },
        { status: 400 }
      )
    }

    // Create event
    const event = {
      id: crypto.randomUUID(),
      data: validationResult.data,
      createdAt: new Date().toISOString(),
    }

    eventStore.add(event)

    return NextResponse.json(
      { success: true, event },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to create event",
        message: process.env.NODE_ENV === "development" && error instanceof Error
          ? error.message
          : "An error occurred"
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const events = eventStore.getAll()
    return NextResponse.json({
      events,
      count: events.length
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch events",
        message: process.env.NODE_ENV === "development" && error instanceof Error
          ? error.message
          : "An error occurred"
      },
      { status: 500 }
    )
  }
}
