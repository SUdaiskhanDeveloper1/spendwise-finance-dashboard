'use client';

import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  SimpleGrid,
  Stack,
  Text,
  chakra,
  useToast,
} from '@chakra-ui/react';
import { Camera, CircleCheck, FileText, ImageUp, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState, type DragEvent } from 'react';
import { IconTile } from '@/components/ui/IconTile';
import { Meter } from '@/components/ui/Meter';
import { Panel } from '@/components/ui/Panel';
import { Photo } from '@/components/ui/Photo';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { accounts } from '@/data/accounts';
import { sampleScanResult, scanHistory, type ScannedReceipt } from '@/data/receipts';
import { expenseCategoryNames } from '@/lib/categories';
import { formatCurrency, formatRelativeDay } from '@/lib/format';

type Stage = 'idle' | 'scanning' | 'review';
type Source = { kind: 'sample' } | { kind: 'file'; name: string; url?: string };

const STEPS = ['Reading the receipt', 'Finding the total and date', 'Suggesting a category'];

export function ReceiptScanner() {
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [stage, setStage] = useState<Stage>('idle');
  const [source, setSource] = useState<Source | null>(null);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [form, setForm] = useState(sampleScanResult);
  const [history, setHistory] = useState<ScannedReceipt[]>(scanHistory);

  // Simulated scan: advance the progress bar, then open the review form.
  useEffect(() => {
    if (stage !== 'scanning') return;
    setProgress(0);
    const timer = setInterval(() => setProgress((p) => Math.min(1, p + 0.08)), 110);
    return () => clearInterval(timer);
  }, [stage]);

  useEffect(() => {
    if (stage !== 'scanning' || progress < 1) return;
    const timer = setTimeout(() => setStage('review'), 250);
    return () => clearTimeout(timer);
  }, [stage, progress]);

  // Release object URLs created for previews.
  useEffect(() => () => {
    if (source?.kind === 'file' && source.url) URL.revokeObjectURL(source.url);
  }, [source]);

  const start = (next: Source) => {
    setSource(next);
    setForm(sampleScanResult);
    setStage('scanning');
  };

  const onFile = (file?: File) => {
    if (!file) return;
    start({ kind: 'file', name: file.name, url: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined });
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    setDragging(false);
    onFile(event.dataTransfer.files?.[0]);
  };

  const reset = () => {
    setStage('idle');
    setSource(null);
  };

  const save = () => {
    setHistory((h) => [
      { id: `rc-${Date.now()}`, merchant: form.merchant, amount: Number(form.amount), date: form.date, category: form.category, status: 'Saved' },
      ...h,
    ]);
    toast({ status: 'success', title: 'Transaction saved', description: `${form.merchant} · ${formatCurrency(Number(form.amount))} added to ${form.wallet}.` });
    reset();
  };

  const set = (key: keyof typeof form) => (event: { target: { value: string } }) => setForm((f) => ({ ...f, [key]: event.target.value }));
  const stepIndex = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));

  const preview =
    source?.kind === 'file' && source.url ? (
      // A local blob preview of the user's own file; next/image cannot optimise blob: URLs.
      // eslint-disable-next-line @next/next/no-img-element
      <img src={source.url} alt="Receipt preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    ) : source?.kind === 'file' ? (
      <Flex h="full" direction="column" align="center" justify="center" gap={2} color="text.muted">
        <FileText size={32} aria-hidden />
        <Text fontSize="sm">{source.name}</Text>
      </Flex>
    ) : (
      <Photo image="receiptScan" alt="Sample receipt" sizes="(min-width: 62em) 30vw, 100vw" borderRadius={0} h="full" />
    );

  return (
    <Grid templateColumns={{ base: '1fr', xl: 'minmax(0, 2fr) minmax(0, 1fr)' }} gap={{ base: 4, md: 6 }} alignItems="start">
      <Panel
        title={stage === 'review' ? 'Check the details' : 'Scan a receipt'}
        description={stage === 'review' ? 'We filled these in from your receipt. Edit anything that looks wrong.' : 'Photos and PDFs up to 10 MB'}
        action={<Badge variant="info">Demo · scanning is simulated</Badge>}
      >
        {stage === 'idle' && (
          <chakra.label
            htmlFor="receipt-file"
            onDragOver={(e: DragEvent) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            gap={3}
            py={{ base: 10, md: 16 }}
            px={6}
            borderWidth="2px"
            borderStyle="dashed"
            borderColor={dragging ? 'accent.default' : 'border.default'}
            bg={dragging ? 'accent.subtle' : 'bg.subtle'}
            borderRadius="xl"
            cursor="pointer"
            transition="background 0.15s, border-color 0.15s"
            _hover={{ borderColor: 'accent.default' }}
          >
            <IconTile icon={ImageUp} size="lg" rounded />
            <Box>
              <Text fontWeight={600}>Drop a receipt here, or click to browse</Text>
              <Text fontSize="sm" color="text.muted">
                On your phone, this opens the camera
              </Text>
            </Box>
            <input
              ref={inputRef}
              id="receipt-file"
              type="file"
              accept="image/*,application/pdf"
              capture="environment"
              hidden
              onChange={(e) => {
                onFile(e.target.files?.[0]);
                e.target.value = '';
              }}
            />
            <Flex gap={2} mt={2} wrap="wrap" justify="center">
              <Button leftIcon={<Camera size={16} />} onClick={(e) => { e.preventDefault(); inputRef.current?.click(); }}>
                Choose file
              </Button>
              <Button variant="secondary" leftIcon={<Sparkles size={16} />} onClick={(e) => { e.preventDefault(); start({ kind: 'sample' }); }}>
                Try a sample receipt
              </Button>
            </Flex>
          </chakra.label>
        )}

        {stage !== 'idle' && (
          <Grid templateColumns={{ base: '1fr', md: '220px minmax(0, 1fr)' }} gap={6}>
            <Box h={{ base: '220px', md: '300px' }} borderRadius="lg" overflow="hidden" bg="bg.muted" borderWidth="1px" borderColor="border.subtle">
              {preview}
            </Box>

            {stage === 'scanning' ? (
              <Flex direction="column" justify="center" gap={4} aria-live="polite">
                <Text fontWeight={600}>{STEPS[stepIndex]}…</Text>
                <Meter value={progress} label="Scanning progress" />
                <Stack spacing={2}>
                  {STEPS.map((step, i) => (
                    <Flex key={step} align="center" gap={2} fontSize="sm" color={i < stepIndex || progress >= 1 ? 'accent.fg' : i === stepIndex ? 'text.primary' : 'text.muted'}>
                      <CircleCheck size={14} aria-hidden opacity={i < stepIndex ? 1 : 0.35} />
                      {step}
                    </Flex>
                  ))}
                </Stack>
              </Flex>
            ) : (
              <Stack spacing={4}>
                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                  <FormControl gridColumn="1 / -1">
                    <FormLabel htmlFor="rc-merchant">Merchant</FormLabel>
                    <Input id="rc-merchant" value={form.merchant} onChange={set('merchant')} />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="rc-amount">Total</FormLabel>
                    <InputGroup>
                      <InputLeftAddon>£</InputLeftAddon>
                      <Input id="rc-amount" type="number" step="0.01" value={form.amount} onChange={set('amount')} />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="rc-date">Date</FormLabel>
                    <Input id="rc-date" type="date" value={form.date} onChange={set('date')} />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="rc-category">Category</FormLabel>
                    <Select id="rc-category" value={form.category} onChange={set('category')}>
                      {expenseCategoryNames.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="rc-wallet">Paid from</FormLabel>
                    <Select id="rc-wallet" value={form.wallet} onChange={set('wallet')}>
                      {accounts.map((a) => (
                        <option key={a.id}>{a.name}</option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl gridColumn="1 / -1">
                    <FormLabel htmlFor="rc-notes">Notes</FormLabel>
                    <Input id="rc-notes" value={form.notes} onChange={set('notes')} />
                  </FormControl>
                </SimpleGrid>
                <Flex gap={2} justify="flex-end">
                  <Button variant="secondary" onClick={reset}>
                    Scan another
                  </Button>
                  <Button onClick={save} isDisabled={!form.merchant || !(Number(form.amount) > 0)}>
                    Save transaction
                  </Button>
                </Flex>
              </Stack>
            )}
          </Grid>
        )}
      </Panel>

      <Panel title="Recent scans" description={`${history.length} receipts this month`} bodyProps={{ pt: 2 }}>
        <Stack spacing={0} divider={<Box borderBottomWidth="1px" borderColor="border.subtle" />}>
          {history.map((r) => (
            <Flex key={r.id} align="center" gap={3} py={3}>
              <IconTile icon={FileText} tone="neutral" size="sm" />
              <Box flex={1} minW={0}>
                <Text fontSize="sm" fontWeight={500} noOfLines={1}>
                  {r.merchant}
                </Text>
                <Text fontSize="xs" color="text.muted">
                  {r.category} · {formatRelativeDay(r.date)}
                </Text>
              </Box>
              <Box textAlign="right">
                <Text fontSize="sm" fontWeight={600} textStyle="numeric">
                  {formatCurrency(r.amount)}
                </Text>
                <StatusBadge status={r.status === 'Saved' ? 'paid' : 'warning'} label={r.status} />
              </Box>
            </Flex>
          ))}
        </Stack>
      </Panel>
    </Grid>
  );
}
