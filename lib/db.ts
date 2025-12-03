// Shared in-memory data store
// In production, replace with a real database

export interface StoredEvent {
  id: string
  data: unknown
  createdAt: string
}

// Singleton pattern to ensure same array is used across all imports
class EventStore {
  private static instance: EventStore
  private events: StoredEvent[] = []

  private constructor() {}

  public static getInstance(): EventStore {
    if (!EventStore.instance) {
      EventStore.instance = new EventStore()
    }
    return EventStore.instance
  }

  public getAll(): StoredEvent[] {
    return this.events
  }

  public getById(id: string): StoredEvent | undefined {
    return this.events.find((e) => e.id === id)
  }

  public add(event: StoredEvent): void {
    this.events.push(event)
  }

  public remove(id: string): boolean {
    const index = this.events.findIndex((e) => e.id === id)
    if (index === -1) return false
    this.events.splice(index, 1)
    return true
  }

  public update(id: string, data: unknown): boolean {
    const event = this.events.find((e) => e.id === id)
    if (!event) return false
    event.data = data
    return true
  }
}

export const eventStore = EventStore.getInstance()
