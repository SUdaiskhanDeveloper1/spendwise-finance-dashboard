import { Badge, Box, Flex, Text } from '@chakra-ui/react';
import { Meter } from '@/components/ui/Meter';
import { Photo } from '@/components/ui/Photo';
import { goalCovers } from '@/data/images';
import { goalProgress } from '@/lib/finance';
import { formatCurrency, formatDate, formatPercent } from '@/lib/format';
import type { Goal } from '@/types/goal';
import { ContributeButton } from './ContributeButton';

function timeLeft(days: number) {
  if (days <= 0) return 'Target date reached';
  if (days < 45) return `${days} days left`;
  const months = Math.round(days / 30.44);
  return months < 24 ? `${months} months left` : `${Math.round(months / 12)} years left`;
}

export function GoalCard({ goal }: { goal: Goal }) {
  const progress = goalProgress(goal);
  const cover = goalCovers[goal.id];
  return (
    <Flex
      direction="column"
      bg="bg.surface"
      borderWidth="1px"
      borderColor="border.subtle"
      borderRadius="xl"
      boxShadow="xs"
      overflow="hidden"
      transition="box-shadow 0.2s, transform 0.2s"
      _hover={{ boxShadow: 'md', transform: 'translateY(-2px)' }}
    >
      <Box position="relative">
        {cover ? (
          <Photo image={cover} alt="" sizes="(min-width: 80em) 22vw, (min-width: 48em) 45vw, 100vw" ratio={16 / 9} borderRadius={0} />
        ) : (
          <Box sx={{ aspectRatio: '16 / 9' }} bg="accent.subtle" />
        )}
        <Badge position="absolute" top={3} left={3} variant="neutral" bg="bg.surface" boxShadow="sm">
          {goal.category}
        </Badge>
      </Box>
      <Flex direction="column" flex={1} p={{ base: 4, md: 5 }}>
        <Text fontWeight={600} fontSize="md">
          {goal.title}
        </Text>
        <Text fontSize="xs" color="text.muted" mb={4}>
          By {formatDate(goal.deadline)} · {timeLeft(progress.daysLeft)}
        </Text>
        <Flex align="baseline" justify="space-between" mb={2}>
          <Text fontSize="xl" fontWeight={600} letterSpacing="-0.02em">
            {formatCurrency(goal.savedAmount, 'GBP', 0)}
          </Text>
          <Text fontSize="sm" color="text.muted">
            of {formatCurrency(goal.targetAmount, 'GBP', 0)}
          </Text>
        </Flex>
        <Meter value={progress.fraction} label={`${goal.title}: ${formatPercent(progress.fraction)} saved`} />
        <Text mt={2} fontSize="sm" color="text.secondary">
          {formatPercent(progress.fraction)} saved · {formatCurrency(progress.remaining, 'GBP', 0)} to go
        </Text>
        <Box mt="auto" pt={4}>
          <Text fontSize="xs" color="text.muted" mb={3}>
            Save{' '}
            <Text as="span" fontWeight={600} color="text.primary">
              {formatCurrency(progress.monthlyNeeded, 'GBP', 0)} a month
            </Text>{' '}
            to stay on track
          </Text>
          <ContributeButton goalTitle={goal.title} />
        </Box>
      </Flex>
    </Flex>
  );
}
