import { NextRequest, NextResponse } from "next/server"
import { eventStore } from "@/lib/db"

type Params = {
  params: Promise<{
    id: string
  }>
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const event = eventStore.getById(id)

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    return NextResponse.json({ event })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch event",
        message: process.env.NODE_ENV === "development" && error instanceof Error
          ? error.message
          : "An error occurred"
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const deleted = eventStore.remove(id)

    if (!deleted) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Event deleted" })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to delete event",
        message: process.env.NODE_ENV === "development" && error instanceof Error
          ? error.message
          : "An error occurred"
      },
      { status: 500 }
    )
  }
}
