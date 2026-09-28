import { Box, Flex, Text } from '@chakra-ui/react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Delta } from './Delta';
import { IconTile, type Tone } from './IconTile';
import { Sparkline } from './Sparkline';

export interface StatCardProps {
  label: string;
  value: string;
  icon?: LucideIcon;
  tone?: Tone;
  /** Change vs the comparison period, as a fraction. */
  delta?: number;
  deltaLabel?: string;
  positiveIsGood?: boolean;
  /** Supporting line shown when there is no delta. */
  helper?: ReactNode;
  trend?: number[];
}

/** KPI tile: label, value, change vs a named period and an optional sparkline. */
export function StatCard({ label, value, icon, tone = 'accent', delta, deltaLabel, positiveIsGood, helper, trend }: StatCardProps) {
  return (
    <Box
      bg="bg.surface"
      borderWidth="1px"
      borderColor="border.subtle"
      borderRadius="xl"
      boxShadow="xs"
      p={{ base: 4, md: 5 }}
      minW={0}
    >
      <Flex justify="space-between" align="center" gap={3}>
        <Text color="text.secondary" fontWeight={500} fontSize="sm" noOfLines={1}>
          {label}
        </Text>
        {icon && <IconTile icon={icon} tone={tone} size="sm" />}
      </Flex>
      <Text mt={3} fontSize={{ base: '1.5rem', md: '1.75rem' }} fontWeight={600} letterSpacing="-0.025em" lineHeight={1.15}>
        {value}
      </Text>
      <Flex mt={3} justify="space-between" align="flex-end" gap={3} minH={8}>
        <Box minW={0}>
          {delta !== undefined ? (
            <Delta value={delta} label={deltaLabel} positiveIsGood={positiveIsGood} />
          ) : (
            helper && (
              <Text fontSize="sm" color="text.muted" noOfLines={1}>
                {helper}
              </Text>
            )
          )}
        </Box>
        {trend && <Sparkline data={trend} label={`${label} trend`} />}
      </Flex>
    </Box>
  );
}
