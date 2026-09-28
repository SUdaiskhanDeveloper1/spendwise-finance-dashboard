import type { ImageKey } from './images';

export interface FeatureSection {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  image: ImageKey;
  /** App screen that demonstrates the feature. */
  href: string;
  highlight: { label: string; value: string; meta: string };
}

export const featureSections: FeatureSection[] = [
  {
    id: 'wallets',
    eyebrow: 'Accounts and wallets',
    title: 'Every account, one honest balance',
    description:
      'See your bank, cash, savings and shared pots side by side, so you always know what you really have to spend.',
    bullets: [
      'Cash, bank, savings and shared wallets in one view',
      'Transfers between wallets never count as spending',
      'Balances in pounds, euros and 30+ other currencies',
    ],
    image: 'moneyManagement',
    href: '/wallets',
    highlight: { label: 'Total balance', value: '£19,301.10', meta: '+3.5% this month' },
  },
  {
    id: 'budgets',
    eyebrow: 'Budget planner',
    title: 'Budgets that bend with real life',
    description:
      'Set limits for the things you actually spend on. SpendWise tells you what is safe to spend today, not just what you spent last week.',
    bullets: [
      'Category budgets with gentle early warnings',
      'A daily safe-to-spend figure that updates as you go',
      'Monthly or weekly cycles that line up with payday',
    ],
    image: 'personalBudget',
    href: '/budgets',
    highlight: { label: 'Food and Drink', value: '£80 left', meta: '7 days to go' },
  },
  {
    id: 'analytics',
    eyebrow: 'Spending insights',
    title: 'Spot the pattern before it becomes a problem',
    description:
      'Clear charts show where your money goes each month, which habits are creeping up and how much you are really saving.',
    bullets: [
      'Cash flow and savings rate at a glance',
      'Six-month category trends with plain-English notes',
      'Monthly statements you can download or share',
    ],
    image: 'financialGrowth',
    href: '/analytics',
    highlight: { label: 'Savings rate', value: '46%', meta: 'Up from 38% in June' },
  },
  {
    id: 'shared',
    eyebrow: 'Shared wallets',
    title: 'Shared money without the awkward maths',
    description:
      'Run a household pot with your partner, housemates or family. Everyone sees the same numbers, and settling up takes seconds.',
    bullets: [
      'Split bills evenly or by amount',
      'See who paid and who owes what',
      'Invite members with view-only or full access',
    ],
    image: 'sharedHousehold',
    href: '/shared-wallets',
    highlight: { label: 'Family Household', value: '£720 of £1,200', meta: '3 members · 60% used' },
  },
  {
    id: 'currencies',
    eyebrow: 'Travel and currencies',
    title: 'Plan the trip in the currency you will spend',
    description:
      'Create a travel wallet in euros or dollars, set a trip budget together and keep the totals converted back home.',
    bullets: [
      'Travel wallets in EUR, USD and more',
      'Trip budgets shared with travel companions',
      'Home-currency totals for every foreign wallet',
    ],
    image: 'travelCurrency',
    href: '/wallets',
    highlight: { label: 'Paris Trip', value: '€1,280.00', meta: 'Shared with Noor and Zain' },
  },
  {
    id: 'receipts',
    eyebrow: 'Receipt capture',
    title: 'Snap the receipt, skip the typing',
    description:
      'Take a photo and review the merchant, date, amount and category before saving. Your receipts stay searchable for later.',
    bullets: [
      'Merchant, date and amount filled in for you',
      'Category suggestions you can accept or change',
      'A searchable history of every receipt',
    ],
    image: 'receiptScan',
    href: '/receipt-scanner',
    highlight: { label: 'FreshMart', value: '£84.35', meta: 'Categorised as Food' },
  },
];

export const howItWorks = [
  { title: 'Add your wallets', description: 'Create wallets for your bank, cash and savings, or import a CSV. It takes about five minutes.' },
  { title: 'Set a few budgets', description: 'Choose the categories that matter to you. Start with suggested limits and adjust as you learn.' },
  { title: 'Watch your savings grow', description: 'Track goals, get a nudge before you overspend and see your savings rate climb month by month.' },
];

/** Demo testimonials — replace with real customer quotes before launch. */
export const testimonials: { quote: string; name: string; role: string; avatar: ImageKey }[] = [
  {
    quote:
      'I used to do this in a spreadsheet every Sunday night. Now I check SpendWise on the bus and actually know what I can spend by Friday.',
    name: 'James Whitfield',
    role: 'Secondary school teacher, Leeds',
    avatar: 'avatarJames',
  },
  {
    quote:
      'Freelance income is lumpy. Seeing my monthly average next to my savings rate finally made budgeting feel possible.',
    name: 'Amara Okafor',
    role: 'Freelance illustrator, Bristol',
    avatar: 'avatarAmara',
  },
  {
    quote:
      'The household wallet ended the “who paid for what” conversations at home. Settling up takes seconds now.',
    name: 'Daniel Reyes',
    role: 'Nurse and dad of two, Birmingham',
    avatar: 'avatarDaniel',
  },
];

export const trustPoints = [
  { title: 'Private by default', description: 'No ads and no selling of your data. Ever.' },
  { title: 'Encrypted end to end', description: 'Data encrypted in transit and at rest.' },
  { title: 'Your data, your call', description: 'Export everything or delete your account anytime.' },
];

export const faqs = [
  {
    question: 'Is SpendWise connected to my bank?',
    answer:
      'This template runs on static mock data and makes no bank connections. The screens are structured so an Open Banking provider or your own API can be plugged in later.',
  },
  {
    question: 'Can I use a currency other than pounds?',
    answer:
      'Yes. Change the default currency in Settings, and create wallets in other currencies for travel or savings.',
  },
  {
    question: 'How does the receipt scanner work?',
    answer:
      'In this template the scan is simulated with sample data. The upload, review and save flow is ready to connect to the OCR service of your choice.',
  },
  {
    question: 'Can I share a wallet with my family or housemates?',
    answer:
      'Shared wallets let a household track a common budget, split expenses and settle up. They are included in the Family plan.',
  },
  {
    question: 'Can I export my data?',
    answer:
      'Export any filtered list of transactions to CSV from the Transactions page, or download monthly statements from Reports.',
  },
];

export const footerLinks: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Budgets', href: '/budgets' },
      { label: 'Wallets', href: '/wallets' },
      { label: 'Reports', href: '/reports' },
    ],
  },
  {
    title: 'Features',
    links: [
      { label: 'Shared wallets', href: '/shared-wallets' },
      { label: 'Receipt scanner', href: '/receipt-scanner' },
      { label: 'Scheduled payments', href: '/scheduled-payments' },
      { label: 'Mobile app', href: '/mobile-app' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Pricing', href: '/pricing' },
      { label: 'How it works', href: '/#how-it-works' },
      { label: 'FAQ', href: '/#faq' },
      { label: 'Contact', href: 'mailto:hello@spendwise.example' },
    ],
  },
];
