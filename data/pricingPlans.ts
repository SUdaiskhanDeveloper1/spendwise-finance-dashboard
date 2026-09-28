import { PricingPlan } from '@/types/pricing';

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: '£0',
    description: 'Simple manual tracking for getting started.',
    highlighted: false,
    features: ['Manual transactions', 'Up to 3 budgets', 'Wallet overview', 'Dark mode'],
  },
  {
    id: 'plus',
    name: 'Plus',
    price: '£7',
    description: 'More planning tools for everyday budgeting.',
    highlighted: false,
    features: ['Everything in Free', 'Unlimited budgets', 'Reports and CSV export', 'Multiple currencies'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '£12',
    description: 'Insights and automation for people who want to save more.',
    highlighted: true,
    features: ['Everything in Plus', 'Receipt scanner', 'Smart insights', 'Priority support'],
  },
  {
    id: 'family',
    name: 'Family',
    price: '£18',
    description: 'Shared wallets and planning for the whole household.',
    highlighted: false,
    features: ['Everything in Premium', 'Shared wallets', 'Group budgets', 'Up to 6 members'],
  },
];

/** Feature comparison table on the pricing page, one value per plan above. */
export const planComparison: { feature: string; values: (string | boolean)[] }[] = [
  { feature: 'Wallets and accounts', values: ['Up to 3', 'Unlimited', 'Unlimited', 'Unlimited'] },
  { feature: 'Category budgets', values: ['Up to 3', 'Unlimited', 'Unlimited', 'Unlimited'] },
  { feature: 'Savings goals', values: ['1', 'Unlimited', 'Unlimited', 'Unlimited'] },
  { feature: 'Reports and CSV export', values: [false, true, true, true] },
  { feature: 'Multi-currency wallets', values: [false, true, true, true] },
  { feature: 'Smart insights', values: [false, false, true, true] },
  { feature: 'Receipt scanner', values: [false, false, true, true] },
  { feature: 'Shared wallets', values: [false, false, false, true] },
  { feature: 'Household members', values: ['1', '1', '1', 'Up to 6'] },
  { feature: 'Support', values: ['Help centre', 'Email', 'Priority', 'Priority'] },
];

/** Monthly price as a number, parsed from the display string. */
export const monthlyPrice = (plan: PricingPlan) => Number(plan.price.replace(/[^0-9.]/g, '')) || 0;
