import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { Bus, Coffee, Plus, Utensils } from 'lucide-react';
import { IconTile } from '@/components/ui/IconTile';
import { chartColor } from '@/lib/categories';

function Frame({ children, tilt = 0 }: { children: React.ReactNode; tilt?: number }) {
  return (
    <Box
      w={{ base: '230px', md: '260px' }}
      h={{ base: '470px', md: '530px' }}
      bg="gray.900"
      borderRadius="44px"
      p="10px"
      boxShadow="0 40px 80px -30px rgba(16, 24, 40, 0.45)"
      transform={`rotate(${tilt}deg)`}
      flexShrink={0}
    >
      <Box position="relative" h="full" bg="bg.canvas" borderRadius="34px" overflow="hidden">
        <Box position="absolute" top="10px" left="50%" transform="translateX(-50%)" w="84px" h="22px" bg="gray.900" borderRadius="full" zIndex={1} />
        <Box pt={12} px={4} h="full">
          {children}
        </Box>
      </Box>
    </Box>
  );
}

/** Home screen: balance, safe-to-spend and today's payments. */
export function PhoneHome() {
  const items = [
    { icon: Coffee, title: 'Grind & Co', amount: '−£6.40', color: chartColor(3) },
    { icon: Bus, title: 'CityBikes', amount: '−£21.70', color: chartColor(6) },
    { icon: Utensils, title: 'FreshMart', amount: '−£83.95', color: chartColor(3) },
  ];
  return (
    <Frame tilt={-3}>
      <Text fontSize="xs" color="text.muted">
        Good morning, Asma
      </Text>
      <Text fontSize="2xl" fontWeight={700} letterSpacing="-0.03em">
        £19,301.10
      </Text>
      <Text fontSize="xs" color="positive.fg" fontWeight={600} mb={4}>
        +3.5% this month
      </Text>
      <Box bg="accent.default" color="white" _dark={{ color: 'gray.950' }} borderRadius="2xl" p={4} mb={4}>
        <Text fontSize="xs" opacity={0.85}>
          Safe to spend today
        </Text>
        <Text fontSize="xl" fontWeight={700}>
          £30.71
        </Text>
        <Box h="5px" bg="whiteAlpha.400" borderRadius="full" mt={2}>
          <Box h="full" w="62%" bg="white" borderRadius="full" />
        </Box>
      </Box>
      <Text fontSize="xs" fontWeight={600} mb={2}>
        Today
      </Text>
      <Stack spacing={2.5}>
        {items.map((item) => (
          <Flex key={item.title} align="center" gap={2.5} bg="bg.surface" borderRadius="xl" p={2.5}>
            <IconTile icon={item.icon} color={item.color} size="sm" />
            <Text fontSize="xs" fontWeight={500} flex={1}>
              {item.title}
            </Text>
            <Text fontSize="xs" fontWeight={600}>
              {item.amount}
            </Text>
          </Flex>
        ))}
      </Stack>
    </Frame>
  );
}

/** Quick-add screen: amount keypad in three taps. */
export function PhoneQuickAdd() {
  return (
    <Frame tilt={3}>
      <Text fontSize="sm" fontWeight={600} textAlign="center" mb={6}>
        Add expense
      </Text>
      <Text fontSize="4xl" fontWeight={700} textAlign="center" letterSpacing="-0.04em">
        £12.50
      </Text>
      <Flex justify="center" gap={2} mt={3} mb={6}>
        {['Food', 'Transport', 'Fun'].map((c, i) => (
          <Box key={c} px={3} py={1} borderRadius="full" fontSize="xs" fontWeight={500} bg={i === 0 ? 'accent.subtle' : 'bg.surface'} color={i === 0 ? 'accent.fg' : 'text.secondary'} borderWidth="1px" borderColor={i === 0 ? 'accent.muted' : 'border.subtle'}>
            {c}
          </Box>
        ))}
      </Flex>
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'].map((k) => (
          <Flex key={k} h={10} align="center" justify="center" bg="bg.surface" borderRadius="lg" fontWeight={600} fontSize="sm">
            {k}
          </Flex>
        ))}
      </Box>
      <Flex mt={4} h={11} align="center" justify="center" gap={2} bg="accent.default" color="white" _dark={{ color: 'gray.950' }} borderRadius="xl" fontWeight={600} fontSize="sm">
        <Plus size={16} aria-hidden />
        Save expense
      </Flex>
    </Frame>
  );
}
