import { Box, Container, Flex, Grid, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { Logo } from '@/components/layout/Logo';
import { footerLinks } from '@/data/marketing';

export function PublicFooter() {
  return (
    <Box as="footer" bg="bg.inverse" color="whiteAlpha.800" pt={{ base: 12, md: 16 }} pb={8}>
      <Container maxW="7xl">
        <Grid templateColumns={{ base: '1fr', md: '1.6fr repeat(3, 1fr)' }} gap={{ base: 10, md: 8 }}>
          <Stack spacing={4} maxW="sm">
            <Logo inverse />
            <Text fontSize="sm" color="whiteAlpha.700" lineHeight={1.7}>
              A calmer way to track spending, plan budgets and grow your savings — for individuals, couples and households.
            </Text>
          </Stack>
          {footerLinks.map((column) => (
            <Stack key={column.title} spacing={3}>
              <Text fontSize="sm" fontWeight={600} color="white">
                {column.title}
              </Text>
              {column.links.map((link) => (
                <Text
                  key={link.label}
                  as={NextLink}
                  href={link.href}
                  fontSize="sm"
                  color="whiteAlpha.700"
                  w="fit-content"
                  _hover={{ color: 'white' }}
                  _focusVisible={{ boxShadow: 'outline', outline: 'none' }}
                >
                  {link.label}
                </Text>
              ))}
            </Stack>
          ))}
        </Grid>
        <Flex
          mt={{ base: 10, md: 14 }}
          pt={6}
          borderTopWidth="1px"
          borderColor="whiteAlpha.200"
          justify="space-between"
          gap={3}
          direction={{ base: 'column', md: 'row' }}
          fontSize="xs"
          color="whiteAlpha.600"
        >
          <Text>© 2026 SpendWise. Demo product — not a regulated financial service.</Text>
          <Text>Photography from Unsplash and Pexels contributors.</Text>
        </Flex>
      </Container>
    </Box>
  );
}
