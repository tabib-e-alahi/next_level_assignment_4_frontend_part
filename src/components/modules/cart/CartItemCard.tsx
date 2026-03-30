"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem } from "@/services/cart/cart.service";

type Props = {
  item: CartItem;
  busy: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export default function CartItemCard({
  item,
  busy,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) {
  const lineTotal = item.meal.price * item.quantity;

  return (
    <div className="cart-item">
      {/* left accent bar (CSS ::before handles it) */}

      {/* INFO */}
      <div className="cart-item-info">
        <p className="cart-item-category">{item.meal.category.name}</p>
        <h3 className="cart-item-name">{item.meal.title}</h3>
        <p className="cart-item-provider">{item.meal.provider.businessName}</p>

        <div className="cart-item-price-row">
          <span className="cart-item-unit-price">
            ৳{item.meal.price.toLocaleString()} × {item.quantity}
          </span>
          <span className="cart-item-total-price">
            ৳{lineTotal.toLocaleString()}
          </span>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="cart-item-controls">
        {/* quantity stepper */}
        <div className="qty-stepper">
          <button
            className="qty-btn"
            aria-label="Decrease quantity"
            disabled={item.quantity <= 1 || busy}
            onClick={onDecrease}
          >
            <Minus size={12} />
          </button>

          <span className="qty-value">{item.quantity}</span>

          <button
            className="qty-btn"
            aria-label="Increase quantity"
            disabled={busy}
            onClick={onIncrease}
          >
            <Plus size={12} />
          </button>
        </div>

        {/* remove */}
        <button
          className="cart-remove-btn"
          disabled={busy}
          onClick={onRemove}
          aria-label="Remove item"
        >
          <Trash2 size={11} />
          Remove
        </button>
      </div>
    </div>
  );
}