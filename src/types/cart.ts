export type CartMeal = {
  id: string;
  title: string;
  price: number;
  category: {
    name: string;
  };
  provider: {
    id: string;
    businessName: string;
  };
};

export type CartItem = {
  id: string;
  mealId: string;
  cartId: string;
  quantity: number;
  meal: CartMeal;
};

export type Cart = {
  id: string;
  customerId: string;
  items: CartItem[];
};