'use client';

import { Button, useToast, type ButtonProps } from '@chakra-ui/react';

interface ToastButtonProps extends Omit<ButtonProps, 'onClick'> {
  toastTitle: string;
  toastDescription?: string;
  toastStatus?: 'success' | 'info';
}

/** A button whose action is simulated in this frontend-only demo: it confirms with a toast. */
export function ToastButton({ toastTitle, toastDescription, toastStatus = 'success', children, ...rest }: ToastButtonProps) {
  const toast = useToast();
  return (
    <Button {...rest} onClick={() => toast({ status: toastStatus, title: toastTitle, description: toastDescription })}>
      {children}
    </Button>
  );
}
