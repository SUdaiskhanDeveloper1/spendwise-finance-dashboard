'use client';

import type { ReactElement } from 'react';
import { Plus } from 'lucide-react';
import { accounts } from '@/data/accounts';
import { categories } from '@/data/categories';
import { TODAY } from '@/lib/constants';
import { formatCurrency } from '@/lib/format';
import { FormModal, type FieldConfig, type FormValues } from '@/components/ui/FormModal';
import type { Transaction, TransactionType } from '@/types/transaction';

const fields: FieldConfig[] = [
  { name: 'title', label: 'Description', placeholder: 'e.g. Weekly groceries', required: true, fullWidth: true },
  { name: 'amount', label: 'Amount', type: 'currency', placeholder: '0.00', required: true },
  { name: 'type', label: 'Type', type: 'select', options: ['Expense', 'Income', 'Transfer'] },
  { name: 'category', label: 'Category', type: 'select', options: categories.map((c) => c.name) },
  { name: 'wallet', label: 'Wallet', type: 'select', options: accounts.map((a) => a.name) },
  { name: 'date', label: 'Date', type: 'date', defaultValue: TODAY },
  { name: 'paymentMethod', label: 'Payment method', type: 'select', options: ['Debit card', 'Credit card', 'Contactless', 'Bank transfer', 'Direct debit', 'Cash'] },
  { name: 'merchant', label: 'Merchant', placeholder: 'Optional', fullWidth: true },
  { name: 'notes', label: 'Notes', type: 'textarea', placeholder: 'Anything you want to remember about this payment' },
];

let nextId = 1000;

/** Builds a Transaction record from the form values. */
export function toTransaction(values: FormValues): Transaction {
  nextId += 1;
  return {
    id: `tx-${nextId}`,
    title: String(values.title),
    amount: Number(values.amount),
    type: values.type as TransactionType,
    category: String(values.category),
    wallet: String(values.wallet),
    date: String(values.date || TODAY),
    merchant: String(values.merchant || values.title),
    notes: String(values.notes ?? ''),
    label: 'Manual',
    paymentMethod: String(values.paymentMethod),
  };
}

interface AddTransactionModalProps {
  onAdd?: (transaction: Transaction) => void;
  trigger?: ReactElement<{ onClick?: () => void }>;
  isOpen?: boolean;
  onClose?: () => void;
}

export function AddTransactionModal({ onAdd, trigger, isOpen, onClose }: AddTransactionModalProps) {
  return (
    <FormModal
      title="Add transaction"
      description="Record a payment, income or transfer. It is saved to this demo session only."
      fields={fields}
      size="lg"
      submitLabel="Save transaction"
      successTitle="Transaction saved"
      successDescription={(values) => `${values.title} · ${formatCurrency(Number(values.amount))}`}
      onSubmit={onAdd ? (values) => onAdd(toTransaction(values)) : undefined}
      trigger={trigger}
      triggerLabel="Add transaction"
      triggerIcon={<Plus size={16} />}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}
