import {
  ArrowLeftRight,
  CalendarClock,
  ChartLine,
  ChartPie,
  FileText,
  HandCoins,
  LayoutDashboard,
  Lightbulb,
  Receipt,
  ScanLine,
  Settings,
  Tags,
  Target,
  User,
  Users,
  WalletCards,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Key into the badge counts passed to the app shell. */
  badgeKey?: string;
}

export interface NavGroup {
  label?: string;
  items: NavItem[];
}

export const appNavigation: NavGroup[] = [
  { items: [{ label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard }] },
  {
    label: 'Money',
    items: [
      { label: 'Transactions', href: '/transactions', icon: ArrowLeftRight },
      { label: 'Income', href: '/income', icon: HandCoins },
      { label: 'Expenses', href: '/expenses', icon: Receipt },
      { label: 'Wallets', href: '/wallets', icon: WalletCards },
      { label: 'Shared wallets', href: '/shared-wallets', icon: Users },
      { label: 'Scheduled payments', href: '/scheduled-payments', icon: CalendarClock, badgeKey: 'billsDue' },
    ],
  },
  {
    label: 'Planning',
    items: [
      { label: 'Budgets', href: '/budgets', icon: ChartPie, badgeKey: 'budgetAlerts' },
      { label: 'Goals', href: '/goals', icon: Target },
      { label: 'Categories', href: '/categories', icon: Tags },
    ],
  },
  {
    label: 'Insights',
    items: [
      { label: 'Analytics', href: '/analytics', icon: ChartLine },
      { label: 'Reports', href: '/reports', icon: FileText },
      { label: 'Insights', href: '/insights', icon: Lightbulb },
      { label: 'Receipt scanner', href: '/receipt-scanner', icon: ScanLine },
    ],
  },
];

export const accountNavigation: NavItem[] = [
  { label: 'Profile', href: '/profile', icon: User },
  { label: 'Settings', href: '/settings', icon: Settings },
];

/** Primary destinations in the mobile bottom bar; "More" opens the full menu. */
export const mobileTabs: NavItem[] = [
  { label: 'Home', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Activity', href: '/transactions', icon: ArrowLeftRight },
  { label: 'Budgets', href: '/budgets', icon: ChartPie },
  { label: 'Wallets', href: '/wallets', icon: WalletCards },
];

export const marketingNavigation = [
  { label: 'Features', href: '/#features' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Mobile app', href: '/mobile-app' },
];

export const isActivePath = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);
