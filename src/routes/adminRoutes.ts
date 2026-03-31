import { ClipboardList, LayoutDashboard, MessageSquareQuote, Settings, ShoppingBag, Users, UtensilsCrossed } from "lucide-react";

export const adminRoutes =
{
  title: "Admin Dashboard",
  navItems: [
    { label: "Profile", href: "/dashboard", icon: LayoutDashboard },
    { label: "Menu", href: "/dashboard/menu", icon: UtensilsCrossed, badge: "12" },
    { label: "Orders", href: "/dashboard/orders", icon: ShoppingBag, badge: "08" },
    { label: "Reservations", href: "/dashboard/reservations", icon: ClipboardList },
    { label: "Customers", href: "/dashboard/customers", icon: Users },
    { label: "Reviews", href: "/dashboard/reviews", icon: MessageSquareQuote, badge: "New" },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ]
}