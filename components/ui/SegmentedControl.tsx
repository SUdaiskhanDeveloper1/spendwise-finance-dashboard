'use client';

import { chakra, Flex } from '@chakra-ui/react';
import { useRef, type KeyboardEvent, type ReactNode } from 'react';

export interface SegmentOption<T extends string> {
  value: T;
  label: ReactNode;
  /** Accessible name when the label is an icon. */
  ariaLabel?: string;
}

interface SegmentedControlProps<T extends string> {
  options: readonly SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  'aria-label': string;
  size?: 'sm' | 'md';
  fullWidth?: boolean;
}

/** Radio-group style toggle for switching periods and views. Arrow keys move the selection. */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  size = 'sm',
  fullWidth = false,
  ...rest
}: SegmentedControlProps<T>) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const next = (index + (event.key === 'ArrowRight' ? 1 : -1) + options.length) % options.length;
    onChange(options[next].value);
    refs.current[next]?.focus();
  };

  return (
    <Flex
      role="radiogroup"
      aria-label={rest['aria-label']}
      display={fullWidth ? 'flex' : 'inline-flex'}
      bg="bg.muted"
      p={1}
      borderRadius="lg"
      gap={1}
    >
      {options.map((option, index) => {
        const selected = option.value === value;
        return (
          <chakra.button
            key={option.value}
            ref={(el: HTMLButtonElement | null) => {
              refs.current[index] = el;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={option.ariaLabel}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => onKeyDown(event, index)}
            flex={fullWidth ? 1 : undefined}
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            gap={1.5}
            h={size === 'sm' ? 7 : 8}
            px={size === 'sm' ? 2.5 : 3}
            borderRadius="md"
            fontSize="sm"
            fontWeight={selected ? 600 : 500}
            color={selected ? 'text.primary' : 'text.secondary'}
            bg={selected ? 'bg.surface' : 'transparent'}
            boxShadow={selected ? 'sm' : 'none'}
            transition="background 0.15s, color 0.15s"
            _hover={{ color: 'text.primary' }}
            _focusVisible={{ boxShadow: 'outline', outline: 'none' }}
            whiteSpace="nowrap"
          >
            {option.label}
          </chakra.button>
        );
      })}
    </Flex>
  );
}
