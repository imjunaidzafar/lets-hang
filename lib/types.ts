// Event-related types
export interface EventData {
  name: string
  phone: string
  dateTime: string
  location: string
  costPerPerson: string
  description: string
}

export interface TicketData {
  ticketName: string
  ticketDescription: string
  price: string
  totalTickets: string
  requireApproval: boolean
}

export interface DateTimeData {
  startDate: Date
  startTime: string
  endDate: Date
  endTime: string
}

export interface LocationData {
  address: string
  coordinates?: {
    latitude: number
    longitude: number
  }
}

// Module types
export interface ModuleItem {
  id: string
  label: string
  icon: string
  enabled?: boolean
}

export interface CustomizableModule {
  id: string
  label: string
  icon: string
}
