import {  LayoutDashboard, ShoppingBag, Users, UtensilsCrossed } from "lucide-react";

export const providerRoutes =
{
  title: "Provider Dashboard",
  navItems: [
    { label: "Profile", href: "/provider-dashboard/profile", icon: Users },
    { label: "Menu", href: "/provider-dashboard/meals", icon: UtensilsCrossed },
    { label: "Orders", href: "/provider-dashboard/orders", icon: ShoppingBag, },
  ]
}
