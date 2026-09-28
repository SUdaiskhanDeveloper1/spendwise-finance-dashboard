import { Badge } from '@chakra-ui/react';
import {
  CalendarClock,
  CircleAlert,
  CircleCheck,
  CircleDashed,
  Clock,
  RefreshCw,
  TriangleAlert,
  type LucideIcon,
} from 'lucide-react';

const statuses = {
  healthy: { label: 'On track', variant: 'positive', icon: CircleCheck },
  warning: { label: 'Near limit', variant: 'warning', icon: TriangleAlert },
  over: { label: 'Over budget', variant: 'negative', icon: CircleAlert },
  paid: { label: 'Paid', variant: 'positive', icon: CircleCheck },
  due: { label: 'Due soon', variant: 'warning', icon: Clock },
  upcoming: { label: 'Upcoming', variant: 'neutral', icon: CalendarClock },
  synced: { label: 'Synced', variant: 'positive', icon: RefreshCw },
  manual: { label: 'Manual', variant: 'neutral', icon: CircleDashed },
} satisfies Record<string, { label: string; variant: string; icon: LucideIcon }>;

export type Status = keyof typeof statuses;

/** Status is always shown as icon + label, never colour alone. */
export function StatusBadge({ status, label }: { status: Status; label?: string }) {
  const { variant, icon: Icon, label: fallback } = statuses[status];
  return (
    <Badge variant={variant} display="inline-flex" alignItems="center" gap={1} flexShrink={0} whiteSpace="nowrap">
      <Icon size={12} strokeWidth={2.5} aria-hidden />
      {label ?? fallback}
    </Badge>
  );
}
