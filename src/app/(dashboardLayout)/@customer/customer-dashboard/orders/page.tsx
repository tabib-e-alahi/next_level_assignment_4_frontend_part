"use client";

import { useEffect, useMemo, useState } from "react";
import { XCircle } from "lucide-react";
import "./orders.css";
import { orderService } from "@/services/order/order.service";

type OrderStatus = "PLACED" | "PREPARING" | "READY" | "DELIVERED" | "CANCELLED";

type OrderItem = {
  id: string;
  orderId: string;
  mealId: string;
  categoryId?: string;
  quantity: number;
  price: number;
  meal?: {
    title?: string;
    image?: string;
  };
};

type Order = {
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

const STATUS_STEPS: OrderStatus[] = ["PLACED", "PREPARING", "READY", "DELIVERED"];

const STATUS_CONFIG: Record<OrderStatus, { label: string }> = {
  PLACED: { label: "Placed" },
  PREPARING: { label: "Preparing" },
  READY: { label: "Ready" },
  DELIVERED: { label: "Delivered" },
  CANCELLED: { label: "Cancelled" },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [trackOrder, setTrackOrder] = useState<Order | null>(null);
  const [detailsOrder, setDetailsOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const result = await orderService.getMyOrders();

      if (result.data) {
        setOrders(result.data);
      } else {
        console.error(result.error?.message);
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  const hasOrders = useMemo(() => orders.length > 0, [orders]);

  if (loading) {
    return <div className="orders-page-message">Loading orders...</div>;
  }

  if (!hasOrders) {
    return <div className="orders-page-message">No orders found.</div>;
  }

  return (
    <div className="orders-page">
      <div className="orders-header">
        <p className="orders-eyebrow">Customer Dashboard</p>
        <h1 className="orders-title">My Orders</h1>
        <p className="orders-subtitle">{orders.length} orders found</p>
      </div>

      <div className="orders-table">
        <div className="orders-table-head orders-row">
          <div>Order ID</div>
          <div>Customer</div>
          <div>Provider</div>
          <div>Delivery Address</div>
          <div>Delivery Charge</div>
          <div>Total Amount</div>
          <div>Payment</div>
          <div>Created At</div>
          <div>Track</div>
          <div>Details</div>
        </div>

        <div className="orders-table-body">
          {orders.map((order) => (
            <div key={order.id} className="orders-row orders-data-row">
              <div className="orders-cell-id">{order.id}</div>
              <div>{order.customerId}</div>
              <div>{order.providerId}</div>
              <div>{order.deliveryAddress}</div>
              <div>৳{order.deliveryCharge}</div>
              <div>৳{order.totalAmount}</div>
              <div>{order.paymentMethod}</div>
              <div>{formatDate(order.createdAt)}</div>
              <div>
                <button
                  className="orders-action-btn"
                  onClick={() => setTrackOrder(order)}
                >
                  Track
                </button>
              </div>
              <div>
                <button
                  className="orders-action-btn secondary"
                  onClick={() => setDetailsOrder(order)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {trackOrder && (
        <TrackModal order={trackOrder} onClose={() => setTrackOrder(null)} />
      )}

      {detailsOrder && (
        <DetailsModal
          order={detailsOrder}
          onClose={() => setDetailsOrder(null)}
        />
      )}
    </div>
  );
}

function TrackModal({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}) {
  const currentStep =
    order.status === "CANCELLED" ? -1 : STATUS_STEPS.indexOf(order.status);

  return (
    <div className="orders-modal-overlay" onClick={onClose}>
      <div
        className="orders-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="orders-modal-top">
          <div>
            <p className="orders-modal-eyebrow">Track Order</p>
            <h2 className="orders-modal-title">{order.id}</h2>
          </div>
          <button className="orders-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {order.status !== "CANCELLED" ? (
          <div className="track-wrapper">
            <div className="track-line-bg" />
            <div
              className="track-line-fill"
              style={{
                width: `${Math.max(
                  0,
                  (currentStep / (STATUS_STEPS.length - 1)) * 100
                )}%`,
              }}
            />

            <div className="track-steps">
              {STATUS_STEPS.map((step, idx) => {
                const done = idx <= currentStep;
                const active = idx === currentStep;

                return (
                  <div key={step} className="track-step">
                    <div
                      className={`track-dot ${done ? "done" : ""} ${
                        active ? "active" : ""
                      }`}
                    >
                      {done ? "✓" : ""}
                    </div>
                    <span
                      className={`track-label ${done ? "done" : ""} ${
                        active ? "active" : ""
                      }`}
                    >
                      {STATUS_CONFIG[step].label.toUpperCase()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="track-cancelled-box">
            <XCircle size={16} />
            <span>ORDER CANCELLED</span>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailsModal({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}) {
  return (
    <div className="orders-modal-overlay" onClick={onClose}>
      <div
        className="orders-modal details-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="orders-modal-top">
          <div>
            <p className="orders-modal-eyebrow">Order Details</p>
            <h2 className="orders-modal-title">{order.id}</h2>
          </div>
          <button className="orders-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="details-section">
          <div className="details-grid">
            <div>
              <span className="details-label">Customer ID</span>
              <p>{order.customerId}</p>
            </div>
            <div>
              <span className="details-label">Provider ID</span>
              <p>{order.providerId}</p>
            </div>
            <div>
              <span className="details-label">Delivery Address</span>
              <p>{order.deliveryAddress}</p>
            </div>
            <div>
              <span className="details-label">Payment Method</span>
              <p>{order.paymentMethod}</p>
            </div>
            <div>
              <span className="details-label">Delivery Charge</span>
              <p>৳{order.deliveryCharge}</p>
            </div>
            <div>
              <span className="details-label">Total Amount</span>
              <p>৳{order.totalAmount}</p>
            </div>
            <div>
              <span className="details-label">Placed At</span>
              <p>{formatDate(order.placedAt)}</p>
            </div>
            <div>
              <span className="details-label">Updated At</span>
              <p>{formatDate(order.updatedAt)}</p>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h3 className="details-items-title">Ordered Items</h3>

          <div className="details-items-list">
            {order.orderItems.map((item) => (
              <div key={item.id} className="details-item-row">
                <div>
                  <p className="details-item-title">
                    {item.meal?.title || item.mealId}
                  </p>
                  <p className="details-item-sub">
                    Meal ID: {item.mealId}
                  </p>
                </div>

                <div className="details-item-meta">
                  <span>Qty: {item.quantity}</span>
                  <span>Price: ৳{item.price}</span>
                  <span>Total: ৳{item.price * item.quantity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}