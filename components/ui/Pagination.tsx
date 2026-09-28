'use client';

import { Button, Flex, Text } from '@chakra-ui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, pageSize, total, onChange }: PaginationProps) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(total, page * pageSize);
  return (
    <Flex as="nav" aria-label="Pagination" justify="space-between" align="center" gap={3}>
      <Text fontSize="sm" color="text.muted" aria-live="polite">
        {from}–{to} of {total}
      </Text>
      <Flex gap={2}>
        <Button size="sm" variant="secondary" leftIcon={<ChevronLeft size={16} />} onClick={() => onChange(page - 1)} isDisabled={page <= 1}>
          Previous
        </Button>
        <Button size="sm" variant="secondary" rightIcon={<ChevronRight size={16} />} onClick={() => onChange(page + 1)} isDisabled={page >= pageCount}>
          Next
        </Button>
      </Flex>
    </Flex>
  );
}
