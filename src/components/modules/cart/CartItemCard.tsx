"use client";
import { CartItem } from "@/types/cart";
import { Minus, Plus, Trash2 } from "lucide-react";


type CartItemtypes = {
  item: CartItem;
  busy: boolean;
  hadnleQuantityIncrease: () => void;
  hadnleQuantityDecrease: () => void;
  handleItemDelete: () => void;
};

export default function CartItemCard({
  item,
  busy,
  hadnleQuantityIncrease,
  hadnleQuantityDecrease,
  handleItemDelete,
}: CartItemtypes) {

  const totalAmount = item.meal.price * item.quantity;

  return (
    <div className="cart-item">

      <div className="cart-item-info">
        <p className="cart-item-category">{item.meal.category.name}</p>
        <h3 className="cart-item-name">{item.meal.title}</h3>
        <p className="cart-item-provider">{item.meal.provider.businessName}</p>

        <div className="cart-item-price-row">
          <span className="cart-item-unit-price">
            ৳{item.meal.price.toLocaleString()} × {item.quantity}
          </span>
          <span className="cart-item-total-price">
            ৳{totalAmount.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="cart-item-controls">
        <div className="qty-stepper">
          <button
            className="qty-btn"
            aria-label="Decrease quantity"
            disabled={item.quantity <= 1 || busy}
            onClick={hadnleQuantityDecrease}
          >
            <Minus size={12} />
          </button>

          <span className="qty-value">{item.quantity}</span>

          <button
            className="qty-btn"
            aria-label="Increase quantity"
            disabled={busy}
            onClick={hadnleQuantityIncrease}
          >
            <Plus size={12} />
          </button>
        </div>

        <button
          className="cart-remove-btn"
          disabled={busy}
          onClick={handleItemDelete}
          aria-label="Remove item"
        >
          <Trash2 size={11} />
          Remove
        </button>
      </div>
    </div>
  );
}