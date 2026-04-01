"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ClipboardList,
  Phone,
  Check,
  Package,
  RefreshCw,
  ShoppingBag,
  ChefHat,
  X,
  MapPin,
  Wallet,
  Clock3,
} from "lucide-react";

import { providerService } from "@/services/provider/provider.service";
import "./orders.css";

type OrderStatus =
  | "PLACED"
  | "PREPARING"
  | "READY"
  | "DELIVERED"
  | "CANCELLED";

type FilterTab = OrderStatus;

type ProviderOrder = {
  id: string;
  customerId: string;
  providerId: string;
  status: OrderStatus;
  deliveryAddress: string;
  paymentMethod: string;
  deliveryCharge: number;
  totalAmount: number;
  placedAt: string;
  cancelledAt: string | null;
  deliveredAt: string | null;
  createdAt: string;
  updatedAt: string;
  customer: {
    name: string;
    phone: string | null;
  };
  orderItems: {
    quantity: number;
    unitPrice: number;
    meal: {
      title: string;
      price: number;
    };
  }[];
  _count: {
    orderItems: number;
  };
};

const STATUS_TABS: { key: FilterTab; label: string; icon: React.ReactNode }[] = [
  {
    key: "PLACED",
    label: "Incoming",
    icon: <ClipboardList size={14} />,
  },
  {
    key: "PREPARING",
    label: "Preparing",
    icon: <ChefHat size={14} />,
  },
  {
    key: "READY",
    label: "Ready",
    icon: <Package size={14} />,
  },
  {
    key: "DELIVERED",
    label: "Delivered",
    icon: <Check size={14} />,
  },
  {
    key: "CANCELLED",
    label: "Cancelled",
    icon: <X size={14} />,
  },
];

const STATUS_ACTIONS: Record<
  OrderStatus,
  {
    label: string;
    className: string;
    icon: React.ReactNode;
  }
> = {
  PLACED: {
    label: "Placed",
    className: "placed",
    icon: <ClipboardList size={12} />,
  },
  PREPARING: {
    label: "Preparing",
    className: "preparing",
    icon: <ChefHat size={12} />,
  },
  READY: {
    label: "Ready",
    className: "ready",
    icon: <Package size={12} />,
  },
  DELIVERED: {
    label: "Delivered",
    className: "delivered",
    icon: <Check size={12} />,
  },
  CANCELLED: {
    label: "Cancelled",
    className: "cancelled",
    icon: <X size={12} />,
  },
};

function getNextActions(status: OrderStatus): OrderStatus[] {
  switch (status) {
    case "PLACED":
      return ["PREPARING", "CANCELLED"];
    case "PREPARING":
      return ["READY", "CANCELLED"];
    case "READY":
      return ["DELIVERED"];
    default:
      return [];
  }
}

function formatStatusLabel(status: OrderStatus) {
  switch (status) {
    case "PLACED":
      return "Incoming";
    case "PREPARING":
      return "Preparing";
    case "READY":
      return "Ready";
    case "DELIVERED":
      return "Delivered";
    case "CANCELLED":
      return "Cancelled";
    default:
      return status;
  }
}

function formatDateTime(dateString?: string | null) {
  if (!dateString) return "Not available";

  return new Date(dateString).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ProviderOrders() {
  const [orders, setOrders] = useState<ProviderOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterTab>("PLACED");
  const [busyId, setBusyId] = useState<string | null>(null);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await providerService.getAllOrders();
      if (res?.data) {
        setOrders(res.data.result ?? []);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatus = async (orderId: string, status: OrderStatus) => {
    try {
      setBusyId(orderId);
      await providerService.updateOrderStatus(orderId, status);
      await loadOrders();

      if (status !== "CANCELLED") {
        setActiveTab(status);
      }
    } finally {
      setBusyId(null);
    }
  };

  const tabCounts = useMemo(() => {
    return {
      PLACED: orders.filter((o) => o.status === "PLACED").length,
      PREPARING: orders.filter((o) => o.status === "PREPARING").length,
      READY: orders.filter((o) => o.status === "READY").length,
      DELIVERED: orders.filter((o) => o.status === "DELIVERED").length,
      CANCELLED: orders.filter((o) => o.status === "CANCELLED").length,
    };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => o.status === activeTab);
  }, [orders, activeTab]);

  return (
    <div className="po-page">
      <div className="po-shell">
        <div className="po-head">
          <div className="po-sec-label">
            <ClipboardList size={11} />
            Orders
          </div>

          <button
            onClick={loadOrders}
            disabled={loading}
            className="po-refresh-btn"
          >
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        <div className="po-tracking-tabs">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.key}
              className={`po-track-tab ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span className="po-track-icon">{tab.icon}</span>
              <span className="po-track-text">{tab.label}</span>
              <span className="po-track-count">{tabCounts[tab.key]}</span>
            </button>
          ))}
        </div>

        {loading && <p className="po-loading">Loading orders…</p>}

        {!loading && filteredOrders.length === 0 && (
          <div className="po-empty">
            <div className="po-empty-icon">
              <ShoppingBag size={18} />
            </div>
            <h2 className="po-empty-title">No {formatStatusLabel(activeTab)} Orders</h2>
            <p className="po-empty-sub">
              Orders in this stage will appear here.
            </p>
          </div>
        )}

        {!loading && filteredOrders.length > 0 && (
          <div className="po-list">
            {filteredOrders.map((order) => {
              const availableActions = getNextActions(order.status);
              const isBusy = busyId === order.id;

              return (
                <div key={order.id} className="po-card">
                  <div className="po-card-top">
                    <span className={`po-badge ${order.status}`}>
                      <span className="po-badge-dot" />
                      {formatStatusLabel(order.status)}
                    </span>

                    <span className="po-date">{formatDateTime(order.placedAt)}</span>
                  </div>

                  <div className="po-card-grid">
                    <div className="po-info-block">
                      <p className="po-block-label">Customer</p>
                      <p className="po-customer-name">{order.customer?.name || "Unknown Customer"}</p>
                      <div className="po-customer-phone">
                        <Phone size={12} />
                        {order.customer?.phone || (
                          <span className="po-phone-unavailable">Not available</span>
                        )}
                      </div>
                    </div>

                    <div className="po-info-block">
                      <p className="po-block-label">Payment</p>
                      <div className="po-inline-info">
                        <Wallet size={12} />
                        <span>{order.paymentMethod || "Not available"}</span>
                      </div>
                    </div>

                    <div className="po-info-block po-info-block-wide">
                      <p className="po-block-label">Delivery Address</p>
                      <div className="po-inline-info po-address">
                        <MapPin size={12} />
                        <span>{order.deliveryAddress || "Not available"}</span>
                      </div>
                    </div>

                    <div className="po-info-block">
                      <p className="po-block-label">Delivery Charge</p>
                      <p className="po-amount">৳ {order.deliveryCharge.toLocaleString()}</p>
                    </div>

                    <div className="po-info-block">
                      <p className="po-block-label">Total Amount</p>
                      <p className="po-amount po-amount-highlight">
                        ৳ {order.totalAmount.toLocaleString()}
                      </p>
                    </div>

                    <div className="po-info-block">
                      <p className="po-block-label">Total Items</p>
                      <p className="po-amount">{order._count?.orderItems ?? order.orderItems.length}</p>
                    </div>

                    <div className="po-info-block">
                      <p className="po-block-label">Order Time</p>
                      <div className="po-inline-info">
                        <Clock3 size={12} />
                        <span>{formatDateTime(order.placedAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="po-items-wrap">
                    <div className="po-items-head">
                      <p className="po-block-label">Order Items</p>
                    </div>

                    <div className="po-items-list">
                      {order.orderItems.map((item, index) => (
                        <div key={`${item.meal?.title}-${index}`} className="po-item-row">
                          <div className="po-item-main">
                            <p className="po-item-title">{item.meal?.title || "Untitled Meal"}</p>
                          </div>

                          <div className="po-item-meta">
                            <span className="po-item-chip">Qty {item.quantity}</span>
                            <span className="po-item-chip">৳ {item.unitPrice}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {availableActions.length > 0 ? (
                    <div className="po-actions">
                      {availableActions.map((action) => {
                        const actionConfig = STATUS_ACTIONS[action];

                        return (
                          <button
                            key={action}
                            className={`po-btn ${actionConfig.className}`}
                            disabled={isBusy}
                            onClick={() => handleStatus(order.id, action)}
                          >
                            {isBusy ? (
                              <RefreshCw size={12} className="animate-spin" />
                            ) : (
                              actionConfig.icon
                            )}
                            {actionConfig.label}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="po-actions po-actions-static">
                      <span className="po-no-action">
                        {order.status === "DELIVERED" ? "Completed" : "No actions"}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}