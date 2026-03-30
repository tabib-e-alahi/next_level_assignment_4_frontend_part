"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types/cart";

type OrderSummaryItems = {
  items: CartItem[];
  busy: boolean;
  handleClearCart: () => void;
};

const DELIVERY_FEE = 70;

export default function OrderSummary({ items, busy, handleClearCart }: OrderSummaryItems) {
  const itemCount  = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal   = items.reduce((sum, i) => sum + i.meal.price * i.quantity, 0);
  const delivery   = items.length > 0 ? DELIVERY_FEE : 0;
  const total      = subtotal + delivery;

  const providerNames = [
    ...new Set(items.map((i) => i.meal.provider.businessName)),
  ];

  return (
    <div>
      <div className="cart-sec-label">Order Summary</div>

      <div className="cart-summary">
        <h2 className="cart-summary-title">Your Order</h2>

        <div className="cart-summary-rows">
          <div className="cart-summary-row">
            <span className="cart-summary-row-label">
              Subtotal ({itemCount} item{itemCount !== 1 ? "s" : ""})
            </span>
            <span className="cart-summary-row-value">
              ৳{subtotal.toLocaleString()}
            </span>
          </div>

          <div className="cart-summary-row">
            <span className="cart-summary-row-label">Delivery fee</span>
            <span className="cart-summary-row-value">
              {delivery > 0 ? `৳${delivery}` : "—"}
            </span>
          </div>
        </div>

        <hr className="cart-summary-sep" />

        <div className="cart-summary-total">
          <span className="cart-summary-total-label">Total</span>
          <div className="cart-summary-total-value">
            <span className="cart-summary-total-currency">৳</span>
            {total.toLocaleString()}
          </div>
        </div>

        <Link href="/checkout">
          <Button
            className="cart-checkout-btn"
            disabled={items.length === 0 || busy}
          >
            <ShoppingBag size={14} className="mr-2" />
            Proceed to Checkout
          </Button>
        </Link>

        <Button
          className="cart-clear-btn"
          disabled={items.length === 0 || busy}
          onClick={handleClearCart}
        >
          {busy ? "Clearing…" : "Clear Cart"}
        </Button>

        {providerNames.length > 0 && (
          <div className="cart-provider-note">
            <strong>Provider{providerNames.length > 1 ? "s" : ""}:{" "}</strong>
            {providerNames.join(", ")}
          </div>
        )}
      </div>
    </div>
  );
}