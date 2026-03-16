export type Category = {
  id: string
  name: string
  slug: string | null
  description?: string | null
  image?: string | null
}

export type GetCategoriesResponse = {
  success: boolean
  message: string
  data: Category[]
}