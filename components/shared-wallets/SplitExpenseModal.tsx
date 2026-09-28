'use client';

import { Split } from 'lucide-react';
import { FormModal, type FieldConfig } from '@/components/ui/FormModal';
import { sharedWallets } from '@/data/sharedWallets';
import { formatCurrency } from '@/lib/format';

const members = Array.from(new Set(sharedWallets.flatMap((w) => w.members)));

const fields: FieldConfig[] = [
  { name: 'title', label: 'What was it for?', placeholder: 'e.g. Weekly shop', required: true, fullWidth: true },
  { name: 'amount', label: 'Total amount', type: 'currency', placeholder: '0.00', required: true },
  { name: 'wallet', label: 'Shared wallet', type: 'select', options: sharedWallets.map((w) => w.name) },
  { name: 'paidBy', label: 'Paid by', type: 'select', options: members },
  { name: 'split', label: 'Split', type: 'select', options: ['Equally', 'By exact amounts', 'By percentage'] },
];

export function SplitExpenseModal() {
  return (
    <FormModal
      title="Split an expense"
      description="Everyone in the wallet sees the expense and what they owe."
      fields={fields}
      submitLabel="Split expense"
      successTitle="Expense split"
      successDescription={(v) => `${v.title} · ${formatCurrency(Number(v.amount))} split ${String(v.split).toLowerCase()} in ${v.wallet}`}
      triggerLabel="Split expense"
      triggerVariant="secondary"
      triggerIcon={<Split size={16} />}
    />
  );
}
