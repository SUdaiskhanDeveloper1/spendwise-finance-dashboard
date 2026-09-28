'use client';

import { UserPlus } from 'lucide-react';
import { FormModal, type FieldConfig } from '@/components/ui/FormModal';
import { sharedWallets } from '@/data/sharedWallets';

const fields: FieldConfig[] = [
  { name: 'email', label: 'Email address', type: 'email', placeholder: 'name@example.com', required: true, fullWidth: true },
  { name: 'wallet', label: 'Wallet', type: 'select', options: sharedWallets.map((w) => w.name) },
  { name: 'role', label: 'Access', type: 'select', options: ['Can add expenses', 'View only', 'Admin'] },
  { name: 'message', label: 'Personal note', type: 'textarea', placeholder: 'Optional — shown in the invitation email' },
];

export function InviteMemberModal() {
  return (
    <FormModal
      title="Invite someone"
      description="They will get an email with a link to join the wallet."
      fields={fields}
      submitLabel="Send invite"
      successTitle="Invitation sent"
      successDescription={(v) => `${v.email} was invited to ${v.wallet}.`}
      triggerLabel="Invite member"
      triggerIcon={<UserPlus size={16} />}
    />
  );
}
