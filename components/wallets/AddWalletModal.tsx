'use client';

import { Plus } from 'lucide-react';
import { FormModal, type FieldConfig } from '@/components/ui/FormModal';
import { currencyOptions } from '@/data/settings';

const fields: FieldConfig[] = [
  { name: 'name', label: 'Wallet name', placeholder: 'e.g. Travel Wallet', required: true, fullWidth: true },
  { name: 'type', label: 'Type', type: 'select', options: ['Bank Account', 'Cash Wallet', 'Savings Account', 'Shared Wallet', 'Credit Card', 'Crypto Wallet'] },
  { name: 'currency', label: 'Currency', type: 'select', options: currencyOptions },
  { name: 'balance', label: 'Opening balance', type: 'currency', placeholder: '0.00', fullWidth: true },
];

export function AddWalletModal() {
  return (
    <FormModal
      title="Add a wallet"
      description="Track a bank account, cash, savings or a shared pot. Balances update as you add transactions."
      fields={fields}
      submitLabel="Add wallet"
      successTitle="Wallet added"
      successDescription={(v) => `${v.name} is ready to use.`}
      triggerLabel="Add wallet"
      triggerIcon={<Plus size={16} />}
    />
  );
}
