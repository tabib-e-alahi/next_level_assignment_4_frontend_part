export type SearchParams = {
  search?: string;
  categoryId?: string;
  dietaryTags?: string | string[];
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
};


export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
};


export type Review = {
  id:string
  rating: number
  comment?: string
  customer:{
    name: string
  }
  createdAt: string
};


export type ReviewsCount = {
  reviews: number
  orderItems: number
}

// export type CategoryType = {
//   name: string
// }

export type Meal = {
  id: string
  title: string
  description: string
  price: number
  imageURL: string
  isAvailable: boolean
  category: Category
  dietary_preferences: string[]
  createdAt: string
  updatedAt: string
  reviews: Review[]
  _count: ReviewsCount
}