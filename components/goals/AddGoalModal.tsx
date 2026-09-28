'use client';

import { Plus } from 'lucide-react';
import { FormModal, type FieldConfig } from '@/components/ui/FormModal';
import { accounts } from '@/data/accounts';
import { formatCurrency } from '@/lib/format';

const fields: FieldConfig[] = [
  { name: 'title', label: 'What are you saving for?', placeholder: 'e.g. New bike', required: true, fullWidth: true },
  { name: 'target', label: 'Target amount', type: 'currency', placeholder: '0.00', required: true },
  { name: 'saved', label: 'Already saved', type: 'currency', placeholder: '0.00' },
  { name: 'deadline', label: 'Target date', type: 'date', required: true },
  { name: 'category', label: 'Category', type: 'select', options: ['Safety', 'Travel', 'Home', 'Tech', 'Education', 'Other'] },
  { name: 'wallet', label: 'Save into', type: 'select', options: accounts.map((a) => a.name), fullWidth: true },
];

export function AddGoalModal() {
  return (
    <FormModal
      title="New savings goal"
      description="We will work out how much to set aside each month to reach it on time."
      fields={fields}
      submitLabel="Create goal"
      successTitle="Goal created"
      successDescription={(v) => `${v.title}: ${formatCurrency(Number(v.target), 'GBP', 0)} target`}
      triggerLabel="New goal"
      triggerIcon={<Plus size={16} />}
    />
  );
}
