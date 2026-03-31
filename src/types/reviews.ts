export type Review = {
  id: string;
  customerId: string;
  mealId: string;
  orderItemId: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
  meal?: {
    id: string;
    title?: string;
    image?: string;
  };
  orderItem?: {
    id: string;
    quantity?: number;
    unitPrice?: number;
  };
};

export type CreateReviewPayload = {
  mealId: string;
  orderItemId: string;
  rating: number;
  comment?: string;
};

export type GetMyReviewsResponse = {
  data: Review[] | null;
  error: { message: string } | null;
};

export type CreateReviewResponse = {
  data: Review | null;
  error: { message: string } | null;
};