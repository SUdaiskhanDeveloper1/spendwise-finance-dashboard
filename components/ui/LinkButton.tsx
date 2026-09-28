import { Button, type ButtonProps } from '@chakra-ui/react';
import { ArrowRight } from 'lucide-react';
import NextLink from 'next/link';

interface LinkButtonProps extends Omit<ButtonProps, 'as'> {
  href: string;
  /** Show a trailing arrow (for "View all"-style links). */
  arrow?: boolean;
}

/** A Next.js link styled as a button. */
export function LinkButton({ href, arrow = false, children, ...rest }: LinkButtonProps) {
  return (
    <Button as={NextLink} href={href} rightIcon={arrow ? <ArrowRight size={14} /> : undefined} {...rest}>
      {children}
    </Button>
  );
}
