import {
  ArrowLeftRight,
  Bell,
  Briefcase,
  Bus,
  ChartLine,
  CircleDollarSign,
  Clapperboard,
  Coins,
  GraduationCap,
  HeartPulse,
  House,
  Landmark,
  Laptop,
  PiggyBank,
  Plane,
  Receipt,
  ShieldCheck,
  ShoppingBag,
  TrendingDown,
  TrendingUp,
  Users,
  Utensils,
  Wallet,
  Zap,
  type LucideIcon,
} from 'lucide-react';

/**
 * Maps the icon names stored in mock data (`icon: 'PiggyBank'`) to Lucide
 * components. Only icons listed here end up in the bundle.
 */
const icons = {
  ArrowLeftRight,
  Bell,
  Briefcase,
  Bus,
  ChartLine,
  CircleDollarSign,
  Clapperboard,
  Coins,
  GraduationCap,
  HeartPulse,
  Home: House,
  House,
  Landmark,
  Laptop,
  PiggyBank,
  Plane,
  Receipt,
  ShieldCheck,
  ShoppingBag,
  TrendingDown,
  TrendingUp,
  Users,
  Utensils,
  Wallet,
  Zap,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function getIcon(name?: string): LucideIcon {
  return (name && icons[name as IconName]) || CircleDollarSign;
}
