import { Box, Flex, Text } from '@chakra-ui/react';
import { getCategoryMeta } from '@/lib/categories';

/** Category label with a colour dot — the dot carries identity, the text stays in text colour. */
export function CategoryChip({ category }: { category: string }) {
  const { color } = getCategoryMeta(category);
  return (
    <Flex align="center" gap={2} minW={0}>
      <Box w={2} h={2} borderRadius="full" bg={color} flexShrink={0} />
      <Text as="span" fontSize="sm" color="text.secondary" noOfLines={1}>
        {category}
      </Text>
    </Flex>
  );
}
