import { Flex } from '@chakra-ui/react';
import type { LucideIcon } from 'lucide-react';

export type Tone = 'accent' | 'positive' | 'negative' | 'warning' | 'info' | 'neutral';

const toneStyles: Record<Tone, { bg: string; color: string }> = {
  accent: { bg: 'accent.subtle', color: 'accent.fg' },
  positive: { bg: 'positive.subtle', color: 'positive.fg' },
  negative: { bg: 'negative.subtle', color: 'negative.fg' },
  warning: { bg: 'warning.subtle', color: 'warning.fg' },
  info: { bg: 'info.subtle', color: 'info.fg' },
  neutral: { bg: 'bg.muted', color: 'text.secondary' },
};

const sizes = {
  sm: { box: 7, icon: 14, radius: 'md' },
  md: { box: 9, icon: 18, radius: 'lg' },
  lg: { box: 11, icon: 20, radius: 'lg' },
} as const;

interface IconTileProps {
  icon: LucideIcon;
  /** A semantic tone, or any CSS colour (e.g. a chart slot variable). */
  tone?: Tone;
  color?: string;
  size?: keyof typeof sizes;
  rounded?: boolean;
}

/**
 * Icon on a soft tinted square. A custom `color` is tinted with color-mix and
 * the glyph is pulled toward the text colour so it stays legible in both modes.
 */
export function IconTile({ icon: Icon, tone = 'accent', color, size = 'md', rounded = false }: IconTileProps) {
  const s = sizes[size];
  const style = color
    ? {
        bg: `color-mix(in srgb, ${color} 14%, transparent)`,
        color: `color-mix(in oklab, ${color} 78%, var(--chakra-colors-text-primary))`,
      }
    : toneStyles[tone];
  return (
    <Flex
      w={s.box}
      h={s.box}
      flexShrink={0}
      align="center"
      justify="center"
      borderRadius={rounded ? 'full' : s.radius}
      {...style}
    >
      <Icon size={s.icon} strokeWidth={2} aria-hidden />
    </Flex>
  );
}
