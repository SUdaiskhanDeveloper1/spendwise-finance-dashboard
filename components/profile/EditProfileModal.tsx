'use client';

import { Pencil } from 'lucide-react';
import { FormModal, type FieldConfig } from '@/components/ui/FormModal';
import { currencyOptions } from '@/data/settings';
import type { UserProfile } from '@/types/user';

export function EditProfileModal({ user }: { user: UserProfile }) {
  const fields: FieldConfig[] = [
    { name: 'firstName', label: 'First name', required: true, defaultValue: user.firstName },
    { name: 'lastName', label: 'Last name', required: true, defaultValue: user.lastName },
    { name: 'email', label: 'Email', type: 'email', required: true, defaultValue: user.email, fullWidth: true },
    { name: 'phone', label: 'Phone', defaultValue: user.phone },
    { name: 'occupation', label: 'Occupation', defaultValue: user.occupation },
    { name: 'location', label: 'Location', defaultValue: user.location, fullWidth: true },
    { name: 'currency', label: 'Home currency', type: 'select', options: currencyOptions, defaultValue: user.currency, fullWidth: true },
  ];
  return (
    <FormModal
      title="Edit profile"
      fields={fields}
      size="lg"
      submitLabel="Save profile"
      successTitle="Profile updated"
      triggerLabel="Edit profile"
      triggerVariant="secondary"
      triggerIcon={<Pencil size={16} />}
    />
  );
}
