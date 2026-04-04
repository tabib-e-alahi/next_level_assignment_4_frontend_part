"use client";

import { useEffect, useMemo, useState } from "react";
import { AdminCustomer, AdminProvider, UserStatus } from "@/types/admin";
import { adminService } from "@/services/admin/admin.service";
import "./users.css";
import { toast } from "sonner";
import LoadingPage from "@/components/modules/loading/LoadingCompo";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

type ActiveTab = "CUSTOMERS" | "PROVIDERS";

export default function AdminUsersPage() {
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [providers, setProviders] = useState<AdminProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState<ActiveTab>("CUSTOMERS");
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    setMessage("");

    const result = await adminService.getAllUsers();

    if (result.data) {
      setCustomers(result.data.customers || []);
      setProviders(result.data.providers || []);
    } else {
      setMessage(result.error?.message || "Failed to fetch users.");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleStatusChange = async (
    userId: string,
    status: UserStatus
  ) => {

    setUpdatingUserId(userId);

    const result = await adminService.updateUserStatus(userId, status);
    if (result.data) {
      setMessage("User status updated successfully.");
      await loadUsers();
    } else {
      toast.error(result.error?.message || "Failed to update status")
    }

    setUpdatingUserId(null);
  };

  const currentList = useMemo(() => {
    return activeTab === "CUSTOMERS" ? customers : providers;
  }, [activeTab, customers, providers]);

  if (loading) {
    return <LoadingPage></LoadingPage>
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <p className="admin-eyebrow">Admin Dashboard</p>
        <h1 className="admin-title">User Ledger</h1>
        <p className="admin-subtitle">
          View and manage customers and providers separately
        </p>
      </div>

      {message && <p className="admin-feedback">{message}</p>}

      <div className="admin-tabs-wrap">
        <button
          type="button"
          className={`admin-tab ${activeTab === "CUSTOMERS" ? "active" : ""}`}
          onClick={() => setActiveTab("CUSTOMERS")}
        >
          Customers
          <span className="admin-tab-count">{customers.length}</span>
        </button>

        <button
          type="button"
          className={`admin-tab ${activeTab === "PROVIDERS" ? "active" : ""}`}
          onClick={() => setActiveTab("PROVIDERS")}
        >
          Providers
          <span className="admin-tab-count">{providers.length}</span>
        </button>
      </div>

      <section className="admin-user-section">
        <div className="admin-section-head">
          <p className="admin-section-eyebrow">
            {activeTab === "CUSTOMERS" ? "Customers" : "Providers"}
          </p>
          <h2 className="admin-section-title">
            {activeTab === "CUSTOMERS"
              ? `Customer Accounts (${customers.length})`
              : `Provider Accounts (${providers.length})`}
          </h2>
        </div>

        <div className="admin-list">
          {currentList.length > 0 ? (
            activeTab === "CUSTOMERS" ? (
              customers.map((customer) => (
                <div key={customer.id} className="admin-card-row">
                  <div className="admin-card-main">
                    <p className="admin-card-title">
                      {customer.name || "Unnamed Customer"}
                    </p>
                    <p className="admin-card-sub">
                      Phone: {customer.phone || "Not added"}
                    </p>
                    <p className="admin-card-sub">
                      Joined: {formatDate(customer.createdAt)}
                    </p>
                  </div>

                  <div className="admin-card-meta">
                    <span className="admin-badge">{customer.role}</span>
                    <span className="admin-badge">
                      Orders: {customer._count?.orders || 0}
                    </span>
                    <span
                      className={`admin-badge ${
                        customer.status === "ACTIVE" ? "active" : "suspended"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </div>

                  <div className="admin-card-actions">
                    {customer.status === "ACTIVE" ? (
                      <button
                        className="admin-btn secondary"
                        disabled={updatingUserId === customer.id}
                        onClick={() =>
                          handleStatusChange(customer.id, "SUSPENDED")
                        }
                      >
                        {updatingUserId === customer.id
                          ? "Updating..."
                          : "Suspend"}
                      </button>
                    ) : (
                      <button
                        className="admin-btn"
                        disabled={updatingUserId === customer.id}
                        onClick={() =>
                          handleStatusChange(customer.id, "ACTIVE")
                        }
                      >
                        {updatingUserId === customer.id
                          ? "Updating..."
                          : "Activate"}
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              providers.map((provider) => {
                const totalMeals =
                  provider.providerProfiles?._count.meals || 0;

                return (
                  <div key={provider.id} className="admin-card-row">
                    <div className="admin-card-main">
                      <p className="admin-card-title">
                        {provider.name || "Unnamed Provider"}
                      </p>
                      <p className="admin-card-sub">
                        Phone: {provider.phone || "Not added"}
                      </p>
                      <p className="admin-card-sub">
                        Joined: {formatDate(provider.createdAt)}
                      </p>
                    </div>

                    <div className="admin-card-meta">
                      <span className="admin-badge">{provider.role}</span>
                      <span className="admin-badge">Meals: {totalMeals}</span>
                      <span
                        className={`admin-badge ${
                          provider.status === "ACTIVE" ? "active" : "suspended"
                        }`}
                      >
                        {provider.status}
                      </span>
                    </div>

                    <div className="admin-card-actions">
                      {provider.status === "ACTIVE" ? (
                        <button
                          className="admin-btn secondary"
                          disabled={updatingUserId === provider.id}
                          onClick={() =>
                            handleStatusChange(provider.id, "SUSPENDED")
                          }
                        >
                          {updatingUserId === provider.id
                            ? "Updating..."
                            : "Suspend"}
                        </button>
                      ) : (
                        <button
                          className="admin-btn"
                          disabled={updatingUserId === provider.id}
                          onClick={() =>
                            handleStatusChange(provider.id, "ACTIVE")
                          }
                        >
                          {updatingUserId === provider.id
                            ? "Updating..."
                            : "Activate"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )
          ) : (
            <div className="admin-empty-card">
              {activeTab === "CUSTOMERS"
                ? "No customers found."
                : "No providers found."}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}