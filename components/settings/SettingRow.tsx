import { Box, Grid, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface SettingRowProps {
  label: string;
  description?: string;
  htmlFor?: string;
  children: ReactNode;
}

/** Label and help text on the left, control on the right; stacks on small screens. */
export function SettingRow({ label, description, htmlFor, children }: SettingRowProps) {
  return (
    <Grid templateColumns={{ base: '1fr', md: 'minmax(0, 1fr) minmax(0, 320px)' }} gap={{ base: 2, md: 8 }} py={4} alignItems="center">
      <Box>
        {htmlFor ? (
          <Text as="label" htmlFor={htmlFor} fontSize="sm" fontWeight={500} display="block">
            {label}
          </Text>
        ) : (
          <Text fontSize="sm" fontWeight={500}>
            {label}
          </Text>
        )}
        {description && (
          <Text fontSize="sm" color="text.muted">
            {description}
          </Text>
        )}
      </Box>
      <Box>{children}</Box>
    </Grid>
  );
}
