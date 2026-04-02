"use client";

import { useEffect, useMemo, useState } from "react";
import { adminService } from "@/services/admin/admin.service";
import "./admin-dashboard.css";

type AdminCustomer = {
  id: string;
  name: string | null;
  phone: string | null;
  status: "ACTIVE" | "SUSPENDED";
  createdAt: string;
  updatedAt: string;
  role: "CUSTOMER";
  _count: {
    orders: number;
  };
};

type AdminProvider = {
  id: string;
  name: string | null;
  phone: string | null;
  status: "ACTIVE" | "SUSPENDED";
  createdAt: string;
  updatedAt: string;
  role: "PROVIDER";
  providerProfiles:
    | {
        _count: {
          meals: number;
        };
      }[]
    | {
        _count: {
          meals: number;
        };
      };
};

type AdminUsersResponse = {
  customers: AdminCustomer[];
  providers: AdminProvider[];
};

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

type AdminCategory = {
  id: string;
  name: string;
  slug?: string | null;
  description?: string | null;
  logo?: string | null;
  createdAt: string;
  updatedAt: string;
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

export default function AdminDashboardOverviewPage() {
  const [users, setUsers] = useState<AdminUsersResponse>({
    customers: [],
    providers: [],
  });
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadDashboardData = async () => {
    setLoading(true);
    setMessage("");

    const [usersResult, ordersResult, categoriesResult] = await Promise.all([
      adminService.getAllUsers(),
      adminService.getAllOrders(),
      adminService.getAllCategories(),
    ]);

    if (usersResult.data) {
      setUsers(usersResult.data);
    }

    if (ordersResult.data) {
      setOrders(ordersResult.data);
    }

    if (categoriesResult.data) {
      setCategories(categoriesResult.data);
    }

    if (usersResult.error || ordersResult.error || categoriesResult.error) {
      setMessage(
        usersResult.error?.message ||
          ordersResult.error?.message ||
          categoriesResult.error?.message ||
          "Failed to load dashboard data."
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const totalCustomers = users.customers.length;
  const totalProviders = users.providers.length;
  const totalOrders = orders.length;
  const totalCategories = categories.length;

  const activeCustomers = useMemo(
    () => users.customers.filter((item) => item.status === "ACTIVE").length,
    [users.customers]
  );

  const activeProviders = useMemo(
    () => users.providers.filter((item) => item.status === "ACTIVE").length,
    [users.providers]
  );

  const deliveredOrders = useMemo(
    () => orders.filter((item) => item.status?.toUpperCase() === "DELIVERED").length,
    [orders]
  );

  const pendingOrders = useMemo(
    () =>
      orders.filter((item) => {
        const status = item.status?.toUpperCase();
        return status === "PENDING" || status === "PROCESSING" || status === "CONFIRMED";
      }).length,
    [orders]
  );

  const cancelledOrders = useMemo(
    () => orders.filter((item) => item.status?.toUpperCase() === "CANCELLED").length,
    [orders]
  );

  const totalRevenue = useMemo(
    () =>
      orders
        .filter((item) => item.status?.toUpperCase() === "DELIVERED")
        .reduce((sum, item) => sum + Number(item.totalAmount || 0), 0),
    [orders]
  );

  const totalDeliveryCharge = useMemo(
    () => orders.reduce((sum, item) => sum + Number(item.deliveryCharge || 0), 0),
    [orders]
  );

  const totalMealsFromProviders = useMemo(() => {
    return users.providers.reduce((sum, provider) => {
      if (Array.isArray(provider.providerProfiles)) {
        return (
          sum +
          provider.providerProfiles.reduce(
            (innerSum, profile) => innerSum + Number(profile?._count?.meals || 0),
            0
          )
        );
      }

      return sum + Number(provider.providerProfiles?._count?.meals || 0);
    }, 0);
  }, [users.providers]);

  const recentOrders = useMemo(() => {
    return [...orders]
      .sort(
        (a, b) =>
          new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime()
      )
      .slice(0, 5);
  }, [orders]);

  const recentCategories = useMemo(() => {
    return [...categories]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5);
  }, [categories]);

  if (loading) {
    return <div className="admin-overview-message">Loading dashboard...</div>;
  }

  return (
    <div className="admin-overview-page">
      <div className="admin-overview-header">
        <p className="admin-overview-eyebrow">Admin Dashboard</p>
        <h1 className="admin-overview-title">Overview Ledger</h1>
        <p className="admin-overview-subtitle">
          Monitor platform activity, growth, and core operating stats
        </p>
      </div>

      {message && <p className="admin-overview-feedback">{message}</p>}

      <section className="admin-overview-grid primary">
        <div className="admin-overview-stat-card">
          <p className="admin-overview-stat-label">Customers</p>
          <h3 className="admin-overview-stat-value">{totalCustomers}</h3>
          <p className="admin-overview-stat-sub">{activeCustomers} active accounts</p>
        </div>

        <div className="admin-overview-stat-card">
          <p className="admin-overview-stat-label">Providers</p>
          <h3 className="admin-overview-stat-value">{totalProviders}</h3>
          <p className="admin-overview-stat-sub">{activeProviders} active accounts</p>
        </div>

        <div className="admin-overview-stat-card">
          <p className="admin-overview-stat-label">Orders</p>
          <h3 className="admin-overview-stat-value">{totalOrders}</h3>
          <p className="admin-overview-stat-sub">{pendingOrders} in active flow</p>
        </div>

        <div className="admin-overview-stat-card">
          <p className="admin-overview-stat-label">Categories</p>
          <h3 className="admin-overview-stat-value">{totalCategories}</h3>
          <p className="admin-overview-stat-sub">Structured meal groups</p>
        </div>
      </section>

      <section className="admin-overview-grid secondary">
        <div className="admin-overview-panel">
          <div className="admin-overview-panel-head">
            <p className="admin-overview-panel-eyebrow">Orders Insight</p>
            <h2 className="admin-overview-panel-title">Order Status Snapshot</h2>
          </div>

          <div className="admin-overview-metric-list">
            <div className="admin-overview-metric-row">
              <span className="admin-overview-metric-name">Delivered</span>
              <span className="admin-overview-badge success">{deliveredOrders}</span>
            </div>

            <div className="admin-overview-metric-row">
              <span className="admin-overview-metric-name">Pending Flow</span>
              <span className="admin-overview-badge pending">{pendingOrders}</span>
            </div>

            <div className="admin-overview-metric-row">
              <span className="admin-overview-metric-name">Cancelled</span>
              <span className="admin-overview-badge danger">{cancelledOrders}</span>
            </div>
          </div>
        </div>

        <div className="admin-overview-panel">
          <div className="admin-overview-panel-head">
            <p className="admin-overview-panel-eyebrow">Revenue Insight</p>
            <h2 className="admin-overview-panel-title">Financial Snapshot</h2>
          </div>

          <div className="admin-overview-finance-grid">
            <div className="admin-overview-mini-card">
              <p className="admin-overview-mini-label">Delivered Revenue</p>
              <h4 className="admin-overview-mini-value">
                {formatCurrency(totalRevenue)}
              </h4>
            </div>

            <div className="admin-overview-mini-card">
              <p className="admin-overview-mini-label">Delivery Charges</p>
              <h4 className="admin-overview-mini-value">
                {formatCurrency(totalDeliveryCharge)}
              </h4>
            </div>

            <div className="admin-overview-mini-card">
              <p className="admin-overview-mini-label">Provider Meals</p>
              <h4 className="admin-overview-mini-value">
                {totalMealsFromProviders}
              </h4>
            </div>
          </div>
        </div>
      </section>

      <section className="admin-overview-grid tertiary">
        <div className="admin-overview-panel">
          <div className="admin-overview-panel-head">
            <p className="admin-overview-panel-eyebrow">Recent Activity</p>
            <h2 className="admin-overview-panel-title">Latest Orders</h2>
          </div>

          <div className="admin-overview-list">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div key={order.id} className="admin-overview-list-item">
                  <div className="admin-overview-list-main">
                    <p className="admin-overview-list-title">
                      {order.customer?.name || "Unknown Customer"}
                    </p>
                    <p className="admin-overview-list-sub">
                      {order.customer?.phone || "No phone"} • {order.paymentMethod} •{" "}
                      {order._count?.orderItems || 0} items
                    </p>
                  </div>

                  <div className="admin-overview-list-side">
                    <span
                      className={`admin-overview-badge ${order.status?.toLowerCase()}`}
                    >
                      {order.status}
                    </span>
                    <p className="admin-overview-list-amount">
                      {formatCurrency(order.totalAmount)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="admin-overview-empty">No recent orders found.</div>
            )}
          </div>
        </div>

        <div className="admin-overview-panel">
          <div className="admin-overview-panel-head">
            <p className="admin-overview-panel-eyebrow">Recent Structure</p>
            <h2 className="admin-overview-panel-title">Latest Categories</h2>
          </div>

          <div className="admin-overview-list">
            {recentCategories.length > 0 ? (
              recentCategories.map((category) => (
                <div key={category.id} className="admin-overview-list-item">
                  <div className="admin-overview-list-main">
                    <p className="admin-overview-list-title">{category.name}</p>
                    <p className="admin-overview-list-sub">
                      {category.slug || "No slug"} • {formatDate(category.createdAt)}
                    </p>
                  </div>

                  <div className="admin-overview-category-logo">
                    {category.logo ? (
                      <img
                        src={category.logo}
                        alt={category.name}
                        className="admin-overview-category-logo-image"
                      />
                    ) : (
                      <span>
                        {category.name?.charAt(0)?.toUpperCase() || "C"}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="admin-overview-empty">No categories found.</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}