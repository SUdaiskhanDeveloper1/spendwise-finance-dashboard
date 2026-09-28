'use client';

import { Plus } from 'lucide-react';
import { FormModal, type FieldConfig } from '@/components/ui/FormModal';
import { accounts } from '@/data/accounts';
import { expenseCategoryNames } from '@/lib/categories';
import { formatCurrency, formatDate } from '@/lib/format';

const fields: FieldConfig[] = [
  { name: 'title', label: 'Payment name', placeholder: 'e.g. Car insurance', required: true, fullWidth: true },
  { name: 'amount', label: 'Amount', type: 'currency', placeholder: '0.00', required: true },
  { name: 'dueDate', label: 'Next due date', type: 'date', required: true },
  { name: 'frequency', label: 'Repeats', type: 'select', options: ['Monthly', 'Weekly', 'Quarterly', 'Yearly'] },
  { name: 'category', label: 'Category', type: 'select', options: expenseCategoryNames },
  { name: 'wallet', label: 'Pay from', type: 'select', options: accounts.map((a) => a.name), fullWidth: true },
  { name: 'reminder', label: 'Remind me two days before', type: 'switch', defaultValue: true, fullWidth: true },
];

export function AddScheduledPaymentModal() {
  return (
    <FormModal
      title="Schedule a payment"
      description="Recurring bills are counted in your safe-to-spend figure before they leave your account."
      fields={fields}
      submitLabel="Schedule payment"
      successTitle="Payment scheduled"
      successDescription={(v) => `${v.title}: ${formatCurrency(Number(v.amount))} on ${v.dueDate ? formatDate(String(v.dueDate)) : 'the due date'}`}
      triggerLabel="New payment"
      triggerIcon={<Plus size={16} />}
    />
  );
}
