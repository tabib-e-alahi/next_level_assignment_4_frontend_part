export type SearchParams = {
  search?: string;
  categoryId?: string;
  dietaryTags?: string | string[];
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
};


export type Category = {
  id: string
  name: string
};

export type Review = {
  rating: number
  comment?: string
};
export type ReviewsCount = {
  reviews: number
}

export type CategoryType = {
  name: string
}

export type Meal = {
  id: string
  title: string
  description: string
  imageURL: string
  price: number
  category: CategoryType
  dietary_preferences: string[]
  isAvailable: boolean
  reviews: Review[]
  _count: ReviewsCount
}