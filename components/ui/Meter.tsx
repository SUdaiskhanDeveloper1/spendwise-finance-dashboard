import { Box } from '@chakra-ui/react';

export type MeterTone = 'accent' | 'warning' | 'negative' | 'info';

// The unfilled track is a lighter step of the same hue, so state reads
// across the whole bar rather than only in the filled part.
const tones: Record<MeterTone, { fill: string; track: string }> = {
  accent: { fill: 'accent.default', track: 'accent.muted' },
  warning: { fill: 'warning.solid', track: 'warning.muted' },
  negative: { fill: 'negative.solid', track: 'negative.muted' },
  info: { fill: 'info.fg', track: 'info.subtle' },
};

interface MeterProps {
  /** 0–1; values above 1 render as a full bar. */
  value: number;
  tone?: MeterTone;
  size?: 'sm' | 'md';
  label: string;
}

export function Meter({ value, tone = 'accent', size = 'md', label }: MeterProps) {
  const clamped = Math.max(0, Math.min(1, value));
  const { fill, track } = tones[tone];
  return (
    <Box
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
      h={size === 'sm' ? 1.5 : 2}
      bg={track}
      borderRadius="full"
      overflow="hidden"
    >
      <Box
        h="full"
        w={`${clamped * 100}%`}
        bg={fill}
        borderRadius="full"
        transition="width 0.6s cubic-bezier(0.22, 1, 0.36, 1)"
      />
    </Box>
  );
}
