'use client';

import { Button } from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { FormModal, type FieldConfig } from '@/components/ui/FormModal';
import { accounts } from '@/data/accounts';
import { formatCurrency } from '@/lib/format';

const fields: FieldConfig[] = [
  { name: 'amount', label: 'Amount', type: 'currency', placeholder: '0.00', required: true },
  { name: 'wallet', label: 'From wallet', type: 'select', options: accounts.map((a) => a.name) },
  { name: 'repeat', label: 'Repeat every month', type: 'switch', fullWidth: true },
];

export function ContributeButton({ goalTitle }: { goalTitle: string }) {
  return (
    <FormModal
      title={`Add money to ${goalTitle}`}
      fields={fields}
      submitLabel="Add money"
      successTitle="Nice — money added"
      successDescription={(v) => `${formatCurrency(Number(v.amount))} moved to ${goalTitle}.`}
      trigger={
        <Button size="sm" variant="secondary" leftIcon={<Plus size={14} />} w="full">
          Add money
        </Button>
      }
    />
  );
}
