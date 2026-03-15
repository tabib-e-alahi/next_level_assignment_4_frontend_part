export type ProviderOrderCount = {
  _count: {
    orderItems: number
  }
}

export type Provider = {
  id: string
  userId: string
  businessName: string
  businessSubtitle: string
  businessPhone: string
  businessAdress: string
  description: string
  city: string
  businessLogo: string
  isOpen: boolean
  createdAt: string
  updatedAt: string
  orders: ProviderOrderCount[]
  totalOrderItems: number
}