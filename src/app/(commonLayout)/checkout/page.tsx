"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronRight,
  Flame,
} from "lucide-react";
import { CartItem } from "@/types/cart";
import { cartService } from "@/services/cart/cart.service";
import { orderService } from "@/services/order/order.service";

interface DeliveryForm {
  address: string;
}

const DELIVERY_FEE = 70;

export default function CheckoutPage() {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [isPlacing, setIsPlacing] = useState(false);
  const [isLoadingCart, setIsLoadingCart] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [form, setForm] = useState<DeliveryForm>({
    address: "",
  });
  const [errors, setErrors] = useState<Partial<DeliveryForm>>({});
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsLoadingCart(true);
        setApiError("");

        const data = await cartService.getMyCart();
        setCart(data?.data?.items || []);
      } catch (error: any) {
        setApiError(error?.message || "Failed to load cart.");
      } finally {
        setIsLoadingCart(false);
      }
    };

    fetchCart();
  }, []);

  const subtotal = cart.reduce((s, i) => s + i.meal.price * i.quantity, 0);
  const total = subtotal + (cart.length > 0 ? DELIVERY_FEE : 0);

  function validate() {
    const e: Partial<DeliveryForm> = {};
    if (!form.address.trim()) e.address = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const handlePlaceOrder = async () => {
    try {
      setApiError("");

      if (!validate()) return;

      setIsPlacing(true);

      await orderService.createOrder(form.address.trim());

      router.push("/customer-dashboard");
    } catch (error: any) {
      setApiError(error?.message || "Failed to place order.");
    } finally {
      setIsPlacing(false);
    }
  }

  if (isLoadingCart) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#0a0807",
          color: "#f5f0e8",
          fontFamily: "'DM Sans', sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "#f5f0e880", fontSize: 14 }}>Loading checkout...</p>
      </main>
    );
  }

  if (!cart.length) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#0a0807",
          color: "#f5f0e8",
          fontFamily: "'DM Sans', sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 560,
            background: "#151110",
            border: "1px solid #f5f0e810",
            borderRadius: 8,
            padding: 32,
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 36,
              margin: 0,
            }}
          >
            Your cart is empty
          </h1>
          <p style={{ marginTop: 12, color: "#f5f0e880", fontSize: 14 }}>
            Add some meals before proceeding to checkout.
          </p>
          <Link
            href="/cart"
            style={{
              display: "inline-block",
              marginTop: 20,
              color: "#e8a030",
              textDecoration: "none",
              fontFamily: "'DM Mono', monospace",
              fontSize: 12,
              letterSpacing: "0.08em",
            }}
          >
            GO TO CART
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0a0807",
        color: "#f5f0e8",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "fixed",
          top: "10%",
          right: "5%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200,80,10,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "15%",
          left: "3%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(232,160,48,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 24px 80px",
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "32px 0 48px",
          }}
        >
          <Link
            href="/cart"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#f5f0e880",
              textDecoration: "none",
              fontSize: 14,
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.05em",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f5f0e8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#f5f0e880")}
          >
            <ArrowLeft size={16} /> BACK TO CART
          </Link>
          <div style={{ flex: 1, height: 1, background: "#f5f0e810" }} />
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 12,
              color: "#c8500a",
              letterSpacing: "0.1em",
            }}
          >
            CHECKOUT
          </span>
        </header>

        <div style={{ marginBottom: 48 }}>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 12,
              color: "#e8a030",
              letterSpacing: "0.15em",
              marginBottom: 12,
            }}
          >
            STEP {step} OF 2
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 700,
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {step === 1 ? (
              <>
                <em style={{ color: "#c8500a", fontStyle: "italic" }}>
                  Delivery
                </em>{" "}
                Details
              </>
            ) : (
              <>
                Confirm{" "}
                <em style={{ color: "#c8500a", fontStyle: "italic" }}>
                  Order
                </em>
              </>
            )}
          </h1>
        </div>

        <div
          className="checkout-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: 32,
            alignItems: "start",
          }}
        >
          <div>
            {step === 1 ? (
              <DeliveryFormPanel
                form={form}
                errors={errors}
                onChange={(k, v) => {
                  setForm((f) => ({ ...f, [k]: v }));
                  setErrors((e) => ({ ...e, [k]: "" }));
                  setApiError("");
                }}
              />
            ) : (
              <ReviewPanel cart={cart} form={form} onEdit={() => setStep(1)} />
            )}

            {apiError && (
              <div
                style={{
                  marginTop: 16,
                  padding: "14px 16px",
                  borderRadius: 4,
                  background: "rgba(200,80,10,0.10)",
                  border: "1px solid rgba(200,80,10,0.25)",
                  color: "#f5f0e8",
                  fontSize: 14,
                }}
              >
                {apiError}
              </div>
            )}

            <div style={{ marginTop: 32 }}>
              {step === 1 ? (
                <button
                  onClick={() => {
                    if (validate()) setStep(2);
                  }}
                  style={{
                    width: "100%",
                    padding: "18px 32px",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                    background: "linear-gradient(135deg, #c8500a 0%, #e8a030 100%)",
                    color: "#0a0807",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    position: "relative",
                    overflow: "hidden",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform =
                      "translateY(-2px)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "0 8px 32px rgba(200,80,10,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform =
                      "translateY(0)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "none";
                  }}
                >
                  CONTINUE TO ORDER{" "}
                  <ChevronRight size={16} style={{ display: "inline", verticalAlign: "middle" }} />
                </button>
              ) : (
                <button
                  onClick={handlePlaceOrder}
                  disabled={isPlacing}
                  style={{
                    width: "100%",
                    padding: "18px 32px",
                    border: "none",
                    borderRadius: 4,
                    cursor: isPlacing ? "not-allowed" : "pointer",
                    background: isPlacing
                      ? "#333"
                      : "linear-gradient(135deg, #c8500a 0%, #e8a030 100%)",
                    color: "#0a0807",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    opacity: isPlacing ? 0.7 : 1,
                  }}
                >
                  {isPlacing ? "PLACING ORDER…" : "PLACE ORDER — CASH ON DELIVERY"}
                </button>
              )}
            </div>

            <div
              style={{
                display: "flex",
                gap: 24,
                marginTop: 20,
                padding: "16px 0",
                borderTop: "1px solid #f5f0e810",
              }}
            >
              {[
                { icon: <ShieldCheck size={14} />, text: "100% Secure" },
                { icon: <Clock size={14} />, text: "30–45 min delivery" },
                { icon: <Flame size={14} />, text: "Fresh & hot" },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    color: "#f5f0e840",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    letterSpacing: "0.05em",
                  }}
                >
                  {icon} {text}
                </div>
              ))}
            </div>
          </div>

          <OrderSummary
            cart={cart}
            subtotal={subtotal}
            deliveryFee={cart.length ? DELIVERY_FEE : 0}
            total={total}
          />
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@400;500&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        ::placeholder { color: #f5f0e825 !important; }
        input:focus, textarea:focus { outline: none; border-color: #c8500a !important; box-shadow: 0 0 0 2px rgba(200,80,10,0.15) !important; }
        @media (max-width: 768px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.1em",
          color: error ? "#c8500a" : "#f5f0e860",
        }}
      >
        {label} {error && `— ${error}`}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={5}
        style={{
          background: "#151110",
          border: `1px solid ${error ? "#c8500a" : "#f5f0e815"}`,
          borderRadius: 4,
          padding: "14px 16px",
          color: "#f5f0e8",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 15,
          resize: "vertical",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
      />
    </div>
  );
}

function DeliveryFormPanel({
  form,
  errors,
  onChange,
}: {
  form: DeliveryForm;
  errors: Partial<DeliveryForm>;
  onChange: (k: keyof DeliveryForm, v: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Field
        label="DELIVERY ADDRESS"
        value={form.address}
        onChange={(v) => onChange("address", v)}
        error={errors.address}
        placeholder="House/Road/Area/City"
      />
    </div>
  );
}

function ReviewPanel({
  cart,
  form,
  onEdit,
}: {
  cart: CartItem[];
  form: DeliveryForm;
  onEdit: () => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div
        style={{
          background: "#151110",
          border: "1px solid #f5f0e810",
          borderRadius: 8,
          padding: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <MapPin size={14} color="#c8500a" />
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.1em",
                color: "#e8a030",
              }}
            >
              DELIVERY TO
            </span>
          </div>
          <button
            onClick={onEdit}
            style={{
              background: "none",
              border: "none",
              color: "#c8500a",
              cursor: "pointer",
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.05em",
            }}
          >
            EDIT
          </button>
        </div>
        <p style={{ margin: 0, fontSize: 14, color: "#f5f0e880", lineHeight: 1.7 }}>
          {form.address}
        </p>
      </div>

      <div
        style={{
          background: "#151110",
          border: "1px solid #f5f0e810",
          borderRadius: 8,
          padding: 24,
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.1em",
            color: "#e8a030",
            display: "block",
            marginBottom: 16,
          }}
        >
          ORDER ITEMS
        </span>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{ display: "flex", alignItems: "center", gap: 12 }}
            >
              <span style={{ fontSize: 24 }}>
                {"🍽️"}
              </span>

              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>
                  {item.meal.title}
                </p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: "#f5f0e850" }}>
                  {item.meal.provider.businessName} • ×{item.quantity}
                </p>
              </div>

              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 13,
                  color: "#e8a030",
                }}
              >
                ৳{(item.meal.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OrderSummary({
  cart,
  subtotal,
  deliveryFee,
  total,
}: {
  cart: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}) {
  return (
    <div
      style={{
        background: "#151110",
        border: "1px solid #f5f0e810",
        borderRadius: 8,
        padding: 28,
        position: "sticky",
        top: 32,
      }}
    >
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.1em",
          color: "#e8a030",
          display: "block",
          marginBottom: 20,
        }}
      >
        ORDER SUMMARY — {cart.length} {cart.length === 1 ? "ITEM" : "ITEMS"}
      </span>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {cart.map((item) => (
          <div
            key={item.id}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <span style={{ fontSize: 13, color: "#f5f0e880" }}>
              {item.meal.title} ×{item.quantity}
            </span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13 }}>
              ৳{(item.meal.price * item.quantity).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          borderTop: "1px solid #f5f0e810",
          paddingTop: 16,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, color: "#f5f0e860" }}>Subtotal</span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13 }}>
            ৳{subtotal.toLocaleString()}
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, color: "#f5f0e860" }}>Delivery fee</span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13 }}>
            ৳{deliveryFee}
          </span>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid #f5f0e815",
          marginTop: 16,
          paddingTop: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          Total
        </span>
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 22,
            fontWeight: 700,
            color: "#e8a030",
          }}
        >
          ৳{total.toLocaleString()}
        </span>
      </div>

      <div
        style={{
          marginTop: 20,
          padding: "12px 16px",
          background: "#0a0807",
          borderRadius: 4,
          border: "1px solid #c8500a20",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span style={{ fontSize: 20 }}>💵</span>
        <div>
          <p
            style={{
              margin: 0,
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: "#c8500a",
              letterSpacing: "0.05em",
            }}
          >
            CASH ON DELIVERY
          </p>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: "#f5f0e850" }}>
            Pay when your order arrives
          </p>
        </div>
      </div>
    </div>
  );
}