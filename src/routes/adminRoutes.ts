import { LayoutDashboard, MessageSquareQuote, ShoppingBag, Users } from "lucide-react";

export const adminRoutes =
{
  title: "Admin Dashboard",
  navItems: [
    { label: "Profile", href: "/admin-dashboard/profile", icon: LayoutDashboard },
    { label: "View All Users", href: "/admin-dashboard/view-users", icon: Users },
    { label: "Orders", href: "/admin-dashboard/view-orders", icon: ShoppingBag },
    { label: "Manage Categories", href: "/admin-dashboard/manage-categories", icon: MessageSquareQuote },
  ]
}