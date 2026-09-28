import { Badge, Box, Container, Flex, Grid, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { ArrowRight, Check, Download, Lock, ShieldCheck } from 'lucide-react';
import NextLink from 'next/link';
import { IconTile } from '@/components/ui/IconTile';
import { LinkButton } from '@/components/ui/LinkButton';
import { Photo } from '@/components/ui/Photo';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { images } from '@/data/images';
import { featureSections, howItWorks, testimonials, trustPoints, type FeatureSection } from '@/data/marketing';
import { FAQ } from './FAQ';
import { PricingCards } from './PricingCards';
import { ProductPreview } from './ProductPreview';
import { Reveal } from './Reveal';

const SECTION_Y = { base: 16, md: 24 };

export function Hero() {
  return (
    <Box
      position="relative"
      overflow="hidden"
      pt={{ base: 12, md: 20 }}
      pb={{ base: 16, md: 24 }}
      bgImage="radial-gradient(ellipse 80% 60% at 50% 0%, var(--chakra-colors-accent-subtle), transparent)"
    >
      <Container maxW="7xl">
        <Grid templateColumns={{ base: '1fr', lg: 'minmax(0, 1fr) minmax(0, 1.1fr)' }} gap={{ base: 12, lg: 16 }} alignItems="center">
          <Stack spacing={6} animation="sw-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both">
            <Flex
              as={NextLink}
              href="/shared-wallets"
              align="center"
              gap={2}
              alignSelf="flex-start"
              bg="bg.surface"
              borderWidth="1px"
              borderColor="border.subtle"
              borderRadius="full"
              pl={1}
              pr={3}
              py={1}
              fontSize="sm"
              boxShadow="xs"
              _hover={{ borderColor: 'border.default' }}
            >
              <Badge variant="accent">New</Badge>
              <Text color="text.secondary">Shared wallets for households</Text>
              <ArrowRight size={14} aria-hidden />
            </Flex>
            <Heading as="h1" size="display">
              Know where your money goes. Keep more of it.
            </Heading>
            <Text fontSize={{ base: 'lg', md: 'xl' }} color="text.secondary" lineHeight={1.6} maxW="xl">
              SpendWise brings your accounts, budgets, bills and savings goals together, and tells you in plain English what is safe to spend today.
            </Text>
            <Flex gap={3} wrap="wrap">
              <LinkButton href="/dashboard" size="lg">
                Start for free
              </LinkButton>
              <LinkButton href="/dashboard" size="lg" variant="secondary" arrow>
                Explore the live demo
              </LinkButton>
            </Flex>
            <Flex gap={{ base: 3, md: 5 }} wrap="wrap" fontSize="sm" color="text.muted">
              {['Free plan, no card needed', 'Cancel anytime', 'Private by default'].map((item) => (
                <Flex key={item} align="center" gap={1.5}>
                  <Box color="accent.default">
                    <Check size={16} aria-hidden />
                  </Box>
                  {item}
                </Flex>
              ))}
            </Flex>
          </Stack>
          <Box px={{ md: 6, lg: 0 }}>
            <ProductPreview />
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

export function TrustBar() {
  const icons = [Lock, ShieldCheck, Download];
  return (
    <Box borderTopWidth="1px" borderBottomWidth="1px" borderColor="border.subtle" bg="bg.surface">
      <Container maxW="7xl" py={{ base: 6, md: 8 }}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, md: 8 }}>
          {trustPoints.map((point, i) => (
            <Flex key={point.title} gap={3} align="center">
              <IconTile icon={icons[i]} tone="accent" />
              <Box>
                <Text fontWeight={600} fontSize="sm">
                  {point.title}
                </Text>
                <Text fontSize="sm" color="text.muted">
                  {point.description}
                </Text>
              </Box>
            </Flex>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

function Highlight({ feature }: { feature: FeatureSection }) {
  return (
    <Box
      position="absolute"
      left={{ base: 4, md: 6 }}
      bottom={{ base: 4, md: 6 }}
      bg="bg.surface"
      borderRadius="lg"
      boxShadow="xl"
      px={4}
      py={3}
      minW="180px"
      aria-hidden
    >
      <Text fontSize="xs" color="text.muted">
        {feature.highlight.label}
      </Text>
      <Text fontWeight={700} fontSize="lg" letterSpacing="-0.02em">
        {feature.highlight.value}
      </Text>
      <Text fontSize="xs" color="accent.fg" fontWeight={500}>
        {feature.highlight.meta}
      </Text>
    </Box>
  );
}

function FeatureRow({ feature, reverse }: { feature: FeatureSection; reverse: boolean }) {
  return (
    <Reveal>
      <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, minmax(0, 1fr))' }} gap={{ base: 8, lg: 16 }} alignItems="center">
        <Box position="relative" order={{ lg: reverse ? 2 : 1 }}>
          <Photo image={feature.image} sizes="(min-width: 62em) 40vw, 100vw" ratio={4 / 3} borderRadius="2xl" boxShadow="lg" />
          <Highlight feature={feature} />
        </Box>
        <Stack spacing={5} order={{ lg: reverse ? 1 : 2 }}>
          <Text color="accent.fg" fontWeight={600} fontSize="sm">
            {feature.eyebrow}
          </Text>
          <Heading as="h3" size="2xl" fontSize={{ base: '1.75rem', md: '2.25rem' }}>
            {feature.title}
          </Heading>
          <Text color="text.secondary" fontSize={{ base: 'md', md: 'lg' }} lineHeight={1.65}>
            {feature.description}
          </Text>
          <Stack as="ul" listStyleType="none" spacing={3}>
            {feature.bullets.map((bullet) => (
              <Flex as="li" key={bullet} gap={3} align="flex-start" fontSize="md">
                <Flex w={5} h={5} mt={0.5} flexShrink={0} align="center" justify="center" borderRadius="full" bg="accent.subtle" color="accent.fg">
                  <Check size={12} strokeWidth={3} aria-hidden />
                </Flex>
                {bullet}
              </Flex>
            ))}
          </Stack>
          <LinkButton href={feature.href} variant="link" alignSelf="flex-start" arrow>
            See it in the app
          </LinkButton>
        </Stack>
      </Grid>
    </Reveal>
  );
}

export function Features() {
  const [primary, secondary] = [featureSections.slice(0, 3), featureSections.slice(3)];
  return (
    <Box as="section" id="features" py={SECTION_Y}>
      <Container maxW="7xl">
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to run your money. Nothing you don’t."
          description="Built around the questions people actually ask: What do I have? What can I spend? Am I on track?"
        />
        <Stack spacing={{ base: 16, md: 24 }}>
          {primary.map((feature, i) => (
            <FeatureRow key={feature.id} feature={feature} reverse={i % 2 === 1} />
          ))}
        </Stack>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 6, md: 6 }} mt={{ base: 16, md: 24 }}>
          {secondary.map((feature, i) => (
            <Reveal key={feature.id} delay={i * 0.08}>
              <Flex
                as={NextLink}
                href={feature.href}
                direction="column"
                h="full"
                bg="bg.surface"
                borderWidth="1px"
                borderColor="border.subtle"
                borderRadius="2xl"
                overflow="hidden"
                boxShadow="xs"
                transition="box-shadow 0.2s, transform 0.2s"
                _hover={{ boxShadow: 'lg', transform: 'translateY(-3px)' }}
                _focusVisible={{ boxShadow: 'outline', outline: 'none' }}
              >
                <Photo image={feature.image} sizes="(min-width: 48em) 30vw, 100vw" ratio={16 / 10} borderRadius={0} />
                <Stack p={6} spacing={2} flex={1}>
                  <Text color="accent.fg" fontWeight={600} fontSize="sm">
                    {feature.eyebrow}
                  </Text>
                  <Heading as="h3" size="md" fontSize="lg">
                    {feature.title}
                  </Heading>
                  <Text color="text.secondary" fontSize="sm" lineHeight={1.65}>
                    {feature.description}
                  </Text>
                </Stack>
              </Flex>
            </Reveal>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export function HowItWorks() {
  return (
    <Box as="section" id="how-it-works" py={SECTION_Y} bg="bg.surface" borderTopWidth="1px" borderBottomWidth="1px" borderColor="border.subtle">
      <Container maxW="7xl">
        <Grid templateColumns={{ base: '1fr', lg: 'minmax(0, 1fr) minmax(0, 1fr)' }} gap={{ base: 10, lg: 16 }} alignItems="center">
          <Box>
            <SectionHeading
              align="left"
              eyebrow="How it works"
              title="Set up in an evening. Feel the difference by payday."
              description="No spreadsheets, no finance jargon. Three steps and SpendWise starts doing the maths for you."
            />
            <Stack as="ol" listStyleType="none" spacing={6} mt={-4}>
              {howItWorks.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.08}>
                  <Flex as="li" gap={4}>
                    <Flex w={10} h={10} flexShrink={0} align="center" justify="center" borderRadius="full" bg="accent.default" color="white" _dark={{ color: 'gray.950' }} fontWeight={700}>
                      {i + 1}
                    </Flex>
                    <Box>
                      <Text fontWeight={600} fontSize="lg">
                        {step.title}
                      </Text>
                      <Text color="text.secondary">{step.description}</Text>
                    </Box>
                  </Flex>
                </Reveal>
              ))}
            </Stack>
          </Box>
          <Reveal>
            <Photo image="expenseTracking" sizes="(min-width: 62em) 45vw, 100vw" ratio={4 / 3} borderRadius="2xl" boxShadow="lg" />
          </Reveal>
        </Grid>
      </Container>
    </Box>
  );
}

export function MobileTeaser() {
  return (
    <Box as="section" py={SECTION_Y}>
      <Container maxW="7xl">
        <Reveal>
          <Grid
            templateColumns={{ base: '1fr', md: 'minmax(0, 1.2fr) minmax(0, 1fr)' }}
            bg="bg.inverse"
            color="white"
            borderRadius="3xl"
            overflow="hidden"
            alignItems="stretch"
          >
            <Stack spacing={5} p={{ base: 8, md: 12, lg: 16 }} justify="center">
              <Text color="brand.300" fontWeight={600} fontSize="sm">
                Mobile app
              </Text>
              <Heading as="h2" size="2xl" color="white">
                Log a coffee before it’s cold
              </Heading>
              <Text color="whiteAlpha.800" fontSize="lg" lineHeight={1.65}>
                Add a payment in three taps, get a nudge before a bill is due and check what’s safe to spend from the queue at the till.
              </Text>
              <LinkButton href="/mobile-app" variant="inverse" alignSelf="flex-start" arrow>
                See the mobile app
              </LinkButton>
            </Stack>
            <Photo image="financeMobile" alt={images.financeMobile.alt} sizes="(min-width: 48em) 40vw, 100vw" borderRadius={0} ratio={4 / 4.2} h="full" />
          </Grid>
        </Reveal>
      </Container>
    </Box>
  );
}

export function Testimonials() {
  return (
    <Box as="section" py={SECTION_Y} bg="bg.surface" borderTopWidth="1px" borderBottomWidth="1px" borderColor="border.subtle">
      <Container maxW="7xl">
        <SectionHeading eyebrow="Stories" title="Real routines, a little less money stress" />
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, md: 6 }}>
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <Flex as="figure" direction="column" h="full" bg="bg.canvas" borderRadius="2xl" p={{ base: 6, md: 7 }} borderWidth="1px" borderColor="border.subtle">
                <Text as="blockquote" fontSize="md" lineHeight={1.7} color="text.primary" flex={1}>
                  “{t.quote}”
                </Text>
                <Flex as="figcaption" align="center" gap={3} mt={6}>
                  <UserAvatar src={images[t.avatar].src} name="" size={44} />
                  <Box>
                    <Text fontWeight={600} fontSize="sm">
                      {t.name}
                    </Text>
                    <Text fontSize="xs" color="text.muted">
                      {t.role}
                    </Text>
                  </Box>
                </Flex>
              </Flex>
            </Reveal>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export function PricingPreview() {
  return (
    <Box as="section" py={SECTION_Y}>
      <Container maxW="7xl">
        <SectionHeading eyebrow="Pricing" title="Start free. Upgrade when it earns its keep." description="Every plan includes bank-grade security and your data export, always." />
        <PricingCards />
        <Flex justify="center" mt={8}>
          <LinkButton href="/pricing" variant="link" arrow>
            Compare every feature
          </LinkButton>
        </Flex>
      </Container>
    </Box>
  );
}

export function FAQSection() {
  return (
    <Box as="section" id="faq" py={SECTION_Y} bg="bg.surface" borderTopWidth="1px" borderColor="border.subtle">
      <Container maxW="3xl">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        <FAQ />
      </Container>
    </Box>
  );
}

export function CallToAction() {
  return (
    <Box as="section" py={SECTION_Y}>
      <Container maxW="7xl">
        <Reveal>
          <Grid templateColumns={{ base: '1fr', lg: 'minmax(0, 1fr) minmax(0, 1fr)' }} gap={{ base: 8, lg: 12 }} alignItems="center" bg="accent.subtle" borderRadius="3xl" p={{ base: 6, md: 10, lg: 12 }}>
            <Stack spacing={5}>
              <Heading as="h2" size="2xl">
                Make next month your calmest money month yet
              </Heading>
              <Text fontSize="lg" color="text.secondary" lineHeight={1.65}>
                Open the live demo to explore every screen with realistic sample data — no sign-up needed.
              </Text>
              <Flex gap={3} wrap="wrap">
                <LinkButton href="/dashboard" size="lg">
                  Open the demo
                </LinkButton>
                <LinkButton href="/pricing" size="lg" variant="secondary">
                  See pricing
                </LinkButton>
              </Flex>
            </Stack>
            <Photo image="financialPlanning" sizes="(min-width: 62em) 40vw, 100vw" ratio={3 / 2} borderRadius="2xl" />
          </Grid>
        </Reveal>
      </Container>
    </Box>
  );
}
