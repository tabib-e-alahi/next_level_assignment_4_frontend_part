export type Category = {
  id: string
  name: string
  slug?: string
  description?: string 
  image?: string 
  logo: string
  createdAt: string
  updatedAt: string
}

export type GetCategoriesResponse = {
  success: boolean
  message: string
  data: Category[]
}