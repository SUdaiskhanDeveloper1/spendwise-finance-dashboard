import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { Check } from 'lucide-react';
import { Panel } from '@/components/ui/Panel';
import { goals } from '@/data/goals';
import { formatCurrency } from '@/lib/format';
import { ratio } from '@/lib/utils';

const MILESTONES = [0.25, 0.5, 0.75, 1];

/** Milestone steps (25/50/75/100%) for every goal, computed from saved vs target. */
export function GoalMilestones() {
  return (
    <Panel title="Milestones" description="Celebrate the small wins on the way to each goal">
      <Stack spacing={5}>
        {goals.map((goal) => {
          const done = ratio(goal.savedAmount, goal.targetAmount);
          return (
            <Box key={goal.id}>
              <Text fontSize="sm" fontWeight={500} mb={2.5}>
                {goal.title}
              </Text>
              <Flex as="ol" listStyleType="none" gap={2} aria-label={`${goal.title} milestones`}>
                {MILESTONES.map((m) => {
                  const reached = done >= m;
                  return (
                    <Flex
                      as="li"
                      key={m}
                      flex={1}
                      direction="column"
                      gap={1.5}
                      aria-label={`${m * 100}% ${reached ? 'reached' : 'not reached yet'}`}
                    >
                      <Box h={1.5} borderRadius="full" bg={reached ? 'accent.default' : 'bg.muted'} />
                      <Flex align="center" gap={1} fontSize="xs" color={reached ? 'accent.fg' : 'text.muted'} fontWeight={reached ? 600 : 400}>
                        {reached && <Check size={12} strokeWidth={3} aria-hidden />}
                        <span>{m === 1 ? 'Goal' : `${m * 100}%`}</span>
                        <Text as="span" display={{ base: 'none', md: 'inline' }} color="text.muted" fontWeight={400}>
                          · {formatCurrency(goal.targetAmount * m, 'GBP', 0)}
                        </Text>
                      </Flex>
                    </Flex>
                  );
                })}
              </Flex>
            </Box>
          );
        })}
      </Stack>
    </Panel>
  );
}
