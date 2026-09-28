import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  actions?: ReactNode;
}

export function PageHeader({ title, description, eyebrow, actions }: PageHeaderProps) {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      align={{ base: 'stretch', md: 'flex-end' }}
      justify="space-between"
      gap={4}
      mb={{ base: 6, md: 8 }}
    >
      <Box minW={0}>
        {eyebrow && (
          <Text fontSize="sm" color="text.muted" fontWeight={500} mb={1}>
            {eyebrow}
          </Text>
        )}
        <Heading as="h1" size="xl">
          {title}
        </Heading>
        {description && (
          <Text mt={1.5} color="text.secondary" fontSize="md" maxW="2xl">
            {description}
          </Text>
        )}
      </Box>
      {actions && (
        <Flex gap={2} wrap="wrap" flexShrink={0}>
          {actions}
        </Flex>
      )}
    </Flex>
  );
}
