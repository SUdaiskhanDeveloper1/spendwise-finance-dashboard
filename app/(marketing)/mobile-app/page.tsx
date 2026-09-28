import type { Metadata } from 'next';
import { Badge, Box, Container, Flex, Grid, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { BellRing, ScanFace, WifiOff, Zap } from 'lucide-react';
import { CallToAction } from '@/components/marketing/LandingSections';
import { PhoneHome, PhoneQuickAdd } from '@/components/marketing/PhoneMockup';
import { Reveal } from '@/components/marketing/Reveal';
import { IconTile } from '@/components/ui/IconTile';
import { LinkButton } from '@/components/ui/LinkButton';
import { Photo } from '@/components/ui/Photo';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'Mobile app',
  description: 'Add expenses in three taps, get bill reminders and check what is safe to spend — SpendWise on your phone.',
};

const features = [
  { icon: Zap, title: 'Three-tap quick add', description: 'Amount, category, done. Most payments are logged before you leave the counter.' },
  { icon: BellRing, title: 'Bill reminders', description: 'A gentle heads-up two days before rent, subscriptions and direct debits go out.' },
  { icon: ScanFace, title: 'Face ID and passcode', description: 'Your balances stay private, even if someone picks up your phone.' },
  { icon: WifiOff, title: 'Works offline', description: 'Log spending on the Underground; it syncs when you are back online.' },
];

export default function MobileAppPage() {
  return (
    <>
      <Box pt={{ base: 12, md: 20 }} pb={{ base: 16, md: 24 }} overflow="hidden" bgImage="radial-gradient(ellipse 70% 60% at 70% 20%, var(--chakra-colors-accent-subtle), transparent)">
        <Container maxW="7xl">
          <Grid templateColumns={{ base: '1fr', lg: 'minmax(0, 1fr) minmax(0, 1fr)' }} gap={{ base: 12, lg: 16 }} alignItems="center">
            <Stack spacing={6} animation="sw-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both">
              <Badge variant="accent" alignSelf="flex-start">
                iOS and Android · in beta
              </Badge>
              <Heading as="h1" size="display">
                Your money, right where you spend it
              </Heading>
              <Text fontSize={{ base: 'lg', md: 'xl' }} color="text.secondary" lineHeight={1.6} maxW="xl">
                The SpendWise app puts your balance, budgets and upcoming bills in your pocket — and makes logging a payment quicker than finding your card.
              </Text>
              <Flex gap={3} wrap="wrap">
                <LinkButton href="/dashboard" size="lg">
                  Try the web app
                </LinkButton>
                <LinkButton href="/pricing" size="lg" variant="secondary">
                  See plans
                </LinkButton>
              </Flex>
            </Stack>
            <Flex justify="center" gap={{ base: 0, md: 2 }} role="img" aria-label="SpendWise mobile app home screen and quick-add screen" animation="sw-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both">
              <Box mt={{ base: 0, md: 10 }} zIndex={1}>
                <PhoneHome />
              </Box>
              <Box display={{ base: 'none', sm: 'block' }} ml={{ base: 0, md: -10 }}>
                <PhoneQuickAdd />
              </Box>
            </Flex>
          </Grid>
        </Container>
      </Box>

      <Box as="section" py={{ base: 16, md: 24 }} bg="bg.surface" borderTopWidth="1px" borderBottomWidth="1px" borderColor="border.subtle">
        <Container maxW="7xl">
          <SectionHeading eyebrow="Built for the moment" title="Small screens, big peace of mind" />
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={{ base: 5, md: 6 }}>
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.06}>
                <Stack spacing={3} h="full" bg="bg.canvas" borderWidth="1px" borderColor="border.subtle" borderRadius="2xl" p={6}>
                  <IconTile icon={f.icon} tone="accent" size="lg" />
                  <Text fontWeight={600} fontSize="md">
                    {f.title}
                  </Text>
                  <Text fontSize="sm" color="text.secondary" lineHeight={1.65}>
                    {f.description}
                  </Text>
                </Stack>
              </Reveal>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Box as="section" py={{ base: 16, md: 24 }}>
        <Container maxW="7xl">
          <SectionHeading eyebrow="Phone and laptop" title="Start on your phone, finish on your laptop" description="Everything syncs instantly, so the quick log at lunch is already in your monthly report tonight." />
          <Grid templateColumns={{ base: '1fr', md: 'minmax(0, 2fr) minmax(0, 3fr)' }} gap={{ base: 5, md: 6 }}>
            <Reveal>
              <Photo image="financeMobile" sizes="(min-width: 48em) 38vw, 100vw" ratio={4 / 5} borderRadius="2xl" />
            </Reveal>
            <Reveal delay={0.08}>
              <Photo image="financeDashboard" sizes="(min-width: 48em) 58vw, 100vw" ratio={4 / 5} borderRadius="2xl" />
            </Reveal>
          </Grid>
        </Container>
      </Box>

      <CallToAction />
    </>
  );
}
