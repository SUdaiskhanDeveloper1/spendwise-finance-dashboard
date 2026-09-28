import { Box, type BoxProps } from '@chakra-ui/react';
import Image from 'next/image';
import { images, type ImageKey } from '@/data/images';

interface PhotoProps extends Omit<BoxProps, 'children'> {
  image: ImageKey;
  /** Rendered width hint for the responsive srcset, e.g. "(min-width: 62em) 50vw, 100vw". */
  sizes: string;
  /** Only for the largest above-the-fold image of a page. Everything else lazy-loads. */
  priority?: boolean;
  /** Override the registry alt text; pass "" when the photo is decorative. */
  alt?: string;
  /** CSS aspect ratio; defaults to the photo's intrinsic ratio. */
  ratio?: number;
}

/**
 * Registry-backed photo. next/image serves an AVIF/WebP rendition sized to
 * the viewport, reserves space via aspect-ratio (no layout shift) and shows
 * the blur placeholder while loading.
 */
export function Photo({ image, sizes, priority = false, alt, ratio, borderRadius = 'xl', ...rest }: PhotoProps) {
  const asset = images[image];
  return (
    <Box position="relative" overflow="hidden" borderRadius={borderRadius} bg="bg.muted" sx={{ aspectRatio: String(ratio ?? asset.width / asset.height) }} {...rest}>
      <Image
        src={asset.src}
        alt={alt ?? asset.alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        blurDataURL={asset.blurDataURL}
        quality={75}
        style={{ objectFit: 'cover' }}
      />
    </Box>
  );
}
