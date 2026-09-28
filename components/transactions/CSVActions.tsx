'use client';

import { Button, IconButton, Tooltip, useToast } from '@chakra-ui/react';
import { Download, Upload } from 'lucide-react';
import { useRef, type ChangeEvent } from 'react';
import { TODAY } from '@/lib/constants';
import { transactionsToCsv } from '@/lib/filters';
import type { Transaction } from '@/types/transaction';

/** Export downloads the currently filtered rows as a real CSV file; import previews a chosen file. */
export function CSVActions({ items }: { items: Transaction[] }) {
  const toast = useToast();
  const fileRef = useRef<HTMLInputElement>(null);

  const exportCsv = () => {
    const blob = new Blob([transactionsToCsv(items)], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `spendwise-transactions-${TODAY}.csv`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast({ status: 'success', title: 'Export ready', description: `${items.length} transactions saved as CSV.` });
  };

  const onFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const rows = (await file.text()).split(/\r?\n/).filter(Boolean).length - 1;
    toast({
      status: 'info',
      title: `${file.name} is ready to review`,
      description: `${Math.max(0, rows)} rows found. Importing is simulated in this demo.`,
    });
  };

  return (
    <>
      <input ref={fileRef} type="file" accept=".csv,text/csv" hidden onChange={onFile} />
      <Tooltip label="Import CSV" openDelay={300}>
        <IconButton variant="secondary" aria-label="Import CSV" icon={<Upload size={16} />} onClick={() => fileRef.current?.click()} />
      </Tooltip>
      <Button variant="secondary" leftIcon={<Download size={16} />} onClick={exportCsv} isDisabled={!items.length}>
        Export
      </Button>
    </>
  );
}
