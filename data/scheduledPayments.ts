import { ScheduledPayment } from '@/types/scheduledPayment';

export const scheduledPayments: ScheduledPayment[] = [
  { id: 'sp-1', title: 'Rent', amount: 950, dueDate: '2026-07-25', frequency: 'Monthly', category: 'Rent', wallet: 'Everyday Bank', status: 'Due', reminderEnabled: true },
  { id: 'sp-2', title: 'Internet', amount: 38, dueDate: '2026-07-28', frequency: 'Monthly', category: 'Utilities', wallet: 'Everyday Bank', status: 'Upcoming', reminderEnabled: true },
  { id: 'sp-3', title: 'Netflix', amount: 12.99, dueDate: '2026-07-30', frequency: 'Monthly', category: 'Entertainment', wallet: 'Everyday Bank', status: 'Upcoming', reminderEnabled: false },
  { id: 'sp-4', title: 'Gym Membership', amount: 35, dueDate: '2026-08-03', frequency: 'Monthly', category: 'Health', wallet: 'Cash Wallet', status: 'Upcoming', reminderEnabled: true },
  { id: 'sp-5', title: 'Home insurance', amount: 18.4, dueDate: '2026-08-06', frequency: 'Monthly', category: 'Utilities', wallet: 'Everyday Bank', status: 'Upcoming', reminderEnabled: true },
  { id: 'sp-6', title: 'Council tax', amount: 148, dueDate: '2026-07-15', frequency: 'Monthly', category: 'Utilities', wallet: 'Everyday Bank', status: 'Paid', reminderEnabled: true },
  { id: 'sp-7', title: 'Mobile phone plan', amount: 22, dueDate: '2026-07-12', frequency: 'Monthly', category: 'Utilities', wallet: 'Everyday Bank', status: 'Paid', reminderEnabled: false },
  { id: 'sp-8', title: 'Music subscription', amount: 11.99, dueDate: '2026-07-05', frequency: 'Monthly', category: 'Entertainment', wallet: 'Everyday Bank', status: 'Paid', reminderEnabled: false },
];
