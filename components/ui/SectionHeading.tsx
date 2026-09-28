import { Heading, Stack, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
}

/** Heading block for marketing sections. */
export function SectionHeading({ eyebrow, title, description, align = 'center', as = 'h2' }: SectionHeadingProps) {
  return (
    <Stack spacing={4} textAlign={align} maxW="2xl" mx={align === 'center' ? 'auto' : 0} mb={{ base: 10, md: 14 }}>
      {eyebrow && (
        <Text color="accent.fg" fontWeight={600} fontSize="sm">
          {eyebrow}
        </Text>
      )}
      <Heading as={as} size="2xl">
        {title}
      </Heading>
      {description && (
        <Text color="text.secondary" fontSize={{ base: 'md', md: 'lg' }} lineHeight={1.65}>
          {description}
        </Text>
      )}
    </Stack>
  );
}
