import { ActivityItem, AppNotification, UserProfile } from '@/types/user';

export const currentUser: UserProfile = {
  firstName: 'Asma',
  lastName: 'Rahman',
  email: 'asma.rahman@example.com',
  phone: '+44 7700 900123',
  location: 'Manchester, United Kingdom',
  timezone: 'Europe/London (GMT+1)',
  currency: 'GBP',
  occupation: 'Product designer',
  memberSince: '2024-03-12',
  planId: 'premium',
  avatar: '/images/avatar-asma.webp',
};

export const activityLog: ActivityItem[] = [
  { id: 'ac-1', title: 'Exported June statement', detail: 'PDF · 184 KB', date: '2026-07-22', icon: 'Receipt' },
  { id: 'ac-2', title: 'Raised Food and Drink budget', detail: '£450 → £500 per month', date: '2026-07-18', icon: 'Utensils' },
  { id: 'ac-3', title: 'Added £500 to Emergency Fund', detail: 'Now 65% of target', date: '2026-07-06', icon: 'ShieldCheck' },
  { id: 'ac-4', title: 'Invited Sara to Family Household', detail: 'Shared wallet', date: '2026-06-29', icon: 'Users' },
  { id: 'ac-5', title: 'Signed in on a new device', detail: 'Safari on iPhone · Manchester', date: '2026-06-24', icon: 'ShieldCheck' },
];

export const notifications: AppNotification[] = [
  { id: 'nt-1', title: 'Rent is due tomorrow', body: '£950.00 from Everyday Bank on 25 Jul.', date: '2026-07-24', kind: 'bill', read: false, href: '/scheduled-payments' },
  { id: 'nt-2', title: 'Shopping is £30 over budget', body: 'You have spent £330 of your £300 monthly limit.', date: '2026-07-20', kind: 'budget', read: false, href: '/budgets' },
  { id: 'nt-3', title: 'Food and Drink is at 84%', body: '£80 left for the last 7 days of July.', date: '2026-07-22', kind: 'budget', read: false, href: '/budgets' },
  { id: 'nt-4', title: 'Emergency Fund passed 65%', body: 'At this pace you will reach it in October.', date: '2026-07-06', kind: 'goal', read: true, href: '/goals' },
  { id: 'nt-5', title: 'Your June statement is ready', body: 'Income £4,650 · Spending £2,880.', date: '2026-07-01', kind: 'insight', read: true, href: '/reports' },
];
