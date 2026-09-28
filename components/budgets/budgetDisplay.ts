import type { MeterTone } from '@/components/ui/Meter';
import type { Status } from '@/components/ui/StatusBadge';
import type { BudgetTone } from '@/lib/finance';

/** Shared mapping from a budget's state to meter colour and status badge. */
export const budgetMeterTone: Record<BudgetTone, MeterTone> = {
  healthy: 'accent',
  warning: 'warning',
  over: 'negative',
};

export const budgetStatus: Record<BudgetTone, Status> = {
  healthy: 'healthy',
  warning: 'warning',
  over: 'over',
};
