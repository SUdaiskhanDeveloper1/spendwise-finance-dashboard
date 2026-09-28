'use client';

import { Plus } from 'lucide-react';
import { FormModal, type FieldConfig } from '@/components/ui/FormModal';
import { expenseCategoryNames } from '@/lib/categories';
import { formatCurrency } from '@/lib/format';

const fields: FieldConfig[] = [
  { name: 'category', label: 'Category', type: 'select', options: expenseCategoryNames, fullWidth: true },
  { name: 'limit', label: 'Spending limit', type: 'currency', placeholder: '0.00', required: true },
  { name: 'period', label: 'Budget cycle', type: 'select', options: ['Monthly', 'Weekly'] },
  { name: 'alert', label: 'Warn me at', type: 'select', options: ['80% of the limit', '90% of the limit', 'Only when over'], fullWidth: true },
  { name: 'rollover', label: 'Roll unspent money into next month', type: 'switch', fullWidth: true },
];

export function AddBudgetModal() {
  return (
    <FormModal
      title="Create a budget"
      description="Set a limit for a category. You will get a gentle alert before you reach it."
      fields={fields}
      submitLabel="Create budget"
      successTitle="Budget created"
      successDescription={(v) => `${v.category}: ${formatCurrency(Number(v.limit))} ${String(v.period).toLowerCase()}`}
      triggerLabel="New budget"
      triggerIcon={<Plus size={16} />}
    />
  );
}
