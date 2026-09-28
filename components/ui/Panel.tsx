import { Box, Flex, Heading, Text, type BoxProps } from '@chakra-ui/react';
import type { ReactNode } from 'react';

export interface PanelProps extends Omit<BoxProps, 'title'> {
  title?: ReactNode;
  description?: ReactNode;
  /** Buttons or links shown at the top right of the panel. */
  action?: ReactNode;
  /** Remove body padding, e.g. for edge-to-edge tables and lists. */
  flush?: boolean;
  bodyProps?: BoxProps;
  headingAs?: 'h2' | 'h3';
}

const PAD = { base: 4, md: 5 };

/** The standard surface for every card on the app screens. */
export function Panel({
  title,
  description,
  action,
  flush = false,
  bodyProps,
  headingAs = 'h2',
  children,
  ...rest
}: PanelProps) {
  const hasHeader = Boolean(title || action);
  return (
    <Box
      as="section"
      bg="bg.surface"
      borderWidth="1px"
      borderColor="border.subtle"
      borderRadius="xl"
      boxShadow="xs"
      minW={0}
      {...rest}
    >
      {hasHeader && (
        <Flex px={PAD} pt={PAD} pb={flush ? 4 : 0} gap={3} align="flex-start" justify="space-between">
          <Box minW={0}>
            {title && (
              <Heading as={headingAs} size="sm">
                {title}
              </Heading>
            )}
            {description && (
              <Text mt={0.5} color="text.muted" fontSize="sm">
                {description}
              </Text>
            )}
          </Box>
          {action && (
            <Flex flexShrink={0} align="center" gap={2}>
              {action}
            </Flex>
          )}
        </Flex>
      )}
      <Box px={flush ? 0 : PAD} pb={flush ? 0 : PAD} pt={flush ? 0 : hasHeader ? 4 : PAD} {...bodyProps}>
        {children}
      </Box>
    </Box>
  );
}
