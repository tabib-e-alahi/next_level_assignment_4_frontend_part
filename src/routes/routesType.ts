import type { LucideIcon } from "lucide-react";

export type Routes = {
  title: string;
  navItems: {
    label: string;
    href: string;
    icon: LucideIcon;
    badge?: string;
  }[];
};