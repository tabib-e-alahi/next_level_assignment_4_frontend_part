"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import "./cart.css";
import { cartService } from "@/services/cart/cart.service";
import { Cart, CartItem } from "@/types/cart";
import CartItemCard from "./CartItemCard";
import OrderSummary from "./OrderSummary";

export default function CartPageClient() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await cartService.getMyCart();
      if (res.error) setError(res.error.message);
      else setCart(res.data);
      setLoading(false);
    })();
  }, []);

  const items = cart?.items ?? [];
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);
  const providerNames = [...new Set(items.map((i) => i.meal.provider.businessName))];

  const updateQuantity = (itemId: string, qty: number) =>
    setCart((prev) =>
      prev
        ? { ...prev, items: prev.items.map((i) => i.id === itemId ? { ...i, quantity: qty } : i) }
        : prev
    );

  const removeFromState = (itemId: string) =>
    setCart((prev) =>
      prev ? { ...prev, items: prev.items.filter((i) => i.id !== itemId) } : prev
    );

  const hadnleQuantityIncrease = async (item: CartItem) => {
    const updatedQuantity = item.quantity + 1;
    setBusyId(item.id);
    updateQuantity(item.id, updatedQuantity);

    const res = await cartService.updateItemQuantity(item.id, updatedQuantity);
    if (res.error) { toast.error(res.error.message); updateQuantity(item.id, item.quantity); }
    setBusyId(null);
  };

  const hadnleQuantityDecrease = async (item: CartItem) => {
    if (item.quantity <= 1) return;
    const updatedQuantity = item.quantity - 1;
    setBusyId(item.id);
    updateQuantity(item.id, updatedQuantity);

    const res = await cartService.updateItemQuantity(item.id, updatedQuantity);
    if (res.error) { toast.error(res.error.message); updateQuantity(item.id, item.quantity); }
    setBusyId(null);
  };

  const handleItemDelete = async (item: CartItem) => {
    setBusyId(item.id);
  
    const res = await cartService.removeItem(item.id);
    if (res.error) {
      toast.error(res.error.message);
      setCart((prev) => prev ? { ...prev, items: [...prev.items, item] } : prev);
    } else {
      removeFromState(item.id);
      toast.success("Item removed");
    }
    setBusyId(null);
  };

  const handleClearCart = async () => {
    setBusyId("clear");
    const res = await cartService.clearCart();
    if (res.error) {
      toast.error(res.error.message);
    } else {
      setCart((prev) => prev ? { ...prev, items: [] } : prev);
      toast.success("Cart cleared");
    }
    setBusyId(null);
  };


  return (
    <div className="cart-root">
      <div className="cart-orb-1" aria-hidden />
      <div className="cart-orb-2" aria-hidden />

      {/* ── HERO ── */}
      <div className="cart-hero">
        <div className="cart-hero-inner">
          <div className="cart-eyebrow">
            <span className="cart-eyebrow-dot" />
            Your Cart
          </div>

          <h1 className="cart-title">
            <em>Review</em> your order
          </h1>

          <p className="cart-subtitle">
            {loading
              ? "Loading your cart…"
              : items.length > 0
                ? `${itemCount} item${itemCount !== 1 ? "s" : ""} · ${providerNames.length} provider${providerNames.length !== 1 ? "s" : ""}`
                : "Your cart is empty — add something delicious"}
          </p>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="cart-body">

        {/* LEFT — items list */}
        <div>
          <div className="cart-sec-label">
            <ShoppingBag size={11} />
            Cart Items
          </div>

          {loading && (
            <p className="cart-status-loading">Fetching your cart…</p>
          )}

          {!loading && error && (
            <p className="cart-status-error">{error}</p>
          )}

          {!loading && !error && items.length === 0 && (
            <div className="cart-empty">
              <div className="cart-empty-icon">
                <ShoppingBag size={22} />
              </div>
              <h2 className="cart-empty-title">Nothing here yet</h2>
              <p className="cart-empty-sub">
                Browse our meals and add something delicious to your cart.
              </p>
              <Link href="/meals" className="cart-empty-btn">
                Browse Meals
              </Link>
            </div>
          )}

          {!loading && !error && items.length > 0 && (
            <div className="cart-items">
              {items.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  busy={busyId === item.id}
                  hadnleQuantityIncrease={() => hadnleQuantityIncrease(item)}
                  hadnleQuantityDecrease={() => hadnleQuantityDecrease(item)}
                  handleItemDelete={() => handleItemDelete(item)}
                />
              ))}
            </div>
          )}
        </div>

        <OrderSummary
          items={items}
          busy={busyId === "clear"}
          handleClearCart={handleClearCart}
        />

      </div>
    </div>
  );
}