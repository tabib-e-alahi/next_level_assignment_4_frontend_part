import { House, LayoutDashboard, MessageSquareQuote, ShoppingBag, Users,} from "lucide-react";

export const customerRoutes = {
  title: "Customer Dashboard",
  navItems: [
    { label: "Home", href: "/", icon: House },
    { label: "Profile", href: "/customer-dashboard/profile", icon: LayoutDashboard },
    { label: "Orders", href: "/customer-dashboard/orders", icon: ShoppingBag, badge: "08" },
    { label: "Reviews", href: "/customer-dashboard/reviews", icon: MessageSquareQuote },
  ]
}
