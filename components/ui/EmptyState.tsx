import { Flex, Heading, Text } from '@chakra-ui/react';
import { Inbox, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  action?: ReactNode;
}

export function EmptyState({
  title = 'Nothing here yet',
  description,
  icon: Icon = Inbox,
  action,
}: EmptyStateProps) {
  return (
    <Flex direction="column" align="center" textAlign="center" py={{ base: 10, md: 14 }} px={6} gap={3}>
      <Flex
        w={12}
        h={12}
        align="center"
        justify="center"
        borderRadius="full"
        bg="bg.muted"
        color="text.muted"
        borderWidth="1px"
        borderStyle="dashed"
        borderColor="border.default"
      >
        <Icon size={20} aria-hidden />
      </Flex>
      <Heading as="h3" size="sm">
        {title}
      </Heading>
      {description && (
        <Text color="text.muted" maxW="sm">
          {description}
        </Text>
      )}
      {action}
    </Flex>
  );
}
