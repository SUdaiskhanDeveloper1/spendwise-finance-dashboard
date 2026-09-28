'use client';

import { ArrowLeftRight } from 'lucide-react';
import { FormModal, type FieldConfig } from '@/components/ui/FormModal';
import { accounts } from '@/data/accounts';
import { TODAY } from '@/lib/constants';
import { formatCurrency } from '@/lib/format';

const names = accounts.map((a) => a.name);

const fields: FieldConfig[] = [
  { name: 'from', label: 'From', type: 'select', options: names, defaultValue: 'Everyday Bank' },
  { name: 'to', label: 'To', type: 'select', options: names, defaultValue: 'Savings Vault' },
  { name: 'amount', label: 'Amount', type: 'currency', placeholder: '0.00', required: true },
  { name: 'date', label: 'Date', type: 'date', defaultValue: TODAY },
  { name: 'note', label: 'Note', placeholder: 'Optional', fullWidth: true },
];

export function TransferWalletModal() {
  return (
    <FormModal
      title="Move money between wallets"
      description="Transfers never count as income or spending."
      fields={fields}
      submitLabel="Transfer"
      successTitle="Transfer complete"
      successDescription={(v) => `${formatCurrency(Number(v.amount))} moved from ${v.from} to ${v.to}.`}
      triggerLabel="Transfer"
      triggerVariant="secondary"
      triggerIcon={<ArrowLeftRight size={16} />}
    />
  );
}
