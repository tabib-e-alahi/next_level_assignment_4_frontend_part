export type OrderStatus =
  | "PLACED"
  | "PREPARING"
  | "READY"
  | "DELIVERED"
  | "CANCELLED";

export type PaymentMethod = "COD";


export type OrderItem = {
  id: string;
  orderId: string;
  mealId: string;
  categoryId?: string;
  quantity: number;
  unitPrice: number;
  meal?: {
    title?: string;
    image?: string;
  };
};

export type Order = {
  id: string;
  customerId: string;
  providerId: string;
  deliveryAddress: string;
  deliveryCharge: number;
  totalAmount: number;
  paymentMethod: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  placedAt: string;
  deliveredAt: string | null;
  cancelledAt: string | null;
  orderItems: OrderItem[];
};