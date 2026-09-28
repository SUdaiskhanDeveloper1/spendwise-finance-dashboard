import type { Metadata } from 'next';
import { ReceiptScanner } from '@/components/receipt-scanner/ReceiptScanner';
import { PageHeader } from '@/components/ui/PageHeader';

export const metadata: Metadata = { title: 'Receipt scanner' };

export default function ReceiptScannerPage() {
  return (
    <>
      <PageHeader
        title="Receipt scanner"
        description="Snap or upload a receipt and SpendWise fills in the merchant, total, date and category for you to confirm."
      />
      <ReceiptScanner />
    </>
  );
}
