export type OrderStatus =
  | "PLACED"
  | "PREPARING"
  | "READY"
  | "DELIVERED"
  | "CANCELLED";

export type PaymentMethod = "COD";

export type MealInfo = {
  id: string;
  title?: string;
  image?: string;
};

export type OrderItem = {
  id: string;
  orderId: string;
  mealId: string;
  categoryId: string;
  quantity: number;
  price: number;
  meal?: MealInfo;
};

export type Order = {
  id: string;
  customerId: string;
  providerId: string;
  deliveryAddress: string;
  deliveryCharge: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  placedAt: string;
  deliveredAt: string | null;
  cancelledAt: string | null;
  orderItems: OrderItem[];
};