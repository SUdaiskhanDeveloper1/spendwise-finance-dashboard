import { Box } from '@chakra-ui/react';
import Image from 'next/image';

interface UserAvatarProps {
  src: string;
  name: string;
  size?: number;
  ring?: boolean;
}

/** Photo avatar served through next/image at the exact rendered size (not the 480px source). */
export function UserAvatar({ src, name, size = 32, ring = false }: UserAvatarProps) {
  return (
    <Box
      position="relative"
      w={`${size}px`}
      h={`${size}px`}
      borderRadius="full"
      overflow="hidden"
      flexShrink={0}
      bg="bg.muted"
      boxShadow={ring ? '0 0 0 3px var(--chakra-colors-bg-surface)' : undefined}
    >
      <Image src={src} alt={name} width={size} height={size} sizes={`${size}px`} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
    </Box>
  );
}
