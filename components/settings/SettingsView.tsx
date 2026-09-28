'use client';

import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  chakra,
  useColorMode,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Laptop, Monitor, Moon, Smartphone, Sun } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { CSVActions } from '@/components/transactions/CSVActions';
import { FormModal, type FieldConfig } from '@/components/ui/FormModal';
import { Panel } from '@/components/ui/Panel';
import {
  activeSessions,
  budgetCycleOptions,
  currencyOptions,
  dateFormatOptions,
  languageOptions,
  notificationPreferences,
  weekStartOptions,
} from '@/data/settings';
import type { Transaction } from '@/types/transaction';
import { SettingRow } from './SettingRow';

const TABS = ['general', 'notifications', 'appearance', 'security', 'data'] as const;
const TAB_LABELS = ['General', 'Notifications', 'Appearance', 'Security', 'Data and privacy'];

const divider = <Box borderBottomWidth="1px" borderColor="border.subtle" />;

function SaveBar({ onSave }: { onSave: () => void }) {
  return (
    <Flex justify="flex-end" pt={4} mt={2} borderTopWidth="1px" borderColor="border.subtle">
      <Button onClick={onSave}>Save changes</Button>
    </Flex>
  );
}

function OptionSelect({ id, options, defaultValue }: { id: string; options: readonly (string | { value: string; label: string })[]; defaultValue?: string }) {
  return (
    <Select id={id} defaultValue={defaultValue}>
      {options.map((o) =>
        typeof o === 'string' ? (
          <option key={o}>{o}</option>
        ) : (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ),
      )}
    </Select>
  );
}

const passwordFields: FieldConfig[] = [
  { name: 'current', label: 'Current password', type: 'password', required: true, fullWidth: true },
  { name: 'next', label: 'New password', type: 'password', required: true, helper: 'At least 12 characters', fullWidth: true },
];

function ThemeCard({ label, icon, selected, onSelect, preview }: { label: string; icon: ReactNode; selected: boolean; onSelect: () => void; preview: ReactNode }) {
  return (
    <chakra.button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      textAlign="left"
      borderWidth="2px"
      borderColor={selected ? 'accent.default' : 'border.subtle'}
      borderRadius="xl"
      p={3}
      bg="bg.surface"
      transition="border-color 0.15s"
      _hover={{ borderColor: selected ? 'accent.default' : 'border.default' }}
      _focusVisible={{ boxShadow: 'outline', outline: 'none' }}
    >
      {preview}
      <Flex align="center" gap={2} mt={3} fontSize="sm" fontWeight={selected ? 600 : 500}>
        {icon}
        {label}
      </Flex>
    </chakra.button>
  );
}

function MiniPreview({ dark }: { dark: boolean }) {
  const bg = dark ? '#0B1120' : '#F6F7F9';
  const card = dark ? '#121A2B' : '#FFFFFF';
  const line = dark ? '#26334D' : '#E4E7EC';
  return (
    <Flex h="84px" borderRadius="lg" overflow="hidden" bg={bg} p={2} gap={2} aria-hidden>
      <Box w="22%" bg={card} borderRadius="md" />
      <Stack flex={1} spacing={1.5}>
        <Box h="30%" bg={card} borderRadius="md" p={1.5}>
          <Box h="4px" w="40%" bg="brand.500" borderRadius="full" />
        </Box>
        <Box flex={1} bg={card} borderRadius="md" p={1.5}>
          <Box h="4px" w="70%" bg={line} borderRadius="full" mb={1} />
          <Box h="4px" w="50%" bg={line} borderRadius="full" />
        </Box>
      </Stack>
    </Flex>
  );
}

export function SettingsView({ transactions }: { transactions: Transaction[] }) {
  const toast = useToast();
  const { colorMode, setColorMode } = useColorMode();
  const [tab, setTab] = useState(0);
  const [prefs, setPrefs] = useState(notificationPreferences);
  const [sessions, setSessions] = useState(activeSessions);
  const [twoFactor, setTwoFactor] = useState(true);
  const deleteDialog = useDisclosure();
  const [confirmText, setConfirmText] = useState('');

  // Deep links such as /settings?tab=notifications open the right tab.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('tab');
    const index = TABS.indexOf(requested as (typeof TABS)[number]);
    if (index >= 0) setTab(index);
  }, []);

  const saved = () => toast({ status: 'success', title: 'Settings saved' });
  const togglePref = (id: string, channel: 'email' | 'push') =>
    setPrefs((list) => list.map((p) => (p.id === id ? { ...p, [channel]: !p[channel] } : p)));

  const systemPrefersDark = () => typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;

  return (
    <>
      <Tabs index={tab} onChange={setTab} isLazy>
        <Box overflowX="auto" mx={{ base: -4, md: 0 }} px={{ base: 4, md: 0 }}>
          <TabList minW="max-content">
            {TAB_LABELS.map((label) => (
              <Tab key={label}>{label}</Tab>
            ))}
          </TabList>
        </Box>
        <TabPanels>
          <TabPanel>
            <Stack spacing={6}>
              <Panel title="Regional preferences" description="How amounts and dates are shown across SpendWise">
                <Stack spacing={0} divider={divider}>
                  <SettingRow label="Default currency" description="Used for totals, budgets and reports" htmlFor="set-currency">
                    <OptionSelect id="set-currency" options={currencyOptions} defaultValue="GBP" />
                  </SettingRow>
                  <SettingRow label="Language" htmlFor="set-language">
                    <OptionSelect id="set-language" options={languageOptions} />
                  </SettingRow>
                  <SettingRow label="Date format" htmlFor="set-date">
                    <OptionSelect id="set-date" options={dateFormatOptions} />
                  </SettingRow>
                  <SettingRow label="Week starts on" htmlFor="set-week">
                    <OptionSelect id="set-week" options={weekStartOptions} />
                  </SettingRow>
                  <SettingRow label="Budget cycle starts" description="Line your budgets up with payday" htmlFor="set-cycle">
                    <OptionSelect id="set-cycle" options={budgetCycleOptions} />
                  </SettingRow>
                </Stack>
                <SaveBar onSave={saved} />
              </Panel>
            </Stack>
          </TabPanel>

          <TabPanel>
            <Panel title="Notifications" description="Choose what we tell you about, and where">
              <SimpleGrid columns={3} templateColumns="minmax(0, 1fr) 64px 64px" pb={2} borderBottomWidth="1px" borderColor="border.subtle" fontSize="xs" color="text.muted" fontWeight={500}>
                <Text>Notification</Text>
                <Text textAlign="center">Email</Text>
                <Text textAlign="center">Push</Text>
              </SimpleGrid>
              <Stack spacing={0} divider={divider}>
                {prefs.map((p) => (
                  <SimpleGrid key={p.id} columns={3} templateColumns="minmax(0, 1fr) 64px 64px" py={4} alignItems="center">
                    <Box pr={4}>
                      <Text fontSize="sm" fontWeight={500}>
                        {p.label}
                      </Text>
                      <Text fontSize="sm" color="text.muted">
                        {p.description}
                      </Text>
                    </Box>
                    <Flex justify="center">
                      <Switch isChecked={p.email} onChange={() => togglePref(p.id, 'email')} aria-label={`${p.label} by email`} />
                    </Flex>
                    <Flex justify="center">
                      <Switch isChecked={p.push} onChange={() => togglePref(p.id, 'push')} aria-label={`${p.label} push notifications`} />
                    </Flex>
                  </SimpleGrid>
                ))}
              </Stack>
              <SaveBar onSave={saved} />
            </Panel>
          </TabPanel>

          <TabPanel>
            <Panel title="Theme" description="Pick how SpendWise looks on this device">
              <SimpleGrid role="radiogroup" aria-label="Theme" columns={{ base: 1, sm: 3 }} spacing={4} maxW="720px">
                <ThemeCard label="Light" icon={<Sun size={16} />} selected={colorMode === 'light'} onSelect={() => setColorMode('light')} preview={<MiniPreview dark={false} />} />
                <ThemeCard label="Dark" icon={<Moon size={16} />} selected={colorMode === 'dark'} onSelect={() => setColorMode('dark')} preview={<MiniPreview dark />} />
                <ThemeCard
                  label="Match my device"
                  icon={<Monitor size={16} />}
                  selected={false}
                  onSelect={() => {
                    setColorMode(systemPrefersDark() ? 'dark' : 'light');
                    toast({ status: 'info', title: 'Matched your device theme' });
                  }}
                  preview={
                    <Flex gap={1}>
                      <Box flex={1}>
                        <MiniPreview dark={false} />
                      </Box>
                      <Box flex={1}>
                        <MiniPreview dark />
                      </Box>
                    </Flex>
                  }
                />
              </SimpleGrid>
              <Text mt={4} fontSize="sm" color="text.muted">
                Animations follow your device’s “reduce motion” setting automatically.
              </Text>
            </Panel>
          </TabPanel>

          <TabPanel>
            <Stack spacing={6}>
              <Panel title="Sign-in and security">
                <Stack spacing={0} divider={divider}>
                  <SettingRow label="Password" description="Last changed 3 months ago">
                    <FormModal
                      title="Change password"
                      fields={passwordFields}
                      submitLabel="Update password"
                      successTitle="Password updated"
                      triggerLabel="Change password"
                      triggerVariant="secondary"
                    />
                  </SettingRow>
                  <SettingRow label="Two-step verification" description="Ask for a code from your authenticator app when signing in on a new device" htmlFor="set-2fa">
                    <Switch
                      id="set-2fa"
                      isChecked={twoFactor}
                      onChange={(e) => {
                        setTwoFactor(e.target.checked);
                        toast({ status: e.target.checked ? 'success' : 'info', title: e.target.checked ? 'Two-step verification on' : 'Two-step verification off' });
                      }}
                    />
                  </SettingRow>
                </Stack>
              </Panel>
              <Panel
                title="Where you are signed in"
                description="Sign out of any device you don’t recognise"
                action={
                  sessions.some((s) => !s.current) ? (
                    <Button size="sm" variant="ghost" onClick={() => setSessions((list) => list.filter((s) => s.current))}>
                      Sign out of others
                    </Button>
                  ) : undefined
                }
              >
                <Stack spacing={0} divider={divider}>
                  {sessions.map((s) => (
                    <Flex key={s.id} align="center" gap={3} py={3}>
                      <Flex w={9} h={9} align="center" justify="center" borderRadius="lg" bg="bg.muted" color="text.secondary">
                        {s.device.includes('iPhone') ? <Smartphone size={18} /> : <Laptop size={18} />}
                      </Flex>
                      <Box flex={1}>
                        <Text fontSize="sm" fontWeight={500}>
                          {s.device}
                        </Text>
                        <Text fontSize="xs" color={s.current ? 'positive.fg' : 'text.muted'}>
                          {s.location} · {s.lastActive}
                        </Text>
                      </Box>
                      {s.current ? (
                        <Text fontSize="xs" color="text.muted">
                          This device
                        </Text>
                      ) : (
                        <Button size="sm" variant="secondary" onClick={() => setSessions((list) => list.filter((x) => x.id !== s.id))}>
                          Sign out
                        </Button>
                      )}
                    </Flex>
                  ))}
                </Stack>
              </Panel>
            </Stack>
          </TabPanel>

          <TabPanel>
            <Stack spacing={6}>
              <Panel title="Your data" description="Download everything, or bring in history from another app">
                <SettingRow label="Transactions" description={`${transactions.length} transactions as a CSV file you can open in any spreadsheet app`}>
                  <Flex gap={2}>
                    <CSVActions items={transactions} />
                  </Flex>
                </SettingRow>
              </Panel>
              <Panel title="Delete account" description="Permanently remove your wallets, budgets, goals and history" borderColor="negative.muted">
                <Flex justify="space-between" align="center" gap={4} wrap="wrap">
                  <Text fontSize="sm" color="text.secondary" maxW="lg">
                    This cannot be undone. Export your data first if you might need it later.
                  </Text>
                  <Button variant="danger" onClick={deleteDialog.onOpen}>
                    Delete account
                  </Button>
                </Flex>
              </Panel>
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Modal
        isOpen={deleteDialog.isOpen}
        onClose={() => {
          setConfirmText('');
          deleteDialog.onClose();
        }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete your account?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color="text.secondary" mb={4}>
              All wallets, budgets, goals and transactions will be permanently deleted. Type <strong>DELETE</strong> to confirm.
            </Text>
            <Input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} placeholder="DELETE" aria-label="Type DELETE to confirm" />
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={deleteDialog.onClose}>
              Cancel
            </Button>
            <Button
              variant="danger"
              isDisabled={confirmText !== 'DELETE'}
              onClick={() => {
                toast({ status: 'info', title: 'Account deletion is disabled in this demo' });
                setConfirmText('');
                deleteDialog.onClose();
              }}
            >
              Delete permanently
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
