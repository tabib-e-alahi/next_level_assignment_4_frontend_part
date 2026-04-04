"use client";

import { useEffect, useMemo, useState } from "react";
import { adminService } from "@/services/admin/admin.service";
import "./view-orders.css";
import LoadingPage from "@/components/modules/loading/LoadingCompo";

type AdminOrder = {
  id: string;
  customerId: string;
  providerId: string;
  status: string;
  totalAmount: number;
  deliveryCharge: number;
  deliveryAddress: string;
  paymentMethod: string;
  placedAt: string;
  deliveredAt: string | null;
  cancelledAt: string | null;
  createdAt: string;
  updatedAt: string;
  customer?: {
    name?: string;
    phone?: string;
  };
  _count: {
    orderItems: number;
  };
};

function formatDate(dateString?: string | null) {
  if (!dateString) return "N/A";

  return new Date(dateString).toLocaleString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatCurrency(amount?: number) {
  return `৳${Number(amount || 0).toLocaleString("en-BD")}`;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadOrders = async () => {
    setLoading(true);
    setMessage("");

    const result = await adminService.getAllOrders();

    if (result.data) {
      setOrders(result.data || []);
    } else {
      setMessage(result.error?.message || "Failed to fetch orders.");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const totalOrders = orders.length;

  const deliveredCount = useMemo(
    () => orders.filter((order) => order.status?.toUpperCase() === "DELIVERED").length,
    [orders]
  );

  const pendingCount = useMemo(
    () =>
      orders.filter((order) => {
        const status = order.status?.toUpperCase();
        return status === "PENDING" || status === "PROCESSING" || status === "CONFIRMED";
      }).length,
    [orders]
  );

  const cancelledCount = useMemo(
    () => orders.filter((order) => order.status?.toUpperCase() === "CANCELLED").length,
    [orders]
  );

  if (loading) {
    return <LoadingPage></LoadingPage>
  }

  return (
    <div className="admin-orders-page">
      <div className="admin-orders-header">
        <p className="admin-orders-eyebrow">Admin Dashboard</p>
        <h1 className="admin-orders-title">Order Ledger</h1>
        <p className="admin-orders-subtitle">
          Review all placed orders in one clear view
        </p>
      </div>

      {message && <p className="admin-orders-feedback">{message}</p>}

      <div className="admin-orders-stats">
        <div className="admin-orders-stat-card">
          <p className="admin-orders-stat-label">Total Orders</p>
          <h3 className="admin-orders-stat-value">{totalOrders}</h3>
        </div>

        <div className="admin-orders-stat-card">
          <p className="admin-orders-stat-label">Pending Flow</p>
          <h3 className="admin-orders-stat-value">{pendingCount}</h3>
        </div>

        <div className="admin-orders-stat-card">
          <p className="admin-orders-stat-label">Delivered</p>
          <h3 className="admin-orders-stat-value">{deliveredCount}</h3>
        </div>

        <div className="admin-orders-stat-card">
          <p className="admin-orders-stat-label">Cancelled</p>
          <h3 className="admin-orders-stat-value">{cancelledCount}</h3>
        </div>
      </div>

      <section className="admin-orders-section">
        <div className="admin-orders-section-head">
          <p className="admin-orders-section-eyebrow">Orders</p>
          <h2 className="admin-orders-section-title">
            All Orders ({orders.length})
          </h2>
        </div>

        <div className="admin-orders-list">
          {orders.length > 0 ? (
            orders.map((order) => {
              const customerName = order.customer?.name || "Unknown Customer";
              const customerPhone = order.customer?.phone || "Not added";

              return (
                <div key={order.id} className="admin-orders-card">
                  <div className="admin-orders-card-top">
                    <div className="admin-orders-card-main">
                      <div className="admin-orders-order-row">
                        <p className="admin-orders-customer-name">{customerName}</p>
                        <span
                          className={`admin-orders-badge ${order.status?.toLowerCase()}`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <p className="admin-orders-meta-line">
                        Phone: <span>{customerPhone}</span>
                      </p>

                      <p className="admin-orders-meta-line">
                        Address: <span>{order.deliveryAddress || "No address added"}</span>
                      </p>

                      <p className="admin-orders-meta-line">
                        Payment: <span>{order.paymentMethod || "N/A"}</span>
                      </p>

                      <p className="admin-orders-meta-line">
                        Delivery Charge: <span>{formatCurrency(order.deliveryCharge)}</span>
                      </p>

                      {order.deliveredAt && (
                        <p className="admin-orders-meta-line">
                          Delivered At: <span>{formatDate(order.deliveredAt)}</span>
                        </p>
                      )}

                      {order.cancelledAt && (
                        <p className="admin-orders-meta-line">
                          Cancelled At: <span>{formatDate(order.cancelledAt)}</span>
                        </p>
                      )}
                    </div>

                    <div className="admin-orders-card-side">
                      <div className="admin-orders-mini-card">
                        <p className="admin-orders-mini-label">Total Amount</p>
                        <h4 className="admin-orders-mini-value">
                          {formatCurrency(order.totalAmount)}
                        </h4>
                      </div>

                      <div className="admin-orders-mini-card">
                        <p className="admin-orders-mini-label">Items</p>
                        <h4 className="admin-orders-mini-value">
                          {order._count?.orderItems || 0}
                        </h4>
                      </div>

                      <div className="admin-orders-mini-card">
                        <p className="admin-orders-mini-label">Placed At</p>
                        <h4 className="admin-orders-mini-value date">
                          {formatDate(order.placedAt)}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="admin-orders-empty-card">No orders found.</div>
          )}
        </div>
      </section>
    </div>
  );
}