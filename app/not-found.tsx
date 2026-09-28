import { Flex, Heading, Text } from '@chakra-ui/react';
import { LogoMark } from '@/components/layout/Logo';
import { LinkButton } from '@/components/ui/LinkButton';

export default function NotFound() {
  return (
    <Flex minH="100dvh" direction="column" align="center" justify="center" textAlign="center" gap={4} px={6}>
      <LogoMark size={40} />
      <Text fontSize="sm" fontWeight={600} color="accent.fg">
        404
      </Text>
      <Heading as="h1" size="xl">
        This page has wandered off
      </Heading>
      <Text color="text.secondary" maxW="md">
        The link may be old or mistyped. Your money is exactly where you left it.
      </Text>
      <Flex gap={3} mt={2}>
        <LinkButton href="/dashboard">Go to dashboard</LinkButton>
        <LinkButton href="/" variant="secondary">
          Home page
        </LinkButton>
      </Flex>
    </Flex>
  );
}
