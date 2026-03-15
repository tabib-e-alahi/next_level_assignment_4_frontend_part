export type Category = {
  [x: string]: string | StaticImport
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