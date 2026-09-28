'use client';

import { Button } from '@chakra-ui/react';
import { TriangleAlert } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';
import { Panel } from '@/components/ui/Panel';

export default function AppError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Panel>
      <EmptyState
        icon={TriangleAlert}
        title="Something went wrong loading this page"
        description="Your data is safe. Try again, and if it keeps happening, reload the app."
        action={<Button onClick={reset}>Try again</Button>}
      />
    </Panel>
  );
}
