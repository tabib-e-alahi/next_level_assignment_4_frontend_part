"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, ChevronRight, Menu, X } from "lucide-react";
import { adminRoutes } from "@/routes/adminRoutes";
import { customerRoutes } from "@/routes/customerRoutes";
import { providerRoutes } from "@/routes/providerRoutes";
import { Routes } from "@/routes/routesType";
import "./sidebar.css";

type UserInfo = {
  name: string;
  role: string;
};

export default function DashboardSideBar({ user }: { user: UserInfo }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  let routes: Routes = { title: "", navItems: [] };
  switch (user.role) {
    case "ADMIN":    routes = adminRoutes;    break;
    case "CUSTOMER": routes = customerRoutes; break;
    case "PROVIDER": routes = providerRoutes; break;
  }

  const displayName =
    user.name.split(" ")[0]

  const initials = user.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const roleColor: Record<string, string> = {
    ADMIN:    "#f87171",
    CUSTOMER: "#e8a030",
    PROVIDER: "#4ade80",
  };

  async function handleSignOut() {
    // Replace with your actual sign-out logic (e.g. next-auth signOut(), cookie clear, etc.)
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    router.push("/login");
  }

  const sidebar = (
    <aside className="dsb-aside">
      {/* Background layers */}
      <div className="dsb-bg-radial" />
      <div className="dsb-bg-orb1" />
      <div className="dsb-bg-orb2" />
      <div className="dsb-bg-dots" />

      {/* Header */}
      <div className="dsb-header">
        <div className="dsb-header-inner">
          <div className="dsb-avatar">{initials}</div>
          <div className="dsb-user-info">
            <h1 className="dsb-greeting">
              {displayName}
              <em className="dsb-dashboard-word"> Dashboard</em>
            </h1>
            <span
              className="dsb-role-badge"
              style={{ color: roleColor[user.role] ?? "#f5f0e8" }}
            >
              {user.role}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="dsb-nav">
        <p className="dsb-nav-label">Navigation</p>
        <div className="dsb-nav-items">
          {routes.navItems.map((item, index) => {
            const Icon = item.icon;
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`dsb-nav-item${active ? " active" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                <span className="dsb-nav-indicator" />

                <span  className={`d dsb-nav-icon-wrap${active ? " active" : ""}`}>
                  <Icon size={18} />
                </span>

                <span className="dsb-nav-text-wrap">
                  <span className={`dsb-nav-label-text${active ? " active" : ""}`}>
                    {item.label}
                  </span>
                  <span className="dsb-nav-section-num">
                    Section {String(index + 1).padStart(2, "0")}
                  </span>
                </span>

                {item.badge ? (
                  <span className={`dsb-nav-badge${active ? " active" : ""}`}>
                    {item.badge}
                  </span>
                ) : null}

                <ChevronRight
                  size={15}
                  className={`dsb-nav-chevron${active ? " active" : ""}`}
                />
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="dsb-footer">
        <button
          type="button"
          className="dsb-signout-btn"
          onClick={handleSignOut}
        >
          <span className="dsb-signout-icon-wrap">
            <LogOut size={16} />
          </span>
          <span>
            <span className="dsb-signout-label">Sign out</span>
            <span className="dsb-signout-sub">End session</span>
          </span>
          <ChevronRight size={15} className="dsb-signout-chevron" />
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="dsb-desktop">{sidebar}</div>

      {/* Mobile toggle button */}
      <button
        className="dsb-mobile-toggle"
        onClick={() => setMobileOpen(o => !o)}
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <>
          <div className="dsb-mobile-overlay" onClick={() => setMobileOpen(false)} />
          <div className="dsb-mobile-drawer">{sidebar}</div>
        </>
      )}
    </>
  );
}