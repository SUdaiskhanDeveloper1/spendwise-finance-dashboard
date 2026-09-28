import { Avatar, AvatarGroup } from '@chakra-ui/react';

// Soft, readable initials tiles instead of Chakra's random saturated colours.
const palettes = [
  { bg: 'accent.muted', color: 'accent.fg' },
  { bg: 'info.subtle', color: 'info.fg' },
  { bg: 'warning.muted', color: 'warning.fg' },
  { bg: 'negative.muted', color: 'negative.fg' },
  { bg: 'bg.emphasis', color: 'text.primary' },
];

const paletteFor = (name: string) => palettes[[...name].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % palettes.length];

export function MemberAvatars({ names, max = 4, size = 'sm' }: { names: string[]; max?: number; size?: 'xs' | 'sm' | 'md' }) {
  return (
    <AvatarGroup size={size} max={max} spacing="-0.4rem">
      {names.map((name) => (
        <Avatar key={name} name={name} {...paletteFor(name)} borderWidth="2px" borderColor="bg.surface" fontWeight={600} />
      ))}
    </AvatarGroup>
  );
}

export function MemberAvatar({ name, size = 'sm' }: { name: string; size?: 'xs' | 'sm' | 'md' }) {
  return <Avatar name={name} size={size} {...paletteFor(name)} fontWeight={600} />;
}
