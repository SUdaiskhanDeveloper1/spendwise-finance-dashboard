'use client';

import { Plus } from 'lucide-react';
import { FormModal, type FieldConfig } from '@/components/ui/FormModal';

const fields: FieldConfig[] = [
  { name: 'name', label: 'Category name', placeholder: 'e.g. Pets', required: true, fullWidth: true },
  { name: 'type', label: 'Type', type: 'select', options: ['Expense', 'Income'] },
  { name: 'budget', label: 'Monthly budget', type: 'currency', placeholder: 'Optional', helper: 'Leave empty to track without a limit.' },
];

export function AddCategoryModal() {
  return (
    <FormModal
      title="New category"
      fields={fields}
      submitLabel="Create category"
      successTitle="Category created"
      successDescription={(v) => `${v.name} is ready to use in transactions and budgets.`}
      triggerLabel="New category"
      triggerIcon={<Plus size={16} />}
    />
  );
}
