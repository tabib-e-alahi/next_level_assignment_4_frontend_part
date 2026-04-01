"use client";

import { useEffect, useState } from "react";
import { providerService } from "@/services/provider/provider.service";
import "./orders.css";

export default function ProviderOrders() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const res = await providerService.getOrders();
    if (res.data) setOrders(res.data.result);
  };

  const handleStatus = async (id: string, status: string) => {
    await providerService.updateOrderStatus(id, status);
    loadOrders();
  };
console.log(orders);
  return (
    <div className="provider-page">
      <h1 className="provider-title">Incoming Orders</h1>

      <div className="provider-list">
        {orders.map((order) => (
          <div key={order.id} className="provider-item">
            <span>{order.id}</span>
            <span>{order.status}</span>

            <div className="provider-actions">
              <button
                onClick={() => handleStatus(order.id, "CONFIRMED")}
                className="provider-btn"
              >
                Confirm
              </button>

              <button
                onClick={() => handleStatus(order.id, "DELIVERED")}
                className="provider-btn"
              >
                Deliver
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}